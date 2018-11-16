<template>
  <nav class="nav">
    <div class="hamburger">
      <span></span>
      <span></span>
      <span></span>
    </div>    
    <div class="items">
      <router-link v-for="(page, index) in pages" :key="index" :to='page.link'>
        {{page.name}}
      </router-link>
    </div>
    
  </nav>
</template>

<script>
export default {
  name: 'Nav',
  data() {
    return {
      pages: [
        { link: '/', name: 'home' },
        { link: '/about', name: 'about' },
        { link: '/portfolio', name: 'portfolio' },
        { link: '/products', name: 'products' },
        { link: '/workflow', name: 'workflow' },
        { link: '/blog', name: 'blog' },
        { link: '/contact', name: 'contact' },
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
  .nav {
    width: 100vw;
    background-color: #fff;
    font-size: 1.5em;

    .items {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: space-between;
      align-items: baseline;
      align-content: center;
    }

    .hamburger {
      width: 35px;
      height: 25px;

      position: absolute;
      top: 0;
      right: 0;

      margin: 10px 10px 0 0;

      display: none;
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: space-between;
      align-items: baseline;
      align-content: space-between;
      
      span {
        background-color: var(--text-light);
        width: 100%;
        height: 4px;
        border-radius: 5px;
      }

      &:hover {
        cursor: pointer;
      }
    }

    @media (max-width:964px){
      flex-direction: column;
      flex-wrap: wrap;
      justify-content: space-between;
      align-items: center;
      align-content: center;

      .items {
        margin: -240px 0;
      }

      a {
        width: 100%;
        text-align: center;
      }

      .hamburger {
        display: flex;
      }
    }
  }
</style>
