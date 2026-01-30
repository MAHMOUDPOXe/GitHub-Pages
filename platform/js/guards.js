import { auth, db } from './firebase.js';
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

// حماية صفحة الطالب
export function protectStudentPage() {
    onAuthStateChanged(auth, async user => {
        if (!user) {
            window.location.href = "../login.html";
            return;
        }

        try {
            const studentSnap = await getDoc(doc(db, "users", user.uid));
            if (!studentSnap.exists()) {
                window.location.href = "../login.html";
            }
        } catch (error) {
            console.error(error);
            window.location.href = "../login.html";
        }
    });
}

// حماية صفحة ولي الأمر
export function protectParentPage() {
    onAuthStateChanged(auth, async user => {
        if (!user) {
            window.location.href = "../login.html";
            return;
        }

        try {
            // البريد الوهمي للولي الأمر: رقم@parent.edu
            const phone = user.email.split("@")[0];
            const parentSnap = await getDoc(doc(db, "parents", phone));
            if (!parentSnap.exists()) {
                window.location.href = "../login.html";
            }
        } catch (error) {
            console.error(error);
            window.location.href = "../login.html";
        }
    });
}

// حماية صفحة الأدمن
export function protectAdminPage() {
    onAuthStateChanged(auth, async user => {
        if (!user) {
            window.location.href = "../login.html";
            return;
        }

        // لو مش الأدمن الثابت، منع الدخول
        if (!(user.email === "admin" + "@eduplatform.com")) {
            window.location.href = "../login.html";
        }
    });
}
        console.error(error);
        alert;("حدث خطأ أثناء تسجيل الدخول. الرجاء المحاولة مرة أخرى.");
