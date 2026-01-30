import { auth, db, serverTimestamp, arrayUnion } from './firebase.js';
import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";
import { doc, setDoc, getDoc, updateDoc } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

// فورم تسجيل الطالب
const registerForm = document.getElementById("registerForm");

registerForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    // جلب القيم من الفورم
    const name = document.getElementById("studentName").value.trim();
    const studentPhone = document.getElementById("studentPhone").value.trim();
    const parentPhone = document.getElementById("parentPhone").value.trim();
    const grade = document.getElementById("grade").value;
    const password = studentPhone; // الباسورد الافتراضي: رقم التليفون
    const confirmPassword = studentPhone;

    // التحقق من البيانات
    if (!name || !studentPhone || !parentPhone || !grade) {
        alert("الرجاء ملء جميع الحقول!");
        return;
    }

    if (studentPhone === parentPhone) {
        alert("رقم الطالب لا يمكن أن يكون نفس رقم ولي الأمر!");
        return;
    }

    if (studentPhone.length !== 11 || parentPhone.length !== 11) {
        alert("الرجاء إدخال أرقام تليفون صحيحة (11 رقم).");
        return;
    }

    try {
        // إنشاء Email وهمي للطالب
        const email = studentPhone + "@eduplatform.com";

        // تسجيل الطالب في Firebase Auth
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const studentUid = userCredential.user.uid;

        // حفظ بيانات الطالب في Firestore
        await setDoc(doc(db, "users", studentUid), {
            name,
            studentPhone,
            parentPhone,
            grade,
            role: "student",
            createdAt: serverTimestamp()
        });

        // إنشاء أو تحديث ولي الأمر
        const parentRef = doc(db, "parents", parentPhone);
        const parentSnap = await getDoc(parentRef);

        if (!parentSnap.exists()) {
            // إنشاء ولي أمر جديد
            await setDoc(parentRef, {
                username: parentPhone,
                password: parentPhone, // الباسورد هو رقم التليفون
                children: [studentUid],
                role: "parent",
                createdAt: serverTimestamp()
            });

            // لاحقًا: إرسال SMS / WhatsApp لولي الأمر بالباسورد
            console.log(`ولي الأمر: ${parentPhone}, الباسورد: ${parentPhone}`);
        } else {
            // إضافة الطالب الجديد لقائمة الأبناء إذا ولي الأمر موجود
            await updateDoc(parentRef, {
                children: arrayUnion(studentUid)
            });
        }

        alert(`تم إنشاء الحساب بنجاح!\nالباسورد للطالب هو رقم التليفون.`);
        registerForm.reset();
        window.location.href = "index.html"; // تحويل لتسجيل الدخول

    } catch (error) {
        console.error(error);
        alert("حدث خطأ أثناء إنشاء الحساب: " + error.message);
    }
});
