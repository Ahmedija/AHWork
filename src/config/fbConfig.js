import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

// Initialize Firebase
var config = {
    apiKey: "AIzaSyBvduf-bp3tfVv3DqL61piwXaqqQX3i8lE",
    authDomain: "social-network-clone-c2fa4.firebaseapp.com",
    databaseURL: "https://social-network-clone-c2fa4.firebaseio.com",
    projectId: "social-network-clone-c2fa4",
    storageBucket: "social-network-clone-c2fa4.appspot.com",
    messagingSenderId: "5683763830"
};

firebase.initializeApp(config);
firebase.firestore().settings({ timestampsInSnapshots: true })

export default firebase;
