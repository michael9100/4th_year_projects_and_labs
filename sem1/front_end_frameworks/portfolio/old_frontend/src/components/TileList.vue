<template>
  <ul class="tile-list row">
    <li class="col" v-for="(tile, index) in tiles">
      <div :id="index" class="item" @mouseover="onHover">
        <h3 class="name animated bounce">
          <span>
            Name
          </span>
        </h3>
      </div>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'TileList',
  data() {
    return {
      tiles: [
        { test: true },
        { test: true },
        { test: true },
        { test: true },
        { test: true },
        { test: true },
        { test: true },
        { test: true },
        { test: true },
        { test: true },
        { test: true },
        { test: true },
        { test: true },
        { test: true },
        { test: true },
        { test: true },
        { test: true },
        { test: true },
        { test: true },
        { test: true },
        { test: true },
        { test: true },
        { test: true },
        { test: true },
        { test: true },
      ]
    }
  },
  methods: {
    onHover: (e) => {
      console.log(e.target.firstChild)

    }
  }
}
</script>

<style lang="scss" scoped>
.row {
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	justify-content: space-between;
	align-items: center;
	align-content: flex-start;
}
.col {
  min-width: 33.3333%;
  padding: 0;
}

.item {
  min-height: 200px;
  background-image: url(~@/assets/laptop.jpg);
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  position: relative;
}
a {
  all: unset;
}

.name {
  // display: none;
  // visibility: hidden;
  position: absolute;
  color: var(--text-light);
  width: 100%;
  background-color: #ffffffc2;
  bottom: 0;
  margin: 0;
  top:  0;
  font-size: 3em;

  span {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
  }
}

</style>
