import { useState, useRef, useEffect } from 'react';
import { Minus, Square, X } from 'lucide-react';

interface XPWindowProps {
  title: string;
  icon?: string;
  children: React.ReactNode;
  onClose: () => void;
  onMinimize: () => void;
  defaultPosition?: { x: number; y: number };
  defaultSize?: { width: number; height: number };
  isActive: boolean;
  onFocus: () => void;
}

export function XPWindow({
  title,
  icon,
  children,
  onClose,
  onMinimize,
  defaultPosition = { x: 100, y: 100 },
  defaultSize = { width: 600, height: 400 },
  isActive,
  onFocus,
}: XPWindowProps) {
  const [position, setPosition] = useState(defaultPosition);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const windowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        setPosition({
          x: e.clientX - dragOffset.x,
          y: e.clientY - dragOffset.y,
        });
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragOffset]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (windowRef.current) {
      const rect = windowRef.current.getBoundingClientRect();
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
      setIsDragging(true);
      onFocus();
    }
  };

  return (
    <div
      ref={windowRef}
      className="absolute flex flex-col bg-white rounded-lg overflow-hidden shadow-2xl"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        width: `${defaultSize.width}px`,
        height: `${defaultSize.height}px`,
        border: '3px solid',
        borderColor: isActive ? '#0054E3' : '#7A96DF',
        zIndex: isActive ? 50 : 40,
      }}
      onClick={onFocus}
    >
      {/* Title Bar */}
      <div
        className="flex items-center px-2 py-1 cursor-move select-none"
        style={{
          background: isActive
            ? 'linear-gradient(to right, #0054E3, #3F8CF3)'
            : 'linear-gradient(to right, #7A96DF, #A0B4E0)',
          height: '30px',
        }}
        onMouseDown={handleMouseDown}
      >
        {icon && (
          <img src={icon} alt="" className="w-4 h-4 mr-2" />
        )}
        <span className="flex-1 text-white text-sm truncate">{title}</span>
        <div className="flex gap-0.5">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onMinimize();
            }}
            className="w-5 h-5 flex items-center justify-center bg-[#3F8CF3] hover:bg-[#5090FF] border border-white/30 rounded-sm"
          >
            <Minus className="w-3 h-3 text-white" />
          </button>
          <button
            className="w-5 h-5 flex items-center justify-center bg-[#3F8CF3] hover:bg-[#5090FF] border border-white/30 rounded-sm"
          >
            <Square className="w-2.5 h-2.5 text-white" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            className="w-5 h-5 flex items-center justify-center bg-[#E81123] hover:bg-[#FF2A3A] border border-white/30 rounded-sm"
          >
            <X className="w-3 h-3 text-white" />
          </button>
        </div>
      </div>

      {/* Menu Bar */}
      <div className="flex gap-2 px-2 py-1 bg-gradient-to-b from-[#ECE9D8] to-[#E3DFD0] border-b border-[#ACACAC] text-sm">
        <span className="px-2 hover:bg-[#F0EDDE] cursor-pointer">File</span>
        <span className="px-2 hover:bg-[#F0EDDE] cursor-pointer">Edit</span>
        <span className="px-2 hover:bg-[#F0EDDE] cursor-pointer">View</span>
        <span className="px-2 hover:bg-[#F0EDDE] cursor-pointer">Help</span>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-4 bg-white">
        {children}
      </div>
    </div>
  );
}
