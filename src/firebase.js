import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyAYoDLsfHFPYeTUV-xFcTcIdZnFD1MQuqE",
    authDomain: "firstproject-992e1.firebaseapp.com",
    projectId: "firstproject-992e1",
    storageBucket: "firstproject-992e1.appspot.com",
    messagingSenderId: "491584850480",
    appId: "1:491584850480:web:c48b69742eb94ac8863bf5"  
});

const database = firebase.database(firebaseApp);

export default firebaseApp;
export const auth = firebaseApp.auth();
export const db = database;