import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import firebase from "firebase";
import "firebase/firestore";
import reportWebVitals from './reportWebVitals';

// const firebase = require('firebase/app');
// require('firebase/firestore');

var firebaseConfig = {
  apiKey: "AIzaSyAdeHyQJrXHg4X_T16uN4VleV2yybr--Qo",
  authDomain: "notemaker-eeb95.firebaseapp.com",
  projectId: "notemaker-eeb95",
  storageBucket: "notemaker-eeb95.appspot.com",
  messagingSenderId: "581206635978",
  appId: "1:581206635978:web:308549476bc6a1dd2d8b33"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);



ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('evernote-container')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
