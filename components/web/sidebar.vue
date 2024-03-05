<template>
  <div class="card border-0 rounded shadow-sm border-top-orange">
    <div class="card-body">
      <h5>MAIN MENU</h5>
      <hr>
      <ul class="list-group">
        <nuxt-link :to="{name: 'customer-dashboard'}"
                   class="list-group-item text-decoration-none text-dark text-uppercase"><i class="fa fa-tachometer-alt"></i>
          Dashboard
        </nuxt-link>
        <nuxt-link :to="{name: 'customer-invoices'}" class="list-group-item text-decoration-none text-dark text-uppercase"><i class="fa fa-shopping-cart"></i> My
          Orders
        </nuxt-link>
        <a @click="logout" class="list-group-item text-decoration-none text-dark text-uppercase"
           style="cursor: pointer;"><i class="fa fa-sign-out-alt"></i>
          Logout
        </a>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "sidebar",
  methods: {
    async logout() {
      await this.$auth.logout();

      // set state
      this.$store.commit('web/cart/SET_CART_PRICE', 0);
      this.$store.commit('web/cart/SET_CARTS_DATA', []);

      //redirect route customer login
      this.$router.push({
        name: 'customer-login'
      });
    }
  }
}
</script>

<style scoped>

</style>
