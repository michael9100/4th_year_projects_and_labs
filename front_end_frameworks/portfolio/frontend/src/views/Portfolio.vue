<template slot-scope="props">
  <div class="page page-portfolio">
    <div class="inner-container">
      <TileList :imgs="portfolioData"></TileList>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import TileList from '@/components/TileList.vue'

export default {
  name: 'portfolio',
  computed: {
    portfolioData() {
      return this.$store.state.portfolioData;
    },
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

