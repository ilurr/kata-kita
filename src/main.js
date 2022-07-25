import { createApp } from 'vue'
import App from './App.vue'

// Initialize Firebase
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBpulAWLOCFBT1i20b47fTplXer4E0SlaA",
  authDomain: "kompascom-play.firebaseapp.com",
  projectId: "kompascom-play",
  storageBucket: "kompascom-play.appspot.com",
  messagingSenderId: "744312773738",
  appId: "1:744312773738:web:8865b1328221739939fe13",
  measurementId: "G-YMB3CN59H1"
};

const fbApp = initializeApp(firebaseConfig);
getAnalytics(fbApp);

createApp(App).mount('#app')
