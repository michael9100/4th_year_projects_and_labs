<template>
  <div class="page page-portfolio-piece">
    <div class="inner-container">
      <div class="main-img" :style="{ 'background-image' : 'url(\'' + portfolioData.imgSrc + '\')' }">
      </div>
      <div class="left-col">
        <div class="col-inner">
          <h1>
            <span>
              {{portfolioData.title.toLowerCase()}}
            </span>
          </h1>
          <p>
            {{portfolioData.description}}
          </p>
        </div>
        <div class="links-container">
          <a href="https://github.com/MichaelWebCork" target="_blank" class="btn btn-round" >
            <v-icon name="github"></v-icon>
          </a>
          <a href="https://www.facebook.com/MichaelWebCork/" target="_blank" class="btn btn-round" >
            <v-icon name="facebook"></v-icon>
          </a>
          <a href="https://www.instagram.com/michaelwebcork/" target="_blank" class="btn btn-round" >
            <v-icon name="instagram"></v-icon>
          </a>
        </div>
      </div>
      <div v-if="portfolioData.imgs" class="img-thumbs-container">
        <!-- <img v-for="(img, i) in portfolioData.imgs" :key="i" :src="img.thumb" alt="">         -->
        <carousel :navigationEnabled="false" :perPage="3">
          <slide v-for="(img, i) in portfolioData.imgs" :key="i" :src="img.thumb">
            <!-- <img :src="img.thumb" alt="">     -->
            <div class="slide-img-container"
              :class="`${i}`" 
              @click="openLightBox"
              :style="{ 'background-image' : 'url(\'' + img.thumb + '\')' }">
            </div>
          </slide>
        </carousel>
        <LightBox
          ref="lightbox"
          :showLightBox="false"
          :images="portfolioData.imgs"
          :showThumbs="true"
          :showCaption="false"
        ></LightBox>
      </div>
    </div>
  </div>
</template>

<script>
import LightBox from 'vue-image-lightbox'
import { Carousel, Slide } from 'vue-carousel';

export default {
  name: 'portfolio-piece',
  components: {
    LightBox,
    Carousel,
    Slide
  },
  computed: {
    portfolioData() {
      return this.$store.state.portfolioData[this.$route.params.id]
    },
  },
  methods: {
    openLightBox(e) {
      window.event.cancelBubble = true;
      this.$refs.lightbox.showImage(parseInt(e.target.classList[1]))
    }
  }
}
</script>

<style lang="scss" scoped>
.page {
  padding-top: 64px;
}
.main-img {
  width: 66.66%;
  height: 55%;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  position: relative;
  font-size: 2em;
  display: inline-block;
}
.inner-container {
  margin: 0 auto;
  max-width: 1600px;
  height: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: safe;
  align-content: start;
}
.left-col {
  padding: 0 20px;
  display: inline-block;
  width: 33.33%;
  height: 55%;
  display: inline-flex;
	flex-direction: column;
	flex-wrap: nowrap;
	justify-content: center;
	align-items: center;
  align-content: center;
  position: relative;
  
  
  .col-inner {
    top: 50%;
    width: 100%;
    // transform: translateY(-50%);
    p {
      line-height: 1.5em;
    }
  }

  h1 {
    font-size: 40px;
    font-family: 'Assistant', sans-serif;
    margin: 0 0 .7em; 

    span {
      color : var(--text-dark);
      text-decoration: none;
      position: relative;
      font-variant: small-caps;

      &::after {
        content: "";
        position: absolute;
        width: 100%;
        background: var(--orange);
        left: -6px;
        bottom: 0;
        height: 0.6em;
        z-index: -1;
        text-shadow: none;
      }
    }
  }

  .links-container {
    bottom: 0;
    position: absolute;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: space-between;
    align-items: center;
    align-content: stretch;
    width: 100%;
    padding: 0 20px;
  }
}
.img-thumbs-container {
  width: 100%;
  flex-direction: row;
	flex-wrap: wrap;
	justify-content: flex-start;
	align-items: stretch;
	align-content: flex-start;
  // padding: 0 20px;
  margin: 1em 0;

  img {
    max-width: 100%;
    height: auto;
  }
  .slide-img-container {
    height: 200px;
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
  }
}

@media only screen and (max-width: 800px) {
  .inner-container {
    flex-direction: column;
    justify-content: unset;
    
    .main-img {
      width: 100%;
      height: 20%;
    }
    .left-col {
      width: 100%;
      height: unset;
      padding-bottom: 40px;
    }
  }
}
</style>

