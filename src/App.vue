<template>
<div class="app" v-if="this.$store.state.postLoaded">
    <NavBar v-if="!navigation"/>
    <router-view/>
    <footer  v-if="!navigation" class="section-p1" style="display:flex">
 <div class="col">
    <img class="logo" src="@/assets/img/logo.png" style="height:150px">
    <h4> Contact </h4>
    <p><strong>Address: </strong> Tom Mboya Road, Street 32, Mombasa</p>
    <p><strong>Phone: </strong> (+254)7 9471 1950</p>
    <p><strong>Hours: </strong> 08:00-18:00, Mon-Sat</p>
    <div class="follow">
        <h4>Follow Us</h4>
        <div class="icon">
            <a><i class="fa-brands fa-pinterest-p"></i></a>
            <a><i class="fab fa-instagram"></i></a>
            <a><i class="fab fa-twitter"></i></a>
            <a><i class="fab fa-youtube"></i></a>
            <a href="https://www.facebook.com/Dev-Musunza-Festus-104579270908834/"><i class="fab fa-facebook-f"></i></a>
        </div>
    </div>
</div>
<div class="col">
    <h4>About</h4>
    <router-link to="/about"> About us</router-link>
    <router-link to="/"> Delivery information</router-link>
    <router-link to="/"> Privacy Policy</router-link>
    <router-link to="/"> Terms and Conditions</router-link>
    <router-link to="/contact"> Contact us</router-link>
</div>
<div class="col">
    <h4>My Account</h4>
    <div  v-if="!user"><a href="#signIn"> Sign In</a></div>
    <router-link  v-if="user" to="/cart"> View Cart</router-link>
    <router-link v-if="user" to="/wishlist"> My Wishlist</router-link>
    <router-link v-if="user" to="/http://localhost/GO-Courier/parcel_tracker.php"> Track My Order</router-link>
    <router-link to="/contact"> Help</router-link>
</div>
<div v-if="admin" class="col install">
    <h4>Administration</h4>
   <p> For Administration use only</p>
   <div class="row">
       <router-link to="/administration"><img src="@/assets/img/pay/administration.jpeg" alt=""></router-link>
   </div>
   <p> Secured payment Gateways</p>
   <div class="row">
    <img src="@/assets/img/pay/Visa.jpg" alt="">
    <img src="@/assets/img/pay/mastercard.jpg" alt="">
    <img src="@/assets/img/pay/mpesa.png" alt="">
    </div>
</div>
<div class="copyright">
     <p> © 2022, Samaki Online</p>
</div>
    </footer>
</div>
</template>
<script>
import NavBar from './components/core/NavBar'
import firebase from "firebase/app"
import "firebase/auth"
export default {
  name: 'App',
  data (){
    return {
        navigation: null,
    }
  },
  methods: {
    checkRoute() {
        if (this.$route.path ==="/signIn" || this.$route.path === "/signUp" || this.$route.path === "/forgot-password"){
            this.navigation = true;
            return;
        }
        this.navigation = false;
        return;
    }
  },
  watch: {
    $route() {
    this.checkRoute();
    }
  },
  computed: {
    user() {
          return this.$store.state.user;
    },
    admin() {
          return this.$store.state.profileAdmin;
    }
  },
  components: {
    NavBar
  },
  created() {
        this.checkRoute();
        firebase.auth().onAuthStateChanged(async (user) => {
            this.$store.commit("updateUser", user);
            if(user) {
                this.$store.dispatch("getCurrentUser", user)
            }
        })
        this.checkRoute();
        this.$store.dispatch("getPost");
  }
}
</script>

