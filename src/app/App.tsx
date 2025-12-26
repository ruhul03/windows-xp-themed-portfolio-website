import { useState } from 'react'; 
import { XPWindow } from './components/XPWindow';
import { Taskbar } from './components/Taskbar';
import { StartMenu } from './components/StartMenu';
import { DesktopIcon } from './components/DesktopIcon';
import { StartupAnimation } from './components/StartupAnimation';
import { AboutContent } from './components/AboutContent';
import { ProjectsContent } from './components/ProjectsContent';
import { SkillsContent } from './components/SkillsContent';
import { ContactContent } from './components/ContactContent';
import { User, FolderOpen, FileText, Mail, Monitor } from 'lucide-react';

interface Window {
  id: string;
  title: string;
  content: React.ReactNode;
  isMinimized: boolean;
}

export default function App() {
  const [isStartupComplete, setIsStartupComplete] = useState(false);
  const [windows, setWindows] = useState<Window[]>([]);
  const [activeWindowId, setActiveWindowId] = useState<string | null>(null);
  const [showStartMenu, setShowStartMenu] = useState(false);

  // Show startup animation first
  if (!isStartupComplete) {
    return <StartupAnimation onComplete={() => setIsStartupComplete(true)} />;
  }

  const getWindowContent = (id: string) => {
    switch (id) {
      case 'about':
        return <AboutContent />;
      case 'projects':
        return <ProjectsContent />;
      case 'skills':
        return <SkillsContent />;
      case 'contact':
        return <ContactContent />;
      default:
        return <div>Welcome to Windows XP Portfolio</div>;
    }
  };

  const openWindow = (id: string, title: string) => {
    const existingWindow = windows.find((w) => w.id === id);
    if (existingWindow) {
      setWindows(windows.map((w) => 
        w.id === id ? { ...w, isMinimized: false } : w
      ));
      setActiveWindowId(id);
    } else {
      const newWindow: Window = {
        id,
        title,
        content: getWindowContent(id),
        isMinimized: false,
      };
      setWindows([...windows, newWindow]);
      setActiveWindowId(id);
    }
  };

  const closeWindow = (id: string) => {
    setWindows(windows.filter((w) => w.id !== id));
    if (activeWindowId === id) {
      const remainingWindows = windows.filter((w) => w.id !== id);
      setActiveWindowId(remainingWindows.length > 0 ? remainingWindows[remainingWindows.length - 1].id : null);
    }
  };

  const minimizeWindow = (id: string) => {
    setWindows(windows.map((w) => 
      w.id === id ? { ...w, isMinimized: true } : w
    ));
    if (activeWindowId === id) {
      setActiveWindowId(null);
    }
  };

  const handleTaskClick = (id: string) => {
    const window = windows.find((w) => w.id === id);
    if (window?.isMinimized) {
      setWindows(windows.map((w) => 
        w.id === id ? { ...w, isMinimized: false } : w
      ));
    }
    setActiveWindowId(id);
  };

  const desktopIcons = [
    { id: 'about', icon: <User className="w-8 h-8 text-[#0054E3]" />, label: 'About Me' },
    { id: 'projects', icon: <FolderOpen className="w-8 h-8 text-[#FFD700]" />, label: 'My Projects' },
    { id: 'skills', icon: <FileText className="w-8 h-8 text-[#2B882B]" />, label: 'Skills' },
    { id: 'contact', icon: <Mail className="w-8 h-8 text-[#E81123]" />, label: 'Contact' },
    { id: 'computer', icon: <Monitor className="w-8 h-8 text-[#0054E3]" />, label: 'My Computer' },
  ];

  return (
    <div 
      className="size-full relative overflow-hidden"
      style={{
        backgroundImage: 'url(https://images.unsplash.com/photo-1761237423403-3ef1b5c72c73?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmVlbiUyMGhpbGxzJTIwYmx1ZSUyMHNreXxlbnwxfHx8fDE3NjY2NzA2NDF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Desktop Icons */}
      <div className="absolute top-4 left-4 flex flex-col gap-2">
        {desktopIcons.map((icon) => (
          <DesktopIcon
            key={icon.id}
            icon={icon.icon}
            label={icon.label}
            onClick={() => openWindow(icon.id, icon.label)}
          />
        ))}
      </div>

      {/* Windows */}
      {windows.map((window, index) => (
        !window.isMinimized && (
          <XPWindow
            key={window.id}
            title={window.title}
            onClose={() => closeWindow(window.id)}
            onMinimize={() => minimizeWindow(window.id)}
            defaultPosition={{
              x: 100 + index * 40,
              y: 80 + index * 40,
            }}
            isActive={activeWindowId === window.id}
            onFocus={() => setActiveWindowId(window.id)}
          >
            {window.content}
          </XPWindow>
        )
      ))}

      {/* Start Menu */}
      {showStartMenu && (
        <StartMenu
          onOpenWindow={openWindow}
          onClose={() => setShowStartMenu(false)}
        />
      )}

      {/* Taskbar */}
      <Taskbar
        openWindows={windows.map((w) => ({ id: w.id, title: w.title }))}
        activeWindowId={activeWindowId}
        onTaskClick={handleTaskClick}
        onStartClick={() => setShowStartMenu(!showStartMenu)}
      />
    </div>
  );
}