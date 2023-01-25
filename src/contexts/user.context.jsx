import { createContext,useState, useEffect } from "react";
import { onAuthStateChangedListener,signOutUser } from "../utils/firebase/firebase.utils.js";
//actual value to access
export const UserContext = createContext({
    currentUser:null,
    setCurrentUser: () => null,
});

//provider
export const UserProvider = ({children}) => {
    const [currentUser,setCurrentUser]=useState(null);
    const value = {currentUser,setCurrentUser};
    useEffect(()=>{
        //callback fn
        const unsubscribe = onAuthStateChangedListener((user)=>{
        if(user)
            createUserDocumentFromAuth(user);
        setCurrentUser(user)
        })
        //return unsubscribe;
    },[])
    return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};