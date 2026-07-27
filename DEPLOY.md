# 🚀 نشر PWA على GitHub Pages (5 دقائق فقط!)

## الخطوات:

### 1. أنشئ حساب على GitHub
https://github.com/signup

### 2. أنشئ مستودع جديد
- اسم المستودع: `my-app` (أي اسم)
- اجعله **Public**
- لا تضيف README

### 3. في Termux، شغل هذه الأوامر:

```bash
# الذهاب لمجلد المشروع
cd ~/storage/shared/تطبيقك

# تثبيت git
pkg install git -y

# إعداد git
git config --global user.name "اسمك"
git config --global user.email "ايميلك@gmail.com"

# تهيئة المشروع
git init
git add .
git commit -m "تطبيق PWA جاهز"

# ربط بالمستودع (استبدل USERNAME باسم المستخدم)
git remote add origin https://github.com/USERNAME/my-app.git
git branch -M main
git push -u origin main
```

### 4. فعّل GitHub Pages
1. افتح المستودع في المتصفح
2. اذهب إلى **Settings** → **Pages** (في القائمة اليسرى)
3. في **Source** اختر: **Deploy from a branch**
4. في **Branch** اختر: **main** و **/(root)**
5. اضغط **Save**

### 5. انتظر 2-5 دقائق

### 6. افتح الرابط
سيكون بالشكل:
```
https://USERNAME.github.io/my-app
```

### 7. ثبّت التطبيق!
- افتح الرابط في Chrome
- اضغط على القائمة (⋮)
- اختر **"تثبيت التطبيق"** أو **"Add to Home screen"**
- اضغط **"تثبيت"**

✅ **تم!** ستجد التطبيق في شاشة التطبيقات! 📱

---

## 🔄 تحديث التطبيق

عندما تعدل الكود:

```bash
cd ~/storage/shared/تطبيقك

# بناء المشروع
npm run build

# رفع التحديثات
git add .
git commit -m "تحديث جديد"
git push
```

انتظر 2 دقائق، ثم افتح التطبيق - سيجد التحديث تلقائياً! 🔄

---

## 🎨 تخصيص التطبيق

### تغيير الاسم
عدل في `vite.config.ts`:
```javascript
manifest: {
  name: 'اسم تطبيقك',
  short_name: 'اختصار',
}
```

### تغيير الألوان
```javascript
theme_color: '#لونك',
background_color: '#لونك',
```

### تغيير الأيقونة
استبدل ملف `public/icon-192x192.png`

---

## ✅ مميزات PWA

- ⚡ يعمل بدون إنترنت (بعد أول فتح)
- 📱 يظهر في شاشة التطبيقات
- 🔔 يدعم الإشعارات
- 🔄 يتحدث تلقائياً
- 📲 يفتح بملء الشاشة
- 🚀 أداء سريع

---

## 🆘 هل واجهت مشكلة؟

### "git: command not found"
```bash
pkg install git
```

### "Permission denied"
```bash
termux-setup-storage
```

### التطبيق لا يظهر
- تأكد من أن المستودع **Public**
- انتظر 5 دقائق
- افتح الرابط في Chrome (ليس في Acode)

---

**ابدأ الآن!** ارفع التطبيق وشاركني الرابط! 🚀
