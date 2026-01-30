import { auth, db } from './firebase.js';
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const phoneOrEmail = document.getElementById("phone").value.trim();
    const password = document.getElementById("password").value;

    if (!phoneOrEmail || !password) {
        alert("الرجاء ملء جميع الحقول!");
        return;
    }

    try {
        let email;

        // إذا المدخل رقم وليس email
        if (!phoneOrEmail.includes("@")) {

            // تحقق هل هو ولي أمر
            const parentSnap = await getDoc(doc(db, "parents", phoneOrEmail));
            if (parentSnap.exists()) {
                email = phoneOrEmail + "@parent.edu"; // email وهمي لولي الأمر
            } else {
                email = phoneOrEmail + "@eduplatform.com"; // email وهمي للطالب
            }

        } else {
            email = phoneOrEmail;
        }

        // تسجيل الدخول عبر Firebase Auth
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const uid = userCredential.user.uid;

        // تحقق هل الطالب
        const studentSnap = await getDoc(doc(db, "users", uid));
        if (studentSnap.exists()) {
            window.location.href = "dashboard/student.html";
            return;
        }

        // تحقق هل ولي الأمر
        const parentSnap = await getDoc(doc(db, "parents", phoneOrEmail));
        if (parentSnap.exists()) {
            window.location.href = "dashboard/parent.html";
            return;
        }

        // الأدمن ثابت
        if (phoneOrEmail === "admin" && password === "admin@2026") {
            window.location.href = "dashboard/admin.html";
            return;
        }

        alert("الحساب غير موجود أو كلمة المرور خاطئة!");

    } catch (error) {
        console.error(error);
        alert("حدث خطأ أثناء تسجيل الدخول: " + error.message);
    }
});
