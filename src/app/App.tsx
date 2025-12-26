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
              className="flex flex-col items-center gap-1 p-2 rounded hover:bg-blue-400/30 transition-colors group"
            >
              <div className="w-12 h-12 bg-white/90 rounded border-2 border-gray-300 flex items-center justify-center shadow-lg">
                <IconComponent className="w-8 h-8" style={{ color: icon.color }} />
              </div>
              <span className="text-white text-xs font-bold drop-shadow-md text-center max-w-[80px]">
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
      <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-b from-[#245EDC] to-[#1941A5] border-t-2 border-[#3F8CF3] shadow-lg flex items-center px-2 gap-2 z-40">
        <button
          onClick={() => setShowStartMenu((prev) => !prev)}
          className="px-4 py-1 bg-gradient-to-b from-green-500 to-green-700 hover:from-green-600 hover:to-green-800 text-white font-bold rounded border-2 border-green-800 shadow-md flex items-center gap-2"
        >
          <span className="text-lg">⊞</span> Start
        </button>

        <div className="flex-1 flex gap-1">
          {windows.map((w) => (
            <button
              key={w.id}
              onClick={() => handleTaskClick(w.id)}
              className={`px-3 py-1 text-sm font-semibold rounded border-2 transition-all ${
                topWindowId === w.id
                  ? "bg-gradient-to-b from-blue-400 to-blue-600 border-blue-700 text-white"
                  : "bg-gradient-to-b from-blue-200 to-blue-300 border-blue-400 text-gray-800"
              }`}
            >
              {w.title}
            </button>
          ))}
        </div>

        <div className="px-3 py-1 bg-blue-400 rounded text-white text-xs font-bold border border-blue-600">
          {new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
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
      className="absolute bg-white border-2 border-gray-400 shadow-2xl rounded"
      style={{
        left: w.isMaximized ? 0 : position.x,
        top: w.isMaximized ? 0 : position.y,
        width: w.isMaximized ? "100%" : w.defaultSize.width,
        height: w.isMaximized ? "calc(100% - 48px)" : w.defaultSize.height,
        zIndex: w.zIndex,
      }}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {/* Title Bar */}
      <div
        className={`h-8 flex items-center justify-between px-2 cursor-move rounded-t ${
          isActive
            ? "bg-gradient-to-r from-[#0054E3] to-[#0078D7]"
            : "bg-gradient-to-r from-gray-400 to-gray-500"
        }`}
        onMouseDown={handleMouseDown}
      >
        <span className="text-white font-bold text-sm">{w.title}</span>
        <div className="flex gap-1">
          <button
            onClick={onMinimize}
            className="w-5 h-5 bg-blue-500 hover:bg-blue-600 border border-blue-700 rounded-sm flex items-center justify-center text-white text-xs font-bold"
          >
            _
          </button>
          <button
            onClick={onMaximize}
            className="w-5 h-5 bg-blue-500 hover:bg-blue-600 border border-blue-700 rounded-sm flex items-center justify-center text-white text-xs font-bold"
          >
            □
          </button>
          <button
            onClick={onClose}
            className="w-5 h-5 bg-red-500 hover:bg-red-600 border border-red-700 rounded-sm flex items-center justify-center text-white text-xs font-bold"
          >
            ×
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="h-[calc(100%-2rem)] overflow-auto">{w.content}</div>
    </div>
  );
}