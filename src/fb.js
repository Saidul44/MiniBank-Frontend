import firebase from 'firebase/app'
import 'firebase/firestore'

// Initialize Firebase
var config = {
    apiKey: "AIzaSyDegZJfSkKpTwAxfCYax2tMd4YQZIDnHxk",
    authDomain: "vuetify-c9952.firebaseapp.com",
    databaseURL: "https://vuetify-c9952.firebaseio.com",
    projectId: "vuetify-c9952",
    storageBucket: "vuetify-c9952.appspot.com",
    messagingSenderId: "1095907494155"
  };
  firebase.initializeApp(config);


  const db= firebase.firestore();

  db.settings({ timestampsInSnapshots: true });

  export default db;