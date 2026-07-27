#!/bin/bash

# ==========================================
# سكريبت نشر سريع على GitHub Pages
# ==========================================

echo "🚀 نشر PWA على GitHub Pages"
echo "================================"
echo ""

# ألوان
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

# التحقق من git
if ! command -v git &> /dev/null; then
    echo -e "${YELLOW}⚠️  جاري تثبيت git...${NC}"
    pkg install git -y
fi

# التحقق من Node.js
if ! command -v node &> /dev/null; then
    echo -e "${YELLOW}⚠️  جاري تثبيت Node.js...${NC}"
    pkg install nodejs-lts -y
fi

echo -e "${GREEN}✅ المتطلبات جاهزة${NC}"
echo ""

# بناء المشروع
echo "🔨 جاري بناء المشروع..."
npm run build

if [ $? -ne 0 ]; then
    echo -e "${RED}❌ فشل بناء المشروع${NC}"
    exit 1
fi

echo -e "${GREEN}✅ تم بناء المشروع${NC}"
echo ""

# إعداد git
echo "📦 جاري إعداد git..."
git config --global user.name "PWA Developer"
git config --global user.email "pwa@example.com"

# تهيئة المشروع
if [ ! -d ".git" ]; then
    git init
    echo -e "${GREEN}✅ تم تهيئة git${NC}"
fi

# إنشاء branch gh-pages
git checkout -b gh-pages 2>/dev/null || git checkout gh-pages

# إضافة الملفات
git add dist -f
git commit -m "Deploy PWA" --allow-empty

# دفع الملفات
echo ""
echo -e "${YELLOW}📤 جاري الرفع على GitHub...${NC}"
echo ""

if git remote | grep -q "origin"; then
    git subtree push --prefix dist origin gh-pages
else
    echo -e "${RED}❌ لا يوجد remote!${NC}"
    echo ""
    echo "ℹ️  يجب إضافة remote أولاً:"
    echo "   git remote add origin https://github.com/USERNAME/REPO.git"
    echo ""
    exit 1
fi

if [ $? -eq 0 ]; then
    echo ""
    echo -e "${GREEN}================================${NC}"
    echo -e "${GREEN}✅ تم النشر بنجاح!${NC}"
    echo -e "${GREEN}================================${NC}"
    echo ""
    echo "🔗 رابط التطبيق:"
    echo "   https://USERNAME.github.io/REPO"
    echo ""
    echo "📱 لتثبيت التطبيق:"
    echo "   1. افتح الرابط في Chrome"
    echo "   2. اضغط على القائمة (⋮)"
    echo "   3. اختر 'تثبيت التطبيق'"
    echo ""
else
    echo -e "${RED}❌ فشل النشر${NC}"
    exit 1
fi
