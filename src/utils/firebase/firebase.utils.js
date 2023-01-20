import { initializeApp } from 'firebase/app';
import {getAuth,
        signInWithRedirect,
        signInWithPopup,
        GoogleAuthProvider} from 'firebase/auth'

import {
    getFirestore,doc,getDoc,setDoc
} from 'firebase/firestore'

//web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC_tBMeeMcFuuqBIRtq-jS0mklzgZXtRGM",
    authDomain: "crwn-clothing-db-a8823.firebaseapp.com",
    projectId: "crwn-clothing-db-a8823",
    storageBucket: "crwn-clothing-db-a8823.appspot.com",
    messagingSenderId: "966178974010",
    appId: "1:966178974010:web:57188382487a5b653f8803"
  };
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  const provider= new GoogleAuthProvider();

  provider.setCustomParameters({
    prompt:'select_account'
  });

  export const auth = getAuth();
  export const signInWithGooglePopup = () => signInWithPopup(auth,provider);

  export const db = getFirestore();
  export const createUserDocumentFromAuth = async (userAuth) =>{
    const userDocRef = doc(db, 'users' , userAuth.uid);
    
    const userSnapshot = await getDoc(userDocRef);

    if(!userSnapshot.exists()){
        const {displayName , email} = userAuth;
        const createdAt = new Date();

        try{
            await setDoc(userDocRef,{displayName,email,createdAt})
        }catch (error){
            console.log('error creating user\n',error)
        }
    }
    return userDocRef;
}
