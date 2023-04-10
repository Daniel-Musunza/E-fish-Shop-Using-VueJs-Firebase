import { createStore } from 'vuex';
import firebase from "firebase/app"
import "firebase/auth"
import db from "@/firebase/firebaseInit";

let cart = window.localStorage.getItem('cart');
let wishlist = window.localStorage.getItem('wishlist');
const store = createStore({
    state() {
        return {
            // blogs state
            blogPosts: [],
            postloaded: null,
            blogHTML: 'write your blog here...',
            blogTitle: "",
            blogIntro: "",
            blogPhotoName: "",
            blogPhotoFileURL: true,
            blogPhotoPreview: null,
            editPost: null,

            // auth state
            user: null,
            profileAdmin: null,
            profileEmail: null,
            profileFirstName: null,
            profileLastName: null,
            profileUsername: null,
                    profilePhotoName: null,
                    profilePhotoFileURL: null,
                    profilePhotoPreview: null,
            profileId: null,
            profileInitials: null,

            // products state
            productItems: [],
            productTitle: "",
            productPrice: "",
            productLocation: "",
            productPhotoName: "",
            //  images: [],
            //   productImagesURL: true,
            productPhotoFileURL: null,
            productPhotoPreview: null,
            editProducts: null,
            productDetails: "",
            buyOneFree: [],
            dagaa: [],
            cookedFish: [],
            featuredProducts: [],

            // cart state
            cartItems: cart ? JSON.parse(cart) : [],
            // wish list state
            wishList: wishlist ? JSON.parse(wishlist) : [],

            // messages state
            messages: [],
            messageContent: "",
            senderPhoneNo: "",
            messageSubject: "",
        };
    },
    getters: {
        // blogs getters
        blogPostsCards(state) {
            return state.blogPosts;
        },
        // products getters
        productItems: state => state.product,
        buyOneFree: state => state.buyOneFree,
        dagaa: state => state.dagaa,
        cookedFish: state => state.cookedFish,
        featuredProducts: state => state.featuredProducts,
        productItemById: (state) => (id) => {
          return state.productItems.find(productItem => productItem.id === id)
          ||  state.buyOneFree.find(productItem => productItem.id === id)
          ||  state.dagaa.find(productItem => productItem.id === id)
          ||  state.cookedFish.find(productItem => productItem.id === id)
          ||  state.featuredProducts.find(productItem => productItem.id === id)
        },

        wishList: state => state.wishList,
        // cart item
          cartItems: state => state.cartItems,
            cartTotal: state => {
                return state.cartItems.reduce((acc, productItem) => {
                return (productItem.quantity * productItem.productPrice) + acc;
                }, 0);
            },
            cartQuantity: state => {
                return state.cartItems.reduce((acc, productItem) => {
                return productItem.quantity + acc;
                }, 0);
            }
    },
    mutations: {
        // blogs mutations
        newBlogPost(state, payload) {
            state.blogHTML = payload;
        },
        updateBlogTitle(state, payload) {
            state.blogTitle = payload;
        },
        updateBlogIntro(state, payload) {
            state.blogIntro = payload;
        },
        fileNameChange (state, payload) {
            state.blogPhotoName = payload;
        },
        createFileURL (state, payload) {
            state.blogPhotoFileURL = payload;
        },
        openPhotoPreview(state) {
            state.blogPhotoPreview = !state.blogPhotoPreview;
        },
        toggleEditPost (state, payload) {
            state.editPost = payload;
        },
        setBlogState(state, payload) {
            state.blogTitle = payload.blogTitle;
            state.blogIntro = payload.blogIntro;
            state.blogHTML = payload.blogHTML;
            state.blogPhotoFileURL = payload.blogCoverPhoto;
            state.blogPhotoName = payload.blogCoverPhotoName;
        },
        filterBlogPost(state, payload) {
            state.blogPosts = state.blogPosts.filter((post) => post.blogID !== payload);
        },

        // auth mutations
        updateUser(state, payload){
            state.user = payload;
        },
        setProfileAdmin(state, payload) {
            state.profileAdmin = payload;
            console.log(state.profileAdmin);
        },
                photoFileNameChange (state, payload) {
                    state.profilePhotoName = payload;
                },
                createPhotoFileURL (state, payload) {
                    state.profilePhotoFileURL = payload;
                },
                openProfilePhotoPreview(state) {
                    state.profilePhotoPreview = !state.profilePhotoPreview;
                },
                setProfilePhotoState (state, payload) {
                    state.profilePhotoFileURL = payload.profileCoverPhoto;
                    state.profilePhotoName = payload.profileCoverPhotoName;
                },
        setProfileInfo (state, doc) {
            state.profileId = doc.id;
            state.profileEmail = doc.data().email;
            state.profileFirstName = doc.data().firstName;
            state.profileLastName = doc.data().lastName;
            state.profileUsername = doc.data().username;
        },
        setProfileInitials (state){
            state.profileInitials = state.profileFirstName.match(/(\b\S)?/g).join("")+ state.profileLastName.match(/(\b\S)?/g).join("");
        },
        changeFirstName(state, payload){
            state.profileFirstName = payload
        },
        changeLastName(state, payload){
            state.profileLastName = payload
        },
        changeUsername(state, payload){
            state.profileUsername = payload
        },
        // product mutations
        updateProductTitle(state, payload) {
            state.productTitle = payload;
        },
        updateProductDetails(state, payload) {
            state.productDetails = payload;
        },
                // createProductImagesURL(state, payload) {
                //     state.productImagesURL = payload;
                // },
                // createProductImages(state, payload) {
                //     state.productImages = payload;
                // },
        updateProductPrice(state, payload) {
            state.productPrice = payload;
        },
        updateProductBrand(state, payload) {
          state.productBrand = payload;
        },
            productFileNameChange (state, payload) {
                state.productPhotoName = payload;
            },
            // uploadImages (state, payload) {
            //     state.images = payload;
            // },
            createProductFileURL (state, payload) {
                state.productPhotoFileURL = payload;
            },
        openProductPhotoPreview(state) {
            state.productPhotoPreview = !state.productPhotoPreview;
        },
        toggleEditProducts (state, payload) {
            state.editProducts = payload;
        },
            setProductState(state, payload) {
                state.productTitle = payload.productTitle;
                state.productDetails = payload.productDetails;
                state.productLocation = payload.productLocation;
                state.productPrice = payload.productPrice;
                state.productPhotoFileURL = payload.productCoverPhoto;
                state.productPhotoName = payload.productCoverPhotoName;
                        // state.images = payload.images;
                        // state.productImages = payload.productImagesNames;
            },
        filterProduct(state, payload) {
            state.productItems = state.productItems.filter((productItem) => productItem.productID !== payload)
        },
        filterBuyOneFree(state, payload){
            state.buyOneFree = state.buyOneFree.filter((productItem) => productItem.productID !== payload)
        },
        filterDagaa(state, payload){
            state.dagaa = state.dagaa.filter((productItem) => productItem.productID !== payload)
        },
        filterCookedFish(state, payload){
            state.cookedFish = state.cookedFish.filter((productItem) => productItem.productID !== payload)
        },
        filterFeaturedProducts(state, payload){
            state.featuredProducts = state.featuredProducts.filter((productItem) => productItem.productID !== payload)
        },
        // messages mutations
        setMessagesState(state, payload) {
            state.senderPhoneNo = payload.senderPhoneNo;
            state.messageSubject = payload.messageSubject;
            state.messageContent = payload.messageContent;
        },
        filterMessages(state, payload) {
            state.messages = state.messages.filter((message) => message.messageID !== payload);
        },
        // cart mutation
        addToCart(state, productItem){
            let found = state.cartItems.find(product => product.productID == productItem.productID );
            if(found){
              found.quantity++;
              found.totalPrice = found.quantity * found.productPrice;
            }else{
              state.cartItems.push(productItem);
            }
            this.commit('saveData');
        },
        saveToWishlist (state, productItem){
            state.wishList.push(productItem);
            this.commit('saveWishList');
        },
        saveData(state){
            window.localStorage.setItem('cart', JSON.stringify(state.cartItems));
        },
        saveWishList(state){
            window.localStorage.setItem('wishlist', JSON.stringify(state.wishList));
        },
        deleteFromWishList(state, productItem){
            let index = state.wishList.indexOf(productItem);
            state.wishList.splice(index,1);
            this.commit('saveWishList');
        },
        removeFromCart(state, productItem){
            let index = state.cartItems.indexOf(productItem);
            state.cartItems.splice(index,1);
            this.commit('saveData');
        },
        decrementQuantity(state, productItem) {
            let found = state.cartItems.find(product => product.productID == productItem.productID);
            if (found && found.quantity > 1) {
              found.quantity--;
              found.totalPrice = found.quantity * found.productPrice;
            }
            this.commit('saveCart');
        },
    },
    actions: {
     // blogs actions
        async getPost ({ state }) {
            const dataBase = await db.collection('blogPosts').orderBy('date', 'desc');
            const dbResults = await dataBase.get();
             dbResults.forEach((doc) => {
                if (!state.blogPosts.some((post) => post.blogID === doc.id)) {
                    const data = {
                        blogID: doc.data().blogID,
                        blogHTML: doc.data().blogHTML,
                        blogCoverPhoto: doc.data().blogCoverPhoto,
                        blogTitle: doc.data().blogTitle,
                        blogIntro: doc.data().blogIntro,
                        blogDate: doc.data().date,
                        blogCoverPhotoName: doc.data().blogCoverPhotoName,
                    };
                    state.blogPosts.push(data);
                }
            });
            state.postLoaded = true;
            console.log(state.blogPosts);
        },
        async updatePost({ commit, dispatch }, payload) {
            commit('filterBlogPost', payload);
            await dispatch("getPost");
        },
        async deletePost({ commit }, payload) {
            const getPost = await db.collection("blogPosts").doc(payload);
            await getPost.delete();
            commit('filterBlogPost', payload)
        },
        // auth actions
        async getProfilePhoto ({state}) {
            const dataBase = await db.collection('users').doc(firebase.auth().currentUser.uid);
            const dbResults = await dataBase.get();
            dbResults.forEach((doc) => {
                if (!state.users.some((currentUser) => currentUser.uid === doc.id)) {
                    const data = {
                        uid: doc(firebase.auth().currentUser.uid),
                        profileCoverPhoto: doc.data().profileCoverPhoto,
                        profileCoverPhotoName: doc.data().profileCoverPhotoName,
                    };
                    state.users.doc(firebase.auth().currentUser.uid).push(data);
                }
            });
            state.postLoaded = true;
            console.log(state.users);
        },
        async updateProfilePhoto({ dispatch }) {
            await dispatch("getProfilePhoto");
        },
        async getCurrentUser({commit}, user) {

                const dataBase = await db.collection('users').doc(firebase.auth().currentUser.uid);
                const dbResults = await dataBase.get();
                commit("setProfileInfo",  dbResults
                // .forEach((doc) => {
                //     const data = {
                //         profileCoverPhoto: doc.data().profileCoverPhoto,
                //         profileCoverPhotoName: doc.data().profileCoverPhotoName,
                //     };
                //     state.users.push(data);
                // }),
        );
        commit("setProfileInitials");
        const token = await user.getIdTokenResult();
        const admin = await token.claims.admin;
        commit("setProfileAdmin", admin);
        },
        async updateUserSettings({commit, dispatch, state}) {
            const dataBase = await db.collection("users").doc(state.profileId);
            await dataBase.update ({
                firstName: state.profileFirstName,
                lastName: state.profileLastName,
                username: state.profileUsername,
            });
            await dispatch("getCurrentUser");
            commit("setProfileInitials");
        },
        // product actions
        async getProductItems ({ state }) {
            const dataBase = await db.collection('productItems').orderBy('date', 'desc');
            const dbResults = await dataBase.get();
             dbResults.forEach((doc) => {
                if (!state.productItems.some((productItem) => productItem.productID === doc.id)) {
                    const data = {
                        productID: doc.data().productID,
                        productCoverPhoto: doc.data().productCoverPhoto,
                            // images: doc.data().images,
                        productTitle: doc.data().productTitle,
                        productDetails: doc.data().productDetails,
                        productLocation: doc.data().productLocation,
                        productPrice: doc.data().productPrice,
                        productDate: doc.data().date,
                        productCoverPhotoName: doc.data().productCoverPhotoName,
                            // productImagesNames: doc.data().productImagesNames,
                    };
                    state.productItems.push(data);
                }
            });
            state.postLoaded = true;
        },
        async updateProduct({ commit, dispatch }, payload) {
            commit('filterProduct', payload);
            await dispatch("getProductItems");
        },
        async deleteProduct({ commit }, payload) {
            const getProductItems = await db.collection("productItems").doc(payload);
            await getProductItems.delete();
            commit('filterProduct', payload)
        },
        async getBuyOneFree ({ state }) {
            const dataBase = await db.collection('buyOneFree').orderBy('date', 'desc');
            const dbResults = await dataBase.get();
             dbResults.forEach((doc) => {
                if (!state.buyOneFree.some((productItem) => productItem.productID === doc.id)) {
                    const data = {
                        productID: doc.data().productID,
                        productCoverPhoto: doc.data().productCoverPhoto,
                        // images: doc.data().images,
                        productTitle: doc.data().productTitle,
                        productDetails: doc.data().productDetails,
                        productBrand: doc.data().productBrand,
                        productPrice: doc.data().productPrice,
                        productDate: doc.data().date,
                        productCoverPhotoName: doc.data().productCoverPhotoName,
                        // productImagesNames: doc.data().productImagesNames,
                    };
                    state.buyOneFree.push(data);
                }
            });
            state.postLoaded = true;
        },
        async getDagaa ({ state }) {
            const dataBase = await db.collection('upcommingSeason').orderBy('date', 'desc');
            const dbResults = await dataBase.get();
             dbResults.forEach((doc) => {
                if (!state.dagaa.some((productItem) => productItem.productID === doc.id)) {
                    const data = {
                        productID: doc.data().productID,
                        productCoverPhoto: doc.data().productCoverPhoto,
                        // images: doc.data().images,
                        productTitle: doc.data().productTitle,
                        productDetails: doc.data().productDetails,
                        productLocation: doc.data().productLocation,
                        productPrice: doc.data().productPrice,
                        productDate: doc.data().date,
                        productCoverPhotoName: doc.data().productCoverPhotoName,
                        // productImagesNames: doc.data().productImagesNames,
                    };
                    state.upcommingSeason.push(data);
                }
            });
            state.postLoaded = true;
        },
        async getCookedFish ({ state }) {
            const dataBase = await db.collection('repair').orderBy('date', 'desc');
            const dbResults = await dataBase.get();
             dbResults.forEach((doc) => {
                if (!state.repair.some((productItem) => productItem.productID === doc.id)) {
                    const data = {
                        productID: doc.data().productID,
                        productCoverPhoto: doc.data().productCoverPhoto,
                        // images: doc.data().images,
                        productTitle: doc.data().productTitle,
                        productDetails: doc.data().productDetails,
                        productLocation: doc.data().productLocation,
                        productPrice: doc.data().productPrice,
                        productDate: doc.data().date,
                        productCoverPhotoName: doc.data().productCoverPhotoName,
                        // productImagesNames: doc.data().productImagesNames,
                    };
                    state.repair.push(data);
                }
            });
            state.postLoaded = true;
        },
        async getFeaturedProducts ({ state }) {
            const dataBase = await db.collection('featuredProducts').orderBy('date', 'desc');
            const dbResults = await dataBase.get();
             dbResults.forEach((doc) => {
                if (!state.featuredProducts.some((productItem) => productItem.productID === doc.id)) {
                    const data = {
                        productID: doc.data().productID,
                        productCoverPhoto: doc.data().productCoverPhoto,
                        // images: doc.data().images,
                        productTitle: doc.data().productTitle,
                        productDetails: doc.data().productDetails,
                        productBrand: doc.data().productBrand,
                        productPrice: doc.data().productPrice,
                        productDate: doc.data().date,
                        productCoverPhotoName: doc.data().productCoverPhotoName,
                        // productImagesNames: doc.data().productImagesNames,
                    };
                    state.featuredProducts.push(data);
                }
            });
            state.postLoaded = true;
        },
        // messages actions
        async getMessages ({ state }) {
            const dataBase = await db.collection('messages').orderBy('date', 'desc');
            const dbResults = await dataBase.get();
             dbResults.forEach((doc) => {
                if (!state.messages.some((message) => message.messageID === doc.id)) {
                    const data = {
                        messageID: doc.data().messageID,
                        messageSubject: doc.data().messageSubject,
                        messageContent: doc.data().messageContent,
                        senderPhoneNo: doc.data().senderPhoneNo,
                        username: doc.data().username,
                        email: doc.data().email,
                        messageDate: doc.data().date,
                    };
                    state.messages.push(data);
                }
            });
            state.postLoaded = true;
        },
        async deleteMessage({ commit }, payload) {
            const getMessages = await db.collection("messages").doc(payload);
            await getMessages.delete();
            commit('filterMessages', payload)
        }
    }
});

export default store;
