<template>
  <main class="c-main">
    <div class="container-fluid">
      <div class="fade-in">
        <div class="row">
          <div class="col-md-12">
            <div class="card border-0 rounded shadow-sm border-top-orange">
              <div class="card-header">
                <span class="font-weight-bold">
                  <i class="fa fa-users"></i> SLIDERS
                </span>
              </div>
              <div class="card-body">
                <div class="form-group">
                  <div class="input-group mb-3">
                    <div class="input-group-prepend">
                      <nuxt-link :to="{name: 'admin-sliders-create'}" class="btn btn-warning btn-sm" style="padding-top: 10px;">
                        <i class="fa fa-plus-circle"></i> ADD NEW
                      </nuxt-link>
                    </div>
                    <input type="text" v-model="search" class="form-control" placeholder="Cari berdasarkan nama slider">
                    <div class="input-group-append">
                      <button class="btn btn-warning">
                        <i class="fa fa-search"></i> SEARCH
                      </button>
                    </div>
                  </div>
                </div>
                <b-table striped bordered hover :items="sliders.data" :fields="fields" show-empty>
                  <template v-slot:cell(image)="data">
                    <img class="img-fluid" width="50" :src="data.item.image"/>
                  </template>
                  <template v-slot:cell(actions)="row">
<!--                    <b-button variant="danger" @click="destroyUser(row.item.id)" size="sm">-->
<!--                      DELETE-->
<!--                    </b-button>-->
                  </template>
                </b-table>
<!--                <b-pagination-->
<!--                  align="right"-->
<!--                  :value="users.current_page"-->
<!--                  :total-rows="users.total"-->
<!--                  :per-page="users.per_page"-->
<!--                  @change="changePage"-->
<!--                  aria-controls="my-table"-->
<!--                >-->
<!--                </b-pagination>-->
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
      title: "Sliders - Administrator"
    }
  },
  data() {
    return {
      fields: [
        {
          label: "Image",
          key: "image"
        },
        {
          label: "Link",
          key: "link"
        },
        {
          label: "Actions",
          key: "actions",
          tdClass: 'text-center'
        }
      ],
      search: ''
    }
  },
  async asyncData({ store }) {
    await store.dispatch("admin/slider/getSlidersData")
  },
  computed: {
    sliders() {
      return this.$store.state.admin.slider.sliders;
    }
  }
}
</script>

<style scoped>

</style>
