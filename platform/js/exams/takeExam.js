import { db, auth, serverTimestamp } from '../firebase.js';
import { doc, getDoc, setDoc } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";

const examContainer = document.getElementById("examContainer");
const submitBtn = document.getElementById("submitExam");
let currentExamId = null;
let questions = [];

// التأكد من تسجيل دخول الطالب
onAuthStateChanged(auth, async user => {
    if (!user) {
        window.location.href = "../login.html";
        return;
    }

    // جلب الامتحان من Firestore
    // هنا: نقدر نأخذ examId من query param: ?examId=exam_123456
    const urlParams = new URLSearchParams(window.location.search);
    currentExamId = urlParams.get("examId");
    if (!currentExamId) {
        alert("لم يتم تحديد الامتحان!");
        return;
    }

    try {
        const examSnap = await getDoc(doc(db, "exams", currentExamId));
        if (!examSnap.exists()) {
            alert("الامتحان غير موجود!");
            return;
        }

        const examData = examSnap.data();
        questions = examData.questions;

        renderExam(examData.title, questions);

    } catch (error) {
        console.error(error);
        alert("حدث خطأ أثناء جلب الامتحان: " + error.message);
    }
});

// عرض الامتحان في الصفحة
function renderExam(title, questions) {
    examContainer.innerHTML = `<h2>${title}</h2>`;
    questions.forEach((q, idx) => {
        const div = document.createElement("div");
        div.classList.add("exam-question");
        div.innerHTML = `
            <p><strong>السؤال ${idx + 1}:</strong> ${q.text}</p>
            ${q.image ? `<img src="${q.image}" alt="سؤال ${idx + 1}" class="question-img">` : ""}
            <div class="options">
                <label><input type="radio" name="q${idx}" value="A"> A) ${q.options.A}</label>
                <label><input type="radio" name="q${idx}" value="B"> B) ${q.options.B}</label>
                <label><input type="radio" name="q${idx}" value="C"> C) ${q.options.C}</label>
                <label><input type="radio" name="q${idx}" value="D"> D) ${q.options.D}</label>
            </div>
            <hr>
        `;
        examContainer.appendChild(div);
    });
}

// حساب النتيجة عند الضغط على Submit
submitBtn.addEventListener("click", async () => {
    let score = 0;
    questions.forEach((q, idx) => {
        const selected = document.querySelector(`input[name="q${idx}"]:checked`);
        if (selected && selected.value === q.correct) {
            score++;
        }
    });

    const user = auth.currentUser;
    if (!user) return;

    try {
        await setDoc(doc(db, "examResults", `${currentExamId}_${user.uid}`), {
            examId: currentExamId,
            studentId: user.uid,
            score,
            total: questions.length,
            submittedAt: serverTimestamp()
        });

        alert(`تم تسليم الامتحان!\nدرجتك: ${score} / ${questions.length}`);
        window.location.href = "../dashboard/student.html";

    } catch (error) {
        console.error(error);
        alert("حدث خطأ أثناء حفظ النتيجة: " + error.message);
    }
});
