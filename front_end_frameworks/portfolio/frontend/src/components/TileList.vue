<template>
  <ul>
    <li v-for="(img, i) in imgs" :key="i">
      <router-link :to='`${$router.currentRoute.name}/${i}`'> 
        <div
          class="portfolio-image" 
          :style="{ 'background-image' : 'url(\'' + img.imgSrc + '\')' }"
        >
        </div>
        <div class="hover-title">
          {{img.title.toLowerCase()}}
        </div>
      </router-link>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'TileList',
  props: ['imgs'],
  data() {
    return {
    }
  },
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
    overflow: hidden;
    position: relative;
    font-size: 12px;

    a {
      padding: 0;
    }

    .hover-title {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      padding: 0.5em 0 0.7em;
      background-color: var(--orange);
      transform: translateY(100%);
      transition: all 0.5s ease;
      text-align: center;
      font-size: 1.6em;
      font-variant: small-caps;
      opacity: 0;
      color: var(--text-light);
    }

    &:hover {
      .hover-title {
        transform: translateY(0%);
        opacity: 1;
      }
    }
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
  transition: all 0.5s ease;

  &:hover {
    transform: scale(1.1);
  }
}

@media only screen and (max-width: 1800px) {
  ul {
    li {
      width: 12.5%;
      font-size: 12px;
    }
  }
}
@media only screen and (max-width: 1600px) {
  ul {
    li {
      width: 16.66%;
      font-size: 12px;
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
      font-size: 14px;
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
