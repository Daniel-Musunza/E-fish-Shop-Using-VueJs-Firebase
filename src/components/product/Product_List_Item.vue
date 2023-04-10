<template>
<div class="pro">
       <div v-show="editProducts" class="icons">
            <div @click="editProduct" class="icon">
                <div class="edit"><i class="fa-solid fa-pen-to-square"></i></div>
            </div>
            <div @click="deleteProduct" class="icon">
                <div><i class="fa-solid fa-trash"></i></div>
            </div>
        </div>
        <router-link :to="{ name: 'sproduct', params: { productid: this.productItem.productID }}">
            <img :src="productItem.productCoverPhoto">
            <div class="des">
                <span>at {{productItem.productLocation }}</span>
                <h5>{{productItem.productTitle }}</h5>
                <div class="star">
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                </div>
                <h4>Ksh {{productItem.productPrice}}</h4>
            </div>
        </router-link>
        <button 
          @click="
          addToCart(productItem)
          "
          class="normal"
        >
          Add To Cart
        </button>
        <h6>Posted on: <span>{{ new Date(productItem.productDate).toLocaleString("en-us", {dateStyle: "medium"}) }}</span></h6>
   </div>
</template>
<script>
export default {
  name: "ProductListItem",
  props: ["productItem"],
  methods: {
    deleteProduct() {
     this.$store.dispatch("deleteProduct", this.productItem.productID);
    },
    editProduct() {
      this.$router.push({name: 'EditProduct', params: {productid: this.productItem.productID}})
    },
    addToCart(productItem) {
      productItem.quantity = 1;
      productItem.totalPrice = productItem.productPrice;
      this.$store.commit("addToCart", productItem);
    }
  },
  computed: {
    editProducts () {
     return this.$store.state.editProducts;
    },
    user() {
          return this.$store.state.user;
    },
  }
};
</script>
<style scoped>
  .icons {
      display: flex;
      position: absolute;
      top: 10px;
      left: 10px;
      z-index: 90;
  }
  .icon {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 35px;
      height: 35px;
      border-radius: 50%;
      background-color: #fff;
      transition: 0.5s ease all;
     }
  .icon:hover{
  color: #fff;
  background-color: #fd0707;
  }
  span {
      color: rgb(60, 255, 0);
  }
  .normal {
    background-color: #088178;
    color: #fff;
    margin-bottom: 15px;
    padding-block: 8px;
  }
  </style>
