<template>
  <ul>
    <li v-for="(post, i) in posts" :key="i">
      <BlogListCard :post="post" :number="i"></BlogListCard>
    </li>
  </ul>
</template>

<script>
import BlogListCard from '@/components/BlogListCard.vue'

export default {
  name: 'BlogList',
  props: ['posts'],
  data() {
    return {
    }
  },
  components: {
    BlogListCard
  }
}
</script>

<style lang="scss" scoped>
li {
  margin: 20px 0;
}
</style>
