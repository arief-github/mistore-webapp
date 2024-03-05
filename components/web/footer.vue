<template>
  <footer class="pt-5 footer-color">
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-5 mb-4">
          <h4 class="font-weight-bold">TENTANG</h4>
          <hr class="hr">
          <p>Mi store official Terpercaya di Indonesia. Jual Beli Aman &amp; Harga Termurah! Belanja Sekarang.</p>
        </div>
        <div class="col-md-3 mb-4">
          <h4 class="font-weight-bold">METODE PEMBAYARAN</h4>
          <div class="row">
            <div class="col-md-4 col-4 mb-3">
              <div class="card rounded">
                <div class="card-body p-2 text-center">
                  <img src="/images/payment/BCA.png" alt="bca logo" style="width: 50px;">
                </div>
              </div>
            </div>
            <div class="col-md-4 col-4 mb-3">
              <div class="card rounded">
                <div class="card-body p-2 text-center">
                  <img src="/images/payment/BNI.png" alt="bni logo" style="width: 45px;">
                </div>
              </div>
            </div>
            <div class="col-md-4 col-4 mb-3">
              <div class="card rounded">
                <div class="card-body p-2 text-center">
                  <img src="/images/payment/BRI.png" alt="bri logo" style="width: 60px;">
                </div>
              </div>
            </div>
            <div class="col-md-4 col-4 mb-3">
              <div class="card rounded">
                <div class="card-body p-2 text-center">
                  <img src="/images/payment/GOPAY.png" alt="gopay logo" style="width: 60px;">
                </div>
              </div>
            </div>
            <div class="col-md-4 col-4 mb-3">
              <div class="card rounded">
                <div class="card-body p-2 text-center">
                  <img src="/images/payment/indomaret-logo.png" alt="indomaret logo" style="width: 60px;">
                </div>
              </div>
            </div>
            <div class="col-md-4 col-4 mb-3">
              <div class="card rounded">
                <div class="card-body p-2 text-center">
                  <img src="/images/payment/atm-bersama.jpg" alt="atmbersama logo" style="width: 40px;">
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-4 mb-4">
          <h4 class="font-weight-bold">JAM OPERASIONAL</h4>
          <hr class="hr">
          <p>
            <i class="fa fa-lock"></i> Toko Buka Setiap Hari :
            <br><br>
            <strong>Senin - Jumat</strong> (07.00 s/d 19.00)
            <br>
            <strong>Sabtu - Minggu</strong> (07.00 s/d 16.00)
          </p>
        </div>
      </div>
      <div class="row text-center mt-3 pb-3">
        <div class="col-md-12">
          <hr> © <strong>MI STORE</strong> 2024 • Hak Cipta Dilindungi
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: "Footer"
}
</script>

<style scoped>
  .footer-color {
    background: rgb(255, 255, 255);
    border-top: 5px solid rgb(230 74 26);
  }

  .hr {
    border-top: 3px solid rgb(226, 232, 240);
    border-radius: 0.5rem;
  }
</style>
