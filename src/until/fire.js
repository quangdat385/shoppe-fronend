import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, FacebookAuthProvider, signInWithPopup } from 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyA5_YdN9mvkf7zqN9P_RJlx4ZgSscHpO_E",
    authDomain: "shopdemo-63104.firebaseapp.com",
    projectId: "shopdemo-63104",
    storageBucket: "shopdemo-63104.appspot.com",
    messagingSenderId: "40174129981",
    appId: "1:40174129981:web:7e17cf191299c4b55bab54",
    measurementId: "G-CJM6E63DY0"
};

const app = initializeApp(firebaseConfig);
export default app;

export const auth = getAuth(app);
export const google = new GoogleAuthProvider();
export const facebook = new FacebookAuthProvider();

export const loginSocial = async (provider) => {
    const result = await signInWithPopup(auth, provider);
    return result
};


