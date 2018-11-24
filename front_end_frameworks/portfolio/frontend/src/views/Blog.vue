<template>
  <div class="page page-blog">
    <div class="inner-container">
      <BlogList :posts="blogData"></BlogList>
    </div>
  </div>
</template>

<script>
import BlogList from '@/components/BlogList.vue'

export default {
  name: 'blog',
  computed: {
    blogData() {
      return this.$store.state.blogData;
    },
  },
  components: {
    BlogList
  }
}
</script>

<style lang="scss" scoped>
.page {
  padding-top: 64px;
}

</style>

