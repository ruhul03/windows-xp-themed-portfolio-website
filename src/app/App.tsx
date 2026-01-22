import { useState } from "react";
import { User, FolderOpen, FileText, Mail, Monitor, LogOut, Power, Volume2, Wifi } from "lucide-react";
import blissBg from "../assets/bliss.jpg";

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
      className="w-full h-screen relative overflow-hidden bg-[#5A8FCC] font-tahoma select-none"
      style={{
        backgroundImage: `url(${blissBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
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
        <div className="absolute bottom-[30px] left-0 w-[380px] h-[480px] bg-white rounded-tr-[5px] rounded-tl-[5px] shadow-2xl flex flex-col z-[60] overflow-hidden animate-in slide-in-from-bottom-5 fade-in duration-200" style={{ boxShadow: "2px 0px 10px rgba(0,0,0,0.5)" }}>
          {/* Header */}
          <div className="h-[60px] bg-gradient-to-b from-[#1571DE] to-[#2083E9] flex items-center px-2 shadow-[inset_0px_2px_2px_rgba(255,255,255,0.3)] border-b-[2px] border-[#3881E2]">
            <div className="w-[44px] h-[44px] rounded-[3px] bg-white border-[2px] border-white/40 overflow-hidden shadow-md flex items-center justify-center relative">
              <User className="w-8 h-8 text-[#1571DE] opacity-80" />
            </div>
            <span className="text-white font-bold text-[16px] ml-3 drop-shadow-md">Guest</span>
          </div>

          {/* Body */}
          <div className="flex-1 flex border-t border-[#F79633]">
            {/* Left Column (White) */}
            <div className="w-[190px] bg-white flex flex-col p-1 gap-1">
              {desktopIcons.slice(0, 4).map(icon => {
                const Icon = icon.icon;
                return (
                  <button key={icon.id} onClick={() => { openWindow(icon.id, icon.label); setShowStartMenu(false); }} className="h-[36px] flex items-center px-2 hover:bg-[#316AC5] hover:text-white group rounded-sm transition-colors">
                    <Icon className="w-6 h-6 text-gray-600 group-hover:text-white mr-2" />
                    <div className="flex flex-col items-start">
                      <span className="text-[11px] font-bold text-gray-800 group-hover:text-white">{icon.label}</span>
                      <span className="text-[9px] text-gray-500 group-hover:text-white/80">Application</span>
                    </div>
                  </button>
                )
              })}
              <div className="flex-1"></div>
              <div className="h-[1px] bg-gradient-to-r from-transparent via-gray-300 to-transparent my-1"></div>
              <button className="h-[36px] flex items-center px-2 hover:bg-[#316AC5] hover:text-white group rounded-sm transition-colors">
                <span className="font-bold text-[11px] ml-1">All Programs</span>
                <div className="ml-auto bg-[#239B28] rounded-full p-[2px]"><div className="w-0 h-0 border-l-[4px] border-l-white border-y-[3px] border-y-transparent"></div></div>
              </button>
            </div>

            {/* Right Column (Blue) */}
            <div className="flex-1 bg-[#D3E5FA] border-l border-[#95BDEB] flex flex-col p-1 gap-1">
              <button className="h-[28px] flex items-center px-2 hover:bg-[#316AC5] hover:text-white group rounded-sm transition-colors">
                <span className="text-[11px] font-bold text-[#00136B] group-hover:text-white">My Documents</span>
              </button>
              <button className="h-[28px] flex items-center px-2 hover:bg-[#316AC5] hover:text-white group rounded-sm transition-colors">
                <span className="text-[11px] font-bold text-[#00136B] group-hover:text-white">My Pictures</span>
              </button>
              <button className="h-[28px] flex items-center px-2 hover:bg-[#316AC5] hover:text-white group rounded-sm transition-colors">
                <span className="text-[11px] font-bold text-[#00136B] group-hover:text-white">My Music</span>
              </button>
              <div className="h-[1px] bg-[#AECBF2] w-[90%] self-center my-0.5"></div>
              <button className="h-[28px] flex items-center px-2 hover:bg-[#316AC5] hover:text-white group rounded-sm transition-colors">
                <span className="text-[11px] font-bold text-[#00136B] group-hover:text-white">Control Panel</span>
              </button>
              <button onClick={() => { openWindow("computer", "My Computer"); setShowStartMenu(false); }} className="h-[28px] flex items-center px-2 hover:bg-[#316AC5] hover:text-white group rounded-sm transition-colors">
                <span className="text-[11px] font-bold text-[#00136B] group-hover:text-white">My Computer</span>
              </button>
            </div>
          </div>

          {/* Footer */}
          <div className="h-[40px] bg-gradient-to-b from-[#3883E6] to-[#3A84E5] flex items-center justify-end px-3 gap-3 shadow-[inset_0px_2px_2px_rgba(0,0,0,0.1)] border-t-[2px] border-[#F79633]">
            <button className="flex items-center gap-1 text-white hover:text-gray-100 transition-colors">
              <div className="p-1 bg-[#E58C36] rounded-[2px] shadow-sm border border-white/30"><LogOut className="w-3 h-3" /></div>
              <span className="text-[10px]">Log Off</span>
            </button>
            <button className="flex items-center gap-1 text-white hover:text-gray-100 transition-colors">
              <div className="p-1 bg-[#DE4933] rounded-[2px] shadow-sm border border-white/30"><Power className="w-3 h-3" /></div>
              <span className="text-[10px]">Turn Off Computer</span>
            </button>
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

        <div className="h-full bg-[#0B77E9] px-2 flex items-center border-l border-[#1941A5] shadow-[inset_2px_2px_4px_rgba(0,0,0,0.3)] gap-2">
          <div className="flex gap-1 px-1">
            <Wifi className="w-3.5 h-3.5 text-white/90 drop-shadow-sm" />
            <Volume2 className="w-3.5 h-3.5 text-white/90 drop-shadow-sm" />
          </div>
          <div className="text-white text-[11px] font-normal px-1">
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