#!/bin/bash

echo "=========================================="
echo "    بناء تطبيق Android - APK Builder"
echo "=========================================="
echo ""

# التحقق من وجود Node.js
if ! command -v node &> /dev/null; then
    echo "❌ خطأ: Node.js غير مثبت!"
    echo "قم بتحميله من: https://nodejs.org"
    exit 1
fi

echo "✅ Node.js موجود: $(node --version)"

# التحقق من وجود npm
if ! command -v npm &> /dev/null; then
    echo "❌ خطأ: npm غير مثبت!"
    exit 1
fi

echo "✅ npm موجود: $(npm --version)"

echo ""
echo "📦 الخطوة 1: تثبيت الحزم..."
npm install
if [ $? -ne 0 ]; then
    echo "❌ فشل تثبيت الحزم!"
    exit 1
fi
echo "✅ تم تثبيت الحزم بنجاح"

echo ""
echo "🔨 الخطوة 2: بناء تطبيق الويب..."
npm run build
if [ $? -ne 0 ]; then
    echo "❌ فشل بناء تطبيق الويب!"
    exit 1
fi
echo "✅ تم بناء تطبيق الويب بنجاح"

echo ""
echo "📱 الخطوة 3: مزامنة مع Android..."

# التحقق من وجود مجلد android
if [ ! -d "android" ]; then
    echo "🆕 إضافة منصة Android لأول مرة..."
    npx cap add android
    if [ $? -ne 0 ]; then
        echo "❌ فشل إضافة منصة Android!"
        exit 1
    fi
fi

npx cap sync android
if [ $? -ne 0 ]; then
    echo "❌ فشل مزامنة Android!"
    exit 1
fi
echo "✅ تم مزامنة Android بنجاح"

echo ""
echo "=========================================="
echo "✅ تم بناء التطبيق بنجاح!"
echo "=========================================="
echo ""
echo "📂 الملفات المتاحة:"
echo "   • مشروع Android: ./android/"
echo "   • ملفات الويب: ./dist/"
echo ""
echo "🚀 الخطوات التالية:"
echo "   1. افتح Android Studio:"
echo "      npx cap open android"
echo ""
echo "   2. انتظر حتى ينتهي Gradle sync"
echo ""
echo "   3. اذهب إلى Build → Build APK(s)"
echo ""
echo "   4. سيتم حفظ APK في:"
echo "      android/app/build/outputs/apk/debug/app-debug.apk"
echo ""
echo "📖 للمزيد من المعلومات، راجع README.md"
echo ""
