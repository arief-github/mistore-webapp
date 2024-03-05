<template>
<div class="container-fluid mt-custom">
  <div class="fade-in">
    <div class="row" v-if="carts.length > 0">
      <div class="col-md-7">
        <div class="card border-0 rounded border-top-orange shadow-sm">
          <div class="card-body">
            <h5>DETAIL PESANAN</h5>
            <hr>
            <table class="table table-cart">
              <tbody>
                <client-only>
                  <tr v-for="cart in carts" :key="cart.id" style="background: #edf2f7;">
                    <td class="b-none" style="width: 25%">
                      <div class="wrapper-image-cart">
                        <img :src="cart.product.image" style="width: 100%; border-radius: .5rem" alt="image product">
                      </div>
                    </td>
                    <td class="b-none" style="width: 50%">
                      <h5><b>{{ cart.product.title }}</b></h5>
                      <table class="table-borderless table-font">
                        <tr>
                          <td style="padding: .20rem">QTY</td>
                          <td style="padding: .20rem">:</td>
                          <td style="padding: .20rem">  <b>{{ cart.qty }}</b> </td>
                        </tr>
                      </table>
                    </td>
                    <td class="b-none text-right">
                      <p class="mb-0 font-weight-bold">
                        Rp. {{ formatPrice(cart.price) }}
                      </p>
                      <p class="m-0">
                        <s style="text-decoration-color: red">
                          Rp {{ formatPrice(cart.product.price * cart.qty) }}
                        </s>
                      </p>
                      <br>
                      <div class="text-right">
                        <button @click.prevent="removeCart(cart.id)" class="btn btn-sm btn-danger">
                          <i class="fa fa-trash"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                </client-only>
              </tbody>
            </table>

            <table class="table table-default">
              <tbody>
                <tr>
                  <td class="set-td text-left" style="width: 60%">
                    <p class="m-0">JUMLAH</p>
                  </td>

                  <td class="set-td text-right" style="width: 30%">
                    &nbsp; : Rp.
                  </td>

                  <td class="text-right set-td">
                    <p class="m-0" id="subtotal">
                      {{ formatPrice(cartPrice) }}
                    </p>
                  </td>
                </tr>
                <tr>
                  <td class="set-td text-left border-0">
                    <p class="m-0">ONGKOS KIRIM (<strong>{{ cartWeight }}</strong> gram)</p>
                  </td>
                  <td class="set-td border-0 text-right">
                    &nbsp; :Rp.
                  </td>
                  <td class="set-td border-0 text-right">
                    <p class="m-0" id="ongkir-cart"></p>
                  </td>
                </tr>
                <tr>
                  <td class=" text-left border-0">
                    <p class="font-weight-bold m-0 h5 textuppercase">Grand Total
                    </p>
                  </td>
                  <td
                    class=" border-0 text-right">&nbsp;&nbsp; :
                    Rp.</td>
                  <td
                    class=" border-0 text-right">
                    <p
                      class="font-weight-bold m-0h5" align="right">
                      {{ formatPrice(grandTotal) }}
                    </p>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div class="col-md-5">
        <div class="card border-0 rounded border-top-orange shadow-sm">
          <div class="card-body">
            <h5>DETAIL CUSTOMER</h5>
            <hr>
            <div class="row">
              <div class="col-md-6">
                <div class="form-group">
                  <label class="font-weight-bold">NAMA LENGKAP</label>
                  <input type="text" class="form-control" id="nama_lengkap" placeholder="Nama Lengkap" v-model="customer.name">
                  <div v-if="validation.name" class="mt-2 alert alert-danger">
                    Masukkan Nama Lengkap
                  </div>
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-group">
                  <label class="font-weight-bold">NO. HP/WHATSAPP</label>
                  <input type="number" class="form-control" id="phone" placeholder="No. HP/Whatsapp" v-model="customer.phone">
                  <div v-if="validation.phone" class="mt-2 alert alert-danger">
                    Masukkan No. Telp
                  </div>
                </div>
              </div>
              <div class="col-md-12">
                <div class="form-group">
                  <label class="font-weight-bold">PROVINSI</label>
                  <select class="form-control" v-model="rajaOngkir.province_id" @change="getCities">
                    <option value="">-- Pilih Provinsi --</option>
                    <option v-for="province in provinces" :key="province.id" :value="province.province_id">
                      {{ province.name }}
                    </option>
                  </select>
                </div>
              </div>
              <div class="col-md-12">
                <div class="form-group">
                  <label class="font-weight-bold">KOTA/KABUPATEN</label>
                  <select class="form-control" v-model="rajaOngkir.city_id" @change="showCourier">
                    <option value="">-- Pilih Kota --</option>
                    <option v-for="city in cities" :key="city.id" :value="city.city_id">
                      {{ city.name }}
                    </option>
                  </select>
                </div>
              </div>
              <div class="col-md-12">
                <div class="form-group" v-if="courier.showCourier">
                  <label class="font-weight-bold">KURIR PENGIRIMAN</label>
                  <br>
                  <div class="form-check form-check-inline">
                    <!-- JNE  -->
                    <input class="form-check-input select-courier" type="radio" name="courier" id="ongkos_kirim-jne" value="jne" v-model="courier.courier_name" @change="showService">
                    <label for="ongkos_kirim-jne" class="form-check-label font-weight-bold mr-4">JNE</label>
                    <!-- TIKI -->
                    <input class="form-check-input select-courier" type="radio" name="courier" id="ongkos_kirim-tiki" value="tiki" v-model="courier.courier_name" @change="showService">
                    <label for="ongkos_kirim-tiki" class="form-check-label font-weight-bold mr-4">TIKI</label>
                    <!-- TIKI -->
                    <input class="form-check-input select-courier" type="radio" name="courier" id="ongkos_kirim-pos" value="pos" v-model="courier.courier_name" @change="showService">
                    <label for="ongkos_kirim-pos" class="form-check-label font-weight-bold mr-4">POS</label>
                  </div>
                </div>
              </div>
              <div class="col-md-12">
                <div class="form-group" v-if="courier.showService">
                  <hr>
                  <label class="font-weight-bold">SERVICE KURIR</label>
                  <br>
                  <div v-for="value in costs" :key="value.service" class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" name="cost" :id="value.service" :value="value.cost[0].value+'|'+value.service" v-model="courier.courier_service_cost" @change="getServiceCost"/>
                    <label :for="value.service" class="form-check-label font-weight-normal mr-5">
                      {{ value.service }} - Rp. {{ formatPrice(value.cost[0].value) }}
                    </label>
                  </div>
                </div>
              </div>
              <div class="col-md-12">
                <div class="form-group">
                  <label class="font-weight-bold">ALAMAT LENGKAP</label>
                  <textarea type="text" class="form-control" id="alamat" placeholder="Alamat Lengkap" v-model="customer.address"></textarea>
                  <div v-if="validation.address" class="mt-2 alert alert-danger">
                    Masukkan Alamat Lengkap
                  </div>
                </div>
              </div>
              <div class="col-md-12" v-if="btnCheckout">
                <button class="btn btn-warning btn-lg btn-block">CHECKOUT</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row justify-content-center" v-else>
      <div class="col-mod-10">
        <div class="card border-0 rounded border-top-orange shadow-sm">
          <div class="card-body">
            <div class="col-sm-12 empty-cart-cls text-center">
              <img src="/images/shopping-cart.png" alt="image shopping cart" style="height: 150px;" class="img-fluid mb-4 mr-3">
              <h3>
                <strong>Keranjang Belanja Kosong :)</strong>
              </h3>
              <nuxt-link :to="{name: 'products'}" class="btn btn-lg mt-4" data-abc="true">
                LANJUTKAN BELANJA
              </nuxt-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  middleware: 'isCustomer',
  head() {
    return {
      title: 'Cart - MI STORE - Distributor Xiaomi Indonesia Resmi',
      meta: [
        {
          hid: 'og:title',
          name: 'og:title',
          content: 'Cart - MI STORE - Distributor Xiaomi Indonesia Resmi'
        },
        {
          hid: 'og:site_name',
          name: 'og:site_name',
          content: 'Cart - MI STORE - Distributor Xiaomi Indonesia Resmi'
        },
        {
          hid: 'og:image',
          name: 'og:image',
          content: '/images/shopping-cart.png'
        },
        {
          hid: 'description',
          name: 'description',
          content: 'Cart - MI STORE - Distributor Xiaomi Indonesia Resmi'
        }
      ]
    }
  },
  async asyncData({ store }) {
    await store.dispatch('web/cart/getCartsData')
    await store.dispatch('web/rajaOngkir/getProvincesData');
  },
  computed: {
    carts() {
      return this.$store.state.web.cart.carts
    },
    cartWeight() {
      return this.$store.state.web.cart.cartWeight
    },
    cartPrice() {
      return this.$store.state.web.cart.cartPrice
    },
    provinces() {
      return this.$store.state.web.rajaOngkir.provinces
    },
    cities() {
      return this.$store.state.web.rajaOngkir.cities
    },
    costs() {
      return this.$store.state.web.rajaOngkir.costs
    }
  },
  data() {
    return {
      customer: {
        name: '',
        phone: '',
        address: ''
      },
      validation: {
        name: false,
        phone: false,
        address: false
      },
      rajaOngkir: {
        province_id: '',
        city_id: ''
      },
      courier: {
        showCourier: false,
        showService: false,
        courier_name: '',
        courier_service_cost: '',
        courier_service: '',
        courier_cost: ''
      },
      grandTotal: 0,
      btnCheckout: false,
    }
  },
  methods: {
    async removeCart(cartId) {
      await this.$swal.fire({
        title: 'APAKAH ANDA YAKIN ?',
        text: 'INGIN MENGHAPUS DATA INI !',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'YA, HAPUS!',
        cancelButtonText: 'TIDAK',
      }).then((result) => {
        if (result.isConfirmed) {
          this.$store.dispatch('web/cart/removeCart', {
            cart_id: cartId
          }).then(async () => {
            await this.$store.dispatch('web/cart/getCartPrice')

            this.$swal.fire({
              title: 'BERHASIL!',
              text: 'Product Berhasil Dihapus dari Keranjang!',
              icon: 'success',
              showConfirmButton: false,
              timer: 2000
            })
          })
        }
      })
    },
    getCities() {
      this.$store.dispatch('web/rajaOngkir/getCitiesData', {
        province_id: this.rajaOngkir.province_id
      })
    },
    showCourier() {
      this.courier.showCourier = true
    },
    async showService() {
      if(this.cartWeight === 0) {
        alert('Silahkan Pilih Produk Terlebih Dahulu');

        return
      }

      await this.$store.dispatch('web/rajaOngkir/getOngkirData', {
        destination: this.rajaOngkir.city_id,
        weight: this.cartWeight,
        courier: this.courier.courier_name
      })
        .then(() => {
          this.courier.showService = true
        })
    },
    getServiceCost() {
      let shipping = this.courier.courier_service_cost.split("|");

      this.courier.courier_cost = shipping[0];
      this.courier.courier_service = shipping[1];

      this.grandTotal = parseInt(this.cartPrice) + parseInt(this.courier.courier_cost);

      this.btnCheckout = true;
    }
  }
}
</script>

<style scoped>
  .table-cart {
    border-style: solid !important;
    border-color: rgb(198, 206, 214) !important;
  }

  .table-font {
    font-size: 14px;
  }
</style>
