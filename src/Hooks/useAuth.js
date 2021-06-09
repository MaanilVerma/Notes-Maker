import React, { useContext,useState,useEffect,createContext } from 'react'
import {projectAuth} from '../firebase/config'



const authContext = createContext();
// Provider component that wraps app and makes auth object ...
// ... available to any child component that calls useAuth().
export function ProvideAuth({ children }) {
    const auth = useProvideAuth();
    return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}
// Hook for child components to get the auth object ...
// ... and re-render when it changes.
export const useAuth = () => {
    return useContext(authContext);
};
// Provider hook that creates auth object and handles state
function useProvideAuth() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    // Wrap any Firebase methods we want to use making sure ...
    // ... to save the user to state.
    const signin = (email, password) => {
        return projectAuth.signInWithEmailAndPassword(email, password).then((response) => {
            setUser(response.user);
            return response.user;
        });
    };
    const signup = (email, password) => {
        return projectAuth.createUserWithEmailAndPassword(email, password);
    };
    const signout = () => {
        return projectAuth.signOut().then(() => {
            setUser(false);
        });
    };
    const sendPasswordResetEmail = (email) => {
        return projectAuth.sendPasswordResetEmail(email).then(() => {
            return true;
        });
    };
    // Subscribe to user on mount
    // Because this sets state in the callback it will cause any ...
    // ... component that utilizes this hook to re-render with the ...
    // ... latest auth object.
    useEffect(() => {
        const unsubscribe = projectAuth.onAuthStateChanged((user) => {
            if (user) {
                setUser(user);
                setLoading(false);
            } else {
                setUser(false);
            }
        });
        // Cleanup subscription on unmount
        return () => unsubscribe();
    }, []);
    // Return the user object and auth methods
    return {
        user,
        loading,
        setLoading,
        signin,
        signup,
        signout,
        sendPasswordResetEmail,
    };
}