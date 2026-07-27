import { useState } from 'react';
import { useNetwork } from '../hooks/useNetwork';
import { useSync } from '../hooks/useSync';

interface SaveButtonProps {
  onSave: () => Promise<void> | void;
  label?: string;
  className?: string;
}

export function SaveButton({ onSave, label = 'حفظ', className = '' }: SaveButtonProps) {
  const { isOnline } = useNetwork();
  const { addToSyncQueue } = useSync();
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saved' | 'queued'>('idle');

  const handleClick = async () => {
    setIsSaving(true);
    
    try {
      // تنفيذ الحفظ
      await onSave();

      if (isOnline) {
        setSaveStatus('saved');
        // إظهار تأكيد الحفظ
        setTimeout(() => setSaveStatus('idle'), 2000);
      } else {
        // إضافة للمزامنة لاحقاً
        addToSyncQueue('create', { timestamp: Date.now() });
        setSaveStatus('queued');
        setTimeout(() => setSaveStatus('idle'), 3000);
      }
    } catch (error) {
      console.error('Save failed:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const getButtonContent = () => {
    if (isSaving) {
      return (
        <>
          <span className="animate-spin inline-block mr-2">⏳</span>
          جاري الحفظ...
        </>
      );
    }

    if (saveStatus === 'saved') {
      return (
        <>
          <span className="mr-2">✅</span>
          تم الحفظ
        </>
      );
    }

    if (saveStatus === 'queued') {
      return (
        <>
          <span className="mr-2">📴</span>
          سيتم الحفظ لاحقاً
        </>
      );
    }

    return (
      <>
        <span className="mr-2">💾</span>
        {label}
        {!isOnline && <span className="ml-2 text-xs opacity-70">(Offline)</span>}
      </>
    );
  };

  return (
    <button
      onClick={handleClick}
      disabled={isSaving}
      className={`
        px-6 py-3 rounded-2xl font-bold transition-all
        ${isSaving ? 'opacity-70 cursor-not-allowed' : 'active:scale-95'}
        ${saveStatus === 'saved' ? 'bg-green-500 text-white' : ''}
        ${saveStatus === 'queued' ? 'bg-yellow-500 text-white' : ''}
        ${saveStatus === 'idle' ? 'bg-white text-purple-900' : ''}
        ${className}
      `}
    >
      {getButtonContent()}
    </button>
  );
}
