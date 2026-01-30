// دوال مساعدة عامة

// تحقق من طول الرقم (11 رقم)
export function isValidPhone(phone) {
    return /^\d{11}$/.test(phone);
}

// تحويل رقم الطالب/ولي الأمر إلى Email وهمي
export function toEmail(phone, role = "student") {
    if (role === "parent") {
        return phone + "@parent.edu";
    } else {
        return phone + "@eduplatform.com";
    }
}

// دالة عرض رسالة تنبيه
export function showAlert(message) {
    alert(message);
}
