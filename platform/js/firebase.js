// استيراد Firebase Modular SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";
import { getFirestore, serverTimestamp, arrayUnion } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-storage.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-analytics.js";

// إعداد Firebase الخاص بالمشروع
const firebaseConfig = {
    apiKey: "AIzaSyDsuTke-gAWMWFxzu2SVQhRafJA0Gwfnmo",
    authDomain: "eduplatform-35480.firebaseapp.com",
    projectId: "eduplatform-35480",
    storageBucket: "eduplatform-35480.appspot.com",
    messagingSenderId: "935211568634",
    appId: "1:935211568634:web:882caa05110e21e2d6e843",
    measurementId: "G-Y2ZP56JXGW"
};

// تهيئة Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
const analytics = getAnalytics(app);

// تصدير لاستخدامه في باقي ملفات JS
export { auth, db, storage, analytics, serverTimestamp, arrayUnion };
