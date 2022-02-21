import { initializeApp } from 'firebase/app';

const firebaseConfig = {
    apiKey: "AIzaSyA2dPdSn-UodaYJYhJh7ChWbYPGklgxX_8",
    authDomain: "tlvnft-44e12.firebaseapp.com",
    projectId: "tlvnft-44e12",
    storageBucket: "tlvnft-44e12.appspot.com",
    messagingSenderId: "530028702378",
    appId: "1:530028702378:web:75ec87e26ae8e54b38bed3"
};

let app;

const initApp = () => {
    console.log("initiated");
    app = initializeApp(firebaseConfig);
};

export { app, initApp };