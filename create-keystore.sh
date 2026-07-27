#!/bin/bash

# ==========================================
# سكريبت إنشاء Keystore للتوقيع الرسمي
# ==========================================

echo "🔐 إنشاء Keystore للتوقيع الرسمي"
echo "================================="
echo ""

# التحقق من Java
if ! command -v keytool &> /dev/null; then
    echo "⚠️  Java غير مثبت. جاري التثبيت..."
    
    # محاولة التثبيت حسب النظام
    if command -v pkg &> /dev/null; then
        pkg install openjdk-17 -y
    elif command -v apt &> /dev/null; then
        sudo apt install openjdk-17-jdk -y
    else
        echo "❌ لا يمكن تثبيت Java. يرجى تثبيتها يدوياً."
        exit 1
    fi
fi

echo "✅ Java جاهز"
echo ""

# إعدادات Keystore
KEYSTORE_FILE="my-release-key.keystore"
ALIAS="my-key-alias"
VALIDITY=10000

# التحقد من وجود Keystore سابق
if [ -f "$KEYSTORE_FILE" ]; then
    echo "⚠️  ملف Keystore موجود مسبقاً!"
    read -p "هل تريد إنشاء واحد جديد؟ (y/n): " response
    if [ "$response" != "y" ]; then
        echo "❌ تم الإلغاء"
        exit 0
    fi
    mv "$KEYSTORE_FILE" "$KEYSTORE_FILE.backup.$(date +%s)"
    echo "✅ تم نسخ القديم احتياطياً"
fi

echo ""
echo "📝 أدخل معلومات Keystore:"
echo "--------------------------"

# طلب كلمة المرور
read -s -p "كلمة مرور Keystore (احفظها جيداً!): " STORE_PASS
echo ""
read -s -p "تأكيد كلمة المرور: " STORE_PASS_CONFIRM
echo ""

if [ "$STORE_PASS" != "$STORE_PASS_CONFIRM" ]; then
    echo "❌ كلمات المرور غير متطابقة!"
    exit 1
fi

# طلب معلومات الشهادة
echo ""
read -p "الاسم الكامل (First and Last Name): " NAME
read -p "الوحدة التنظيمية (Organization Unit) [اختياري]: " ORG_UNIT
read -p "اسم المؤسسة (Organization) [اختياري]: " ORG
read -p "المدينة (City): " CITY
read -p "الولاية/المحافظة (State): " STATE
read -p "رمز الدولة (Country Code, مثل: SA): " COUNTRY

echo ""
echo "🔨 جاري إنشاء Keystore..."
echo ""

# إنشاء Keystore
keytool -genkey -v \
    -keystore "$KEYSTORE_FILE" \
    -alias "$ALIAS" \
    -keyalg RSA \
    -keysize 2048 \
    -validity "$VALIDITY" \
    -storepass "$STORE_PASS" \
    -keypass "$STORE_PASS" \
    -dname "CN=$NAME, OU=$ORG_UNIT, O=$ORG, L=$CITY, ST=$STATE, C=$COUNTRY"

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ تم إنشاء Keystore بنجاح!"
    echo "================================"
    echo ""
    echo "📁 الملف: $KEYSTORE_FILE"
    echo "🔑 Alias: $ALIAS"
    echo "⏱️  صلاحية: $VALIDITY يوم"
    echo ""
    echo "⚠️  تحذيرات مهمة:"
    echo "   1. احفظ كلمة المرور في مكان آمن!"
    echo "   2. لا تفقد ملف Keystore!"
    echo "   3. لا ترفع Keystore على GitHub!"
    echo ""
    echo "📋 الخطوات التالية:"
    echo "   1. انسخ الملف إلى android/app/"
    echo "   2. أضف STORE_PASSWORD و KEY_PASSWORD في GitHub Secrets"
    echo "   3. شغل workflow لبناء APK موقع"
    echo ""
    
    # تحويل إلى Base64
    echo "🔄 تحويل إلى Base64..."
    base64 "$KEYSTORE_FILE" > "$KEYSTORE_FILE.base64.txt"
    echo "✅ تم إنشاء: $KEYSTORE_FILE.base64.txt"
    echo ""
    echo "📋 محتوى Base64 (انسخه لـ GitHub Secrets):"
    echo "-------------------------------------------"
    cat "$KEYSTORE_FILE.base64.txt"
    echo ""
    echo "-------------------------------------------"
    
    # نقل الملف
    read -p "هل تريد نسخ Keystore إلى android/app/? (y/n): " copy_response
    if [ "$copy_response" = "y" ]; then
        cp "$KEYSTORE_FILE" android/app/
        echo "✅ تم النسخ إلى android/app/"
    fi
    
else
    echo ""
    echo "❌ فشل إنشاء Keystore!"
    exit 1
fi
