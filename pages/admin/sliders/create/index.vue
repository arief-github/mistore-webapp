<template>
  <main class="c-main">
    <div class="container-fluid">
      <div class="fade-in">
        <div class="row">
          <div class="col-md-12">
            <div class="card border-0 rounded shadow-sm border-top-orange">
              <div class="card-header">
                <div class="font-weight-bold">
                  <i class="fa fa-folder"></i> ADD NEW SLIDER
                </div>
              </div>
              <div class="card-body">
                <form @submit.prevent="storeSlider">
                  <div class="form-group">
                    <label>GAMBAR</label>
                    <input type="file" @change="handleFileChange" class="form-control">
                    <div v-if="validation.image" class="mt-2">
                      <b-alert show variant="danger">
                        {{ validation.image[0] }}
                      </b-alert>
                    </div>
                  </div>
                  <div class="form-group">
                    <label>Link</label>
                    <input type="text" v-model="slider.link" placeholder="Masukkan Link Slider" class="form-control">
                    <div v-if="validation.link" class="mt-2">
                      <b-alert show variant="danger">
                        {{ validation.link[0] }}
                      </b-alert>
                    </div>
                  </div>
                  <button class="btn btn-info mr-1 btn-submit">
                    <i class="fa fa-paper-plane"></i>SAVE
                  </button>
                  <button class="btn btn-warning mr-1 btn-reset">
                    <i class="fa fa-redo"></i>RESET
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  layout: 'admin',
  head() {
    return {
      title: "Add Slider - Administrator"
    }
  },
  data() {
    return {
      slider: {
        image: '',
        link: ''
      },
      validation: []
    }
  },
  async asyncData({ store }) {
    // get list all users
    await store.dispatch("admin/slider/getSlidersData");
  },
  computed: {
    sliders() {
      return this.$store.state.admin.slider.sliders
    }
  },
  methods: {
    handleFileChange(e) {
      // get image
      let image = this.slider.image = e.target.files[0];

      // check file type of image
      if (image && !image.type.match('image.*')) {
        // if fileType not allowed then clear value and set null
        e.target.value = '';

        // also set state slider.image to null
        this.slider.image = null;

        // show error format file not supported with swal
        this.$swal.fire({
          title: 'OOPS!',
          text: "Format File Tidak Didukung!",
          icon: 'error',
          showConfirmButton: false,
          timer: 2000
        });
      }
    },
    async storeSlider() {
      let formData = new FormData();

      formData.append('image', this.slider.image);
      formData.append('link', this.slider.link);

      // sending data to "storeSlider" vuex
      await this.$store.dispatch('admin/slider/storeSlider', formData)
        .then(() => {
          this.$swal.fire({
            title: 'Berhasil!',
            text: 'Data Berhasil Disimpan!',
            icon: 'success',
            showConfirmButton: false,
            timer: 2000
          })

          // redirect to route "admin-sliders"
          this.$router.push({
            name: 'admin-sliders'
          });
        })
        .catch(error => {
          this.validation = error.response.data;
        })
    }
  }
}
</script>

<style scoped>

</style>
