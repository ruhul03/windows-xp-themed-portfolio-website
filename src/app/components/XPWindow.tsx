import { useState, useRef, useEffect } from "react";
import { Minus, Square, X } from "lucide-react";

interface XPWindowProps {
  title: string;
  children: React.ReactNode;
  onClose: () => void;
  onMinimize: () => void;
  onMaximize: () => void;
  isActive: boolean;
  isMaximized: boolean;
  defaultPosition: { x: number; y: number };
  defaultSize: { width: number; height: number };
  onFocus: () => void;
  moveWindow?: (pos: { x: number; y: number }) => void;
  resizeWindow?: (size: { width: number; height: number }) => void;
}

export function XPWindow({
  title, children, onClose, onMinimize, onMaximize, isActive, isMaximized,
  defaultPosition, defaultSize, onFocus, moveWindow, resizeWindow
}: XPWindowProps) {
  const [position, setPosition] = useState(defaultPosition);
  const [size, setSize] = useState(defaultSize);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const windowRef = useRef<HTMLDivElement>(null);

  useEffect(() => { setPosition(defaultPosition); }, [defaultPosition]);
  useEffect(() => { setSize(defaultSize); }, [defaultSize]);

  // Dragging
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging && !isMaximized) {
        const newPos = { x: e.clientX - dragOffset.x, y: e.clientY - dragOffset.y };
        setPosition(newPos);
        moveWindow && moveWindow(newPos);
      }
    };
    const handleMouseUp = () => setIsDragging(false);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, dragOffset, isMaximized]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (isMaximized) return;
    if (windowRef.current) {
      const rect = windowRef.current.getBoundingClientRect();
      setDragOffset({ x: e.clientX - rect.left, y: e.clientY - rect.top });
      setIsDragging(true);
      onFocus();
    }
  };

  // Resize handles
  const handleResize = (e: React.MouseEvent, dir: "right" | "bottom" | "corner") => {
    e.stopPropagation();
    const startX = e.clientX;
    const startY = e.clientY;
    const startWidth = size.width;
    const startHeight = size.height;

    const onMouseMove = (ev: MouseEvent) => {
      let newWidth = startWidth;
      let newHeight = startHeight;
      if (dir === "right" || dir === "corner") newWidth = Math.max(200, startWidth + ev.clientX - startX);
      if (dir === "bottom" || dir === "corner") newHeight = Math.max(100, startHeight + ev.clientY - startY);
      setSize({ width: newWidth, height: newHeight });
      resizeWindow && resizeWindow({ width: newWidth, height: newHeight });
    };

    const onMouseUp = () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
  };

  return (
    <div
      ref={windowRef}
      className={`absolute flex flex-col bg-white rounded-lg shadow-2xl transform transition-all duration-300 ease-in-out 
                  ${isActive ? "ring-4 ring-[#0054E3]" : ""} overflow-hidden`}
      style={{
        left: position.x,
        top: position.y,
        width: isMaximized ? "100%" : size.width,
        height: isMaximized ? "calc(100% - 40px)" : size.height,
        border: "2px solid",
        borderColor: isActive ? "#0054E3" : "#7A96DF",
        zIndex: isActive ? 50 : 40,
      }}
      onClick={onFocus}
    >
      {/* Title Bar */}
      <div
        className={`flex items-center px-2 cursor-move select-none transition-colors duration-200
                    ${isActive ? "bg-blue-600" : "bg-blue-300"}`}
        style={{ height: 30 }}
        onMouseDown={handleMouseDown}
      >
        <span className="flex-1 text-white text-sm truncate">{title}</span>
        <div className="flex gap-0.5">
          <button onClick={e => { e.stopPropagation(); onMinimize(); }} className="w-5 h-5 bg-[#3F8CF3] rounded-sm hover:bg-[#5090FF] transition-colors duration-200">
            <Minus className="w-3 h-3 text-white" />
          </button>
          <button onClick={e => { e.stopPropagation(); onMaximize(); }} className="w-5 h-5 bg-[#3F8CF3] rounded-sm hover:bg-[#5090FF] transition-colors duration-200">
            <Square className="w-2.5 h-2.5 text-white" />
          </button>
          <button onClick={e => { e.stopPropagation(); onClose(); }} className="w-5 h-5 bg-[#E81123] rounded-sm hover:bg-[#FF2A3A] transition-colors duration-200">
            <X className="w-3 h-3 text-white" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-4 bg-white transition-all duration-300">{children}</div>

      {/* Resize */}
      {!isMaximized && (
        <>
          <div className="absolute right-0 top-0 w-2 h-full cursor-ew-resize" onMouseDown={e => handleResize(e, "right")} />
          <div className="absolute bottom-0 left-0 w-full h-2 cursor-ns-resize" onMouseDown={e => handleResize(e, "bottom")} />
          <div className="absolute right-0 bottom-0 w-4 h-4 cursor-se-resize" onMouseDown={e => handleResize(e, "corner")} />
        </>
      )}
    </div>
  );
}
