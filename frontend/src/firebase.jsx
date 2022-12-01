import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider} from "firebase/auth";


const firebaseConfig = {
    apiKey: "AIzaSyCuYKZLkvuXh78NebmRFRK5b6kyKhWJNJU",
    authDomain: "video-173f9.firebaseapp.com",
    projectId: "video-173f9",
    storageBucket: "video-173f9.appspot.com",
    messagingSenderId: "264842000841",
    appId: "1:264842000841:web:0fc036d0cddb5d1d079018"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const provider = new GoogleAuthProvider();
export default app;

