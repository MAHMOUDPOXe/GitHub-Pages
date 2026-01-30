import { db, auth, serverTimestamp } from '../firebase.js';
import { doc, setDoc } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";

const submitForm = document.getElementById("submitAssignmentForm");

onAuthStateChanged(auth, user => {
    if (!user) {
        window.location.href = "../login.html";
    }
});

submitForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const assignmentId = document.getElementById("assignmentId").value.trim();
    const fileInput = document.getElementById("solutionFile");

    if (!assignmentId || fileInput.files.length === 0) {
        alert("الرجاء اختيار الواجب ورفع الحل");
        return;
    }

    try {
        const user = auth.currentUser;
        await setDoc(doc(db, "assignmentSubmissions", `${assignmentId}_${user.uid}`), {
            assignmentId,
            studentId: user.uid,
            file: fileInput.files[0].name, // لاحقاً ممكن نرفع الملف فعلياً على Storage
            submittedAt: serverTimestamp()
        });

        alert("تم تسليم الواجب بنجاح!");
        submitForm.reset();

    } catch (error) {
        console.error(error);
        alert("حدث خطأ أثناء تسليم الواجب: " + error.message);
    }
});
