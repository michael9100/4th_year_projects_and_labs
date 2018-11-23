import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    portfolioData: [
      {
        imgSrc: 'https://cdn.uconnectlabs.com/wp-content/uploads/sites/5/2017/12/20170301155447.jpg',
        title: 'Example Project',
        description: `It is a long established fact that a reader will be distracted by the readable 
        content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a 
        re-or-less normal distribution of letters, as opposed to using 'Content here, content here', 
        making it look like readable English. Many desktop publishing packages and web page editors 
        now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover 
        many web sites still in their infancy. Various versions have evolved over the years, sometimes
        by accident, sometimes on purpose (injected humour and the like).`
      },
      {
        imgSrc: 'https://www.webdigify.com/wp-content/uploads/2018/08/banner-03-1-1-1.jpg',
        title: 'Web Design',
        description: `It is a long established fact that a reader will be distracted by the readable 
        content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a 
        re-or-less normal distribution of letters, as opposed to using 'Content here, content here', 
        making it look like readable English. Many desktop publishing packages and web page editors 
        now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover 
        many web sites still in their infancy. Various versions have evolved over the years, sometimes
        by accident, sometimes on purpose (injected humour and the like).`
      },
      {
        imgSrc: 'https://www.francoisrouault.com/wp-content/themes/portfolio/img/ordinateur_developpement.jpg',
        title: 'A Web Site I Made',
        description: `It is a long established fact that a reader will be distracted by the readable 
        content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a 
        re-or-less normal distribution of letters, as opposed to using 'Content here, content here', 
        making it look like readable English. Many desktop publishing packages and web page editors 
        now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover 
        many web sites still in their infancy. Various versions have evolved over the years, sometimes
        by accident, sometimes on purpose (injected humour and the like).`
      },
      {
        imgSrc: 'http://blog.infokings.com.br/wp-content/uploads/2018/03/wordpress-1600x800.jpg',
        title: 'Heres a Test',
        description: `It is a long established fact that a reader will be distracted by the readable 
        content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a 
        re-or-less normal distribution of letters, as opposed to using 'Content here, content here', 
        making it look like readable English. Many desktop publishing packages and web page editors 
        now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover 
        many web sites still in their infancy. Various versions have evolved over the years, sometimes
        by accident, sometimes on purpose (injected humour and the like).`
      },
      {
        imgSrc: 'https://www.imore.com/sites/imore.com/files/styles/xlarge_wm_blw/public/field/image/2017/07/safari-macos-high-sierra-customize-website-options.jpg?itok=ejy3XY_B',
        title: 'Woo Hoo',
        description: `It is a long established fact that a reader will be distracted by the readable 
        content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a 
        re-or-less normal distribution of letters, as opposed to using 'Content here, content here', 
        making it look like readable English. Many desktop publishing packages and web page editors 
        now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover 
        many web sites still in their infancy. Various versions have evolved over the years, sometimes
        by accident, sometimes on purpose (injected humour and the like).`
      },
      {
        imgSrc: 'https://www.marketingdonut.co.uk/sites/default/files/how-my-content-rich-website-bringing-more-business288954107.jpg',
        title: 'I\'m very tired',
        description: `It is a long established fact that a reader will be distracted by the readable 
        content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a 
        re-or-less normal distribution of letters, as opposed to using 'Content here, content here', 
        making it look like readable English. Many desktop publishing packages and web page editors 
        now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover 
        many web sites still in their infancy. Various versions have evolved over the years, sometimes
        by accident, sometimes on purpose (injected humour and the like).`
      },
    ],
    productData: [
      {
        imgSrc: 'http://www.michaelwebcork.com/wp-content/uploads/2017/08/portfolio_image_apps.png',
        title: 'A Web Site I Made',
        description: `It is a long established fact that a reader will be distracted by the readable 
        content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a 
        re-or-less normal distribution of letters, as opposed to using 'Content here, content here', 
        making it look like readable English. Many desktop publishing packages and web page editors 
        now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover 
        many web sites still in their infancy. Various versions have evolved over the years, sometimes
        by accident, sometimes on purpose (injected humour and the like).`
      },
      {
        imgSrc: 'https://www.sketchappsources.com/resources/source-image/fun-ui-kit-planetabhi.png',
        title: 'UI Kit',
        description: `It is a long established fact that a reader will be distracted by the readable 
        content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a 
        re-or-less normal distribution of letters, as opposed to using 'Content here, content here', 
        making it look like readable English. Many desktop publishing packages and web page editors 
        now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover 
        many web sites still in their infancy. Various versions have evolved over the years, sometimes
        by accident, sometimes on purpose (injected humour and the like).`
      },
      {
        imgSrc: 'https://cdn.dribbble.com/users/240391/screenshots/3524788/hui-sumup.png',
        title: 'Mobile UI Kit',
        description: `It is a long established fact that a reader will be distracted by the readable 
        content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a 
        re-or-less normal distribution of letters, as opposed to using 'Content here, content here', 
        making it look like readable English. Many desktop publishing packages and web page editors 
        now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover 
        many web sites still in their infancy. Various versions have evolved over the years, sometimes
        by accident, sometimes on purpose (injected humour and the like).`
      },
      {
        imgSrc: 'https://cdn.dribbble.com/users/997070/screenshots/3892001/creative_morning_-_redesign.png',
        title: 'Dashboard',
        description: `It is a long established fact that a reader will be distracted by the readable 
        content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a 
        re-or-less normal distribution of letters, as opposed to using 'Content here, content here', 
        making it look like readable English. Many desktop publishing packages and web page editors 
        now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover 
        many web sites still in their infancy. Various versions have evolved over the years, sometimes
        by accident, sometimes on purpose (injected humour and the like).`
      },
      {
        imgSrc: 'http://www.michaelwebcork.com/wp-content/uploads/2017/04/factotem-website-image-1.jpg',
        title: 'Factotem',
        description: `It is a long established fact that a reader will be distracted by the readable 
        content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a 
        re-or-less normal distribution of letters, as opposed to using 'Content here, content here', 
        making it look like readable English. Many desktop publishing packages and web page editors 
        now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover 
        many web sites still in their infancy. Various versions have evolved over the years, sometimes
        by accident, sometimes on purpose (injected humour and the like).`
      },
      {
        imgSrc: 'http://www.michaelwebcork.com/wp-content/uploads/2016/08/Music-Camp.jpg',
        title: 'Music School Posters',
        description: `It is a long established fact that a reader will be distracted by the readable 
        content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a 
        re-or-less normal distribution of letters, as opposed to using 'Content here, content here', 
        making it look like readable English. Many desktop publishing packages and web page editors 
        now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover 
        many web sites still in their infancy. Various versions have evolved over the years, sometimes
        by accident, sometimes on purpose (injected humour and the like).`
      },
      {
        imgSrc: 'http://www.michaelwebcork.com/wp-content/uploads/2016/08/mockup_air.png',
        title: 'Joanna Kiley Blog',
        description: `It is a long established fact that a reader will be distracted by the readable 
        content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a 
        re-or-less normal distribution of letters, as opposed to using 'Content here, content here', 
        making it look like readable English. Many desktop publishing packages and web page editors 
        now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover 
        many web sites still in their infancy. Various versions have evolved over the years, sometimes
        by accident, sometimes on purpose (injected humour and the like).`
      },
      {
        imgSrc: 'http://www.michaelwebcork.com/wp-content/uploads/2017/08/11079578_908651735866304_4232578166569201988_o.jpg',
        title: 'The Shepheard Team',
        description: `It is a long established fact that a reader will be distracted by the readable 
        content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a 
        re-or-less normal distribution of letters, as opposed to using 'Content here, content here', 
        making it look like readable English. Many desktop publishing packages and web page editors 
        now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover 
        many web sites still in their infancy. Various versions have evolved over the years, sometimes
        by accident, sometimes on purpose (injected humour and the like).`
      },
      {
        imgSrc: 'http://www.michaelwebcork.com/wp-content/uploads/2017/08/Dawn-of-Music-Bus-Stop-Ad.jpg',
        title: 'Dawn of Music',
        description: `It is a long established fact that a reader will be distracted by the readable 
        content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a 
        re-or-less normal distribution of letters, as opposed to using 'Content here, content here', 
        making it look like readable English. Many desktop publishing packages and web page editors 
        now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover 
        many web sites still in their infancy. Various versions have evolved over the years, sometimes
        by accident, sometimes on purpose (injected humour and the like).`
      },
    ],
  },
  mutations: {

  },
  actions: {

  }
})
