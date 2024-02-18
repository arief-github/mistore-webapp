<template>
  <div>
    <Header/>
    <Nuxt/>
    <Footer/>
  </div>
</template>

<script>
import Header from "../components/web/header.vue";
import Footer from "../components/web/footer.vue";

export default {
  name: "default",
  components: {
    Header,
    Footer
  }
}
</script>

<style scoped>

</style>
