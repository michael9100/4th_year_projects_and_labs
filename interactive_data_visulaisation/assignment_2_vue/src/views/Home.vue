<template>
  <div class="home">
    <div id="map"></div>
  </div>
</template>

<script>
import * as d3 from 'd3'
import * as topojson from 'topojson'
import moment from 'moment'

let mapData = require('@/assets/world.json')
let ufoData = require('@/assets/ufos.csv')

export default {
  name: 'home',
  data() {
    return {
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
      colors: {
        black: '#3C3C3C',
        red: '#FF5A5F',
        blue: '#1098F7',
        orange: '#FFAF0F',
      },
      points: {
        radius: 1,
        highlight: {},
        highlightedPoints: [],
      }
    }
  },
  mounted() {
    this.sightings = ufoData
    this.initD3()
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
    },

    drawPoints() {
      this.map.context.clearRect(0, 0, this.map.bbWidth, this.map.bbHeight )
      this.map.hiddenContext.clearRect(0, 0, this.map.bbWidth, this.map.bbHeight )

      this.map.colors = {}

      let d
      var coords
      for (let i = 0; i < this.sightings.length; i++) {
        //give the points id's
        this.sightings[i].id = i
        d = this.sightings[i]

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
    }
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
.country {
  fill: #40883e;
  stroke: #e7e5d2;
  stroke-width: .5;
}
</style>
