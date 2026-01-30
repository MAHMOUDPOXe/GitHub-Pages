import { db, serverTimestamp } from '../firebase.js';
import { doc, setDoc } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

const createForm = document.getElementById("createAssignmentForm");

createForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const title = document.getElementById("assignmentTitle").value.trim();
    const description = document.getElementById("assignmentDesc").value.trim();
    const fileInput = document.getElementById("assignmentFile");
    let fileURL = null;

    if (!title || !description) {
        alert("الرجاء إدخال عنوان الواجب والوصف");
        return;
    }

    // لاحقاً: رفع الملف على Firebase Storage
    // حالياً نخلي fileURL = null
    if (fileInput.files.length > 0) {
        fileURL = fileInput.files[0].name; // فقط اسم الملف للتجربة
    }

    try {
        const assignmentId = "assignment_" + Date.now();
        await setDoc(doc(db, "assignments", assignmentId), {
            title,
            description,
            file: fileURL,
            createdAt: serverTimestamp()
        });

        alert("تم إنشاء الواجب بنجاح!");
        createForm.reset();

    } catch (error) {
        console.error(error);
        alert("حدث خطأ أثناء إنشاء الواجب: " + error.message);
    }
});
