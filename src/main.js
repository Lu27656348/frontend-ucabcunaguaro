import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDOsp26aNi64AYLyWZR7QFS2dBzqtvR4_4",
  authDomain: "ucab-cunaguaro.firebaseapp.com",
  projectId: "ucab-cunaguaro",
  storageBucket: "ucab-cunaguaro.appspot.com",
  messagingSenderId: "65938448688",
  appId: "1:65938448688:web:946f3e8849a9b7cd3568f5"
};

initializeApp(firebaseConfig);

const app = createApp(App)

app.use(router)

app.mount('#app')
