<template>
  <div>

  </div>
</template>

<script>
import JQuery from 'jquery'
// import words from '../words'
var words = require('../words.json')
const $ = JQuery

$( document ).ready(function() {
  console.log(words)
});


export default {
  name: 'home',
  components: {
  }
}
</script>
