import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/storage"


const firebaseConfig = {
  apiKey: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
  authDomain: "xxxxxxxxxxxxxxxxxxxxxxxx",
  projectId: "xxxxxxxxxxxxxxxxxxxxxxxx",
  storageBucket: "xxxxxxxxxxxxxxxxx",
  messagingSenderId: "xxxxxxxxxxxxxxx",
  appId: "xxxxxxxxxxxxxxxxxxxxxxxxxx",
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const firestamp = firebase.firestore.FieldValue.serverTimestamp;

  export { firestamp };
  export default firebaseApp.firestore();