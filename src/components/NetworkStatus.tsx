import { useNetwork } from '../hooks/useNetwork';
import { useState, useEffect } from 'react';

export function NetworkStatus() {
  const { isOnline, connectionType, effectiveType } = useNetwork();
  const [showBanner, setShowBanner] = useState(false);
  const [lastOnline, setLastOnline] = useState<Date>(new Date());

  useEffect(() => {
    if (!isOnline) {
      setShowBanner(true);
    } else {
      setLastOnline(new Date());
      // إخفاء البانر بعد 3 ثواني
      const timer = setTimeout(() => setShowBanner(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [isOnline]);

  const getConnectionIcon = () => {
    if (!isOnline) return '❌';
    if (effectiveType === '4g' || connectionType === 'wifi') return '📶';
    if (effectiveType === '3g') return '📡';
    return '📱';
  };

  const getConnectionText = () => {
    if (!isOnline) return 'غير متصل';
    if (connectionType === 'wifi') return 'واي فاي';
    return effectiveType.toUpperCase();
  };

  return (
    <>
      {/* مؤشر دائم في الشريط العلوي */}
      <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium transition-all ${
        isOnline 
          ? 'bg-green-500/20 text-green-400' 
          : 'bg-red-500/20 text-red-400'
      }`}>
        <span>{getConnectionIcon()}</span>
        <span>{getConnectionText()}</span>
      </div>

      {/* بانر التنبيه */}
      {showBanner && (
        <div className={`fixed top-16 left-4 right-4 z-50 p-4 rounded-2xl shadow-lg backdrop-blur-lg transition-all ${
          isOnline 
            ? 'bg-green-500/90 text-white' 
            : 'bg-red-500/90 text-white'
        }`}>
          <div className="flex items-center gap-3">
            <span className="text-2xl">
              {isOnline ? '✅' : '⚠️'}
            </span>
            <div className="flex-1">
              <p className="font-bold">
                {isOnline ? 'تم استعادة الاتصال!' : 'أنت في وضع عدم الاتصال'}
              </p>
              <p className="text-sm opacity-90">
                {isOnline 
                  ? `آخر اتصال: ${lastOnline.toLocaleTimeString('ar-SA')}`
                  : 'التطبيق يعمل Offline - سيتم المزامنة عند العودة'
                }
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
