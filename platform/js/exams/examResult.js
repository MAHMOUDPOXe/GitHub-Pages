import { db, auth } from '../firebase.js';
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";

const resultContainer = document.getElementById("resultContainer");

// التأكد من تسجيل دخول الطالب
onAuthStateChanged(auth, async user => {
    if (!user) {
        window.location.href = "../login.html";
        return;
    }

    // جلب examId من query param: ?examId=exam_123456
    const urlParams = new URLSearchParams(window.location.search);
    const examId = urlParams.get("examId");
    if (!examId) {
        resultContainer.innerHTML = "<p>لم يتم تحديد الامتحان!</p>";
        return;
    }

    try {
        const resultSnap = await getDoc(doc(db, "examResults", `${examId}_${user.uid}`));
        if (!resultSnap.exists()) {
            resultContainer.innerHTML = "<p>لم يتم تقديم هذا الامتحان بعد!</p>";
            return;
        }

        const resultData = resultSnap.data();
        const score = resultData.score;
        const total = resultData.total;
        const percentage = ((score / total) * 100).toFixed(2);

        resultContainer.innerHTML = `
            <h2>نتيجة الامتحان</h2>
            <p>عدد الأسئلة: ${total}</p>
            <p>عدد الإجابات الصحيحة: ${score}</p>
            <p>النسبة: ${percentage}%</p>
            ${percentage >= 50 ? '<p style="color:green;"><strong>نجاح</strong></p>' : '<p style="color:red;"><strong>رسوب</strong></p>'}
        `;

    } catch (error) {
        console.error(error);
        resultContainer.innerHTML = `<p>حدث خطأ أثناء جلب النتيجة: ${error.message}</p>`;
    }
});
