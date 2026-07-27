import { useNetwork } from '../hooks/useNetwork';
import { useSync } from '../hooks/useSync';

export function OfflineIndicator() {
  const { isOnline } = useNetwork();
  const { pendingCount, isSyncing, lastSync } = useSync();

  if (isOnline && pendingCount === 0) return null;

  return (
    <div className="fixed bottom-24 left-4 right-4 z-40">
      <div className="bg-black/80 backdrop-blur-lg rounded-2xl p-4 text-white shadow-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`w-3 h-3 rounded-full ${
              isOnline ? 'bg-green-400 animate-pulse' : 'bg-yellow-400'
            }`} />
            <div>
              <p className="font-bold text-sm">
                {!isOnline ? '📴 وضع Offline' : '📡 جاري المزامنة...'}
              </p>
              {pendingCount > 0 && (
                <p className="text-xs text-white/70">
                  {pendingCount} عنصر في الانتظار
                </p>
              )}
              {lastSync && (
                <p className="text-xs text-white/50">
                  آخر مزامنة: {lastSync.toLocaleTimeString('ar-SA')}
                </p>
              )}
            </div>
          </div>
          
          {isSyncing && (
            <div className="animate-spin rounded-full h-5 w-5 border-2 border-white/30 border-t-white" />
          )}
        </div>

        {/* نصائح للمستخدم */}
        {!isOnline && (
          <div className="mt-3 pt-3 border-t border-white/20 text-xs text-white/70">
            <p>💡 يمكنك الاستمرار في الاستخدام - ستحفظ البيانات محلياً</p>
          </div>
        )}
      </div>
    </div>
  );
}
