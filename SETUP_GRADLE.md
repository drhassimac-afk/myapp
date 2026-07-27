# إعداد Gradle Wrapper

## المشكلة
ملف `gradle-wrapper.jar` غير موجود في المستودع لأنه ملف ثنائي كبير.

## الحلول

### 1. في GitHub Actions (تلقائي)
الـ workflow يقوم تلقائياً بتحميل `gradle-wrapper.jar` عند البناء.

### 2. في Termux (محلي)
```bash
cd android

# تثبيت Gradle
pkg install gradle -y

# إنشاء Wrapper
gradle wrapper --gradle-version 8.2

# أو تحميل الملف مباشرة
mkdir -p gradle/wrapper
curl -L -o gradle/wrapper/gradle-wrapper.jar https://raw.githubusercontent.com/gradle/gradle/v8.2.0/gradle/wrapper/gradle-wrapper.jar

# جعل gradlew قابل للتنفيذ
chmod +x gradlew
```

### 3. على الكمبيوتر
```bash
cd android

# إذا كان Gradle مثبت
gradle wrapper --gradle-version 8.2

# أو استخدم Maven/Gradle من Android Studio
```

## التحقق
```bash
ls -la android/gradle/wrapper/
# يجب أن ترى:
# - gradle-wrapper.jar
# - gradle-wrapper.properties
```

## ملاحظة
لا تقم برفع `gradle-wrapper.jar` على GitHub - فهو يُحمّل تلقائياً في CI/CD.
