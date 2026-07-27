# 📂 أماكن ملفات المشروع في الهاتف

## 🗺️ خريطة الملفات

### الموقع الرئيسي (حسب تثبيتك):

```
📁 /sdcard/Download/تطبيقي/          ← إذا حملته في التنزيلات
📁 /sdcard/Documents/تطبيقي/         ← إذا حملته في المستندات  
📁 ~/storage/shared/تطبيقي/          ← في Termux
📁 /storage/emulated/0/تطبيقي/       ← المسار الكامل
```

---

## 📱 من تطبيق Acode

### فتح المشروع:
1. افتح **Acode**
2. اضغط على **القائمة** (☰)
3. اختر **"Open Folder"**
4. انتقل إلى:
   - `Download/تطبيقي` أو
   - `Documents/تطبيقي`
5. اضغط **"Select Folder"**

### ستجد هذه الملفات:

```
📁 تطبيقي/
├── 📁 android/              ← مشروع Android
│   ├── 📁 app/
│   │   └── 📁 src/
│   │       └── 📁 main/
│   │           ├── 📁 assets/
│   │           ├── 📁 java/
│   │           └── 📁 res/
│   └── 📄 build.gradle
├── 📁 dist/                 ← ملفات البناء (جاهزة للنشر)
│   ├── 📄 index.html
│   ├── 📄 sw.js
│   ├── 📄 manifest.webmanifest
│   └── 📁 assets/
├── 📁 public/               ← الصور والأيقونات
│   ├── 📄 icon-192x192.png
│   └── 📄 icon-512x512.png
├── 📁 src/                  ← كود المصدر
│   ├── 📄 App.tsx          ← التطبيق الرئيسي
│   ├── 📄 main.tsx
│   └── 📁 utils/
├── 📁 .github/              ← GitHub Actions
│   └── 📁 workflows/
│       └── 📄 build-apk.yml
├── 📄 index.html            ← الصفحة الرئيسية
├── 📄 vite.config.ts        ← إعدادات Vite
├── 📄 capacitor.config.ts   ← إعدادات Capacitor
├── 📄 manifest.json         ← إعدادات PWA
├── 📄 package.json          ← حزم المشروع
├── 📄 DEPLOY.md            ← دليل النشر
├── 📄 QUICK_DEPLOY.sh      ← سكريبت النشر
└── 📄 README.md            ← التوثيق
```

---

## 🐧 من Termux

### الوصول للملفات:

```bash
# الذهاب لمجلد المشروع
cd /sdcard/Download/تطبيقي

# أو إذا كان في Documents
cd /sdcard/Documents/تطبيقي

# أو استخدم storage في Termux
cd ~/storage/shared/Download/تطبيقي
```

### أوامر مفيدة:

```bash
# رؤية الملفات
ls

# رؤية كل الملفات بشكل شجري
tree

# البحث عن ملف
find . -name "App.tsx"

# رؤية محتوى ملف
cat package.json

# تعديل ملف (باستخدام nano)
nano src/App.tsx

# نسخ ملف
cp vite.config.ts vite.config.ts.backup
```

---

## 🔍 البحث عن الملفات

### إذا نسيت مكان المشروع:

في **Termux**:
```bash
# البحث في التنزيلات
find /sdcard/Download -name "package.json" 2>/dev/null

# البحث في المستندات
find /sdcard/Documents -name "vite.config.ts" 2>/dev/null

# البحث عن مجلد node_modules (يأخذ وقت)
find /sdcard -name "node_modules" -type d 2>/dev/null | head -5
```

### عرض آخر الملفات المعدلة:
```bash
# في مجلد المشروع
ls -lt | head -10
```

---

## 📂 الملفات المهمة للتعديل

| الملف | الموقع | الغرض |
|-------|--------|-------|
| `App.tsx` | `src/App.tsx` | تعديل التطبيق |
| `vite.config.ts` | الجذر | إعدادات PWA |
| `index.html` | الجذر | الصفحة الرئيسية |
| `manifest.json` | `public/` | إعدادات التطبيق |
| `package.json` | الجذر | الحزم والأوامر |

---

## 🚀 الوصول السريع

### أنشئ اختصار في Termux:

```bash
# إضافة alias
alias app='cd /sdcard/Download/تطبيقي && ls'

# حفظه
echo "alias app='cd /sdcard/Download/تطبيقي && ls'" >> ~/.bashrc

# استخدامه
app
```

### أو سكريبت سريع:

```bash
# إنشاء سكريبت
cat > ~/go-to-app.sh << 'EOF'
#!/bin/bash
cd /sdcard/Download/تطبيقي || cd /sdcard/Documents/تطبيقي
echo "✅ أنت الآن في مجلد المشروع"
ls -la
EOF

# جعله قابل للتنفيذ
chmod +x ~/go-to-app.sh

# تشغيله
~/go-to-app.sh
```

---

## 📱 من مدير الملفات

### استخدم أي مدير ملفات:
1. افتح **مدير الملفات**
2. اذهب إلى **التنزيلات** أو **المستندات**
3. ابحث عن مجلد **"تطبيقي"**
4. اضغط عليه للدخول

---

## 💡 نصيحة ذهبية

### إنشاء ملف يوضح الموقع:

في **Termux**:
```bash
cd /sdcard/Download/تطبيقi

# كتابة المسار في ملف
echo "مسار المشروع: $(pwd)" > LOCATION.txt

echo "تم حفظ الموقع في LOCATION.txt"
```

---

## 🆘 هل لا تجد الملفات؟

### جرب هذه الأوامر في Termux:

```bash
# 1. طلب صلاحية الوصول
termux-setup-storage

# 2. البحث عن اسم الملف
find /sdcard -name "capacitor.config.ts" 2>/dev/null

# 3. عرض جميع مجلدات المشاريع
find /sdcard -name "package.json" -exec dirname {} \; 2>/dev/null

# 4. فحص التنزيلات
ls -la /sdcard/Download/
```

---

**هل وجدت الملفات؟** إذا لم تجدها، أخبرني أين قمت بفك الضغط أو حفظ المشروع! 📂
