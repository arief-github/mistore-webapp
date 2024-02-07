<template>
    <main class="c-main">
      <div class="container-fluid">
        <div class="fade-in">
          <div class="row">
            <div class="col-md-12">
              <div class="card border-0 rounded shadow-sm border-top-orange">
                <div class="card-header">
                  <span class="font-weight-bold">
                    <i class="fa fa-folder"></i> EDIT CATEGORY
                  </span>
                </div>
                <div class="card-body">
                  <form @submit.prevent="updateCategory">
                    <div class="form-group">
                      <label>GAMBAR</label>
                      <input type="file" @change="handleFileChange" class="form-control">
                      <div v-if="validation.image" class="mt-2">
                        <b-alert show variant="danger">{{ validation.image[0] }}</b-alert>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-md-6">
                        <div class="form-group">
                          <label>NAMA KATEGORI</label>
                          <input type="text" v-model="category.name" placeholder="Masukkan Nama Kategori" class="form-control">
                          <div v-if="validation.name" class="mt-2">
                            <b-alert show variant="danger">{{ validation.name[0] }}</b-alert>
                          </div>
                        </div>
                      </div>
                    </div>
                    <button class="btn btn-info mr-1 btn-submit" type="submit">
                      <i class="fa fa-paper-plane"></i> SAVE
                    </button>
                    <button class="btn btn-warning btn-reset" type="reset">
                      <i class="fa fa-redo"></i> RESET
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
      title: 'Edit Category - Administrator'
    }
  },
  data() {
    return {
      category: {
        image: '',
        name: ''
      },
      validation: []
    }
  },
  async asyncData({ store, route }) {
    await store.dispatch('admin/category/getCategoriesData');

    await store.dispatch('admin/category/getDetailCategory', route.params.id);
  },
  mounted() {
    this.category.name = this.$store.state.admin.category.category.name;
  },
  methods: {
    // handle file upload
    handleFileChange(e) {
      // get image
      let image = this.category.image = e.target.files[0];

      // check file type
      if(!image.type.match('image.*')) {
        // if fileType not allowed, then clear value and set null
        e.target.value = '';

        //set state "product.image" to null
        this.product.image = null;

        //show sweet alert
        this.$swal.fire({
          title: 'OOPS!',
          text: "Format File Tidak Didukung",
          icon: "error",
          showConfirmButton: false,
          timer: 2000
        })
      }
    },
    async updateCategory() {
      let formData = new FormData();

      formData.append('image', this.category.image);
      formData.append('name', this.category.name);
      formData.append("_method", "PATCH");

      // sending data to action updateCategory vuex
      this.$store.dispatch('admin/category/updateCategory', {
        categoryId: this.$route.params.id,
        payload: formData
      })
        .then(() => {
          this.$swal.fire({
            title: 'Berhasil',
            text: 'Data Berhasil Di Edit!',
            icon: 'success',
            showConfirmButton: false,
            timer: 2000
          })

          //redirect to previous page
          this.$router.push({
            name: 'admin-categories'
          })
        })
        .catch(error => {
          this.validation = error.response.data
        })
    }
  }
}
</script>

<style scoped>

</style>
