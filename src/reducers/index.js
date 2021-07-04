import { combineReducers } from 'redux'

import firebase from 'firebase/app';
import 'firebase/firestore'
import 'firebase/auth'

firebase.initializeApp({
    // TO CHANGE
    apiKey: "AIzaSyB584UiluEGaiuxIOkbS72rpod-Cd2enzY",
    authDomain: "react-chat-app-1136f.firebaseapp.com",
    projectId: "react-chat-app-1136f",
    storageBucket: "react-chat-app-1136f.appspot.com",
    messagingSenderId: "1039014190091",
    appId: "1:1039014190091:web:34303796ed52c304923b0e",
    measurementId: "G-NXMQS34RWX"
    // TO CHANGE
  })

const allReducers = combineReducers({
    firebase: firebase,
    auth: firebase.auth(),
    firestore: firebase.firestore()
})

export default allReducers