import firebase from 'firebase'
import firestore from 'firebase/firestore'


// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyC6G-fHCfvyqORpbib7ra21M29tDrnHKts",
  authDomain: "smoothies-vue-js.firebaseapp.com",
  databaseURL: "https://smoothies-vue-js.firebaseio.com",
  projectId: "smoothies-vue-js",
  storageBucket: "smoothies-vue-js.appspot.com",
  messagingSenderId: "461056069584",
  appId: "1:461056069584:web:590190153016fd0eb373d5",
  measurementId: "G-2MKJMVBWPY"
};
// Initialize Firebase
const firebaseAppp = firebase.initializeApp(firebaseConfig);
firebase.analytics();


firebaseApp.firestore().settings({ timestampsInSnapshots: true})

export default firebaseApp.firestore()