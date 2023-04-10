<template>
 <div>

<div class="container-fluid">
   <section id="hero" style="font-weight: 500px">
       <h4  style="font-weight: 900" >Trade-in-offer</h4>
       <h2 style="font-weight: 900">Fresh Fish Deals</h2>
       <h1 style="font-weight: 900; color: #fff">On all Types of Fish</h1>
       <p style="font-weight: 900"> Save more with coupons & up to 70% off!</p>
       <router-link to='/shop' class="btn">
       <button style="font-weight: 900">Shop now</button>
       </router-link>
    </section>
    <div class="feature-heading">
        <h2> We care For you</h2>
        <p>Here is what we have prepared for you</p>
    </div>
    <section id="feature" class="section-p1">
        <div class="fe-box">
            <img src="@/assets/img/features/FreeShipping.jpg" alt="">
            <h6>Free Shipping</h6>
        </div>
        <div class="fe-box">
            <img src="@/assets/img/features/onlineOrder.jpg" alt="">
            <h6>Online Order</h6>
        </div>
        <div class="fe-box">
            <img src="@/assets/img/features/promotions.jpg" alt="" width="150px">
            <h6>Promotions</h6>
        </div>
        <div class="fe-box">
            <img src="@/assets/img/features/happySale.jpg" alt="" width="150px">
            <h6>Happy Sale</h6>
        </div>
        <div class="fe-box">
            <img src="@/assets/img/features/saveMoney.jpg" alt="" width="150px">
            <h6>Save Money</h6>
        </div>
        <div class="fe-box">
            <img src="@/assets/img/features/FSupport.jpg" alt="">
            <h6>F24/7 Support</h6>
        </div>
    </section>
    <section id ="product1" class="section-p1">
        <h2> Featured Types of Fish and  Other Sea Creatures</h2>
        <div class="pro-container" style="display:flex">
           <ProductListItem
         
           :productItem="productItem"
           v-for="(productItem, index) in featuredProducts"
           :key="index"
           />
        </div>
    </section>
    <section id="banner" class="section-m1">
        <h4>Fried Fish </h4>
        <h2>Up to <span>70% off</span>-All Kinds of Fish and other Sea Creatures</h2>
        <router-link  to="/cookedFish"><button class="normal"> Explore More</button> </router-link>

    </section>
    <section id="product1" class="section-p1">
        <h2>New Arrivals</h2>
        <p>Your Vacation Taste</p>
        <div class="pro-container" style="display: flex;">
           <ProductListItem
        
           :productItem="productItem"
           v-for="(productItem, index) in productItems.slice(0, 8)"
           :key="index"
           />
        </div>
    </section>
<section id="sm-banner" class="section-p1">
    <div class="banner-box" style="width: 500px;">
    <h4>crazy deals</h4>
    <h2>Buy 1 get 1 Free</h2>
    <span> The big Fish is on sale</span>
    <router-link  to="/buy-one-free"><button class="white">Learn More</button> </router-link>
    </div>
    <div class="banner-box banner-box2"  style="width: 500px;">
    <!-- <h4>Spring/summer</h4> -->
    <h2>Omena(Dagaa)</h2>
    <span> Fresh Omena is on sale</span>
    <router-link   to="/dagaa"><button class="white">Collection</button></router-link>
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
  </div>
</template>
<script>
import Product_List_Item from './Product_List_Item'

export default {
  name: "HomeView",
  data() {
         return {
    
            modalActive: false,
         }
     },
  components: {
    ProductListItem:Product_List_Item,

  },
  methods: {
 
    closeModal() {
        this.modalActive = !this.modalActive;
        this.email = "";
    }
  },
  computed: {
    productItems() {
       return this.$store.state.productItems;
    },
    featuredProducts() {
           return this.$store.state.featuredProducts;
        },
    editProducts: {
     get() {
        return this.$store.state.editProducts;
     },
     set(payload) {
       this.$store.commit("toggleEditProducts", payload);
     }
    },
    profileAdmin() {
     return this.$store.state.profileAdmin;
    },
    user() {
          return this.$store.state.user;
    },
},
beforeUnmount () {
    this.$store.commit("toggleEditProducts", false);
},
  created() {
    this.$store.dispatch('getProductItems');
    this.$store.dispatch('getFeaturedProducts');
  }

};
</script>
<style scoped>
 #blog {
        position: relative;
    }
    .toggle-edit {
            display:flex;
            align-items: center;
            position: absolute;
            top: 50px;
            right:0;
    }
    span {
            margin-right: 16px;
        }
     input[type="checkbox"] {
        position: relative;
        border: none;
        /* -webkit-appearance: none; */
        outline: none;
        width: 80px;
        height: 30px;
        border-radius: 20px;
        background: #fff;
        box-shadow: 0 4px 6px -1px rgba(0,0,0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.05);
    }
    input[type="checkbox"]:before {
        content: "";
        position: absolute;
        width: 30px;
        height: 30px;
        border-radius: 20px;
        top: 0;
        left: 0;
        background: #303030;
        transform: scale(1,1);
        transition: 750ms ease all;
        box-shadow: 0 4px 6px -1px rgba(0,0,0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.05);
    }
    input:checked[type="checkbox"]:before {
        left: 52px;
        background: #fff;
    }
    .feature-heading{
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    button {
        border-radius: 15px;
    }

</style>
