<template>
  <div class="home">
    <div id="map"></div>
    <div id="controls">
      <b-form-group label="Show Similar">
        <b-form-checkbox-group stacked v-model="controls.showSimilar.selected" name="flavour1">
          <b-form-checkbox value="shape">Shape - {{points.selected.shape || 'N/A'}}</b-form-checkbox>
          <b-form-checkbox value="city">City - {{points.selected.city || 'N/A'}}</b-form-checkbox>
          <b-form-checkbox value="country">Country - {{points.selected.country || 'N/A'}}</b-form-checkbox>
          <b-form-checkbox value="duration_s">Duration - {{points.selected.duration_s | getTime() || 'N/A'}}</b-form-checkbox>
          <p class="no-checkbox">Year - {{points.selected.datetime | moment("YYYY") || 'N/A'}}</p>
        </b-form-checkbox-group>
      </b-form-group>
      <b-form-group label="Year">
        <b-form-radio-group stacked id="radios1" v-model="controls.slider.selected" :options="controls.slider.options" name="radioOpenions">
        </b-form-radio-group>
        <div>Current Year: {{controls.slider.currentYear}}</div>
        <div>Showing {{points.amountShowing}} Sightings</div>
      </b-form-group>
    </div>
    <b-form-input id="yearSlider" type="range" 
      v-if="loaded && controls.slider.selected != 'all'" 
      step="1" 
      :min="sightings[0].datetime | getYear()" 
      :max="sightings[sightings.length-1].datetime | getYear()"
      v-model="controls.slider.currentYear"
    >
    </b-form-input>
  </div>
</template>

<script>
import * as d3 from 'd3'
import * as topojson from 'topojson'
import moment from 'moment'

let mapData = require('@/assets/world.json')
let ufoData = require('@/assets/ufos.csv')

Array.prototype.groupByDate = function(prop) {
  return this.reduce(function(groups, item) {
    const val = moment(item.datetime).year()
    groups[val] = groups[val] || []
    groups[val].push(item)
    return groups
  }, {})
}

