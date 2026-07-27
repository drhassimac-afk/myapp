# دليل بناء تطبيق Android

هذا الدليل يشرح كيفية تحويل تطبيق React هذا إلى تطبيق Android حقيقي (APK).

## المتطلبات

1. **Node.js** (الإصدار 18 أو أحدث)
2. **Android Studio** - [حمله من هنا](https://developer.android.com/studio)
3. **JDK** (Java Development Kit) - الإصدار 17 أو أحدث
4. **SDK Tools** - يتم تثبيتها تلقائياً مع Android Studio

## خطوات البناء

### 1. تثبيت المتطلبات

```bash
# تثبيت Capacitor CLI (إذا لم يكن مثبتاً)
npm install -g @capacitor/cli

# تثبيت حزم المشروع
npm install
```

### 2. بناء مشروع الويب

```bash
npm run build
```

هذا يُنشئ مجلد `dist` يحتوي على ملفات الإنتاج.

### 3. إضافة منصة Android

```bash
npx cap add android
```

هذا يُنشئ مجلد `android` يحتوي على مشروع Android كامل.

### 4. مزامنة المشروع

```bash
npx cap sync
```

هذا ينسخ ملفات الويب إلى مشروع Android.

### 5. فتح المشروع في Android Studio

```bash
npx cap open android
```

### 6. بناء APK

في Android Studio:

1. انتظر حتى ينتهي Gradle من التهيئة
2. اذهب إلى القائمة: **Build** → **Build Bundle(s) / APK(s)** → **Build APK(s)**
3. أو لإنشاء APK موقع (Signed APK):
   - **Build** → **Generate Signed Bundle / APK**
   - اختر **APK**
   - أنشئ **Keystore** جديد (أو استخدم واحد موجود)
   - أكمل عملية البناء

### 7. الحصول على ملف APK

بعد اكتمال البناء:

- **للتصحيح (Debug)**: `android/app/build/outputs/apk/debug/app-debug.apk`
- **للإنتاج (Release)**: `android/app/build/outputs/apk/release/app-release.apk`

## الأوامر السريعة

```bash
# بناء وتحديث Android
npm run build
npx cap sync android

# فتح في Android Studio
npx cap open android

# نسخ ملفات الويب فقط
npx cap copy android
```

## تخصيص التطبيق

### تغيير اسم التطبيق

عدل ملف `capacitor.config.ts`:

```typescript
const config: CapacitorConfig = {
  appId: 'com.yourcompany.yourapp',
  appName: 'اسم تطبيقك',
  webDir: 'dist',
};
```

### تغيير الأيقونة والشعار

1. ضع أيقوناتك في مجلد `resources/` (Android يحتاج أيقونات بمقاسات مختلفة)
2. استخدم أداة `cordova-res`:

```bash
npm install -g cordova-res
cordova-res android --skip-config --copy
```

### إعدادات Android المتقدمة

```typescript
const config: CapacitorConfig = {
  appId: 'com.myapp.reactapp',
  appName: 'تطبيقي',
  webDir: 'dist',
  android: {
    buildOptions: {
      keystorePath: 'release.keystore',
      keystoreAlias: 'myapp',
    },
    allowMixedContent: false,
    captureInput: true,
    webContentsDebuggingEnabled: false,
  },
};
```

## نشر التطبيق

### نشر على Google Play Store

1. أنشئ حساب مطور على Google Play (رسومة 25 دولار)
2. وقّع تطبيقك بـ Keystore
3. ارفع ملف AAB (Android App Bundle) على Play Console

### مشاركة APK مباشرة

يمكنك مشاركة ملف APK مباشرة، لكن المستخدمين يجب أن يفعلوا "Unknown Sources" في إعداداتهم.

## استكشاف الأخطاء

### مشكلة: Gradle sync failed

**الحل**: افتح Android Studio واترك Gradle يكمل التحميل.

### مشكلة: Web assets not found

**الحل**: تأكد من تشغيل `npm run build` و `npx cap sync`

### مشكلة: App crashes on startup

**الحل**: افتح Logcat في Android Studio لرؤية الأخطاء.

## موارد مفيدة

- [Capacitor Docs](https://capacitorjs.com/docs)
- [Android Developer Guide](https://developer.android.com/guide)
- [Publish on Play Store](https://developer.android.com/studio/publish)

---

بالتوفيق! 🚀
