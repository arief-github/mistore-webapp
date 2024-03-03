<template>
  <div class="container mt-custom mb-3">
    <div class="fade-in">
      <div class="row justify-content-center">
        <div class="col-md-4">
          <div class="card-group">
            <div class="card border-top-orange border-0 shadow-sm rounded">
              <div class="card-body">
                <h3>LOGIN</h3>
                <hr>
                <div v-if="validation.message" class="mt-2">
                  <b-alert show variant="danger">
                    {{ validation.message }}
                  </b-alert>
                </div>
                <form @submit.prevent="login">
                  <div class="input-group mb-3">
                    <div class="input-group-prepend">
                          <span class="input-group-text">
                            <i class="fa fa-user">
                            </i>
                          </span>
                    </div>
                    <input type="text" v-model="user.email" class="form-control" placeholder="Masukkan Email">
                  </div>
                  <div v-if="validation.email" class="mt-2">
                    <b-alert show variant="danger">
                      {{ validation.email[0] }}
                    </b-alert>
                  </div>
                  <div class="input-group mb-3">
                    <div class="input-group-prepend">
                          <span class="input-group-text">
                            <i class="fa fa-lock">
                            </i>
                          </span>
                    </div>
                    <input type="password" v-model="user.password" class="form-control" placeholder="Masukkan Password">
                  </div>
                  <div v-if="validation.password" class="mt-2">
                    <b-alert show variant="danger">
                      {{ validation.password[0] }}
                    </b-alert>
                  </div>
                  <div class="row">
                    <div class="col-12">
                      <button class="btn btn-info shadow-sm rounded-sm px-4">LOGIN</button>
                      <button class="btn btn-warning shadow-sm rounded-sm px-4">RESET</button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="text-center mt-3">
        Sudah punya akun? <nuxt-link :to="{name: 'customer-login'}">
        Login Disini
      </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  middleware: 'authenticated',
  layout: 'default',
  head() {
    return {
      title: 'Login - Customer'
    }
  },
  data() {
    return {
      user: {
        email: '',
        password: ''
      },
      validation: []
    }
  },
  methods: {
    async login() {
      await this.$auth.loginWith('customer', {
        data: {
          email: this.user.email,
          password: this.user.password
        }
      })
        .then(() => {
          this.$store.dispatch('web/cart/getCartsData');
          this.$store.dispatch('web/cart/getCartWeight');

          this.$router.push({
            name: 'customer-dashboard'
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
