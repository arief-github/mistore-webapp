<template>
  <main class="c-main">
    <div class="container-fluid">
      <div class="fade-in">
        <div class="row">
          <div class="col-md-12">
            <div class="card border-0 rounded shadow-sm border-top-orange">
              <div class="card-header">
                <div class="font-weight-bold">
                  <i class="fa fa-folder"></i> EDIT USER
                </div>
              </div>
              <div class="card-body">
                <form @submit.prevent="updateUser">
                  <div class="row">
                    <div class="col-md-6">
                      <div class="form-group">
                        <label>FULL NAME</label>
                        <input type="text" v-model="user.name" placeholder="Masukkan Nama User" class="form-control">
                        <div v-if="validation.name" class="mt-2">
                          <b-alert show variant="danger">
                            {{ validation.name[0] }}
                          </b-alert>
                        </div>
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="form-group">
                        <label>EMAIL ADDRESS</label>
                        <input type="email" v-model="user.email" placeholder="Masukkan Alamat Email" class="form-control">
                        <div v-if="validation.email" class="mt-2">
                          <b-alert show variant="danger">
                            {{ validation.email[0] }}
                          </b-alert>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-6">
                      <div class="form-group">
                        <label>PASSWORD</label>
                        <input type="password" v-model="user.password" placeholder="Masukkan Password" class="form-control">
                        <div v-if="validation.password" class="mt-2">
                          <b-alert show variant="danger">
                            {{ validation.password[0] }}
                          </b-alert>
                        </div>
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="form-group">
                        <label>PASSWORD CONFIRMATION</label>
                        <input type="password" v-model="user.password_confirmation" placeholder="Masukkan Ulang Password" class="form-control">
                        <div v-if="validation.password_confirmation" class="mt-2">
                          <b-alert show variant="danger">
                            {{ validation.password_confirmation[0] }}
                          </b-alert>
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
      title: 'Edit User - Administrator'
    }
  },
  data() {
    return {
      user: {
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
      },
      validation: []
    }
  },
  async asyncData({ store, route }) {
    await store.dispatch("admin/user/getUsersData");

    await store.dispatch('admin/user/getDetailUser', route.params.id);
  },
  mounted() {
    this.user.name = this.$store.state.admin.user.user.name;
    this.user.email = this.$store.state.admin.user.user.email;
    this.user.password = this.$store.state.admin.user.user.password;
    this.user.password_confirmation = this.$store.state.admin.user.user.password_confirmation;
  },
  methods: {
    async updateUser() {
      let formData = new FormData();

      formData.append("name", this.user.name);
      formData.append("email", this.user.email);
      formData.append("password", this.user.password);
      formData.append("password_confirmation", this.user.password_confirmation);
      formData.append("_method", "PATCH");

      // sending data to action updateUser Vuex
      this.$store.dispatch('admin/user/updateUser', {
        userId: this.$route.params.id,
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

          // redirect to previous page
          this.$router.push({
            name: 'admin-users'
          })
        })
        .catch((error) => {
          this.validation = error.response.data
        })
    }
  }
}
</script>

<style scoped>

</style>
