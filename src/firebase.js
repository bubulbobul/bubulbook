import firebase from "firebase/app";

// Sub dependencies
// This for authorizaton within our app
import "firebase/auth";

// For make use of real time database
import "firebase/database";

// It allows to store media thing like media files
import "firebase/storage";

// Initialize Firebase
// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyDAexoQmNirFrGagwbZeAxjFidj1KRYk5M",
    authDomain: "bubulbook.firebaseapp.com",
    databaseURL: "https://bubulbook.firebaseio.com",
    projectId: "bubulbook",
    storageBucket: "bubulbook.appspot.com",
    messagingSenderId: "551020172900",
    appId: "1:551020172900:web:76e5847369b0343c"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase