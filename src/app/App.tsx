import { useState } from "react";
import { XPWindow } from "./components/XPWindow";
import { Taskbar } from "./components/Taskbar";
import { StartMenu } from "./components/StartMenu";
import { DesktopIcon } from "./components/DesktopIcon";
import { StartupAnimation } from "./components/StartupAnimation";
import { AboutContent } from "./components/AboutContent";
import { ProjectsContent } from "./components/ProjectsContent";
import { SkillsContent } from "./components/SkillsContent";
import { ContactContent } from "./components/ContactContent";
import { User, FolderOpen, FileText, Mail, Monitor } from "lucide-react";
import React from "react";
interface Window {
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
  const [isStartupComplete, setIsStartupComplete] = useState(false);
  const [windows, setWindows] = useState<Window[]>([]);
  const [showStartMenu, setShowStartMenu] = useState(false);
  const [zCounter, setZCounter] = useState(50);

  if (!isStartupComplete) {
    return <StartupAnimation onComplete={() => setIsStartupComplete(true)} />;
  }

  const getWindowContent = (id: string) => {
    switch (id) {
      case "about": return <AboutContent />;
      case "projects": return <ProjectsContent />;
      case "skills": return <SkillsContent />;
      case "contact": return <ContactContent />;
      default: return <div>Welcome to Windows XP Portfolio</div>;
    }
  };

  const bringToFront = (id: string) => {
    setWindows(prev => prev.map(w => w.id === id ? { ...w, zIndex: zCounter + 1 } : w));
    setZCounter(prev => prev + 1);
  };

  const openWindow = (id: string, title: string) => {
    const existing = windows.find(w => w.id === id);
    if (existing) {
      setWindows(prev => prev.map(w =>
        w.id === id ? { ...w, isMinimized: false, zIndex: zCounter + 1 } : w
      ));
      setZCounter(prev => prev + 1);
    } else {
      const newWindow: Window = {
        id,
        title,
        content: getWindowContent(id),
        isMinimized: false,
        isMaximized: false,
        zIndex: zCounter + 1,
        defaultPosition: { x: 100 + windows.length * 30, y: 80 + windows.length * 30 },
        defaultSize: { width: 600, height: 400 },
      };
      setWindows(prev => [...prev, newWindow]);
      setZCounter(prev => prev + 1);
    }
  };

  const closeWindow = (id: string) => {
    setWindows(prev => prev.filter(w => w.id !== id));
  };

  const minimizeWindow = (id: string) => {
    setWindows(prev => prev.map(w => w.id === id ? { ...w, isMinimized: true } : w));
  };

  const maximizeWindow = (id: string) => {
    setWindows(prev => prev.map(w => w.id === id ? { ...w, isMaximized: !w.isMaximized } : w));
    bringToFront(id);
  };

  const handleTaskClick = (id: string) => {
    const w = windows.find(win => win.id === id);
    if (!w) return;
    if (w.isMinimized) setWindows(prev => prev.map(win => win.id === id ? { ...win, isMinimized: false } : win));
    bringToFront(id);
  };

  const desktopIcons = [
    { id: "about", icon: <User className="w-8 h-8 text-[#0054E3]" />, label: "About Me" },
    { id: "projects", icon: <FolderOpen className="w-8 h-8 text-[#FFD700]" />, label: "My Projects" },
    { id: "skills", icon: <FileText className="w-8 h-8 text-[#2B882B]" />, label: "Skills" },
    { id: "contact", icon: <Mail className="w-8 h-8 text-[#E81123]" />, label: "Contact" },
    { id: "computer", icon: <Monitor className="w-8 h-8 text-[#0054E3]" />, label: "My Computer" },
  ];

  const topWindowId = windows.reduce((topId, w) =>
    w.zIndex > (windows.find(win => win.id === topId)?.zIndex || 0) ? w.id : topId,
    windows[0]?.id || null
  );

  return (
    <div className="w-full h-full relative overflow-hidden"
      style={{
        backgroundImage: "url(https://images.unsplash.com/photo-1761237423403-3ef1b5c72c73?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Desktop Icons */}
      <div className="absolute top-4 left-4 flex flex-col gap-2">
        {desktopIcons.map(icon => (
          <DesktopIcon
            key={icon.id}
            icon={icon.icon}
            label={icon.label}
            onClick={() => openWindow(icon.id, icon.label)}
          />
        ))}
      </div>

      {/* Windows */}
      {windows.map(w =>
        !w.isMinimized && (
          <XPWindow
            key={w.id}
            title={w.title}
            onClose={() => closeWindow(w.id)}
            onMinimize={() => minimizeWindow(w.id)}
            onMaximize={() => maximizeWindow(w.id)}
            isActive={topWindowId === w.id}
            isMaximized={w.isMaximized}
            defaultPosition={w.defaultPosition}
            defaultSize={w.defaultSize}
            onFocus={() => bringToFront(w.id)}
          >
            {w.content}
          </XPWindow>
        )
      )}

      {/* Start Menu */}
      {showStartMenu && (
        <StartMenu
          onOpenWindow={openWindow}
          onClose={() => setShowStartMenu(false)}
        />
      )}

      {/* Taskbar */}
      <Taskbar
        openWindows={windows.map(w => ({ id: w.id, title: w.title, icon: undefined }))}
        activeWindowId={topWindowId}
        onTaskClick={handleTaskClick}
        onStartClick={() => setShowStartMenu(prev => !prev)}
      />
    </div>
  );
}
