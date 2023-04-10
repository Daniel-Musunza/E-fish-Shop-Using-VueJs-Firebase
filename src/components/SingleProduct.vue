<template>
<div class="container">
<section  v-if="currentProduct"  id="prodetails" class="section-p1">
    <div class="single-pro-image">
        <h4>Posted on: {{ new Date(this.currentProduct[0].productDate).toLocaleString("en-us", { dateStyle: "medium"})}} </h4>
        <br>
        
        <img :src="this.currentProduct[0].productCoverPhoto" alt=""/>
        <br>
        <!-- <div>{{this.currentProduct[0].images}}</div> -->
    </div>
    <div class="single-pro-details">
        <!-- <h6>Home / T-Shirt</h6> -->
        <h4>{{this.currentProduct[0].productTitle}}</h4>
        <h2>Ksh {{this.currentProduct[0].productPrice}}</h2>
        <select v-model="productSize">
            <option >Select Size</option>
            <option value="Lmall">Small</option>
            <option value="Large">Large</option>
        </select>
        <!-- <input type="number" v-model.number="product.id"> -->
        <input type="number">
        <button
        @click="addToCart(currentProduct[0])"
        class="normal"
        >
        Add To Cart
        </button>
        <h4>Product Details</h4>
        <span>{{this.currentProduct[0].productDetails}}</span>
    </div>
</section>
<section  v-else-if="currentBuyOneFree"  id="prodetails" class="section-p1">
    <div class="single-pro-image">
        <h4>Posted on: {{ new Date(this.currentBuyOneFree[0].productDate).toLocaleString("en-us", { dateStyle: "medium"})}} </h4>
        <br>
        
        <img :src="this.currentBuyOneFree[0].productCoverPhoto" alt=""/>
        <br>
        <!-- <div>{{this.currentBuyOneFree[0].images}}</div> -->
    </div>
    <div class="single-pro-details">
        <h4>{{this.currentBuyOneFree[0].productTitle}}</h4>
        <h2>Ksh {{this.currentBuyOneFree[0].productPrice}}</h2>
        <select v-model="productSize">
            <option >Select Size</option>
            <option value="Lmall">Small</option>
            <option value="Large">Large</option>
        </select>
        <input type="number">
        <button
        @click="addToCart(currentBuyOneFree[0])"
        class="normal"
        >
        Add To Cart
        </button>
        <h4>Product Details</h4>
        <span>{{this.currentBuyOneFree[0].productDetails}}</span>
    </div>
</section>
<section  v-else-if="currentCookedFish"  id="prodetails" class="section-p1">
    <div class="single-pro-image">
        <h4>Posted on: {{ new Date(this.currentCookedFish[0].productDate).toLocaleString("en-us", { dateStyle: "medium"})}} </h4>
        <br>
        
        <img :src="this.currentCookedFish[0].productCoverPhoto" alt=""/>
        <br>
        <!-- <div>{{this.currentCookedFood[0].images}}</div> -->
    </div>
    <div class="single-pro-details">
        <h4>{{this.currentCookedFish[0].productTitle}}</h4>
        <h2>Ksh {{this.currentCookedFish[0].productPrice}}</h2>
        <select v-model="productSize">
            <option >Select Size</option>
            <option value="Lmall">Small</option>
            <option value="Large">Large</option>
        </select>
        <input type="number">
        <button
        @click="addToCart(currentCookedFish[0])"
        class="normal"
        >
        Add To Cart
        </button>
        <h4>Product Details</h4>
        <span>{{this.currentRepair[0].productDetails}}</span>
    </div>
