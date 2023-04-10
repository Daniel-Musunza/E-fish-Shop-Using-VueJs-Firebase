<template>
    <div class="container-fluid">
        <section id="page-header">
           <h2> /Stayhome </h2>
           <p> Save more with coupons & up to 70% off! </p>
        </section>
        <div v-if="productItems.length>16">
        <div v-if="profileAdmin" class="toggle-edit">
          <span>Toggle Editing Product</span>
          <input type="checkbox" v-model="editProducts" />
        </div>
        <!-- <CarouselView /> -->
         <section id ="product1" class="section-p1">
            <div class="pro-container" style="display:flex">
                <ProductListItem
                v-for="(productItem, index) in productItems.slice(16,32)"
                :key="index"
                :productItem="productItem"
                />
            </div>
        </section>
        <section id="pagination" class="section-p1">
            <router-link to="/shop">1</router-link>
            <router-link to="/shop2">2</router-link>
            <router-link to="/shop3"><i class="fa-solid fa-arrow-right"></i></router-link>
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
        <div v-else>
            <h1>No more Products</h1>
        </div>
        <section id="pagination" class="section-p1">
            <router-link to="/shop">1</router-link>
            <router-link to="/shop2">2</router-link>
            <router-link to="/shop3"><i class="fa-solid fa-arrow-right"></i></router-link>
        </section>
    </div>
    </template>
    <script>
    // import CarouselView from './CarouselView'
    import Product_List_Item from './Product_List_Item'
    export default {
      name: "ShopView2",
      components: {
        // CarouselView,
        ProductListItem: Product_List_Item,
    },
      computed: {
        productItems() {
           return this.$store.state.productItems;
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
        }
      },
      beforeUnmount () {
        this.$store.commit("toggleEditProducts", false);
    },
      // created() {
      //   this.$store.dispatch('getProductItems');
      // }
    };
    </script>
    <style scoped>
         .toggle-edit {
                 display:flex;
                 align-items: center;
                 position: absolute;
                 top: 350px;
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
         h1 {
            text-align: center;
            font-weight: 900;
            color: rgb(44, 44, 133);
         }
     </style>
