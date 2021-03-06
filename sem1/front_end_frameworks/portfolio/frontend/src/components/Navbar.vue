<template>
  <nav class="nav">
    <div class="container inner-container">
      <div class="hamburger" @click='toggle()' :class="{'menu-open': menuOpen}">
        <span></span>
        <span></span>
        <span></span>
      </div>    
      <div class="items" @click='toggle()' :class="{'menu-open': menuOpen}">
        <router-link v-for="(page, index) in pages" :key="index" :to='page.link'>
          <span>
            {{page.name}}
          </span>
        </router-link>
      </div>
      <a v-if="!menuOpen" id="current-page">
        <span v-if="showRouteName">
          {{this.$router.currentRoute.name}}
        </span>
        <span v-else @click="$router.push('\/' + parentPage)" class="back-to">
          back to {{parentPage}}
        </span>
      </a>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Nav',
  data() {
    return {
      menuOpen: false,
      showRouteName: true,
      parentPage: '',
      pages: [
        { link: '/', name: 'home' },
        { link: '/portfolio', name: 'portfolio' },
        { link: '/products', name: 'products' },
        // { link: '/workflow', name: 'workflow' },
        { link: '/blog', name: 'blog' },
        { link: '/contact', name: 'contact' },
      ]
    }
  },
  methods: {
    init: function () {
      this.showRouteName = !this.ifNestedItem()
      this.parentPage = this.compParentPage()
    },
    toggle: function() {
      this.menuOpen = !this.menuOpen
    },
    ifNestedItem: function () {
      let regex = /^(\/portfolio|\/products|\/blog)\/((?:[^\/]+?))(?:\/(?=$))?$/
      return regex.test(this.$router.currentRoute.path)
    },
    compParentPage: function () {
      var res = this.$router.currentRoute.path.split("/")
      return res[1]
    }
  },
  watch: {
    $route (to, from){
      this.showRouteName = !this.ifNestedItem()
      this.parentPage = this.compParentPage()
    }
  },
  computed: {
  },
  mounted(){
    this.init()
  }
}
</script>

<style lang="scss" scoped>
  .nav {
    width: 100%;
    background-color: #fff;
    font-size: 1.5em;
    height: 64px;

    position: absolute;
    top: 0;
    right: 0;
    z-index: 9999;

    #current-page {
      color : var(--text-lighter);
      text-decoration: none;
      display: none;
      width: 0;
      margin: 14px 20px 0 0;
      span {          
        position: relative;

        &.back-to {
          cursor: pointer;
        }

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

    .items {
      background-color: #fff;
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: space-between;
      align-items: baseline;
      align-content: center;

      a {
        padding: 20px 0;
        text-decoration: none;
        z-index: 1;
        span {          
          position: relative;
          &.is-active.router-link-active::after {
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
  
          &::after {
            content: "";
            position: absolute;
            width: 0%;
            background: var(--orange);
            left: -6px;
            bottom: 0;
            height: 0.6em;
            z-index: -1;
            text-shadow: none;
            transition: width 0.5s
          }
        }

        &:hover {
          color : var(--text-lighter);
          // text-shadow: 3px 3px rgb(102, 255, 0);
          span::after {
            width: 100%;
          }
        }

      }
      a {
        padding: 20px 0;
        text-decoration: none;
        z-index: 1;
        position: relative;
        &.is-active.router-link-active {
          ::after {
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

    .hamburger {
      width: 35px;
      height: 25px;

      position: absolute;
      top: 0;
      right: 0;
      z-index: 1;

      margin: 20px 20px 0 0;

      display: none;
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: space-between;
      align-items: baseline;
      align-content: space-between;
      
      span {
        background-color: var(--text-light);
        width: 100%;
        height: 2px;
        border-radius: 5px;
        transition-timing-function: ease;
        transition-duration: .30s;
        transition-property: transform;
      }

      &:hover {
        cursor: pointer;
        span:nth-of-type(1) {
          transform: translate3d(0px, 6px, 0) rotate(-90deg) scaleX(1);
        }
        span:nth-of-type(2) {
          transform: translate3d(6px, 5px, 0) rotate(-45deg) scaleX(0.5);
        }
        span:nth-of-type(3) {
          transform: translate3d(-6px, -6px, 0) rotate(45deg) scaleX(0.5);
        }
      }

      &.menu-open {
        cursor: pointer;
        span:nth-of-type(1) {
          transform: translate3d(0px, 6px, 0) rotate(-90deg) scaleX(1);
        }
        span:nth-of-type(2) {
          transform: translate3d(6px, -17px, 0) rotate(45deg) scaleX(0.5);
        }
        span:nth-of-type(3) {
          transform: translate3d(-6px, -28px, 0) rotate(-45deg) scaleX(0.5);
        }
      }
    }

    @media (max-width:964px){
      .items {
        margin: 0 0;
        position: absolute;
        transform: translateY(-100%);
        transition-timing-function: ease;
        transition-duration: .30s;
        transition-property: transform;
        width: 100%;
        left: 0;
        flex-direction: column;
        flex-wrap: wrap;
        justify-content: space-between;
        align-items: center;
        align-content: center;

        &.menu-open {
          transform: translateY(0%);      
        }
      }

      #current-page {
        display: inline-block;
      }

      a {
        width: 100%;
        padding: 0 0;
        text-align: center;
      }

      .hamburger {
        display: flex;
      }
    }

  }
</style>
