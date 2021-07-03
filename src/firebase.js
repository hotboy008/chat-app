import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyAYoDLsfHFPYeTUV-xFcTcIdZnFD1MQuqE",
    authDomain: "firstproject-992e1.firebaseapp.com",
    databaseURL: "https://firstproject-992e1-default-rtdb.firebaseio.com",
    projectId: "firstproject-992e1",
    storageBucket: "firstproject-992e1.appspot.com",
    messagingSenderId: "491584850480",
    appId: "1:491584850480:web:d681e9bbc43a3224863bf5"
});

const database = firebase.database(firebaseApp);

export default firebaseApp;
export const auth = firebaseApp.auth();
export const db = database;