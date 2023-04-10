<template>
    <section class="h-100 h-custom">
      <div class="container h-100 py-5">
        <div
        v-if="cartItems.length"
          class="row d-flex justify-content-center align-items-center h-100"
        >
          <div class="col">
            <div class="table-responsive">
              <table class="table">
                <thead>
                  <tr>
                    <th scope="col" class="h5">Shopping Cart</th>
                    <!-- <th scope="col">Size</th> -->
                    <th scope="col">Quantity (In Kgs)</th>
                    <th scope="col">Price</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(productItem, index) in this.$store.state.cartItems" :key="index" >
                    <th scope="row" class="border-bottom-0">
                      <div class="d-flex align-items-center">
                        <img
                          :src="productItem.productCoverPhoto"
                          class="img-fluid rounded-3"
                          style="width: 110px; height: 112px"
                          alt="Book"
                        />
                        <div class="flex-column ms-4">
                          <p class="mb-2">
                            {{ productItem.productTitle }}
                          </p>
                          <p class="mb-0">
                            {{ productItem.productLocation }}
                          </p>
                        </div>
                      </div>
                    </th>
                    <!-- <td class="align-middle border-bottom-0">
                      <div class="d-flex flex-row">
                        <select
                          v-model="productItem.productSize"
                          :value="productItem.productSize"
                          id="form1"
                          name="productSize"
                          type="text"
                          class="form-control form-control-sm"
                          style="width: 100px; margin: 35px"
                        >
                          <option>{{productItem.productSize}}</option>
                          <option value="XL">XL</option>
                          <option value="XXL">XXL</option>
                          <option value="Small">Small</option>
                          <option value="Large">Large</option>
                        </select>
                      </div>
                    </td> -->
                    <td class="align-middle border-bottom-0">
                      <div class="d-flex flex-row">
                        <button
                        @click="decrementQuantity(productItem)"
                          class="btn btn-link px-2"
                        >
                          <i class="fas fa-minus"></i>
                        </button>
                        <input
                          :value="productItem.quantity"
                          id="form1"
                          min="1"
                          name="quantity"
                          type="number"
                          class="form-control form-control-sm"
                          style="width: 53px"
                        />

                        <button
                          class="btn btn-link px-2"
                          @click="addToCart(productItem)"
                        >
                          <i class="fas fa-plus"></i>
                        </button>
                      </div>
                    </td>
                    <td class="align-middle border-bottom-0">
                      <p class="mb-0" style="font-weight: 500">
                        Ksh {{ productItem.productPrice }} x {{ productItem.quantity}}
                      </p>
                      <br>
                      <p class="mb-0" style="font-weight: 500">
                        Ksh {{ productItem.productPrice * productItem.quantity}}
                      </p>
                    </td>
                    <td class="align-middle border-bottom-0">
                      <div @click.prevent="removeFromCart(productItem)" class="remove">remove</div>
                      <div @click.prevent="save(productItem)" class="save">save</div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div
            class="card shadow-2-strong mb-5 mb-lg-0"
            style="border-radius: 16px"
          >
            <div class="card-body p-4">
              <router-link to="/shop" style="font-weight: 900; float: right;" >
                  Continue shopping
              </router-link>
               <br>
              <div class="row">
                <div class="col-lg-4 col-xl-3">
                  <div
                    class="d-flex justify-content-between"
                    style="font-weight: 500"
                  >
                    <p class="mb-2">Subtotal</p>
                    <p class="mb-2">Ksh  {{totalPrice -200}}</p>
                  </div>

                  <div
                    class="d-flex justify-content-between"
                    style="font-weight: 500"
                  >
                    <p class="mb-0">Shipping</p>
                    <p class="mb-0">Ksh 200</p>
                  </div>

                  <hr class="my-4" />

                  <div
                    class="d-flex justify-content-between mb-4"
                    style="font-weight: 500"
                  >
                    <p class="mb-2">Total (Shipping included)</p>
                    <p class="mb-2">Ksh {{totalPrice}}</p>
                  </div>
                  <!--  @click="CheckOutProducts" -->
                  <!--  v-if="user" -->
                  <router-link to="/checkout">
                  <button
                    type="button"
                    class="btn btn-primary btn-block btn-lg"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                  >
                    <div class="d-flex justify-content-between">
                      <span>Checkout</span>
                    </div>
                  </button>
                </router-link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
        v-else
        class="row d-flex justify-content-center align-items-center h-100"
        >
          <table class="table">
            <thead>
              <tr>
                <th scope="col" class="h5">Shopping Cart</th>
              </tr>
            </thead>
          </table>
          <br />
          <div>
            <center>No Items In Cart</center>
            <br />
            <br />
            <router-link to="/shop">
              Go shopping
              <!-- <img src="../assets/icons8_back_64px.png" style="height: 37px" /> -->
            </router-link>
            <br>
          </div>
        </div>
      </div>
    </section>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  name: "CartView",
  props: ["productItem"],
  computed: {
    totalPrice() {
      let total = 0;

      for (let productItem of this.$store.state.cartItems) {
        total += productItem.totalPrice;
      }
      total = total + 200;
      return total;
    },
   ...mapGetters(["cartItems"])
  },
  methods: {
    addToCart(productItem) {
      this.$store.commit("addToCart", productItem);
    },
    removeFromCart(productItem){
      this.$store.commit("removeFromCart", productItem);
    },
    decrementQuantity(productItem) {
      this.$store.commit("decrementQuantity", productItem);
    },
    save(productItem) {
      this.$store.commit("saveToWishlist", productItem);
    },
  }
}
</script>


<style scoped>
.remove {
  background-color: red;
  border-radius:5px;
  text-align: center;
  cursor: pointer;
}
.save {
  margin-top: 30px;
  background-color: rgb(0, 255, 21);
  border-radius:5px;
  text-align: center;
  cursor: pointer;
}
</style>
