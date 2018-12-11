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
        geoPath: {},
        projection: {},
        margin: {
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        },
        countries: {},
        // width: window.innerWidth,
        // height: window.innerHeight,
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
      point: {
        highlight: {},
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

      this.point.highlight = this.map.svg
        .append('circle')
          .attr('r', 7)
          .attr('style', `display: none`)

      this.map.svg.selectAll('.country')
        .data(this.countries)
        .enter()
        .append('path')
          .attr('class', 'country')
          .attr('fill', '#40883e')
          .attr('stroke', '#e7e5d2')
          .attr('d', path)

    },

    drawCanvas() {
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
            this.map.svg.attr("transform", d3.event.transform)
            this.onZoom()
          }))
      
      this.map.canvas.node().width = this.map.bbWidth
      this.map.canvas.node().height = this.map.bbHeight
      this.map.context = this.map.canvas.node().getContext('2d')
      
      this.map.context.fillStyle = '#3C3C3C'
      this.map.context.strokeStyle = '#ffffff'

      this.map.canvas.on('mousemove', () => {
        // =======================================================
        // Need a way to detect the hover event.
        // Possibly QuadTree
        // https://bl.ocks.org/veltman/1b43f61887e89c371f1c8c73341540a3
        // =======================================================
        let xy = [event.clientX, event.clientY]
        this.point.highlight.attr('style', `display: block`)
      })

      this.drawPoints()
    },
   
    drawPoints(radius = 1) {
      this.map.context.clearRect(0, 0, this.map.bbWidth, this.map.bbHeight )

      let d
      var coords
      for (let i = 0; i < this.sightings.length; i++) {
        d = this.sightings[i]
        coords = this.map.projection([d.longitude, d.latitude])
        this.map.context.beginPath()
        this.map.context.arc(coords[0], coords[1], radius, 0, Math.PI*2)
        this.map.context.fill()
      }
    },

    onZoom() {
      var transform = d3.event.transform

      // Check how far the zoom is and make an appropriate radius
      let zoomLevel = 1
      // abstracted this val to a var as it was calculated 3 times
      let k = transform.k / 7
      if (k > 1 ) {
        if (1 / (k) <= 0.03) {
          zoomLevel = 0.03
        } else {
          zoomLevel = 1 / k
        }
      }

      this.map.context.save()
      this.map.context.clearRect(0, 0, this.map.bbWidth, this.map.bbHeight)
      this.map.context.translate(transform.x, transform.y)
      this.map.context.scale(transform.k, transform.k)
      this.drawPoints(zoomLevel)
      this.map.context.restore()
    }
  }

}
</script>

<style lang="scss" >
#map {
  width: 100vw;
  height: 100vh;
  background-color: #aacfff;
  background-color: transparent;
  position: relative;
}
.country {
  fill: #40883e;
  stroke: #e7e5d2;
  stroke-width: .5;
}
</style>
