import React, {createContext, useEffect, useState} from 'react';
import {
    getAuth,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup,
    onAuthStateChanged,
    signOut,
    updateProfile,
} from "firebase/auth";
import app from "../Firebase/Firebase.config.js";

export const AuthContext = createContext(null);
const auth = getAuth(app);

const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading ,setLoading] = useState(true);

    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const signIn = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    const logOut = () => {
        return signOut(auth);
    }

    const provider = new GoogleAuthProvider();
    const googleLogin = () => {
        setLoading(true);
        return signInWithPopup(auth, provider)
    }

    const updateUSerProfile = (user, name, url) => {
        return updateProfile(user, {
            displayName: name,
            photoURL: url,
        })
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
            console.log(user)
            setLoading(false);
        });

        return () => {
            return unsubscribe();
        }
    }, [])

    const AuthInfo = {
        user,
        createUser,
        signIn,
        googleLogin,
        loading,
        logOut,
        updateUSerProfile
    }
    return (
        <AuthContext.Provider value={AuthInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;