# بناء APK مباشرة من الهاتف (Termux)

هذا الدليل يشرح كيفية بناء تطبيق Android APK مباشرة من هاتفك باستخدام Termux.

## 🎯 الطريقة 1: استخدام GitHub Actions (الأسهل والأفضل)

### الخطوات:

1. **ارفع المشروع على GitHub**
   ```bash
   # تثبيت git في Termux
   pkg install git
   
   # إعداد git
   git config --global user.name "Your Name"
   git config --global user.email "your@email.com"
   
   # رفع المشروع
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
   git push -u origin main
   ```

2. **GitHub سيبني APK تلقائياً!**
   - اذهب إلى تبويب **Actions** في المستودع
   - انتظر حتى ينتهي البناء (5-10 دقائق)
   - اذهب إلى **Releases** لتحميل APK

## 🛠️ الطريقة 2: بناء مباشر في Termux

### المتطلبات:
- Termux من F-Droid (ليس من Google Play)
- 2GB مساحة فارغة
- صبر 😄

### الخطوات:

#### 1. تحديث Termux
```bash
pkg update && pkg upgrade -y
```

#### 2. تثبيت المتطلبات
```bash
pkg install -y git nodejs-lts openjdk-17 gradle
```

#### 3. تثبيت Android SDK (صعب لكن ممكن)
```bash
# تثبيت SDK يدوياً
pkg install -y android-sdk

# أو تحميله يدوياً
mkdir -p $HOME/android-sdk
cd $HOME/android-sdk
wget https://dl.google.com/android/repository/commandlinetools-linux-11076708_latest.zip
unzip commandlinetools-linux-*.zip
```

#### 4. بناء المشروع
```bash
cd ~/storage/shared/تطبيقك
npm install
npm run build

# بناء APK (إذا كان SDK مثبت)
cd android
./gradlew assembleDebug
```

## 📱 الطريقة 3: استخدام Acode + Native API (الأسهل للمبتدئين)

بدلاً من Capacitor، يمكنك استخدام **Cordova** وهو أسهل في البناء:

### في Termux:
```bash
# تثبيت Cordova
npm install -g cordova

# إنشاء مشروع جديد
cordova create myapp com.example.myapp "تطبيقي"
cd myapp

# إضافة Android
cordova platform add android

# بناء APK
cordova build android
```

## 🚀 الطريقة 4: استخدام خدمات البناء السحابية

### 1. Appflow (Ionic)
- اذهب إلى: https://ionic.io/appflow
- اربط حساب GitHub
- ابنِ التطبيق بنقرة واحدة

### 2. Expo Application Services (EAS)
```bash
# تثبيت EAS
npm install -g eas-cli

# تسجيل الدخول
eas login

# بناء
 eas build --platform android
```

### 3. Firebase App Distribution
- ارفع APK يدوياً
- أو استخدم CLI

## 💡 النصيحة الذهبية

**لأفضل تجربة على الهاتف:**

1. استخدم **GitHub Actions** - فهو الأكثر موثوقية
2. رمز المشروع في Acode
3. ارفع على GitHub
4. انتظر البناء التلقائي
5. حمل APK من Releases

## 🔧 حل مشاكل شائعة

### مشكلة: `permission denied`
```bash
chmod +x android/gradlew
```

### مشكلة: `gradlew not found`
```bash
# في مجلد android
gradle wrapper
```

### مشكلة: ذاكرة غير كافية
```bash
# توسيع ذاكرة Termux
termux-setup-storage
```

## 📦 بديل: تطبيق جاهز للتعديل

إذا كان كل شيء معقداً، استخدم هذا السكريبت الجاهز:

```bash
# في Termux
pkg install git nodejs

# تحميل السكريبت
curl -o build.sh https://raw.githubusercontent.com/YOUR_REPO/main/build.sh

# تشغيل
chmod +x build.sh
./build.sh
```

---

**التوصية النهائية:** استخدم **GitHub Actions** - فهو لا يحتاج إلا رفع الكود، وسيبني APK تلقائياً! 🚀
