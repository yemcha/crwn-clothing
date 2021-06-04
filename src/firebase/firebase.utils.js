import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    
        apiKey: "AIzaSyBByRK9UDyqBF4hf5dWW6tvZnPBsjwAgeE",
        authDomain: "crwn-db-8e10b.firebaseapp.com",
        projectId: "crwn-db-8e10b",
        storageBucket: "crwn-db-8e10b.appspot.com",
        messagingSenderId: "914165175075",
        appId: "1:914165175075:web:e4db43cc76d05c0c71b296",
        measurementId: "G-YERCBQQZKH"
      
};

export const createUserProfileDocument = 
async (userAuth, additionalData) => {
    if(!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get();
    if(!snapShot.exist){
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await userRef.set({
              displayName,
              email,
              createdAt,
              ...additionalData 
            })

        }catch (error){
            console.log('error creating user', error.message);
        }
    }

    return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;