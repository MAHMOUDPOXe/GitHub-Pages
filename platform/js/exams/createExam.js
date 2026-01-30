import { db, serverTimestamp } from '../firebase.js';
import { doc, setDoc, arrayUnion } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

// عناصر الفورم
const createExamForm = document.getElementById("createExamForm");
const questionsContainer = document.getElementById("questionsContainer");
const numQuestionsInput = document.getElementById("numQuestions");

// توليد حقول الأسئلة بناءً على عدد الأسئلة
numQuestionsInput.addEventListener("change", () => {
    const num = parseInt(numQuestionsInput.value);
    questionsContainer.innerHTML = "";

    if (isNaN(num) || num < 1 || num > 50) {
        alert("الرجاء إدخال عدد أسئلة صحيح بين 1 و50");
        return;
    }

    for (let i = 1; i <= num; i++) {
        const questionDiv = document.createElement("div");
        questionDiv.classList.add("question-box");

        questionDiv.innerHTML = `
            <h3>السؤال ${i}</h3>
            <textarea placeholder="نص السؤال..." required></textarea>
            <input type="file" accept="image/*" class="question-image">
            <label>الاختيارات:</label>
            <input type="text" placeholder="اختيار A" required>
            <input type="text" placeholder="اختيار B" required>
            <input type="text" placeholder="اختيار C" required>
            <input type="text" placeholder="اختيار D" required>
            <label>الإجابة الصحيحة:</label>
            <select required>
                <option value="">اختر الإجابة الصحيحة</option>
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
                <option value="D">D</option>
            </select>
            <hr>
        `;
        questionsContainer.appendChild(questionDiv);
    }
});

// حفظ الامتحان في Firestore
createExamForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const examTitle = document.getElementById("examTitle").value.trim();
    if (!examTitle) {
        alert("ادخل عنوان الامتحان");
        return;
    }

    const questionsDivs = document.querySelectorAll(".question-box");
    const questions = [];

    questionsDivs.forEach((div, index) => {
        const [textArea, imageInput, optA, optB, optC, optD, correctSelect] = div.querySelectorAll("textarea, input, select");

        const question = {
            text: textArea.value,
            options: {
                A: optA.value,
                B: optB.value,
                C: optC.value,
                D: optD.value
            },
            correct: correctSelect.value || null,
            image: null // لاحقًا نقدر نرفع الصورة على Firebase Storage
        };

        questions.push(question);
    });

    try {
        const examId = "exam_" + Date.now(); // معرف الامتحان
        await setDoc(doc(db, "exams", examId), {
            title: examTitle,
            questions,
            createdAt: serverTimestamp()
        });

        alert("تم إنشاء الامتحان بنجاح!");
        createExamForm.reset();
        questionsContainer.innerHTML = "";

    } catch (error) {
        console.error(error);
        alert("حدث خطأ أثناء حفظ الامتحان: " + error.message);
    }
});
