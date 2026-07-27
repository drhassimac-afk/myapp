#!/bin/bash

# ==========================================
# سكريبت بناء APK من Termux
# ==========================================

echo "=========================================="
echo "  بناء تطبيق Android من Termux"
echo "=========================================="
echo ""

# الألوان
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# التحقق من Termux
if [ -z "$TERMUX_VERSION" ]; then
    echo -e "${YELLOW}⚠️  تحذير: هذا السكريبت مصمم لـ Termux${NC}"
fi

# التحقق من الاتصال بالإنترنت
echo "🔍 التحقق من الاتصال بالإنترنت..."
if ! ping -c 1 google.com &> /dev/null; then
    echo -e "${RED}❌ لا يوجد اتصال بالإنترنت!${NC}"
    exit 1
fi
echo -e "${GREEN}✅ متصل بالإنترنت${NC}"

echo ""
echo "📦 الخطوة 1: التحقق من المتطلبات..."

# التحقق من Node.js
if ! command -v node &> /dev/null; then
    echo -e "${YELLOW}⚠️  Node.js غير مثبت. جاري التثبيت...${NC}"
    pkg install -y nodejs-lts || {
        echo -e "${RED}❌ فشل تثبيت Node.js${NC}"
        exit 1
    }
fi
echo -e "${GREEN}✅ Node.js: $(node --version)${NC}"

# التحقق من Git
if ! command -v git &> /dev/null; then
    echo -e "${YELLOW}⚠️  Git غير مثبت. جاري التثبيت...${NC}"
    pkg install -y git
fi
echo -e "${GREEN}✅ Git موجود${NC}"

echo ""
echo "📂 الخطوة 2: تثبيت حزم المشروع..."

if [ ! -d "node_modules" ]; then
    npm install
    if [ $? -ne 0 ]; then
        echo -e "${RED}❌ فشل تثبيت الحزم${NC}"
        exit 1
    fi
else
    echo -e "${GREEN}✅ الحزم مثبتة مسبقاً${NC}"
fi

echo ""
echo "🔨 الخطوة 3: بناء تطبيق الويب..."

npm run build
if [ $? -ne 0 ]; then
    echo -e "${RED}❌ فشل بناء تطبيق الويب${NC}"
    exit 1
fi
echo -e "${GREEN}✅ تم بناء تطبيق الويب${NC}"

echo ""
echo "📱 الخطوة 4: إعداد Android..."

# التحقق من وجود Android SDK
if [ -z "$ANDROID_HOME" ]; then
    echo -e "${YELLOW}⚠️  Android SDK غير مثبت${NC}"
    echo ""
    echo "💡 لديك خيارات:"
    echo "   1. تثبيت Android SDK (معقد في Termux)"
    echo "   2. استخدام GitHub Actions (موصى به)"
    echo "   3. نقل الملفات لجهاز كمبيوتر"
    echo ""
    echo "هل تريد رفع المشروع على GitHub للبناء التلقائي؟ (y/n)"
    read -r response
    
    if [ "$response" = "y" ] || [ "$response" = "Y" ]; then
        echo ""
        echo "🚀 جاري إعداد GitHub..."
        
        if [ ! -d ".git" ]; then
            git init
            git add .
            git commit -m "Initial commit from Termux"
        fi
        
        echo ""
        echo "📋 اتبع هذه الخطوات:"
        echo "   1. أنشئ مستودع جديد على https://github.com/new"
        echo "   2. انسخ رابط المستودع"
        echo "   3. شغل هذا الأمر:"
        echo ""
        echo "      git remote add origin https://github.com/USERNAME/REPO.git"
        echo "      git push -u origin main"
        echo ""
        echo "   4. انتظر 5 دقائق ثم اذهب إلى:"
        echo "      https://github.com/USERNAME/REPO/releases"
        echo ""
        echo "✅ ستحصل على APK جاهز للتحميل!"
    fi
    
    exit 0
fi

echo -e "${GREEN}✅ Android SDK موجود${NC}"

# مزامنة Capacitor
echo ""
echo "🔄 مزامنة Capacitor..."

if [ ! -d "android" ]; then
    npx cap add android
fi

npx cap sync

# بناء APK
echo ""
echo "🔨 بناء APK..."

cd android || exit 1

if [ ! -f "gradlew" ]; then
    gradle wrapper
fi

chmod +x gradlew
./gradlew assembleDebug

if [ $? -eq 0 ]; then
    echo ""
    echo -e "${GREEN}==========================================${NC}"
    echo -e "${GREEN}✅ تم بناء APK بنجاح!${NC}"
    echo -e "${GREEN}==========================================${NC}"
    echo ""
    echo "📂 موقع الملف:"
    echo "   android/app/build/outputs/apk/debug/app-debug.apk"
    echo ""
    echo "🚀 يمكنك تثبيته الآن:"
    echo "   adb install android/app/build/outputs/apk/debug/app-debug.apk"
    echo ""
else
    echo -e "${RED}❌ فشل بناء APK${NC}"
    exit 1
fi
