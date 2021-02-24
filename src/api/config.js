import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/functions';
import 'firebase/database';
import 'firebase/storage';


const firebaseConfig = {
    apiKey: "AIzaSyDauFMMLexVA4B9QdhHXznke5LpihYoQqc",
    authDomain: "allergy-app-7655b.firebaseapp.com",
    databaseURL: "https://allergy-app-7655b.firebaseio.com",
    projectId: "allergy-app-7655b",
    storageBucket: "allergy-app-7655b.appspot.com",
    messagingSenderId: "1097780243497",
    appId: "1:1097780243497:web:749cab26aacca18a51c038",
    measurementId: "G-S4NMX5DS3S"
};



firebase.initializeApp(firebaseConfig);

firebase.functions().useFunctionsEmulator('http://localhost:5001');

export const fb = firebase;
export const fs = firebase.firestore();
export const db = firebase.database()
export const auth = firebase.auth();
export const storage = firebase.storage()
export const functions = firebase.functions()