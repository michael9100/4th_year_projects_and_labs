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
        .call(d3.zoom().on("zoom", () => {
          this.map.svg.attr("transform", d3.event.transform)
        }))
        .append('g')
        .attr('transform', 'translate(' + this.map.margin.left + ',' + this.map.margin.top + ')')

      this.map.projection = d3.geoMercator()
        .translate([this.map.width / 2, this.map.height / 2])
        .scale(300)
        
      var path = d3.geoPath().projection(this.map.projection)

      this.map.svg.selectAll('.country')
        .data(this.countries)
        .enter().append('path')
        .attr('class', 'country')
        .attr('fill', '#40883e')
        .attr('stroke', '#e7e5d2')
        .attr('d', path)

    },

    drawCanvas() {
      console.log('Drawing Sightings')
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
      this.map.canvas.node().width = this.map.bbWidth
      this.map.canvas.node().height = this.map.bbHeight
      this.map.context = this.map.canvas.node().getContext('2d')

      this.drawPoints()
    },
   
    drawPoints() {
      this.map.context.clearRect(0, 0, this.map.bbWidth, this.map.bbHeight )
      this.map.context.fillStyle = '#3C3C3C'
      this.map.context.strokeStyle = '#ffffff'

      // this.map.context.beginPath()
      // this.map.context.arc(10, 10, 4, 0, Math.PI*2, false)
      // this.map.context.fill()
      // this.map.context.stroke()

      let d
      var coords 
      for (let i = 0; i < this.sightings.length; i++) {
        d = this.sightings[i]
        coords = this.map.projection([d.longitude, d.latitude])
        this.map.context.beginPath()
        this.map.context.arc(coords[0], coords[1], 3, 0, Math.PI*2)
        this.map.context.fill()
        this.map.context.stroke()
      }
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
