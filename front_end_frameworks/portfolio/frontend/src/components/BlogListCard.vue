<template>
  <div class="blog-card" :style="{ 'background-image' : 'url(\'' + post.featuredImg + '\')' }">
    <!-- {{post}} -->
    <div class="header">
      <span></span>
      <div>Blog Post #{{number + 1}}</div>
    </div>
    <div class="image-overlay">
      <p class="title">{{post.title}}</p>
      <p class="text-excert">{{post.content}}</p>
    </div>
    <div class="footer">
      <div>23-06-2010</div>
      <!-- <a href="#">Read Post</a> -->
    </div>
  </div>
</template>

<script>
export default {
  name: 'blog-post',
  props: ['post', 'number'],
  data() {
    return {
    }
  }
}
</script>

<style lang="scss" scoped>
.blog-card {
  height: 350px;
  box-shadow: 0px 4px 38px -15px #696969;
  overflow: hidden;
  margin: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  background-position: center;
  background-size: cover;
  transition: all ease 0.2s;

  &:hover {
    transform: translateY(-2px);
    text-decoration: none;
    box-shadow: 0px 2px 38px -8px #7d7d7d;
    cursor: pointer;
  }

  .header {
    height: 25px;
    width: 100%;
    background-color: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: var(--text-lighter);
    padding: 0 10px;
    font-size: 12px;

    span {
      width: 7px;
      height: 7px;
      background-color: #ff5e57;
      display: inline-block;
      border-radius: 50%;
      box-shadow: 15px 0 0 #ffbd35, 30px 0 0 #01cc4c;
    }
  }

  .image-overlay {
    background-color: #fff;
    text-align: center;
    padding: .6em .8em;
    color: var(--text-light);
    box-shadow: 0px 0px 40px -10px #464646;

    .text-excert {
      margin-top: 10px;
      font-size: 12px;
      width: 250px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }

  .footer {
    font-size: 14px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 5px 20px;
    background-color: #fff;
    color: var(--text-lighter);
    box-shadow: 0px 4px 38px 0px #696969;

    a {
      font-variant: unset;
      color: var(--orange);
      border: 1px solid var(--orange);
      box-shadow: 0px 1px 1px -5px #000000e0;
      transition: all ease 0.2s;

      &:hover {
        text-decoration: none;
        box-shadow: 0px 2px 10px -4px #000000e0;
      }
    }
  }
}
</style>
