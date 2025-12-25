import { useState, useEffect } from 'react';

interface TaskbarProps {
  openWindows: Array<{ id: string; title: string; icon?: string }>;
  activeWindowId: string | null;
  onTaskClick: (id: string) => void;
  onStartClick: () => void;
}

export function Taskbar({ openWindows, activeWindowId, onTaskClick, onStartClick }: TaskbarProps) {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    });
  };

  return (
    <div
      className="fixed bottom-0 left-0 right-0 h-10 flex items-center px-1 gap-1"
      style={{
        background: 'linear-gradient(to bottom, #245EDC 0%, #3F8CF3 9%, #245EDC 18%, #245EDC 92%, #1941A5 100%)',
        borderTop: '2px solid #0831D9',
      }}
    >
      {/* Start Button */}
      <button
        onClick={onStartClick}
        className="h-8 px-3 flex items-center gap-2 rounded-md text-white hover:brightness-110 transition-all"
        style={{
          background: 'linear-gradient(to bottom, #3DAF3D 0%, #2B882B 100%)',
          border: '2px solid',
          borderColor: '#6EDB6E #1F6F1F #1F6F1F #6EDB6E',
          boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.3)',
        }}
      >
        <div className="w-5 h-5 flex items-center justify-center">
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
            <path d="M0 0h11v11H0V0zm13 0h11v11H13V0zM0 13h11v11H0V13zm13 0h11v11H13V13z" />
          </svg>
        </div>
        <span className="font-bold">start</span>
      </button>

      {/* Taskbar Divider */}
      <div className="w-px h-8 bg-[#1941A5]" />

      {/* Open Windows */}
      <div className="flex-1 flex gap-1 overflow-x-auto">
        {openWindows.map((window) => (
          <button
            key={window.id}
            onClick={() => onTaskClick(window.id)}
            className="h-8 px-3 flex items-center gap-2 rounded-sm text-white text-sm min-w-0 max-w-40 truncate"
            style={{
              background: activeWindowId === window.id
                ? 'linear-gradient(to bottom, #1F4BA5 0%, #3F8CF3 100%)'
                : 'linear-gradient(to bottom, #3F8CF3 0%, #245EDC 100%)',
              border: '1px solid',
              borderColor: activeWindowId === window.id ? '#0831D9' : '#5090FF',
              boxShadow: activeWindowId === window.id
                ? 'inset 1px 1px 2px rgba(0,0,0,0.3)'
                : 'inset 0 1px 0 rgba(255,255,255,0.2)',
            }}
          >
            {window.icon && (
              <img src={window.icon} alt="" className="w-4 h-4" />
            )}
            <span className="truncate">{window.title}</span>
          </button>
        ))}
      </div>

      {/* System Tray */}
      <div className="flex items-center gap-2 h-8 px-3 rounded-sm bg-[#0B92E8]/20">
        <div className="flex gap-1">
          <div className="w-4 h-4 bg-[#0B92E8] rounded-sm" />
          <div className="w-4 h-4 bg-[#FFD700] rounded-sm" />
        </div>
        <div className="w-px h-6 bg-[#1941A5]" />
        <span className="text-white text-sm whitespace-nowrap">{formatTime(time)}</span>
      </div>
    </div>
  );
}
