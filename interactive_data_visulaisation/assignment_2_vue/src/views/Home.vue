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
        margin: {
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        },
        countries: {},
        width: window.innerWidth,
        height: window.innerHeight,
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
  created() {
    this.initD3()
  },
  methods: {
    initD3() {
      this.countries = topojson.feature(mapData, mapData.objects.countries1).features
      this.sightings = ufoData

      let svg = d3.select('#map')
        .append('svg')
        .attr("width", "100%")
        .attr("height", "100%")
        .call(d3.zoom().on("zoom", function () {
          svg.attr("transform", d3.event.transform)
          zoomSightings()
        }))
        .append('g')
        .attr('transform', 'translate(' + this.map.margin.left + ',' + this.map.margin.top + ')')

      let projection = d3.geoMercator()
        .translate([this.map.width / 2, this.map.height / 2])
        .scale(300)
        
      var path = d3.geoPath().projection(projection)


      svg.selectAll('.country')
        .data(this.countries)
        .enter().append('path')
        .attr('class', 'country')
        .attr('d', path)

      svg.selectAll('.sightings')
        .data(this.sightings)
        .enter().append('circle')
        .attr('fill', this.colors.black)
        .attr('class', function(d) { return "point " + d.shape })
        .attr('data-type', function(d) { return d.shape })      
        .attr('data-city', function(d) { return d.city })      
        .attr('data-country', function(d) { return d.country })      
        .attr('data-duration', function(d) { return d.duration_h_m })      
        .attr('data-datetime', function(d) { return d.datetime }) 
        .attr('data-date', function(d) { return moment(d.datetime).year() })     
        .attr('r', 1.5)
        .attr('cx', (c) => {
          var coords = projection([c.longitude, c.latitude])
          return coords[0]
        })
        .attr('cy', (c) => {
          var coords = projection([c.longitude, c.latitude])
          return coords[1]
        })
        // .on("click", clickPoint)
        // .on("mouseout", leavePoint);

      console.log(svg)
      
    }
  }
}
</script>

<style lang="scss" scoped>
#map {
  height: 100vh;
  width: 100vw;
}
</style>
