import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyDBKgKy_KMEprJqdeCvE1_EA4632_YFQTU",
	authDomain: "mon-enorme-tronc.firebaseapp.com",
	projectId: "mon-enorme-tronc",
	storageBucket: "mon-enorme-tronc.appspot.com",
	messagingSenderId: "797972630200",
	appId: "1:797972630200:web:4864801518072fefe2824d"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
