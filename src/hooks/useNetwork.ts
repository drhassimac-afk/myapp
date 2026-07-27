import { useState, useEffect, useCallback } from 'react';

export interface NetworkState {
  isOnline: boolean;
  connectionType: 'wifi' | '4g' | '3g' | '2g' | 'unknown' | 'none';
  saveData: boolean;
  effectiveType: '4g' | '3g' | '2g' | 'slow-2g' | 'unknown';
}

export function useNetwork() {
  const [networkState, setNetworkState] = useState<NetworkState>({
    isOnline: navigator.onLine,
    connectionType: 'unknown',
    saveData: false,
    effectiveType: 'unknown',
  });

  const updateNetworkState = useCallback(() => {
    const connection = (navigator as any).connection ||
                      (navigator as any).mozConnection ||
                      (navigator as any).webkitConnection;

    setNetworkState({
      isOnline: navigator.onLine,
      connectionType: connection?.type || 'unknown',
      saveData: connection?.saveData || false,
      effectiveType: connection?.effectiveType || 'unknown',
    });
  }, []);

  useEffect(() => {
    // تحديث الحالة الأولية
    updateNetworkState();

    // متابعة تغيير حالة الاتصال
    const handleOnline = () => {
      setNetworkState(prev => ({ ...prev, isOnline: true }));
      // إطلاق حدث مخصص
      window.dispatchEvent(new CustomEvent('app:online'));
    };

    const handleOffline = () => {
      setNetworkState(prev => ({ ...prev, isOnline: false }));
      // إطلاق حدث مخصص
      window.dispatchEvent(new CustomEvent('app:offline'));
    };

    // متابعة تغيير نوع الاتصال
    const connection = (navigator as any).connection ||
                      (navigator as any).mozConnection ||
                      (navigator as any).webkitConnection;

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    if (connection) {
      connection.addEventListener('change', updateNetworkState);
    }

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      if (connection) {
        connection.removeEventListener('change', updateNetworkState);
      }
    };
  }, [updateNetworkState]);

  return networkState;
}
