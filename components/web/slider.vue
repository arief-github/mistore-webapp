<template>
  <div class="container-fluid mt-custom">
    <div id="mycarousel" class="carousel-slide" data-ride="carouserl" data-interval="4000">
      <div class="carousel-inner">
          <div class="carousel-item" v-for="(slider, id) in sliders" :class="{active: id == 0}" :key="slider.id">
            <a :href="slider.link" target="_blank">
              <img :src="slider.image" class="d-block w-100 rounded">
            </a>
          </div>
      </div>
      <a href="#mycarousel" class="carousel-control-prev" role="button" data-slide="prev">
        <div class="banner-icons">
          <span class="fa fa-angle-left"></span>
        </div>
        <span class="sr-only">Previous</span>
      </a>
      <a href="#mycarousel" class="carousel-control-next" role="button" data-slide="next">
        <div class="banner-icons">
          <span class="fa fa-angle-right"></span>
        </div>
        <span class="sr-only">Next</span>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "slider",
  async fetch() {
    await this.$store.dispatch("web/slider/getSlidersData");
  },
  computed: {
    sliders() {
      return this.$store.state.web.slider.sliders;
    }
  }
}
</script>

<style scoped>

</style>
