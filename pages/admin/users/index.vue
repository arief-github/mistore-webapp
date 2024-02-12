<template>
  <main class="c-main">
    <div class="container-fluid">
      <div class="fade-in">
        <div class="row">
          <div class="col-md-12">
            <div class="card border-0 rounded shadow-sm border-top-orange">
              <div class="card-header">
                <span class="font-weight-bold">
                  <i class="fa fa-users"></i> USERS
                </span>
              </div>
              <div class="card-body">
                <div class="form-group">
                  <div class="input-group mb-3">
                    <div class="input-group-prepend">
                      <nuxt-link :to="{name: 'admin-users-create'}" class="btn btn-warning btn-sm" style="padding-top: 10px;">
                        <i class="fa fa-plus-circle"></i> ADD NEW
                      </nuxt-link>
                    </div>
                    <input type="text" v-model="search" class="form-control" placeholder="Cari berdasarkan nama user">
                    <div class="input-group-append">
                      <button class="btn btn-warning" @click="searchData">
                        <i class="fa fa-search"></i> SEARCH
                      </button>
                    </div>
                  </div>
                </div>
                <b-table striped bordered hover :items="users.data" :fields="fields" show-empty>
                  <template v-slot:cell(image)="data">
                    <img class="img-fluid" width="50" :src="data.item.image"/>
                  </template>
                  <template v-slot:cell(actions)="row">
                    <b-button :to="{name: 'admin-users-edit-id', params: {id: row.item.id}}" variant="info" size="sm">
                      EDIT
                    </b-button>
                    <b-button variant="danger" @click="destroyUser(row.item.id)" size="sm">
                      DELETE
                    </b-button>
                  </template>
                </b-table>
                <b-pagination
                  align="right"
                  :value="users.current_page"
                  :total-rows="users.total"
                  :per-page="users.per_page"
                  @change="changePage"
                  aria-controls="my-table"
                >
                </b-pagination>
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
      title: "Users - Administrator"
    }
  },
  data() {
    return {
      fields: [{
        label: 'User Name',
        key: 'name'
      }, {
        label: 'Email Address',
        key: 'email'
      }, {
        label: 'Actions',
        key: 'actions',
        tdClass: 'text-center'
      }],
      search: ""
    }
  },
  // hook asyncData
  async asyncData({ store }) {
    await store.dispatch('admin/user/getUsersData')
  },
  computed: {
    users() {
      return this.$store.state.admin.user.users
    }
  },
  methods: {
    searchData() {
      // commit to mutation SET_PAGE
      this.$store.commit('admin/user/SET_PAGE', 1);

      // dispatch to action getUsersData
      this.$store.dispatch('admin/user/getUsersData', this.search)
    },
    changePage(page) {
      // commit to mutation SET_PAGE
      this.$store.commit('admin/user/SET_PAGE', page);

      // dispatch on action getProductsData
      this.$store.dispatch('admin/user/getUsersData');
    },
    destroyUser(id) {
      this.$swal.fire({
        title: "Apakah Anda Yakin?",
        text: "Ingin menghapus Kategori ini!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "YA! HAPUS",
        cancelButtonText: "TIDAK"
      })
        .then((result) => {
          if(result.isConfirmed) {
            this.$store.dispatch('admin/user/destroyUser', id)
              .then(() => {
                this.$nuxt.refresh();

                this.$swal.fire({
                  title: "Berhasil",
                  text: 'Data User berhasil dihapus',
                  icon: 'success',
                  showConfirmButton: false,
                  timer: 2000
                })
              })
          }
        })
    }
  }
}
</script>
<style scoped>

</style>
