<template>
  <div>
  <section v-if="!mobileNav" id="header" style="z-index: 999px">
        <router-link to="/"><img src="@/assets/img/logo1.png" style = "height:100px" class="logo" ></router-link>
        <div>
            <ul id="navbar">
                <li><router-link :to="{name: 'Home'}" >Home</router-link></li>
                <li ><router-link to="/shop">Shop</router-link></li>
                <li><router-link to="/blog">Blog</router-link></li>
                <li><router-link to="/about">About</router-link></li>
                <li><router-link to="/contact">Contact</router-link></li>
                <li v-if="admin"><router-link to="/administration">Administration</router-link></li>
                <li v-if="!user"><router-link to="/signIn"> Sign In/Sign Up</router-link></li>
                <li ><router-link to="/cart"><i class="fa-solid fa-cart-shopping"></i> <span> {{cartQuantity}} </span></router-link></li>
            </ul>
        </div>
        <div>
          <ul>
          <li v-if="user">
                <div @click="toggleProfileMenu" class="profile" ref="profile">
              <span>{{ this.$store.state.profileInitials}}</span>
              <div v-if="profileMenu && !mobileNav" class="profile-menu">
                <div class="info">
                  <p class="initials">{{ this.$store.state.profileInitials }}</p>
                  <div class="right">
                    <p>{{ this.$store.state.profileFirstName }} {{this.$store.state.profileLastName }}</p>
                    <p>{{this.$store.state.profileUsername}} </p>
                    <p>{{ this.$store.state.profileEmail }}</p>
                  </div>
                </div>
                <div class="options">
                  <div class="option">
                    <router-link clas="option" to="/profile">
                    <p>Profile</p>
                    </router-link>
                  </div>
                  <div v-if="admin" class="option">
                    <router-link clas="option" to="/administrator">
                    <p>Admin <i class="fa-solid fa-user"></i></p>
                    </router-link>
                  </div>
                  <div @click="signOut" class="option">
                    <p>Sign Out</p>
                  </div>
                </div>
              </div>
        </div>
      </li>
      </ul>
        </div>
        <div id="mobile" >
            <div ><router-link to="/cart"><i class="fa-solid fa-cart-shopping"></i></router-link></div>
            <div ><span> {{cartQuantity}} </span></div>
            <button @click="toggleBox" class="btn" ref="btn"><i class="fa fa-bars"></i>Menu</button>
       </div>
  </section>
  <section id="mobileNav">
      <transition v-if="mobileNav" @click="toggleBox" name="mobile-nav">
      <ul class="mobile-nav">
        <button class="close" ref="btn">close <i class="fa-solid fa-xmark"></i></button>
        <br>
        <li><router-link to="/">Home</router-link><hr></li>
        <li><router-link to="/shop">Shop</router-link><hr></li>
        <li><router-link to="/blog">Blog</router-link><hr></li>
        <li><router-link to="/about">About</router-link><hr></li>
        <li><router-link to="/contact">Contact</router-link><hr></li>
        <li ><router-link to="/administration">Administration</router-link></li>
        <li v-if="!user"><router-link to="/signIn"> Sign In/Sign Up</router-link></li>
      </ul>
    </transition>
  </section>
  </div>
</template>
<script>
import firebase from "firebase/app"
import "firebase/auth"
export default {
    name: "NavBar",
    data () {
      return {
        profileMenu: null,
        profile: null,
        mobile: null,
        mobileNav: null,
        windowWidth: null
      }
    },
    methods: {
      signOut() {
            firebase.auth().signOut();
            window.location.reload();
            this.$router.replace('/signIn');
      },
      toggleBox () {
      this.mobileNav = !this.mobileNav
      },
      toggleProfileMenu () {
          this.profileMenu = !this.profileMenu
      },
      toggleProfile () {
      this.profile = !this.profile
      },
      checkScreen () {
        this.windowWidth = window.innerWidth;
        if (this.windowWidth <= 750) {
          this.mobile = true;
          return;
        }
        this.mobile = false;
        this.mobileNav = false;
        return;

      }
    },
    computed: {
    user() {
          return this.$store.state.user;
     },
    admin() {
          return this.$store.state.profileAdmin;
    },
    cartQuantity (){
      return this.$store.getters.cartQuantity;
    }
    },
  created() {
    window.addEventListener("resize", this.checkSreen);
    this.checkScreen();
  }
}
</script>
<style scoped>
@media (max-width: 799px) {
  .btn {
    background-color:#E3E6F3;
    border: none;
    padding: 12px 16px;
  }

  .mobile-nav {
    padding:20px;
    width: 70%;
    max-width: 180px;
    display: flex;
    flex-direction: column;
    position: fixed;
    z-index: 999;
    height: 100%;
    background-color:rgb(74, 124, 165);
    top:0;
    left:0;
    font-size: 10;
    text-decoration: none;
    /* margin-top: 90px; */
  }
  .mobile-nav li{
    list-style: none;
    padding: 0 20px;
    position: relative;
}
.mobile-nav li a{
    text-decoration: none;
    font-size: 16px;
    font-weight: 600;
    color: #1a1a1a;
    transition: 0.3s ease;
}
.mobile-nav li a.router-link-exact-active {
    color: #42b983;
  }
.mobile-nav li a:hover{
color: #088178;
}
.mobile-nav li a:hover,
.mobile-nav li a.active{
    color: #088178;
}
.mobile-nav li a.active::after,
.mobile-nav li a:hover::after{
    content: "";
    width: 30%;
    height:2px;
    background: #088178;
    position: absolute;
    bottom: -4px;
    left:20px;
}
  p {
    text-align:center;
    font-size:30px;
  }

span {
  color:rgb(0, 255, 0)
}
.mobile-nav-enter-active,
.mobile-nav-leave-active {
  transition: all 1s ease;
}
 .mobile-nav-enter {
  transition: translateX(-250px);
 }
 .mobile-nav-enter-to {
  transform: translateX(0);
 }
 .mobile-nav-leave-to {
  transform: translateX(-250px);
 }
}
.profile {
  position: relative;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  color: #fff;
  background-color: #303030;
  float: right;

}
.profile-menu {
  position: absolute;
  border-radius: 10px;
  margin-right: 30px;
  top: 60px;
  /* right: 0; */
  width: 270px;
  background-color: #303030;
  box-shadow: 0 4px 0px -1px rgba(0,0,0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.001);
}
.mobile-profile-menu {
  position: absolute;
  top: -500px;
  right: 0;
  width: 250px;
  background-color: #303030;
  box-shadow: 0 4px 0px -1px rgba(0,0,0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.001);
}
.info {
  display: flex;
  align-items: center;
  padding: 15px;
  border-bottom: 1px solid #fff;
}
.initials {
  position: initial;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  color: #303030;
  background-color: #fff;
}
.right {
  flex: 1;
  margin-left: 24;
}
p:nth-child(1) {
    font-size:14px;
  }
  p:nth-child(2),
  p:nth-child(3) {
    font-size:12px;
  }
  .options {
    padding: 15px;
  }
  .option {
    text-decoration: none;
    color: #fff;
    display:flex;
    align-items: center;
    margin-bottom: 12px;

  }
  p{
    font-size: 14px;
    margin-left: 12px;
  }
  .option:last-child {
    margin-bottom: 0px;
  }
  .close {
    top: 0px;
    right: 0px;
    background-color: rgb(74, 124, 165);
    color: #050505;
  }
</style>
