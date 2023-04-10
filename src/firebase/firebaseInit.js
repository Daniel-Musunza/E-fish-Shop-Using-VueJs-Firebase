import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/storage"


const firebaseConfig = {
  apiKey: "AIzaSyDT4-5LetHVVg8gEqXHFmRS8pUPNV-CGiU",
  authDomain: "blue-economy-c98d6.firebaseapp.com",
  projectId: "blue-economy-c98d6",
  storageBucket: "blue-economy-c98d6.appspot.com",
  messagingSenderId: "612934762026",
  appId: "1:612934762026:web:f77bf77c82c6aa64454d53",
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const firestamp = firebase.firestore.FieldValue.serverTimestamp;

  export { firestamp };
  export default firebaseApp.firestore();