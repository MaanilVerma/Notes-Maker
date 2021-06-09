import firebase from 'firebase/app';
//authentication module
import 'firebase/auth';

import 'firebase/storage';
import 'firebase/firestore'


const firebaseConfig = {
    apiKey: "AIzaSyAdeHyQJrXHg4X_T16uN4VleV2yybr--Qo",
    authDomain: "notemaker-eeb95.firebaseapp.com",
    projectId: "notemaker-eeb95",
    storageBucket: "notemaker-eeb95.appspot.com",
    messagingSenderId: "581206635978",
    appId: "1:581206635978:web:308549476bc6a1dd2d8b33"
};

  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const projectFirestore = firebaseApp.firestore();
 
  
  const projectAuth = firebase.auth();
  const timestamp = firebase.firestore.FieldValue.serverTimestamp();
  export { projectFirestore,projectAuth,timestamp};
 