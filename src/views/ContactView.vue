<template>
  <div class="container-fluid">
    <section  id="page-header" class="blog-header">
    <h2 style="color:#040859; font-weight: 900">#lets talk</h2>
    <p style="color:#040859;font-weight: 500;"> LEAVE A MESSAGE. we love to here from you</p>
    </section>
    <section id="contact-details" class="section-p1">
        <div class="details">
            <span>GET IN TOUCH</span>
            <h3>Visit one of our agency locations or contact us today</h3>
            <h4>Main Shop</h4>
            <div>
                <li>
                    <i class="fa-solid fa-map"></i>
                    <p>Tom Mboya Road, Street 32, Mombasa</p>
                </li>
                <li>
                  <i class="fa-solid fa-envelope"></i>
                    <p>musunzafestus2019@gmail.com</p>
                </li>
                <li>
                    <i class="fa-brands fa-facebook"></i>
                    <p>Dev. Musunza Festus</p>
                </li>
                <li>
                  <i class="fa-sharp fa-solid fa-window-frame-open"></i>
                    <p>Monday to saturday: 9:00am to 16:00 pm</p>
                </li>
            </div>
        </div>
        <div class="map">
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d127356.38356797968!2d39.52813081640625!3d-4.043477099999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x184013cba2ae3f81%3A0x2b4403a8307dba91!2sTechnical%3B%20University%20Mombasa!5e0!3m2!1ssw!2ske!4v1653111847309!5m2!1ssw!2ske" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
        </div>
    </section>
    <section id="form-details">
        <TheLoader v-show="loading" />
        <form v-if="user" @submit.prevent="sendMessage" action="">
            <div :class="{ invisible: !error }" class="err-message">
              <p style="color: red"><span>Error:</span>{{ this.errorMsg }}</p>
            </div>
            <span>LEAVE A MESSAGE</span>
            <h3>we love to hear from you</h3>
            <!-- placeholder="Your Name"  -->
            <input type="text" v-model="username">
            <input type="email" v-model="email">
            <input type="text" placeholder="Phone Number" v-model="senderPhoneNo">
            <input type="text" placeholder="Subject"  v-model="messageSubject">
            <textarea name="" id="" cols="30" rows="10" placeholder="Your Message"  v-model="messageContent"></textarea>
            <button class="normal">Submit</button>
        </form>
        <div class="else" v-else>
         <h3> Kindly sign In/Sign Up to Contact us </h3>
        </div>
        <div class="people">
            <div>
            <img src="@/assets/img/banner/BuyoneFree_65.jpg" alt="">
            <p><span>Musunza Festus</span>ICT Manager <br> Phone: +254794711950 <br> Email: musunzafestus2019@gmail.com</p>
            </div>
            <div>
            <img src="@/assets/img/banner/BuyoneFree_65.jpg" width=10px height=15px alt="Muye">
            <p><span>Kudura Muye</span>Senior Marketing Manager <br> Phone: +254703181936 <br> Email: musunzafestus2019@gmail.com</p>
            </div>
            <div>
            <img src="@/assets/img/banner/BuyoneFree_67.jpg" width=10px height=15px alt="">
            <p><span>Brian Murimi</span>Finance Manager <br> Phone: +254703326479 <br> Email: brianmurimispony@gmail.com</p>
            </div>
            <div>
            <img src="@/assets/img/banner/BuyoneFree_68.jpg" width=10px height=15px alt="">
            <p><span>Emmanuel Atundo</span>Delivery Manager <br> Phone: +254748470551 <br> Email: emmanuelatundo3@gmail.com</p>
            </div>
        </div>
    </section>
    <section id="newsletter" class="section-p1 section-m1">
            <div class="newstext">
                <h4>Sign Up For Newsletters</h4>
                <p> Get E-mail Updates about our latest shop and <span>Special offers.</span></p>
            </div>
            <div class="form">
                <input type="email" placeholder="example@gmail.com">
                <button class="normal">Sign Up</button>
            </div>
    </section>
  </div>
</template>
<script>
import TheLoader from "@/components/TheLoader";
import db from "@/firebase/firebaseInit";
export default {
    name: "ContactView",
    data() {
        return {
          error: null,
          errorMsg: null,
          loading: null,
        };
      },
    components: { TheLoader,},
    methods: {
        async sendMessage() {
          // if ( this.messageContent !=="" && this.messageSubject !=="" ) {
              this.loading = true;
              const timestamp = await Date.now();
              const dataBase = await db.collection("messages").doc();
              await dataBase.set({
                  messageID: dataBase.id,
                  profileId: this.profileId,
                  username: this.username,
                  email: this.email,
                  senderPhoneNo: this.senderPhoneNo,
                  messageContent: this.messageContent,
                  messageSubject: this.messageSubject,
                  date: timestamp,
                });
              await this.$store.dispatch("getMessages");
              this.loading = false;
          //   }
          // this.error = true;
          // this.errorMsg = "Please ensure You have Filled all Sections";
          // setTimeout(() => {
          //   this.error = false;
          // }, 5000);
          // return;
        },
    },
    computed: {
        user() {
          return this.$store.state.user;
        },
        profileId() {
          return this.$store.state.profileId;
        },
        username: {
          get() {
            return this.$store.state.profileUsername;
          },
        },
        email: {
          get() {
            return this.$store.state.profileEmail;
          },
        },
    }
}
</script>
<style scoped>
.else h3 {
  text-align: center;
  font-weight: 600;
}
</style>