</section>
<section  v-else-if="currentDagaa"  id="prodetails" class="section-p1">
    <div class="single-pro-image">
        <h4>Posted on: {{ new Date(this.currentDagaa[0].productDate).toLocaleString("en-us", { dateStyle: "medium"})}} </h4>
        <br>
        
        <img :src="this.currentDagaa[0].productCoverPhoto" alt=""/>
        <br>
        <!-- <div>{{this.currentDagaa[0].images}}</div> -->
    </div>
    <div class="single-pro-details">
        <h4>{{this.currentDagaa[0].productTitle}}</h4>
        <h2>Ksh {{this.currentDagaa[0].productPrice}}</h2>
        <select v-model="productSize">
            <option >Select Size</option>
            <option value="Lmall">Small</option>
            <option value="Large">Large</option>
        </select>
        <input type="number">
        <button
        @click="addToCart(currentDagaa[0])"
        class="normal"
        >
        Add To Cart
        </button>
        <h4>Product Details</h4>
        <span>{{this.currentDagaa[0].productDetails}}</span>
    </div>
</section>
<section  v-else-if="currentFeaturedProduct"  id="prodetails" class="section-p1">
    <div class="single-pro-image">
        <h4>Posted on: {{ new Date(this.currentFeaturedProduct[0].productDate).toLocaleString("en-us", { dateStyle: "medium"})}} </h4>
        <br>
        
        <img :src="this.currentFeaturedProduct[0].productCoverPhoto" alt=""/>
        <br>
        <div>{{this.currentFeaturedProduct[0].images}}</div>
    </div>
    <div class="single-pro-details">
        <h4>{{this.currentFeaturedProduct[0].productTitle}}</h4>
        <h2>Ksh {{this.currentFeaturedProduct[0].productPrice}}</h2>
        <select v-model="productSize">
            <option >Select Size</option>
            <option value="Lmall">Small</option>
            <option value="Large">Large</option>
        </select>
        <input type="number">
        <button
        @click="addToCart(currentFeaturedProduct[0])"
        class="normal"
        >
        Add To Cart
        </button>
        <h4>Product Details</h4>
        <span>{{this.currentFeaturedProduct[0].productDetails}}</span>
    </div>
</section>
<section id ="product1" class="section-p1">
    <h2> Featured Products</h2>
   <div class="pro-container" style="display:flex">
           <ProductListItem
          
           :productItem="productItem"
           v-for="(productItem, index) in featuredProducts"
           :key="index"
           />
   </div>
</section>
<section id="newsletter" class="section-p1 section-m1">
    <div class="newstext">
    <h4>Sign Up For Newsletters</h4>
    <p> Get E-mail Updates about our latest shop and <span>Special offers.</span>
    </p>
    </div>
    <div class="form">
        <input type="email" placeholder="example@gmail.com">
        <button class="normal">Sign Up</button>
    </div>
</section>
</div>
</template>
<script>
import Product_List_Item from '@/components/product/Product_List_Item'
export default {
  name: 'SingleProduct',
  data () {
    return {
        currentProduct: null,
        currentBuyOneFree: null,
        currentCookedFish: null,
        currentDagaa: null,
        currentFeaturedProduct: null,
        productSize: "",
    }
  },
  components: {
    ProductListItem:Product_List_Item,
  },
  computed: {
    featuredProducts() {
           return this.$store.state.featuredProducts;
        },
  },
  methods: {
    addToCart(productItem) {
      productItem.quantity = 1;
      productItem.productSize = this.productSize;
      productItem.totalPrice = productItem.productPrice;
      this.$store.commit("addToCart", productItem);
    }
  },
  async mounted() {
    this.currentProduct = await this.$store.state.productItems.filter((productItem) => {
      return productItem.productID === this.$route.params.productid;
    }),
    this.currentBuyOneFree = await this.$store.state.buyOneFree.filter((productItem) => {
      return productItem.productID === this.$route.params.productid;
    }),
    this.currentCookedFish = await this.$store.state.cookedFish.filter((productItem) => {
      return productItem.productID === this.$route.params.productid;
    }),
    this.currentDagaa = await this.$store.state.dagaa.filter((productItem) => {
      return productItem.productID === this.$route.params.productid;
    }),
    this.currentFeaturedProduct= await this.$store.state.featuredProducts.filter((productItem) => {
      return productItem.productID === this.$route.params.productid;
    })
  },
  created() {
    this.$store.dispatch('getFeaturedProducts');
  }
}
</script>
