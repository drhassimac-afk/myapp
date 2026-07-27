# 🔐 دليل توقيع APK رسمي

هذا الدليل يشرح كيفية إنشاء APK **موقع رقمياً** ليعمل على أي جهاز Android.

## ✅ لماذا التوقيع مهم؟

- ✅ **قابل للتثبيت** على أي جهاز Android
- ✅ **لا يحتاج** إلى إعدادات "مصادر غير معروفة"
- ✅ **يظهر** مع التطبيقات الأخرى
- ✅ **قابل للتحديث** بدون فقد البيانات
- ✅ **آمن** وموثوق

---

## 🚀 الطريقة 1: GitHub Actions (الأسهل والأفضل)

### الخطوات:

#### 1. إنشاء Keystore (من Termux أو الكمبيوتر)

```bash
# في Termux أو أي Terminal
keytool -genkey -v -keystore my-release-key.keystore -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000
```

**أدخل المعلومات:**
- كلمة المرور: اختر كلمة قوية واحفظها!
- الاسم: اسمك
- الوحدة التنظيمية: اسم شركتك (أو اتركه فارغاً)
- المدينة: مدينتك
- الدولة: رمز الدولة (مثل SA للسعودية)

#### 2. تحويل Keystore إلى Base64

```bash
# في Termux
base64 my-release-key.keystore > keystore-base64.txt

# أو في Linux/Mac
base64 -i my-release-key.keystore -o keystore-base64.txt
```

#### 3. إضافة Secrets في GitHub

1. اذهب إلى مستودعك على GitHub
2. **Settings** → **Secrets and variables** → **Actions**
3. اضغط **New repository secret**
4. أضف هذه الأسرار:

| الاسم | القيمة |
|-------|--------|
| `KEYSTORE_BASE64` | محتوى ملف keystore-base64.txt |
| `STORE_PASSWORD` | كلمة مرور Keystore |
| `KEY_PASSWORD` | كلمة مرور المفتاح |

#### 4. رفع الكود

```bash
git add .
git commit -m "إعداد التوقيع الرسمي"
git push
```

#### 5. احصل على APK!

- اذهب إلى **Actions** في GitHub
- انتظر حتى ينتهي البناء
- اذهب إلى **Releases**
- حمل ملف **app-release.apk**

✅ **جاهز للتثبيت على أي جهاز!**

---

## 🛠️ الطريقة 2: البناء المحلي (من الكمبيوتر)

### المتطلبات:
- Android Studio
- JDK 17+

### الخطوات:

#### 1. إنشاء Keystore

في Android Studio:
1. **Build** → **Generate Signed Bundle / APK**
2. اختر **APK**
3. اضغط **Create new...**
4. املأ البيانات:
   - **Key store path**: اختر مكان الحفظ
   - **Password**: كلمة مرور قوية
   - **Alias**: اسم المفتاح
   - **Validity**: 10000 يوم
   - **Certificate**: املأ بياناتك

#### 2. بناء APK

1. اختر **release** من القائمة
2. اضغط **Finish**
3. انتظر حتى ينتهي البناء

#### 3. موقع APK

```
android/app/build/outputs/apk/release/app-release.apk
```

---

## 📱 الطريقة 3: Termux (للمتقدمين)

### تثبيت Java

```bash
pkg install openjdk-17 -y
```

### إنشاء Keystore

```bash
cd ~/storage/shared/تطبيقك/android/app

keytool -genkey -v -keystore my-release-key.keystore -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000
```

### بناء APK

```bash
cd ~/storage/shared/تطبيقك/android

# جعل gradlew قابل للتنفيذ
chmod +x gradlew

# بناء APK موقع
./gradlew assembleRelease
```

### النتيجة

```
app/build/outputs/apk/release/app-release.apk
```

---

## 🔐 نصائح أمنية مهمة

### حماية Keystore:

1. **لا ترفع** ملف Keystore على GitHub
2. **احفظ نسخة** احتياطية في مكان آمن
3. **تذكر** كلمات المرور (لا يمكن استعادتها!)
4. **لا تشارك** Keystore مع أحد

### إضافة Keystore لـ .gitignore:

```bash
echo "*.keystore" >> .gitignore
echo "*.jks" >> .gitignore
```

---

## ✅ التحقق من APK

### التأكد من التوقيع:

```bash
# في Termux أو الكمبيوتر
jarsigner -verify -verbose -certs app-release.apk
```

### معلومات التوقيع:

```bash
keytool -list -v -keystore my-release-key.keystore
```

---

## 🚀 نشر التطبيق

### بعد الحصول على APK:

1. **ارسله** لأصدقائك عبر واتساب أو تلغرام
2. **ارفعه** على Google Drive
3. **انشره** على موقعك الشخصي
4. **ارفعه** على Google Play Store (يحتاج حساب مطور)

---

## 🆨 حل المشاكل

### "Keystore file not found"
```bash
# تأكد من وجود الملف
ls android/app/*.keystore
```

### "Password verification failed"
- تأكد من كتابة كلمة المرور بشكل صحيح
- تأكد من تعيين STORE_PASSWORD و KEY_PASSWORD

### "APP not installed"
- تأكد من أن APK موقع (Release وليس Debug)
- ألغِ تثبيت الإصدار القديم أولاً

---

## 📊 الفرق بين Debug و Release

| النوع | التوقيع | الاستخدام | الحجم |
|-------|---------|-----------|-------|
| Debug | تلقائي | تطوير | أكبر |
| Release | يدوي | توزيع | أصغر |
| Signed | رسمي | إنتاج | مضغوط |

---

**🎉 بعد التوقيع، تطبيقك جاهز للعالم!**