export default {
  name: 'home',
  data() {
    return {
      loaded: false,
      map: {
        svg: {},
        canvas: {},
        context: {},
        hiddenCanvas: {},
        hiddenContext: {},
        colors: {},
        geoPath: {},
        projection: {},
        transform: {},
        margin: {
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        },
        countries: {},
        width: window.innerWidth,
        height: window.innerHeight,
        bbWidth: document.body.getBoundingClientRect().width,
        bbHeight: document.body.getBoundingClientRect().height,
      },
      sightings: {},
      sightingsByDate: {},
      colors: {
        black: '#3C3C3C',
        red: '#FF5A5F',
        blue: '#1098F7',
        orange: '#FFAF0F',
      },
      points: {
        amountShowing: 0,
        radius: 1,
        highlight: {},
        selected: {},
        highlightedPoints: [],
      },
      controls: {
        showSimilar: {
          selected: [],
        },
        slider: {
          currentYear: '',
          selected: 'all',
          options: [
            {text: 'Show All', value: 'all'},
            {text: 'Show Up to Year', value: 'upto'},
            {text: 'Show Single Year', value: 'single'}
          ]
        }
      },
    }
  },
  mounted() {
    this.sightings = ufoData
    this.sightingsByDate = this.sightings.groupByDate()

    this.initD3()
    this.loaded = true
  },
  filters: {
    getTime(seconds) {
      if(seconds == 0 || !seconds) {
        return undefined
      }
      
      let pad = (num) => {
        return ('0' + num).slice(-2)
      }

      let m = Math.floor(seconds / 60);
      seconds = seconds%60;
      let h = Math.floor(m/60)
      m = m%60
      
      return `${pad(h)}:${pad(m)}:${pad(seconds)}`
    },
    getYear(date) {
      return moment(date).year()
    }
  },
  watch: {
    controls: {
      handler: function (val, oldVal) {
        this.points.highlightedPoints.length = 0
        this.points.highlightedPoints.push(this.points.selected)
        this.onHoverPoint()
        this.onZoom()
      },
      deep: true
    }
  },
  methods: {
    initD3() {
      this.drawMap()
      this.drawCanvas()
    },

    drawMap() {
      this.countries = topojson.feature(mapData, mapData.objects.countries1).features

      this.map.svg = d3.select('#map')
        .append('svg')
          .attr("width", this.map.width)
          .attr("height", this.map.height)
        .append('g')
          .attr('transform', 'translate(' + this.map.margin.left + ',' + this.map.margin.top + ')')

      this.map.projection = d3.geoMercator()
        .translate([this.map.width / 2, this.map.height / 2])
        .scale(300)
        
      let path = d3.geoPath().projection(this.map.projection)


      this.map.svg.selectAll('.country')
        .data(this.countries)
        .enter()
        .append('path')
          .attr('class', 'country')
          .attr('fill', '#40883e')
          .attr('stroke', '#e7e5d2')
          .attr('d', path)

      this.points.highlight = d3.select('#map')
      // this.point.highlight = this.map.svg
      .append('svg')
          .attr("width", this.map.width)
          .attr("height", this.map.height)
          .attr('style', `
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
          `)
        .append('circle')
          .attr('r', 7)
          .attr('id', 'highlighter')
          .attr('style', `display: none`)
    },

    drawCanvas() {
      // Points Canvas
      this.map.canvas = d3.select('#map')
        .append('canvas')
          .attr("id", 'pointsCanvas')
          .attr("width", this.map.bbWidth)
          .attr("height", this.map.bbHeight)
          .attr("style", `
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
          `)
          .call(d3.zoom().on("zoom", () => {
            this.map.transform = d3.event.transform
            this.map.svg.attr("transform", d3.event.transform)
            this.onZoom()
          }))
      this.map.canvas.node().width = this.map.bbWidth
      this.map.canvas.node().height = this.map.bbHeight
      this.map.context = this.map.canvas.node().getContext('2d')
     
     
      // Hidden Canvas
      this.map.hiddenCanvas = d3.select(document.createElement('canvas'))
        // .append('canvas')
        .attr("id", 'hiddenCanvas')
        .attr("width", this.map.bbWidth)
        .attr("height", this.map.bbHeight)
      this.map.hiddenCanvas.node().width = this.map.bbWidth
      this.map.hiddenCanvas.node().height = this.map.bbHeight
      this.map.hiddenContext = this.map.hiddenCanvas.node().getContext("2d")

      this.map.context.fillStyle = '#3C3C3C'
      this.map.context.strokeStyle = '#ffffff'

      this.drawPoints()

      // Need to reference this as that as the this 
      // scope is needed for d3.move(this)
      let that = this
      this.map.canvas.on('mousemove', function() {
        let xy = d3.mouse(this)  
      
        // Get pixel from offscreen canvas
        let color = that.map.hiddenContext.getImageData(xy[0], xy[1], 1, 1).data
        let selected = that.map.colors[color.slice(0,3).toString()]
        if (selected) {
          that.points.highlightedPoints.length = 0
          that.points.highlightedPoints.push(selected)
          that.onHoverPoint()
          that.onZoom()
        }
      })
      this.map.canvas.on('click', function() {
        let xy = d3.mouse(this)  
      
        // Get pixel from offscreen canvas
        let color = that.map.hiddenContext.getImageData(xy[0], xy[1], 1, 1).data
        let selected = that.map.colors[color.slice(0,3).toString()]
        if (selected) {
          that.points.selected = selected
        }
      })
    },

    drawPoints() {
      this.map.context.clearRect(0, 0, this.map.bbWidth, this.map.bbHeight )
      this.map.hiddenContext.clearRect(0, 0, this.map.bbWidth, this.map.bbHeight )

      this.map.colors = {}

      let pointsToRender = []

      if (this.controls.slider.selected == 'single') {
        pointsToRender = this.sightingsByDate[this.controls.slider.currentYear] || []
      }
      else if (this.controls.slider.selected == 'upto') {
        for (let i = this.$options.filters.getYear(this.sightings[0].datetime); i < this.controls.slider.currentYear; i++) {
          if(this.sightingsByDate[i]) {
            pointsToRender = pointsToRender.concat(this.sightingsByDate[i])
          } 
        }
      }
      else {
        pointsToRender = this.sightings
      }

      this.points.amountShowing = pointsToRender.length

      let d
      var coords
      for (let i = 0; i < pointsToRender.length; i++) {
        //give the points id's
        pointsToRender[i].id = i
        d = pointsToRender[i]

        if (this.controls.showSimilar.selected.length > 0) {
          let matchingLength = 0;
          if (this.controls.showSimilar.selected.includes('shape'))
            if (d.shape == this.points.selected.shape)
              matchingLength++
          if (this.controls.showSimilar.selected.includes('city'))
            if (d.city == this.points.selected.city)
              matchingLength++
          if (this.controls.showSimilar.selected.includes('country'))
            if (d.country == this.points.selected.country)
              matchingLength++
          if (this.controls.showSimilar.selected.includes('duration_s'))
            if (d.duration_s == this.points.selected.duration_s)
              matchingLength++

          if (matchingLength == this.controls.showSimilar.selected.length)
            this.points.highlightedPoints.push(d)

        }

        // set up the color mapping of points
        let color = this.getColor(i * 1000 + 1)
        this.map.colors[color] = d
        this.map.hiddenContext.fillStyle = 'rgb( ' + color + ' )'

        // Draw Points
        coords = this.map.projection([d.longitude, d.latitude])
        this.map.context.beginPath()
        this.map.hiddenContext.beginPath()

        this.map.context.arc(coords[0], coords[1], this.points.radius, 0, Math.PI*2)
        this.map.hiddenContext.arc(coords[0], coords[1], this.points.radius, 0, Math.PI*2)
                
        this.map.context.fill()
        this.map.hiddenContext.fill()
      }

      for (let i = 0; i < this.points.highlightedPoints.length; i++) {
        d = this.points.highlightedPoints[i]
        
        if (this.controls.slider.selected == "upto") {
          let date = this.$options.filters.getYear(d.datetime)
          if (date > this.controls.slider.currentYear) continue
        }
        if (this.controls.slider.selected == "single") {
          let date = this.$options.filters.getYear(d.datetime)
          if (date != this.controls.slider.currentYear) continue
        }

        this.map.context.fillStyle = 'orange'

        // Draw Points
        coords = this.map.projection([d.longitude, d.latitude])
        this.map.context.beginPath()

        this.map.context.arc(coords[0], coords[1], this.points.radius, 0, Math.PI*2)
                
        this.map.context.fill()
      }
    },

    drawHighlightedPoints() {
      let d
      var coords
      for (let i = 0; i < this.points.highlightedPoints.length; i++) {
        d = this.points.highlightedPoints[i]
        this.map.context.fillStyle = 'orange'
        // Draw Points
        coords = this.map.projection([d.longitude, d.latitude])
        this.map.context.beginPath()
        this.map.context.arc(coords[0], coords[1], this.points.radius, 0, Math.PI*2)
        this.map.context.fill()
      }
    },

    onZoom() {
      this.map.context.fillStyle = '#3C3C3C'

      // Check how far the zoom is and make an appropriate radius
      this.points.radius = 1
      // abstracted this val to a var as it was calculated 3 times
      let k = this.map.transform.k / 7
      if (k > 1 ) {
        if (1 / (k) <= 0.03) {
          this.points.radius = 0.03
        } else {
          this.points.radius = 1 / k
        }
      }

      this.map.hiddenContext.save()
      this.map.context.save()
      
      this.map.hiddenContext.clearRect(0, 0, this.map.bbWidth, this.map.bbHeight)
      this.map.context.clearRect(0, 0, this.map.bbWidth, this.map.bbHeight)
      
      this.map.hiddenContext.translate(this.map.transform.x, this.map.transform.y)
      this.map.context.translate(this.map.transform.x, this.map.transform.y)
      
      this.map.hiddenContext.scale(this.map.transform.k, this.map.transform.k)
      this.map.context.scale(this.map.transform.k, this.map.transform.k)
      
      this.drawPoints()

      this.map.hiddenContext.restore()
      this.map.context.restore()
    },

    onHoverPoint() {
      this.map.context.fillStyle = '#3C3C3C'

      // Check how far the zoom is and make an appropriate radius
      this.points.radius = 1
      // abstracted this val to a var as it was calculated 3 times
      let k = this.map.transform.k / 7
      if (k > 1 ) {
        if (1 / (k) <= 0.03) {
          this.points.radius = 0.03
        } else {
          this.points.radius = 1 / k
        }
      }

      this.map.context.save()
      this.map.context.translate(this.map.transform.x, this.map.transform.y)      
      this.map.context.scale(this.map.transform.k, this.map.transform.k)
      
      this.drawHighlightedPoints()
      this.map.context.restore()
    },

    getColor(i) {
      return (i % 256) + "," + (Math.floor(i / 256) % 256) + "," + (Math.floor(i / 65536) % 256);
    },

  }
}
</script>

<style lang="scss" >
#map {
  width: 100vw;
  height: 100vh;
  background-color: #aacfff;
  position: relative;
}
#highlighter {
  z-index: 99999;
}
#controls {
  position: absolute;
  top: 0;
  left: 0;
  text-align: left;
  background-color: #fff;
  padding: 20px;
  margin: 10px;
  border-radius: 10px;

  .no-checkbox {
    margin-left: 24px;
  } 
}
#yearSlider {
  position: absolute;
  bottom: 0;
  margin-bottom: 10px;
  
  -webkit-appearance: none;
  width: 100%;
  height: 15px;
  border-radius: 5px;
  background: #ffffff;
  outline: none;
  -webkit-transition: .2s;

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 25px;
    height: 25px;
    border-radius: 50%; 
    background: #FF5A5F;
    cursor: pointer;
  }

  &::-moz-range-thumb {
    width: 25px;
    height: 25px;
    border-radius: 50%;
    background: #FF5A5F;
    cursor: pointer;
  }
}
.country {
  fill: #40883e;
  stroke: #e7e5d2;
  stroke-width: .5;
}
</style>
