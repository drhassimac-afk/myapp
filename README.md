# تطبيق Android باستخدام React + Capacitor

هذا المشروع يحول تطبيق React إلى تطبيق Android حقيقي باستخدام Capacitor.

## 📱 صور التطبيق

التطبيق يحتوي على:
- 🎨 واجهة عصرية بتصميم زجاجي (Glassmorphism)
- 🔢 عداد نقرات تفاعلي
- ⏰ ساعة حية في شريط الحالة
- 📊 شريط تنقل سفلي
- 🌈 تدرج لوني جميل

## 🚀 المتطلبات

1. **Node.js** 18+ 
2. **Android Studio** - [تحميل](https://developer.android.com/studio)
3. **JDK** 17+
4. **Android SDK** (يتم تثبيته مع Android Studio)

## 📦 خطوات التثبيت والبناء

### 1. تثبيت الحزم

```bash
npm install
```

### 2. بناء تطبيق الويب

```bash
npm run build
```

### 3. إضافة منصة Android (أول مرة فقط)

```bash
npx cap add android
```

### 4. مزامنة المشروع

```bash
npx cap sync
```

### 5. فتح Android Studio

```bash
npx cap open android
```

### 6. بناء APK

في Android Studio:
1. انتظر حتى ينتهي Gradle من التهيئة
2. اذهب إلى **Build** → **Build Bundle(s) / APK(s)** → **Build APK(s)**
3. سيتم حفظ الملف في: `android/app/build/outputs/apk/debug/app-debug.apk`

## 🔧 الأوامر المتاحة

```bash
# تشغيل على المتصفح
npm run dev

# بناء للإنتاج
npm run build

# مزامنة مع Android
npm run cap:sync

# نسخ ملفات الويب
npm run cap:copy

# فتح Android Studio
npm run cap:open:android

# بناء كامل
npm run build:android
```

## 📝 تخصيص التطبيق

### تغيير الاسم والمعرف

عدل ملف `capacitor.config.ts`:

```typescript
const config: CapacitorConfig = {
  appId: 'com.yourcompany.yourapp',
  appName: 'اسم تطبيقك',
  webDir: 'dist',
};
```

### تغيير الأيقونة

1. أنشئ أيقونات بمقاسات مختلفة (72x72, 96x96, 144x144, 192x192)
2. ضعها في `android/app/src/main/res/mipmap-*/`
3. أو استخدم الأمر:

```bash
npm install -g cordova-res
cordova-res android --skip-config --copy
```

## 🌟 مميزات التطبيق

- ✅ تطبيق Android native حقيقي
- ✅ دعم اللغة العربية الكامل
- ✅ تصميم عصري وجذاب
- ✅ أداء سريع وسلس
- ✅ دعم زر الرجوع في Android
- ✅ قابل للنشر على Google Play Store

## 📤 النشر على Google Play Store

1. أنشئ حساب مطور Google Play (25$)
2. وقّع التطبيق بـ Keystore
3. ارفع ملف AAB (Android App Bundle)
4. املأ معلومات التطبيق
5. انشر!

## 🐛 استكشاف الأخطاء

### Gradle sync failed
- تأكد من اتصال الإنترنت
- انتظر حتى ينتهي التحميل
- جرب **File** → **Sync Project with Gradle Files**

### App crashes on startup
- افتح Logcat لرؤية الأخطاء
- تأكد من `npm run build` و `npx cap sync`
- تأكد من وجود جميع الملفات في `dist/`

### Web assets not found
- شغّل `npm run build`
- ثم `npx cap copy` أو `npx cap sync`

## 📚 موارد مفيدة

- [Capacitor Docs](https://capacitorjs.com/docs)
- [Android Developer Guide](https://developer.android.com/guide)
- [React Documentation](https://react.dev)

## 📄 الترخيص

MIT License - حر في الاستخدام والتعديل والتوزيع

---

**صنع ب❤️ باستخدام React + Capacitor**
