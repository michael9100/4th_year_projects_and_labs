<template>
  <div class="page page-contact">
    <div class="bg-color"></div>
    <div class="bg-image"></div>
    <div class="inner-container">
      <form action="https://formspree.io/m.oconnell56@yahoo.ie" method="POST">
        <!-- <input type="hidden" name="_next" value="https://site.io/thanks.html"> -->
        <input type="text" name="_gotcha" style="display:none">
        <input type="hidden" name="_subject">
        <input v-model="fullName" type="text" name="name" class="inputFields" placeholder="Full Name" @blur="isFormComplete" @input="isFormComplete">
        <input v-model="email" type="email" name="_replyto" class="inputFields" placeholder="examle@example.com" @blur="isFormComplete" @input="isFormComplete">
        <textarea v-model="message" class="inputFields" placeholder="Write a message here..." @blur="isFormComplete" @input="isFormComplete"></textarea>
        <input type="submit" value="Send" :disabled="!allowSend">
      </form>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'contact',
  data () {
    return {
      allowSend: false,
      fullName: null,
      email: null,
      message: null,
    }
  },
  methods: {
    isFormComplete() {
      if (this.fullName != null && this.email != null && this.message != null) {
        this.allowSend = true
      }
      else {
        this.allowSend = false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.page {
  padding-top: 64px;
  .inner-container {
    max-width: 780px;
    display: flex;
    align-items: center;
  }
}
.bg-color {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgb(46, 46, 46);
  z-index: -1;
}
.bg-image {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-image: url('https://images.unsplash.com/photo-1512236258305-32fb110fdb01?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=2bbf239f0c4c6280940051d7f4b2e2d6&auto=format&fit=crop&w=1353&q=80');
  background-size: cover;
  background-position: center;
  z-index: -1;
  opacity: .5;
}

form {
  width: 100%;
  display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	justify-content: space-between;
	align-items: stretch;
	align-content: stretch;
}

.inputFields {
  margin: 15px 0;
  font-size: 16px;
  padding: 10px;
  // margin: 0 10px;
  width: 250px;
  border: 1px solid var(--orange);
  border-top: none;
  border-left: none;
  border-right: none;
  background: rgba(20, 20, 20, .2);
  color: #d6d6d6;  
  outline: none;
  width: 49%;

  &::placeholder { /* Chrome, Firefox, Opera, Safari 10.1+ */
    color: #d6d6d6;
    opacity: 1; /* Firefox */
  }
}
textarea.inputFields {
  width: 100%;
  min-height: 200px;
}
input[type="submit"] {
  margin: 15px 0;
  font-size: 16px;
  padding: 10px;
  width: 250px;
  border: 1px solid var(--orange);
  background: rgba(20, 20, 20, .2);
  color: #d6d6d6;  
  outline: none;
  width: 29%;
  margin-left: auto;
  transition: all .5s;

  &:disabled {
    opacity: .5;
    &:hover {
      width: 29%;
    }
  }

  &:hover {
    width: 30%;
  }
}

@media  only screen and (max-width: 560px) {
  form {
    flex-direction: column;
    .inputFields {
      width: 100%;
    }
    input[type="submit"] {
      width: 100%;
      &:hover {
        width: 100%;
      }
    }
  }
}
</style>

