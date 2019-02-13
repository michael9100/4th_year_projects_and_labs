<template>
  <div class="page page-portfolio-piece">
    <div class="inner-container">
      <div class="main-img" :style="{ 'background-image' : 'url(\'' + productData.imgSrc + '\')' }">
      </div>
      <div class="left-col">
        <div class="col-inner">
          <h1>
            <span>
              {{productData.title.toLowerCase()}}
            </span>
          </h1>
          <p>
            {{productData.description}}
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
    </div>
  </div>
</template>

<script>
export default {
  name: 'portfolio-piece',
  computed: {
    productData() {
      return this.$store.state.productData[this.$route.params.id]
    },
  }
}
</script>


<style lang="scss" scoped>
.page {
  padding-top: 64px;
}
.main-img {
  width: 66.66%;
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
  max-height: 800px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: safe;
  align-content: start;
}
.main-section {
  height: 55vh;
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
    max-height: 100%;
    overflow-y: auto;
    overflow-x: hidden;
    p {
      line-height: 1.5em;
      padding-bottom: 2em;
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
    padding: 10px 20px;
  }
}
// .img-thumbs-container {
//   width: 100%;
//   flex-direction: row;
// 	flex-wrap: wrap;
// 	justify-content: flex-start;
// 	align-items: stretch;
// 	align-content: flex-start;
//   margin: 1em 0;

//   img {
//     max-width: 100%;
//     height: auto;
//   }
//   .slide-img-container {
//     height: 200px;
//     background-position: center;
//     background-size: cover;
//     background-repeat: no-repeat;
//   }
// }

@media only screen and (max-width: 800px) {
  .main-section {
    height: unset;
  }
  .inner-container {
    flex-direction: column;
    justify-content: unset;
    flex-wrap: unset;
    height: unset;
    max-height: unset;

    .main-img {
      width: 100%;
      height: 20vh;
    }
    .left-col {
      width: 100%;
      height: unset;
      padding-bottom: 40px;

      .col-inner {
        p {
          line-height: 1.5em;
          padding-bottom: 1em;
        }
      }
    }
  }
}
</style>
