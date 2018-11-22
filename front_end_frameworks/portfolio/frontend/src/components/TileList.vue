<template>
  <ul>
    <li v-for="(img, i) in imgs" :key="i">
      <div
        class="portfolio-image" 
        :style="{ 'background-image' : 'url(\'' + img.imgSrc + '\')' }"
      >
      </div>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'TileList',
  data() {
    return {
      imgs: [
        {imgSrc: 'https://cdn.uconnectlabs.com/wp-content/uploads/sites/5/2017/12/20170301155447.jpg'},
        {imgSrc: 'https://www.webdigify.com/wp-content/uploads/2018/08/banner-03-1-1-1.jpg'},
        {imgSrc: 'https://www.francoisrouault.com/wp-content/themes/portfolio/img/ordinateur_developpement.jpg'},
        {imgSrc: 'http://blog.infokings.com.br/wp-content/uploads/2018/03/wordpress-1600x800.jpg'},
        {imgSrc: 'https://www.imore.com/sites/imore.com/files/styles/xlarge_wm_blw/public/field/image/2017/07/safari-macos-high-sierra-customize-website-options.jpg?itok=ejy3XY_B'},
        {imgSrc: 'https://www.marketingdonut.co.uk/sites/default/files/how-my-content-rich-website-bringing-more-business288954107.jpg'},
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
ul {
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	justify-content: space-between;
	align-items: flex-start;
	align-content: flex-start;

  li {
    width: 12.5%;
  }
}
.portfolio-image {
  // height: auto;
  width: 100%;
  padding: 40%;
  // background-image: url(~@/assets/laptop.jpg);
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
}

@media only screen and (max-width: 1800px) {
  ul {
    li {
      width: 12.5%;
    }
  }
}
@media only screen and (max-width: 1600px) {
  ul {
    li {
      width: 16.66%;
    }
  }
}
@media only screen and (max-width: 1200px) {
  ul {
    li {
      width: 20%;
    }
  }
}
@media only screen and (max-width: 1000px) {
  ul {
    li {
      width: 25%;
    }
  }
}
@media only screen and (max-width: 800px) {
  ul {
    li {
      width: 33.33%;
    }
  }
}
@media only screen and (max-width: 700px) {
  ul {
    li {
      width: 50%;
    }
  }
}
@media only screen and (max-width: 400px) {
  ul {
    li {
      width: 100%;
    }
  }
}
</style>
