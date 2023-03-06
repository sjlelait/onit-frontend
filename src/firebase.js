// Import the functions you need from the SDKs you need
import {
    initializeApp
} from 'firebase/app';
import {
    GoogleAuthProvider,
    signInWithPopup,
    signOut,
    getAuth
} from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC7axikAZAejyCa0j_97A9nKYewZhQzcwo",
    authDomain: "onit-f8dae.firebaseapp.com",
    projectId: "onit-f8dae",
    storageBucket: "onit-f8dae.appspot.com",
    messagingSenderId: "979218135476",
    appId: "1:979218135476:web:aa4fe90edf3c9f0e581ae1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Config the provider - Google
const provider = new GoogleAuthProvider();

// Create a reference to our firebase authentication instance
const auth = getAuth(app);

// Config login and logout workflows

function login() {
    return signInWithPopup(auth, provider);
}

function logout() {
    return signOut(auth);
}

// Export functionality so we can access it inside of React
export { login, logout, auth };