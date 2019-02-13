<template>
  <div class="page page-portfolio">
    <div class="inner-container">
      <TileList></TileList>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import TileList from '@/components/TileList.vue'

export default {
  name: 'home',
  components: {
  },
  components: {
    TileList
  }
}
</script>

<style lang="scss" scoped>
.page-portfolio {
  padding-top: 64px;
}
</style>

