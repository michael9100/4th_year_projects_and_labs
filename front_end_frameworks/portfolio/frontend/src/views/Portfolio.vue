<template slot-scope="props">
  <div class="page page-portfolio">
    <div class="inner-container">
      <TileList :imgs="imgs"></TileList>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import TileList from '@/components/TileList.vue'

export default {
  name: 'portfolio',
  data() {
    return {
      imgs: [
        {
          imgSrc: 'https://cdn.uconnectlabs.com/wp-content/uploads/sites/5/2017/12/20170301155447.jpg',
          title: 'Example Project'
        },
        {
          imgSrc: 'https://www.webdigify.com/wp-content/uploads/2018/08/banner-03-1-1-1.jpg',
          title: 'Web Design'
        },
        {
          imgSrc: 'https://www.francoisrouault.com/wp-content/themes/portfolio/img/ordinateur_developpement.jpg',
          title: 'A Web Site I Made'
        },
        {
          imgSrc: 'http://blog.infokings.com.br/wp-content/uploads/2018/03/wordpress-1600x800.jpg',
          title: 'Heres a Test'
        },
        {
          imgSrc: 'https://www.imore.com/sites/imore.com/files/styles/xlarge_wm_blw/public/field/image/2017/07/safari-macos-high-sierra-customize-website-options.jpg?itok=ejy3XY_B',
          title: 'Woo Hoo'
        },
        {
          imgSrc: 'https://www.marketingdonut.co.uk/sites/default/files/how-my-content-rich-website-bringing-more-business288954107.jpg',
          title: 'I\'m very tired'
        },
      ],
    }
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

