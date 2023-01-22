import { initializeApp } from 'firebase/app';
import {getAuth,
        signInWithRedirect,
        signInWithPopup,
        signInWithEmailAndPassword,
        GoogleAuthProvider,
        createUserWithEmailAndPassword,signOut} from 'firebase/auth'

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

  const googleProvider= new GoogleAuthProvider();

  googleProvider.setCustomParameters({
    prompt:'select_account'
  });

  export const auth = getAuth();

  export const signInWithGooglePopup = () => signInWithPopup(auth,googleProvider);

  export const signInWithGoogleRedirect = () => signInWithRedirect(auth,googleProvider);

  export const db = getFirestore();

  export const createUserDocumentFromAuth = async (userAuth,additionalInformation={}) =>{
    
    if(!userAuth) return;
    const userDocRef = doc(db, 'users' , userAuth.uid);
    
    const userSnapshot = await getDoc(userDocRef);

    if(!userSnapshot.exists()){
        const {displayName , email} = userAuth;
        const createdAt = new Date();

        try{
            await setDoc(userDocRef,{displayName,email,createdAt,...additionalInformation})
        }catch (error){
            console.log('error creating user\n',error)
        }
    }
    return userDocRef;
}

export const createAuthUserWithEmailAndPassword = async (email,password)=>{
if(!email || !password) return;

return await createUserWithEmailAndPassword(auth,email,password)
}

export const signInAuthUserWithEmailAndPassword = async (email,password)=>{
    if(!email || !password) return;
     
    return await signInWithEmailAndPassword(auth,email,password)
    }

export const signOutUser =async () =>{await signOut(auth)};