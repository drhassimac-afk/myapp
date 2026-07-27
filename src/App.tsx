import { useState, useEffect } from 'react';
import { App as CapApp } from '@capacitor/app';
import { useNetwork } from './hooks/useNetwork';
import { useLocalStorage } from './hooks/useLocalStorage';
import { useSync } from './hooks/useSync';
import { NetworkStatus } from './components/NetworkStatus';
import { OfflineIndicator } from './components/OfflineIndicator';
import { SaveButton } from './components/SaveButton';

// مكون التبويبات
type Tab = 'home' | 'data' | 'settings';

export default function App() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [activeTab, setActiveTab] = useState<Tab>('home');
  const [installPrompt, setInstallPrompt] = useState<any>(null);
  const [showInstall, setShowInstall] = useState(false);
  
  // استخدام hooks الشبكة والتخزين
  const { isOnline, connectionType, effectiveType } = useNetwork();
  const { isSyncing, pendingCount, sync, lastSync } = useSync();
  
  // تخزين البيانات محلياً
  const [count, setCount] = useLocalStorage<number>('app_count', 0);
  const [notes, setNotes] = useLocalStorage<string>('app_notes', '');
  const [history, setHistory] = useLocalStorage<Array<{ date: string; value: number }>>('app_history', []);
  const [savedMessages, setSavedMessages] = useLocalStorage<string[]>('app_messages', []);

  useEffect(() => {
    // تحديث الوقت
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);

    // تسجيل حدث التثبيت
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      setInstallPrompt(e);
      setShowInstall(true);
    });

    // زر الرجوع في Android
    CapApp.addListener('backButton', ({ canGoBack }: { canGoBack: boolean }) => {
      if (!canGoBack) {
        CapApp.exitApp();
      }
    });

    return () => {
      clearInterval(timer);
      CapApp.removeAllListeners();
    };
  }, []);

  // مزامنة تلقائية عند العودة للاتصال
  useEffect(() => {
    if (isOnline && pendingCount > 0) {
      sync();
    }
  }, [isOnline, pendingCount, sync]);

  const handleInstall = () => {
    if (installPrompt) {
      installPrompt.prompt();
      installPrompt.userChoice.then((choiceResult: any) => {
        if (choiceResult.outcome === 'accepted') {
          setShowInstall(false);
        }
      });
    }
  };

  const handleCountIncrease = () => {
    const newCount = count + 1;
    setCount(newCount);
    
    // حفظ في التاريخ
    const newEntry = { date: new Date().toISOString(), value: newCount };
    setHistory(prev => [newEntry, ...prev.slice(0, 9)]);
  };

  const handleSaveNote = async () => {
    if (notes.trim()) {
      setSavedMessages(prev => [`${new Date().toLocaleTimeString('ar-SA')}: ${notes}`, ...prev.slice(0, 4)]);
      setNotes('');
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return (
          <div className="space-y-6">
            {/* بطاقة حالة الاتصال */}
            <div className={`rounded-2xl p-4 border ${
              isOnline 
                ? 'bg-green-500/10 border-green-500/30' 
                : 'bg-yellow-500/10 border-yellow-500/30'
            }`}>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-white">
                    {isOnline ? '🌐 متصل' : '📴 وضع Offline'}
                  </h3>
                  <p className="text-sm text-white/70">
                    {isOnline 
                      ? `الاتصال: ${connectionType === 'wifi' ? 'واي فاي' : effectiveType}`
                      : 'التطبيق يعمل بدون إنترنت - البيانات محفوظة محلياً'
                    }
                  </p>
                </div>
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                  isOnline ? 'bg-green-500' : 'bg-yellow-500'
                }`}>
                  <span className="text-2xl">{isOnline ? '📶' : '📴'}</span>
                </div>
              </div>
            </div>

            {/* بطاقة العداد */}
            <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 text-center border border-white/10">
              <p className="text-white/60 text-sm mb-2">عدد النقرات</p>
              <p className="text-6xl font-bold text-white mb-4">{count}</p>
              <p className="text-white/40 text-xs mb-4">
                {isOnline ? '✅ يتم الحفظ تلقائياً' : '💾 محفوظ محلياً'}
              </p>
              <div className="flex gap-3 justify-center">
                <button
                  onClick={handleCountIncrease}
                  className="px-8 py-3 bg-white text-purple-900 font-bold rounded-2xl shadow-lg active:scale-95 transition-all hover:bg-purple-50"
                >
                  + زيادة
                </button>
                <button
                  onClick={() => setCount(0)}
                  className="px-6 py-3 bg-white/10 text-white font-medium rounded-2xl backdrop-blur-lg active:scale-95 transition-all hover:bg-white/20"
                >
                  تصفير
                </button>
              </div>
            </div>

            {/* التاريخ */}
            {history.length > 0 && (
              <div className="bg-black/20 rounded-2xl p-4">
                <h3 className="text-white font-bold mb-3">📊 آخر التحديثات</h3>
                <div className="space-y-2 max-h-32 overflow-y-auto">
                  {history.map((entry, idx) => (
                    <div key={idx} className="flex justify-between text-sm text-white/70 bg-white/5 rounded-lg p-2">
                      <span>{new Date(entry.date).toLocaleTimeString('ar-SA')}</span>
                      <span className="font-bold text-white">{entry.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* زر التثبيت */}
            {showInstall && (
              <button
                onClick={handleInstall}
                className="w-full py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-2xl shadow-lg active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                <span>📲</span>
                تثبيت التطبيق
              </button>
            )}
          </div>
        );

      case 'data':
        return (
          <div className="space-y-6">
            {/* إدخال ملاحظات */}
            <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 border border-white/10">
              <h2 className="text-xl font-bold text-white mb-4">📝 ملاحظاتي</h2>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="اكتب ملاحظتك هنا..."
                className="w-full h-32 p-4 rounded-xl bg-black/20 text-white placeholder-white/40 border border-white/10 focus:border-purple-500 focus:outline-none resize-none"
              />
              <div className="mt-4">
                <SaveButton 
                  onSave={handleSaveNote}
                  label="حفظ الملاحظة"
                  className="w-full"
                />
              </div>
            </div>

            {/* الرسائل المحفوظة */}
            {savedMessages.length > 0 && (
              <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 border border-white/10">
                <h3 className="text-lg font-bold text-white mb-4">💾 المحفوظات</h3>
                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {savedMessages.map((msg, idx) => (
                    <div key={idx} className="bg-black/20 rounded-xl p-3 text-white/80 text-sm">
                      {msg}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* معلومات التخزين */}
            <div className="bg-black/20 rounded-2xl p-4">
              <h3 className="text-white font-bold mb-3">📦 معلومات التخزين</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-white/70">
                  <span>حالة المزامنة:</span>
                  <span className={isSyncing ? 'text-yellow-400' : 'text-green-400'}>
                    {isSyncing ? '⏳ جاري...' : '✅ متزامن'}
                  </span>
                </div>
                <div className="flex justify-between text-white/70">
                  <span>عناصر في الانتظار:</span>
                  <span className="font-bold">{pendingCount}</span>
                </div>
                {lastSync && (
                  <div className="flex justify-between text-white/70">
                    <span>آخر مزامنة:</span>
                    <span>{lastSync.toLocaleTimeString('ar-SA')}</span>
                  </div>
                )}
                <div className="flex justify-between text-white/70">
                  <span>البيانات محلياً:</span>
                  <span className="text-green-400">✅ نعم</span>
                </div>
              </div>
            </div>
          </div>
        );

      case 'settings':
        return (
          <div className="space-y-6">
            <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 border border-white/10">
              <h2 className="text-xl font-bold text-white mb-4">⚙️ الإعدادات</h2>
              
              {/* إعدادات Offline */}
              <div className="space-y-4">
                <div className="flex justify-between items-center py-3 border-b border-white/10">
                  <div>
                    <span className="text-white font-medium">وضع Offline</span>
                    <p className="text-white/50 text-sm">العمل بدون إنترنت</p>
                  </div>
                  <div className={`w-12 h-6 rounded-full relative ${isOnline ? 'bg-green-500' : 'bg-yellow-500'}`}>
                    <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-all ${isOnline ? 'right-0.5' : 'left-0.5'}`} />
                  </div>
                </div>

                <div className="flex justify-between items-center py-3 border-b border-white/10">
                  <div>
                    <span className="text-white font-medium">المزامنة التلقائية</span>
                    <p className="text-white/50 text-sm">عند عودة الاتصال</p>
                  </div>
                  <div className="w-12 h-6 bg-green-500 rounded-full relative">
                    <div className="w-5 h-5 bg-white rounded-full absolute right-0.5 top-0.5" />
                  </div>
                </div>

                <div className="flex justify-between items-center py-3">
                  <div>
                    <span className="text-white font-medium">التخزين المحلي</span>
                    <p className="text-white/50 text-sm">حفظ البيانات على الجهاز</p>
                  </div>
                  <span className="text-green-400 text-sm">✅ مفعل</span>
                </div>
              </div>
            </div>

            {/* زر المزامنة اليدوية */}
            <button
              onClick={sync}
              disabled={!isOnline || isSyncing}
              className={`w-full py-4 rounded-2xl font-bold transition-all flex items-center justify-center gap-2 ${
                !isOnline 
                  ? 'bg-gray-500 text-white/50 cursor-not-allowed' 
                  : isSyncing 
                    ? 'bg-yellow-500 text-white' 
                    : 'bg-blue-500 text-white active:scale-95 hover:bg-blue-600'
              }`}
            >
              {isSyncing ? (
                <>
                  <span className="animate-spin">⏳</span>
                  جاري المزامنة...
                </>
              ) : (
                <>
                  <span>🔄</span>
                  مزامنة يدوية
                </>
              )}
            </button>

            {/* مسح البيانات */}
            <button
              onClick={() => {
                if (confirm('هل أنت متأكد من مسح جميع البيانات؟')) {
                  setCount(0);
                  setNotes('');
                  setHistory([]);
                  setSavedMessages([]);
                }
              }}
              className="w-full py-4 bg-red-500/20 text-red-400 font-medium rounded-2xl border border-red-500/30 active:scale-95 transition-all"
            >
              🗑️ مسح جميع البيانات
            </button>

            <div className="text-center text-white/40 text-sm">
              <p>📱 تطبيق PWA يعمل Online و Offline</p>
              <p className="mt-1">v2.0 - مع دعم كامل للعمل بدون إنترنت</p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800">
      {/* شريط الحالة */}
      <div className="bg-black/20 backdrop-blur-lg px-4 py-3 flex justify-between items-center">
        <span className="text-white/80 text-sm font-medium">
          {currentTime.toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit' })}
        </span>
        <NetworkStatus />
      </div>

      {/* المحتوى الرئيسي */}
      <div className="px-4 py-6 pb-32">
        {/* العنوان */}
        <div className="text-center mb-6">
          <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-lg shadow-xl mb-3">
            <span className="text-3xl">📱</span>
          </div>
          <h1 className="text-2xl font-bold text-white">تطبيقي</h1>
          <p className="text-white/60 text-sm">
            {isOnline ? 'متصل بالإنترنت' : 'يعمل Offline ✅'}
          </p>
        </div>

        {/* المحتوى حسب التبويب */}
        {renderContent()}
      </div>

      {/* مؤشر Offline */}
      <OfflineIndicator />

      {/* شريط التنقل السفلي */}
      <div className="fixed bottom-0 left-0 right-0 bg-black/40 backdrop-blur-xl px-6 py-3 safe-area-bottom">
        <div className="flex justify-around items-center">
          <button 
            onClick={() => setActiveTab('home')}
            className={`flex flex-col items-center gap-1 transition-colors ${activeTab === 'home' ? 'text-white' : 'text-white/40'}`}
          >
            <span className="text-xl">🏠</span>
            <span className="text-xs">الرئيسية</span>
          </button>
          
          <button 
            onClick={() => setActiveTab('data')}
            className={`flex flex-col items-center gap-1 transition-colors ${activeTab === 'data' ? 'text-white' : 'text-white/40'}`}
          >
            <span className="text-xl">📝</span>
            <span className="text-xs">البيانات</span>
            {savedMessages.length > 0 && (
              <span className="absolute -mt-1 mr-6 w-5 h-5 bg-red-500 rounded-full text-xs flex items-center justify-center">
                {savedMessages.length}
              </span>
            )}
          </button>
          
          <button 
            onClick={() => setActiveTab('settings')}
            className={`flex flex-col items-center gap-1 transition-colors ${activeTab === 'settings' ? 'text-white' : 'text-white/40'}`}
          >
            <span className="text-xl">⚙️</span>
            <span className="text-xs">الإعدادات</span>
          </button>
        </div>
      </div>
    </div>
  );
}
