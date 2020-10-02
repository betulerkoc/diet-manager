import * as firebase from 'firebase';
import 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyAwhu5edO24apIWJRGtxZdJZFf6gzWygQ0",
  authDomain: "diet-manager-c6b11.firebaseapp.com",
  databaseURL: "https://diet-manager-c6b11.firebaseio.com",
  projectId: "diet-manager-c6b11",
  storageBucket: "diet-manager-c6b11.appspot.com",
  messagingSenderId: "413425508275",
  appId: "1:413425508275:web:3185b7a3116048f751f5c6"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase.firestore();