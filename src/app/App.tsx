import { useState } from "react";
import { User, FolderOpen, FileText, Mail, Monitor } from "lucide-react";

interface WindowType {
  id: string;
  title: string;
  content: React.ReactNode;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
  defaultPosition: { x: number; y: number };
  defaultSize: { width: number; height: number };
}

export default function App() {
  const [isStartupComplete, setIsStartupComplete] = useState(true);
  const [windows, setWindows] = useState<WindowType[]>([]);
  const [showStartMenu, setShowStartMenu] = useState(false);
  const [zCounter, setZCounter] = useState(50);

  const getWindowContent = (id: string) => {
    switch (id) {
      case "about":
        return (
          <div className="p-6 bg-white h-full overflow-auto">
            <h2 className="text-2xl font-bold text-[#0054E3] mb-4">About Me</h2>
            <p className="text-gray-700 leading-relaxed">
              Welcome to my Windows XP themed portfolio! I'm a passionate developer
              who loves creating nostalgic experiences.
            </p>
          </div>
        );
      case "projects":
        return (
          <div className="p-6 bg-white h-full overflow-auto">
            <h2 className="text-2xl font-bold text-[#0054E3] mb-4">My Projects</h2>
            <p className="text-gray-700">View my latest projects here.</p>
          </div>
        );
      case "skills":
        return (
          <div className="p-6 bg-white h-full overflow-auto">
            <h2 className="text-2xl font-bold text-[#0054E3] mb-4">Skills</h2>
            <p className="text-gray-700">My technical skills and expertise.</p>
          </div>
        );
      case "contact":
        return (
          <div className="p-6 bg-white h-full overflow-auto">
            <h2 className="text-2xl font-bold text-[#0054E3] mb-4">Contact</h2>
            <p className="text-gray-700">Get in touch with me.</p>
          </div>
        );
      default:
        return (
          <div className="p-6 bg-white h-full">
            <h2 className="text-xl font-bold">Welcome to Windows XP Portfolio</h2>
          </div>
        );
    }
  };

  const bringToFront = (id: string) => {
    setWindows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, zIndex: zCounter + 1 } : w))
    );
    setZCounter((prev) => prev + 1);
  };

  const openWindow = (id: string, title: string) => {
    const existing = windows.find((w) => w.id === id);
    if (existing) {
      setWindows((prev) =>
        prev.map((w) =>
          w.id === id ? { ...w, isMinimized: false, zIndex: zCounter + 1 } : w
        )
      );
      setZCounter((prev) => prev + 1);
    } else {
      const newWindow: WindowType = {
        id,
        title,
        content: getWindowContent(id),
        isMinimized: false,
        isMaximized: false,
        zIndex: zCounter + 1,
        defaultPosition: { x: 100 + windows.length * 30, y: 80 + windows.length * 30 },
        defaultSize: { width: 600, height: 400 },
      };
      setWindows((prev) => [...prev, newWindow]);
      setZCounter((prev) => prev + 1);
    }
  };

  const closeWindow = (id: string) => {
    setWindows((prev) => prev.filter((w) => w.id !== id));
  };

  const minimizeWindow = (id: string) => {
    setWindows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, isMinimized: true } : w))
    );
  };

  const maximizeWindow = (id: string) => {
    setWindows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, isMaximized: !w.isMaximized } : w))
    );
    bringToFront(id);
  };

  const handleTaskClick = (id: string) => {
    const w = windows.find((win) => win.id === id);
    if (!w) return;
    if (w.isMinimized)
      setWindows((prev) =>
        prev.map((win) => (win.id === id ? { ...win, isMinimized: false } : win))
      );
    bringToFront(id);
  };

  const desktopIcons = [
    { id: "about", icon: User, label: "About Me", color: "#0054E3" },
    { id: "projects", icon: FolderOpen, label: "My Projects", color: "#FFD700" },
    { id: "skills", icon: FileText, label: "Skills", color: "#2B882B" },
    { id: "contact", icon: Mail, label: "Contact", color: "#E81123" },
    { id: "computer", icon: Monitor, label: "My Computer", color: "#0054E3" },
  ];

  const topWindowId =
    windows.length > 0
      ? windows.reduce((topId, w) =>
        w.zIndex > (windows.find((win) => win.id === topId)?.zIndex || 0)
          ? w.id
          : topId,
        windows[0].id
      )
      : null;

  return (
    <div
      className="w-full h-screen relative overflow-hidden bg-[#5A8FCC]"
      style={{
        backgroundImage: `url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1920 1080"><rect fill="%235A8FCC" width="1920" height="1080"/></svg>')`,
      }}
    >
      {/* Desktop Icons */}
      <div className="absolute top-4 left-4 flex flex-col gap-4">
        {desktopIcons.map((icon) => {
          const IconComponent = icon.icon;
          return (
            <button
              key={icon.id}
              onClick={() => openWindow(icon.id, icon.label)}
              className="flex flex-col items-center gap-1 p-2 rounded hover:bg-blue-400/30 transition-colors group w-20"
            >
              <div className="w-10 h-10 mb-1 relative">
                <IconComponent className="w-full h-full drop-shadow-xl" style={{ color: icon.color }} />
              </div>
              <span className="text-white text-[11px] font-normal drop-shadow-[1px_1px_1px_rgba(0,0,0,1)] text-center leading-tight">
                {icon.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* Windows */}
      {windows.map(
        (w) =>
          !w.isMinimized && (
            <XPWindow
              key={w.id}
              window={w}
              isActive={topWindowId === w.id}
              onClose={() => closeWindow(w.id)}
              onMinimize={() => minimizeWindow(w.id)}
              onMaximize={() => maximizeWindow(w.id)}
              onFocus={() => bringToFront(w.id)}
            />
          )
      )}

      {/* Start Menu */}
      {showStartMenu && (
        <div className="absolute bottom-12 left-0 w-64 bg-gradient-to-b from-blue-500 to-blue-700 border-2 border-blue-800 shadow-2xl rounded-tr-lg z-50">
          <div className="p-4 space-y-2">
            {desktopIcons.map((icon) => {
              const IconComponent = icon.icon;
              return (
                <button
                  key={icon.id}
                  onClick={() => {
                    openWindow(icon.id, icon.label);
                    setShowStartMenu(false);
                  }}
                  className="w-full flex items-center gap-3 p-2 text-white hover:bg-blue-600 rounded"
                >
                  <IconComponent className="w-5 h-5" />
                  <span className="text-sm">{icon.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Taskbar */}
      <div className="absolute bottom-0 left-0 right-0 h-[30px] bg-[#245EDC] border-t-2 border-[#3F8CF3] flex items-center px-0 z-50">
        <button
          onClick={() => setShowStartMenu((prev) => !prev)}
          className="h-full pl-2 pr-4 bg-gradient-to-b from-[#3E9F3D] to-[#258522] hover:from-[#45B243] hover:to-[#2B9627] text-white font-bold rounded-r-[10px] shadow-[1px_0px_2px_rgba(0,0,0,0.5)] flex items-center gap-1 mr-2 italic border-none outline-none"
        >
          <span className="text-lg drop-shadow-md">❖</span>
          <span className="text-shadow-sm font-sans">Start</span>
        </button>

        <div className="flex-1 flex gap-1 px-1 h-full items-center">
          {windows.map((w) => (
            <button
              key={w.id}
              onClick={() => handleTaskClick(w.id)}
              className={`px-2 h-[22px] min-w-[120px] max-w-[150px] text-[11px] text-left rounded-[3px] transition-all flex items-center truncate ${topWindowId === w.id
                  ? "bg-[#1E52B7] text-white shadow-[inset_1px_1px_2px_rgba(0,0,0,0.5)]"
                  : "bg-[#3C81F3] text-white hover:bg-[#5392F7] shadow-[1px_1px_1px_rgba(0,0,0,0.3)]"
                }`}
            >
              {w.title}
            </button>
          ))}
        </div>

        <div className="h-full bg-[#0B77E9] px-4 flex items-center border-l border-[#1941A5] shadow-[inset_2px_2px_4px_rgba(0,0,0,0.3)]">
          <div className="text-white text-xs font-normal">
            {new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
          </div>
        </div>
      </div>
    </div>
  );
}

// XP Window Component
function XPWindow({ window: w, isActive, onClose, onMinimize, onMaximize, onFocus }) {
  const [position, setPosition] = useState(w.defaultPosition);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const handleMouseDown = (e) => {
    if (e.target.closest("button")) return;
    setIsDragging(true);
    setDragStart({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
    onFocus();
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    setPosition({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y,
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <div
      className={`absolute flex flex-col rounded-t-[8px] shadow-2xl p-[3px] pb-[2px] ${isActive ? "z-50" : "z-40"
        }`}
      style={{
        left: w.isMaximized ? 0 : position.x,
        top: w.isMaximized ? 0 : position.y,
        width: w.isMaximized ? "100%" : w.defaultSize.width,
        height: w.isMaximized ? "calc(100% - 30px)" : w.defaultSize.height,
        backgroundColor: "#0054E3", // The distinct XP blue border color
        zIndex: w.zIndex,
      }}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onClick={onFocus}
    >
      {/* Title Bar */}
      <div
        className={`h-[30px] flex items-center justify-between px-2 cursor-move rounded-t-[5px] relative overflow-hidden ${isActive
            ? "bg-gradient-to-b from-[#0058EE] via-[#3593FF] to-[#288EFF]"
            : "bg-gradient-to-b from-[#7697E7] via-[#7C9EEB] to-[#7F9FEF]"
          }`}
        onMouseDown={handleMouseDown}
      >
        <div className="text-white font-bold text-[13px] px-1 drop-shadow-[1px_1px_0_rgba(0,0,0,0.3)] truncate flex-1 pointer-events-none select-none" style={{ fontFamily: 'Tahoma, sans-serif' }}>
          {w.title}
        </div>

        <div className="flex gap-1 ml-2">
          <button
            onClick={(e) => { e.stopPropagation(); onMinimize(); }}
            className="w-[21px] h-[21px] bg-[#2257D5] rounded-[3px] border border-white/60 shadow-[inset_1px_1px_2px_rgba(255,255,255,0.5),1px_1px_1px_rgba(0,0,0,0.3)] flex items-center justify-center hover:brightness-110 active:brightness-90 opacity-80 hover:opacity-100"
          >
            <div className="w-2 h-1 bg-white rounded-sm mt-1"></div>
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); onMaximize(); }}
            className="w-[21px] h-[21px] bg-[#2257D5] rounded-[3px] border border-white/60 shadow-[inset_1px_1px_2px_rgba(255,255,255,0.5),1px_1px_1px_rgba(0,0,0,0.3)] flex items-center justify-center hover:brightness-110 active:brightness-90 opacity-80 hover:opacity-100"
          >
            <div className="w-2.5 h-2.5 border-[2px] border-white rounded-sm"></div>
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); onClose(); }}
            className="w-[21px] h-[21px] bg-[#E05333] rounded-[3px] border border-white/60 shadow-[inset_1px_1px_2px_rgba(255,255,255,0.5),1px_1px_1px_rgba(0,0,0,0.3)] flex items-center justify-center hover:brightness-110 active:brightness-90"
          >
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 1L9 9M9 1L1 9" stroke="white" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 bg-[#ECE9D8] p-[1px]">
        <div className="w-full h-full bg-white overflow-auto border border-[#828790]">
          {w.content}
        </div>
      </div>
    </div>
  );
}