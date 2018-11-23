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
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'portfolio-piece',
  computed: {
    portfolioData() {
      return this.$store.state.portfolioData[this.$route.params.id]
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
  flex-wrap: nowrap;
  justify-content: center;
  align-items: safe;
  align-content: center;
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
  
  .col-inner {
    top: 50%;
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
}
</style>

