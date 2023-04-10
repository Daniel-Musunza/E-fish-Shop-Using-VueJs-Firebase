<template>
    <div class="container">
     <div v-if="profileAdmin" class="toggle-edit">
      <span>Toggle Editing Product</span>
      <input type="checkbox" v-model="editProducts" />
     </div>
     <h1>COOKED FISH</h1>
    <!-- <CarouselView /> -->
     <section id ="product1" class="section-p1">
      <div v-if="cookedFish.length">
        <div class="pro-container" style="display:flex">
            <ProductListItem
            v-for="(productItem, index) in cookedFish"
            :key="index"
            :productItem="productItem"
            />
        </div>
      </div>
      <div v-else>
        <h3>Cooked Food is not Availlable</h3>
      </div>
    </section>
    </div>
</template>
<script>
    // import CarouselView from './CarouselView'
    import Product_List_Item from './Product_List_Item'
    export default {
      name: "CookedFish",
      components: {
        // CarouselView,
        ProductListItem: Product_List_Item,
    },
      computed: {
        cookedFish() {
           return this.$store.state.cookedFish;
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
      created() {
        this.$store.dispatch('getCookedFish');
      }
    };
    </script>
    <style scoped>
        .toggle-edit {
                display:flex;
                align-items: center;
                position: absolute;
                top:40px;
                right:0;
        }
        h1 {
          margin-top: 70px;
          text-align: center;
          font-weight: 900;
          color:rgb(83, 21, 65);
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
    </style>
