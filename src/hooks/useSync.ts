import { useState, useEffect, useCallback } from 'react';

interface SyncItem {
  id: string;
  action: 'create' | 'update' | 'delete';
  data: any;
  timestamp: number;
  retries: number;
}

export function useSync() {
  const [isSyncing, setIsSyncing] = useState(false);
  const [pendingCount, setPendingCount] = useState(0);
  const [lastSync, setLastSync] = useState<Date | null>(null);

  // قراءة العناصر المعلقة
  const getPendingItems = useCallback((): SyncItem[] => {
    try {
      const items = localStorage.getItem('syncQueue');
      return items ? JSON.parse(items) : [];
    } catch {
      return [];
    }
  }, []);

  // إضافة عنصر للمزامنة
  const addToSyncQueue = useCallback((action: 'create' | 'update' | 'delete', data: any) => {
    const item: SyncItem = {
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      action,
      data,
      timestamp: Date.now(),
      retries: 0,
    };

    const queue = getPendingItems();
    queue.push(item);
    localStorage.setItem('syncQueue', JSON.stringify(queue));
    setPendingCount(queue.length);
  }, [getPendingItems]);

  // مزامنة العناصر المعلقة
  const sync = useCallback(async () => {
    if (!navigator.onLine) return;

    const queue = getPendingItems();
    if (queue.length === 0) return;

    setIsSyncing(true);

    try {
      // هنا يمكنك إضافة API call حقيقي
      // await fetch('/api/sync', { method: 'POST', body: JSON.stringify(queue) });

      // محاكاة نجاح المزامنة
      await new Promise(resolve => setTimeout(resolve, 1000));

      // حذف العناصر المزامنة
      localStorage.setItem('syncQueue', JSON.stringify([]));
      setPendingCount(0);
      setLastSync(new Date());

      // إشعار المستخدم
      if ('Notification' in window && Notification.permission === 'granted') {
        new Notification('✅ تمت المزامنة', {
          body: `تم مزامنة ${queue.length} عنصر بنجاح`,
          icon: '/icon-192x192.png',
        });
      }
    } catch (error) {
      console.error('Sync failed:', error);
    } finally {
      setIsSyncing(false);
    }
  }, [getPendingItems]);

  // مزامنة تلقائية عند عودة الاتصال
  useEffect(() => {
    const handleOnline = () => {
      sync();
    };

    window.addEventListener('app:online', handleOnline);
    return () => window.removeEventListener('app:online', handleOnline);
  }, [sync]);

  // تحديث العدد عند التحميل
  useEffect(() => {
    setPendingCount(getPendingItems().length);
  }, [getPendingItems]);

  return {
    isSyncing,
    pendingCount,
    lastSync,
    addToSyncQueue,
    sync,
  };
}
