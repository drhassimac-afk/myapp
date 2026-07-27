# 🚀 دليل سريع للعمل على الهاتف

## أفضل طريقة: PWA + GitHub Pages (5 دقائق فقط!)

### الخطوة 1: تعديل الكود في Acode
افتح المشروع في Acode وعدل ما تريد.

### الخطوة 2: رفع على GitHub (من Termux)

افتح Termux وشغل:

```bash
# الذهاب لمجلد المشروع
cd /sdcard/تطبيقك
# أو إذا كان في storage
cd ~/storage/shared/تطبيقك

# تثبيت git
pkg install git -y

# إعداد git
git config --global user.name "اسمك"
git config --global user.email "ايميلك@example.com"

# رفع المشروع
git init
git add .
git commit -m "نسخة أولى"
git remote add origin https://github.com/اسمك/المستودع.git
git push -u origin main
```

### الخطوة 3: تفعيل GitHub Pages
1. اذهب إلى المستودع في المتصفح
2. Settings → Pages
3. Source: Deploy from a branch
4. Branch: main / (root)
5. Save

### الخطوة 4: انتظر 5 دقائق
سيتم نشر التطبيق على:
`https://اسمك.github.io/المستودع`

### الخطوة 5: ثبّت التطبيق!
1. افتح الرابط في Chrome
2. اضغط ⋮ → "إضافة إلى الشاشة الرئيسية"
3. اضغط "تثبيت"

✅ **تم!** ستجد التطبيق مع باقي التطبيقات!

---

## الطريقة 2: GitHub Actions = APK جاهز

### رفع الكود (كما في الأعلى)

### انتظر البناء التلقائي
- اذهب إلى تبويب **Actions** في GitHub
- انتظر 5-10 دقائق
- اذهب إلى **Releases**
- حمل ملف APK
- ثبّته على هاتفك!

---

## ⚡ ملخص سريع

| الطريقة | الوقت | النتيجة | الصعوبة |
|---------|-------|---------|---------|
| PWA | 5 دقائق | تطبيق مثل Native | سهل جداً |
| GitHub Actions | 10 دقائق | APK حقيقي | سهل |
| Termux Build | 30+ دقيقة | APK حقيقي | صعب |

---

## 💡 نصيحة

**ابدأ بـ PWA** - فهو:
- ⚡ سريع التثبيت
- 🔄 يتحدث تلقائياً
- 📱 يعمل مثل التطبيقات
- 🌐 يعمل على كل الأجهزة

**ثم إذا أردت APK** - استخدم GitHub Actions!

---

**هل تحتاج مساعدة؟** افتح issue في GitHub أو اسأل هنا! 🆘
