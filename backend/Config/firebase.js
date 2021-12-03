// Import the functions you need from the SDKs you need

const admin = require('firebase-admin');

// TODO: Add SDKs for Firebase products that you want to use

admin.initializeApp({
    apiKey: 'AIzaSyD9QY-8aZ8M-KSkUxqIoY1-NP-RxP7dpBI',

    authDomain: 'cookingbook-e73d0.firebaseapp.com',

    projectId: 'cookingbook-e73d0',

    storageBucket: 'cookingbook-e73d0.appspot.com',

    messagingSenderId: '626597050868',

    appId: '1:626597050868:web:2148335465f05382afa1a1',

    measurementId: 'G-TM7FES3L1H',
});

// Initialize Firebase
const db = admin.firestore();

module.exports = db;
