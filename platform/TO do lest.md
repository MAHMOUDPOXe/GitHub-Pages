platform/
│
├── [x] index.html                  # الصفحة الرئيسية
├── [x] login.html                  # تسجيل دخول (طالب / ولي أمر / أدمن)
├── [x] register-student.html       # تسجيل طالب جديد
├── [x] settings.html               # إعدادات الطالب (تغيير كلمة المرور أول مرة)
│
├── dashboard/
│   ├── [x] student.html            # لوحة الطالب
│   ├── [x] parent.html             # لوحة ولي الأمر
│   └── [x] admin.html              # لوحة الأدمن
│
├── exam/                      # كل ما يخص الامتحانات
│   ├── [x] create-exam.html        # الأدمن: إنشاء امتحان (عدد الأسئلة + الأسئلة)
│   ├── [x] edit-exam.html          # تعديل امتحان
│   ├── [x] take-exam.html          # الطالب: حل الامتحان
│   ├── [x] exam-result.html        # نتيجة الامتحان
│
├── assignments/                # الواجبات
│   ├── [x] create-assignment.html  # الأدمن: إنشاء واجب
│   ├── [x] submit-assignment.html  # الطالب: تسليم واجب
│   └── [x] review-assignment.html  # الأدمن: تصحيح
│
├── css/
│   ├── [x] main.css                # ستايل عام (ألوان – خطوط)
│   ├── [x] auth.css                # تسجيل / دخول / تسجيل طالب
│   ├── [x] dashboard.css           # لوحات التحكم
│   ├── [x] exams.css               # الامتحانات
│   └── [x] assignments.css         # الواجبات
│
├── js/
│   ├── [x] firebase.js             # إعداد Firebase
│   ├── [x] auth.js                 # تسجيل الدخول + التحويل حسب الدور
│   ├── [x] register.js             # تسجيل الطالب
│   ├── [x] guards.js               # حماية الصفحات حسب الدور
│   ├── [x] utils.js                # دوال مساعدة
│   │
│   ├── exams/
│   │   ├── [x] createExam.js       # إنشاء امتحان
│   │   ├── [x] takeExam.js         # حل الامتحان
│   │   └── [x] examResult.js       # حساب النتيجة
│   │
│   └── assignments/
│       ├── [x] createAssignment.js
│       └── [x] submitAssignment.js
│
├── assets/
│   ├── images/
│   │   ├── exams/              # صور الأسئلة
│   │   └── profiles/
│   └── icons/
│
└── [ ] README.md
