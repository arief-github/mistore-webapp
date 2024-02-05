<template>
  <main class="c-main">
    <div class="container-fluid">
      <div class="fade-in">
        <div class="row">
          <div class="col-md-12">
            <div class="card border-0 rounded shadow-sm border-top-orange">
              <div class="card-header">
                <span class="font-weight-bold">
                  <i class="fa fa-folder"></i> CATEGORIES
                </span>
              </div>
              <div class="card-body">
                <div class="form-group">
                  <div class="input-group mb-3">
                    <div class="input-group-prepend">
                      <nuxt-link :to="{name: 'admin-categories-create'}" class="btn btn-warning btn-sm" style="padding-top: 10px;">
                        <i class="fa fa-plus-circle"></i> ADD NEW
                      </nuxt-link>
                    </div>
                    <input type="text" v-model="search" @keypress.enter="searchData" class="form-control" placeholder="cari berdasarkan nama category">
                    <div class="input-group-append">
                      <button class="btn btn-warning" @click="searchData">
                        <i class="fa fa-search"></i>SEARCH
                      </button>
                    </div>
                  </div>
                </div>
                <b-table striped bordered hover :items="categories.data" :fields="fields" show-empty>
                  <template v-slot:cell(image)="data">
                    <img :src="data.item.image" class="img-fluid" width="50" alt="category image" />
                  </template>
                </b-table>
                <b-pagination align="right" :total-rows="categories.total" :value="categories.current_page" :per-page="categories.per_page" @change="changePage" aria-controls="my-table"></b-pagination>
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
      title: 'Categories - Administrator'
    }
  },
  data() {
    return {
      fields: [
        {
          label: "Image",
          key: "image",
          tdClass: 'text-center'
        },
        {
          label: 'Category Name',
          key: 'name'
        },
        {
          label: 'Actions',
          key: 'actions',
          tdClass: 'text-center'
        }
      ],
      search: ''
    }
  },
  async asyncData({ store }) {
    await store.dispatch('admin/category/getCategoriesData')
  },
  computed: {
    categories() {
      return this.$store.state.admin.category.categories
    }
  },
  methods: {
    searchData() {
      // commit to mutation SET_PAGE
      this.$store.commit('admin/category/SET_PAGE', 1);

      //dispatch on action "getCategoriesData"
      this.$store.dispatch('admin/category/getCategoriesData', this.search);
    },
    changePage(page) {
      // commit to mutation SET_PAGE based on params page
      this.$store.commit('admin/category/SET_PAGE',page);

      // dispatch on action "getCategoriesData"
      this.$store.dispatch('admin/category/getCategoriesData', this.search);
    }
  }
}
</script>

<style scoped>

</style>
