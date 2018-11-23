<template>
  <div class="page-products">
    <div class="inner-container">
      <TileList :imgs="productData"></TileList>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import TileList from '@/components/TileList.vue'

export default {
  name: 'products',
  computed: {
    productData() {
      return this.$store.state.productData;
    },
  },
  components: {
    TileList
  }
}
</script>

<style lang="scss" scoped>
.page-products {
  padding-top: 64px;
}
</style>

