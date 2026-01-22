import { useState, useEffect } from "react";
import { User, FolderOpen, FileText, Mail, Monitor, LogOut, Power, Volume2, Wifi, Minimize2, Maximize2, X } from "lucide-react";
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
  const [windows, setWindows] = useState<WindowType[]>([]);
  const [showStartMenu, setShowStartMenu] = useState(false);
  const [zCounter, setZCounter] = useState(50);
  const [isTurnOffOpen, setIsTurnOffOpen] = useState(false);
  const [isLogOffOpen, setIsLogOffOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const getWindowContent = (id: string) => {
    switch (id) {
      case "documents":
        return (
          <ExplorerWindow
            title="My Documents"
            icon={FileText}
            items={[
              { name: "Resume.pdf", type: "PDF File" },
              { name: "Project Specs.docx", type: "Word Document" },
              { name: "Notes.txt", type: "Text Document" },
            ]}
          />
        );
      case "pictures":
        return (
          <ExplorerWindow
            title="My Pictures"
            icon={FolderOpen}
            items={[
              { name: "Wallpaper.jpg", type: "JPEG Image" },
              { name: "Screenshot.png", type: "PNG Image" },
            ]}
          />
        );
      case "music":
        return (
          <ExplorerWindow
            title="My Music"
            icon={Volume2}
            items={[
              { name: "Beethoven's Symphony No. 9", type: "MP3 File" },
              { name: "New Stories (Highway Blues)", type: "WMA File" },
            ]}
          />
        );
      case "control-panel":
        return (
          <ExplorerWindow
            title="Control Panel"
            icon={Monitor}
            items={[
              { name: "Display", type: "System Setting" },
              { name: "Add or Remove Programs", type: "System Setting" },
              { name: "User Accounts", type: "System Setting" },
            ]}
          />
        );
      default:
        switch (id) {
          case "about":
            return (
              <div className="p-4 bg-white h-full overflow-auto text-[13px] leading-relaxed select-text cursor-text">
                <h2 className="text-lg font-bold text-gray-800 mb-2">About Me</h2>
                <div className="flex gap-4">
                  <div className="w-20 h-20 bg-gray-100 border border-gray-300 flex items-center justify-center shrink-0 shadow-sm">
                    <User className="w-10 h-10 text-gray-400" />
                  </div>
                  <div>
                    <p className="mb-2">
                      Welcome to my Windows XP themed portfolio! I'm a passionate developer who loves creating nostalgic experiences.
                    </p>
                    <p>
                      I specialize in modern web technologies while keeping the spirit of the classic web alive.
                    </p>
                  </div>
                </div>
              </div>
            );
          case "projects":
            return (
              <div className="p-4 bg-white h-full overflow-auto text-[13px] select-text cursor-text">
                <h2 className="text-lg font-bold text-gray-800 mb-2">My Projects</h2>
                <ul className="list-disc pl-5 space-y-1">
                  <li><strong>Portfolio Website:</strong> You're looking at it! React + Tailwind.</li>
                  <li><strong>E-commerce Platform:</strong> A full-stack Next.js application.</li>
                  <li><strong>Chat App:</strong> Real-time messaging with Socket.io.</li>
                </ul>
              </div>
            );
          case "skills":
            return (
              <div className="p-4 bg-white h-full overflow-auto text-[13px] select-text cursor-text">
                <h2 className="text-lg font-bold text-gray-800 mb-2">Skills</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-bold mb-1 border-b border-gray-300">Frontend</h3>
                    <ul className="list-disc pl-5">
                      <li>React / Next.js</li>
                      <li>TypeScript</li>
                      <li>Tailwind CSS</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-bold mb-1 border-b border-gray-300">Backend</h3>
                    <ul className="list-disc pl-5">
                      <li>Node.js</li>
                      <li>Python</li>
                      <li>PostgreSQL</li>
                    </ul>
                  </div>
                </div>
              </div>
            );
          case "contact":
            return (
              <div className="p-4 bg-white h-full overflow-auto text-[13px] select-text cursor-text">
                <h2 className="text-lg font-bold text-gray-800 mb-2">Contact</h2>
                <p className="mb-2">Feel free to reach out!</p>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5 text-blue-600" />
                    <span>email@example.com</span>
                  </div>
                </div>
              </div>
            );
          default:
            return (
              <div className="p-4 bg-white h-full text-[13px] select-text cursor-text">
                <h2 className="text-lg font-bold">Welcome</h2>
              </div>
            );
        }
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
        defaultPosition: { x: 100 + windows.length * 20, y: 50 + windows.length * 20 },
        defaultSize: { width: 600, height: 450 },
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
    { id: "contact", icon: Mail, label: "E-mail", color: "#E81123" },
    { id: "computer", icon: Monitor, label: "My Computer", color: "#0054E3" },
    { id: "documents", icon: FolderOpen, label: "My Documents", color: "#FFD700" },
    { id: "trash", icon: LogOut, label: "Recycle Bin", color: "#555" }, // Using LogOut as placeholder for trash
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
      onClick={() => { if (showStartMenu) setShowStartMenu(false); }}
    >
      {/* Desktop Icons */}
      <div className="absolute top-2 left-2 flex flex-col items-start gap-4 flex-wrap h-[calc(100%-40px)] content-start w-full pointer-events-none">
        {desktopIcons.map((icon) => {
          const IconComponent = icon.icon;
          return (
            <button
              key={icon.id}
              onClick={() => openWindow(icon.id, icon.label)} // Single click for web simplicity, double click would be more authentic but harder for UX
              onDoubleClick={() => openWindow(icon.id, icon.label)}
              className="flex flex-col items-center justify-start w-[70px] group pointer-events-auto"
            >
              <div className="w-[42px] h-[42px] mb-1 relative flex items-center justify-center group-hover:drop-shadow-lg transition-transform active:scale-95">
                {/* Placeholder for real Icons - using Lucide with color */}
                <IconComponent className="w-full h-full drop-shadow-md" style={{ color: icon.color, filter: 'drop-shadow(2px 2px 2px rgba(0,0,0,0.5))' }} />
              </div>
              <span className="text-white text-[11px] font-normal drop-shadow-[1px_1px_1px_black] text-center leading-tight px-1 py-[1px] group-hover:bg-[#0054E3] group-hover:bg-opacity-80 rounded-[2px] transition-colors">
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
        <div
          onClick={(e) => e.stopPropagation()}
          className="absolute bottom-[30px] left-0 w-[380px] h-[480px] bg-white rounded-tr-[5px] rounded-tl-[5px] shadow-2xl flex flex-col z-[9999] overflow-hidden animate-in slide-in-from-bottom-2 duration-100"
          style={{ boxShadow: "2px 0px 10px rgba(0,0,0,0.5)" }}
        >
          {/* Header */}
          <div className="h-[64px] bg-gradient-to-b from-[#1571DE] to-[#2083E9] flex items-center px-2 border-b-[2px] border-[#E8921D] relative shadow-[inset_0_5px_10px_rgba(255,255,255,0.3)]">
            <div className="w-[48px] h-[48px] rounded-[3px] bg-white border-[2px] border-white/60 overflow-hidden shadow-sm flex items-center justify-center relative ml-1">
              <User className="w-10 h-10 text-[#1571DE] opacity-80" />
            </div>
            <span className="text-white font-bold text-[18px] ml-3 drop-shadow-[1px_1px_1px_rgba(0,0,0,0.5)] tracking-wide">Administrator</span>
          </div>

          {/* Body */}
          <div className="flex-1 flex">
            {/* Left Column (White) */}
            <div className="w-[190px] bg-white flex flex-col p-2 pr-1 gap-1">
              <button className="flex flex-col gap-1 w-full mb-2">
                <div className="flex items-center gap-2 p-1 hover:bg-[#2F71CD] hover:text-white rounded-[3px] group w-full transition-colors cursor-default">
                  <Monitor className="w-8 h-8 text-gray-600 group-hover:text-white" />
                  <div className="flex flex-col items-start leading-none">
                    <span className="font-bold text-[11px] text-black group-hover:text-white">Internet</span>
                    <span className="text-[10px] text-gray-500 group-hover:text-white/80">Internet Explorer</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 p-1 hover:bg-[#2F71CD] hover:text-white rounded-[3px] group w-full transition-colors cursor-default">
                  <Mail className="w-8 h-8 text-gray-600 group-hover:text-white" />
                  <div className="flex flex-col items-start leading-none">
                    <span className="font-bold text-[11px] text-black group-hover:text-white">E-mail</span>
                    <span className="text-[10px] text-gray-500 group-hover:text-white/80">Outlook Express</span>
                  </div>
                </div>
              </button>

              <div className="h-[1px] bg-gradient-to-r from-transparent via-gray-300 to-transparent my-1 w-full"></div>

              {desktopIcons.slice(0, 4).map(icon => {
                const Icon = icon.icon;
                return (
                  <button key={icon.id} onClick={() => { openWindow(icon.id, icon.label); setShowStartMenu(false); }} className="h-[36px] flex items-center px-1 hover:bg-[#2F71CD] hover:text-white group rounded-[3px] transition-colors gap-2">
                    <Icon className="w-6 h-6 text-gray-600 group-hover:text-white" />
                    <span className="text-[11px] text-gray-800 group-hover:text-white tracking-tight">{icon.label}</span>
                  </button>
                )
              })}

              <div className="mt-auto h-8 flex items-center justify-center p-1">
                <div className="font-bold text-[11px] flex items-center gap-1 cursor-pointer hover:bg-[#2F71CD] hover:text-white px-4 py-1 rounded-[3px] transition-colors w-full justify-center">
                  All Programs <div className="w-0 h-0 border-l-[4px] border-l-current border-y-[3px] border-y-transparent ml-1"></div>
                </div>
              </div>
            </div>

            {/* Right Column (Blue) */}
            <div className="flex-1 bg-[#D3E5FA] border-l border-[#AECBF2] flex flex-col p-2 gap-1 pl-1">
              <div className="flex flex-col gap-1 items-start w-full">
                <StartMenuRightItem icon={FileText} label="My Documents" bold onClick={() => { openWindow("documents", "My Documents"); setShowStartMenu(false); }} />
                <StartMenuRightItem icon={FolderOpen} label="My Pictures" bold onClick={() => { openWindow("pictures", "My Pictures"); setShowStartMenu(false); }} />
                <StartMenuRightItem icon={Volume2} label="My Music" bold onClick={() => { openWindow("music", "My Music"); setShowStartMenu(false); }} />
                <StartMenuRightItem icon={Monitor} label="My Computer" bold onClick={() => { openWindow("computer", "My Computer"); setShowStartMenu(false); }} />
              </div>

              <div className="h-[1px] bg-[#AECBF2] w-[90%] self-center my-1"></div>

              <div className="flex flex-col gap-1 items-start w-full">
                <StartMenuRightItem icon={Monitor} label="Control Panel" onClick={() => { openWindow("control-panel", "Control Panel"); setShowStartMenu(false); }} />
                <StartMenuRightItem icon={Wifi} label="Connect To" onClick={() => { }} />
              </div>

              <div className="h-[1px] bg-[#AECBF2] w-[90%] self-center my-1"></div>

              <div className="flex flex-col gap-1 items-start w-full">
                <StartMenuRightItem icon={FileText} label="Help and Support" onClick={() => { }} />
                <StartMenuRightItem icon={Monitor} label="Search" onClick={() => { }} />
                <StartMenuRightItem icon={Monitor} label="Run..." onClick={() => { }} />
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="h-[44px] bg-gradient-to-b from-[#4282D6] to-[#3A84E5] flex items-center justify-end px-4 gap-3 border-t-[2px] border-[#E8921D] shadow-[inset_0_2px_2px_rgba(255,255,255,0.2)]">
            <button
              onClick={() => { setShowStartMenu(false); setIsLogOffOpen(true); }}
              className="flex items-center gap-1 text-white hover:text-gray-100 transition-colors cursor-pointer"
            >
              <div className="p-1.5 bg-[#E58C36] rounded-[3px] shadow-sm border border-white/40"><LogOut className="w-3.5 h-3.5" /></div>
              <span className="text-[11px] drop-shadow-sm">Log Off</span>
            </button>
            <button
              onClick={() => { setShowStartMenu(false); setIsTurnOffOpen(true); }}
              className="flex items-center gap-1 text-white hover:text-gray-100 transition-colors cursor-pointer"
            >
              <div className="p-1.5 bg-[#DE4933] rounded-[3px] shadow-sm border border-white/40"><Power className="w-3.5 h-3.5" /></div>
              <span className="text-[11px] drop-shadow-sm">Turn Off Computer</span>
            </button>
          </div>
        </div>
      )}

      {/* Turn Off Dialog */}
      {isTurnOffOpen && (
        <div className="absolute inset-0 z-[99999] flex items-center justify-center">
          <div className="absolute inset-0 bg-black/40 animate-in fade-in duration-500"></div>
          <div className="relative z-10 w-[350px] bg-[#003399] p-[2px] rounded-sm shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="bg-gradient-to-b from-[#003399] to-[#003399] p-2 flex justify-between items-center px-4">
              <span className="text-white font-bold text-lg">Turn off computer</span>
              <div className="text-white/60 text-lg font-bold italic">Windows <span className="text-[#FF6600]">xp</span></div>
            </div>
            <div className="bg-[#D4D0C8] p-8 rounded-b-sm flex justify-center gap-8 border-t-[2px] border-[#E68B2C]">
              <div className="flex flex-col items-center gap-2 group cursor-pointer hover:font-bold" onClick={() => setIsTurnOffOpen(false)}>
                <div className="w-10 h-10 bg-[#E8A23D] rounded-[3px] border border-white/60 shadow-lg flex items-center justify-center relative overflow-hidden group-hover:brightness-110">
                  <div className="w-full h-full bg-gradient-to-br from-white/30 to-transparent absolute"></div>
                  <div className="w-2 h-4 border-l-2 border-white/80 bg-black/10"></div>
                </div>
                <span className="text-[11px]">Standby</span>
              </div>
              <div className="flex flex-col items-center gap-2 group cursor-pointer hover:font-bold" onClick={() => window.location.reload()}>
                <div className="w-10 h-10 bg-[#CE3629] rounded-[3px] border border-white/60 shadow-lg flex items-center justify-center relative overflow-hidden group-hover:brightness-110">
                  <div className="w-full h-full bg-gradient-to-br from-white/30 to-transparent absolute"></div>
                  <Power className="w-5 h-5 text-white" />
                </div>
                <span className="text-[11px]">Turn Off</span>
              </div>
              <div className="flex flex-col items-center gap-2 group cursor-pointer hover:font-bold" onClick={() => window.location.reload()}>
                <div className="w-10 h-10 bg-[#74B642] rounded-[3px] border border-white/60 shadow-lg flex items-center justify-center relative overflow-hidden group-hover:brightness-110">
                  <div className="w-full h-full bg-gradient-to-br from-white/30 to-transparent absolute"></div>
                  <div className="w-4 h-4 border-r-2 border-t-2 border-white/80 rotate-45 rounded-sm"></div>
                </div>
                <span className="text-[11px]">Restart</span>
              </div>
            </div>
            <div className="bg-[#D4D0C8] p-3 flex justify-end">
              <button
                className="px-5 py-1 box-border border border-[#555] bg-gradient-to-b from-[#f9f9f9] to-[#d6d6d6] text-black text-[11px] shadow-sm hover:from-white hover:to-gray-200 active:shadow-inner active:from-[#d6d6d6] active:to-[#d6d6d6]"
                onClick={() => setIsTurnOffOpen(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Taskbar */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[30px] flex items-center px-0 z-[9990]"
        style={{ background: 'linear-gradient(to bottom, #245EDC 0%, #3E8CF3 10%, #245EDC 100%)', borderTop: '2px solid #3F8CF3' }}
      >
        <button
          onClick={(e) => { e.stopPropagation(); setShowStartMenu((prev) => !prev); }}
          className="h-[30px] relative top-[-2px] pl-2 pr-6 flex items-center gap-1.5 cursor-pointer rounded-r-[15px] outline-none border-none transition-all shadow-[2px_0_5px_rgba(0,0,0,0.3)] z-50 overflow-visible"
          style={{
            background: 'linear-gradient(to bottom, #3E9F3D 0%, #258522 100%)',
            boxShadow: 'inset 1px 1px 0 rgba(255,255,255,0.4), 2px 0 2px rgba(0,0,0,0.3)'
          }}
          onMouseEnter={(e) => e.currentTarget.style.background = 'linear-gradient(to bottom, #45B243 0%, #2B9627 100%)'}
          onMouseLeave={(e) => e.currentTarget.style.background = 'linear-gradient(to bottom, #3E9F3D 0%, #258522 100%)'}
        >
          <div className="italic font-bold text-white text-[16px] drop-shadow-[1px_1px_1px_rgba(0,0,0,0.5)] select-none pointer-events-none mt-[2px]">
            <span className="opacity-80 mr-1">❖</span> Start
          </div>
        </button>

        <div className="absolute left-[80px] h-[2px] bg-[#3F8CF3] w-4 z-40"></div>

        <div className="flex-1 flex gap-1 px-2 h-full items-center pl-4">
          {windows.map((w) => (
            <button
              key={w.id}
              onClick={() => handleTaskClick(w.id)}
              className={`px-2 h-[22px] min-w-[120px] max-w-[150px] text-[11px] text-left rounded-[2px] transition-all flex items-center gap-2 truncate cursor-default select-none group
                 ${topWindowId === w.id
                  ? "bg-[#1E52B7] text-white shadow-[inset_1px_1px_2px_rgba(0,0,0,0.5)] border border-[#102A58]"
                  : "bg-[#3C81F3] text-white hover:bg-[#5392F7] shadow-[1px_1px_0_rgba(255,255,255,0.2)] border-b border-r border-[#10346E]"
                }`}
            >
              <div className="w-3 h-3"><FileText className="w-full h-full" /></div>
              <span className="truncate">{w.title}</span>
            </button>
          ))}
        </div>

        <div
          className="h-full px-4 flex items-center gap-2 pl-3 border-l border-[#1941A5] shadow-[inset_1px_0_1px_rgba(0,0,0,0.2)] z-10"
          style={{ background: 'linear-gradient(to bottom, #1290E8 0%, #0B77E9 10%, #1290E8 100%)' }}
        >
          <button className="rounded-full bg-white/20 p-0.5 hover:bg-white/40 transition-colors">
            <div className="w-3 h-3 text-white">‹</div>
          </button>
          <div className="flex gap-2 px-1">
            <Wifi className="w-3.5 h-3.5 text-cyan-200 drop-shadow-sm" />
            <Volume2 className="w-3.5 h-3.5 text-white/90 drop-shadow-sm" />
          </div>
          <div className="text-white text-[12px] font-normal px-1 drop-shadow-sm">
            {currentTime.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })}
          </div>
        </div>
      </div>
    </div>
  );
}

function StartMenuRightItem({ icon: Icon, label, bold, onClick }: { icon: any, label: string, bold?: boolean, onClick: () => void }) {
  return (
    <button onClick={onClick} className="h-[24px] flex items-center px-1 hover:bg-[#2F71CD] hover:text-white group rounded-[2px] transition-colors gap-2 w-full text-left">
      <Icon className="w-4 h-4 text-[#00136B] group-hover:text-white" />
      <span className={`text-[11px] text-[#00136B] group-hover:text-white ${bold ? "font-bold" : ""}`}>{label}</span>
    </button>
  )
}


interface XPWindowProps {
  window: WindowType;
  isActive: boolean;
  onClose: () => void;
  onMinimize: () => void;
  onMaximize: () => void;
  onFocus: () => void;
}

// XPWindow Component
// Implements the specific blue gradient, rounded corners, and thick borders of XP Luna theme
function XPWindow({ window: w, isActive, onClose, onMinimize, onMaximize, onFocus }: XPWindowProps) {
  const [position, setPosition] = useState(w.defaultPosition);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const handleMouseDown = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest(".window-controls")) return;
    setIsDragging(true);
    setDragStart({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
    onFocus();
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    if (w.isMaximized) return; // Cannot move maximized window
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
      className={`absolute flex flex-col rounded-t-[8px] p-[3px] pb-[3px] ${isActive ? "z-[100]" : "z-40"}`}
      style={{
        left: w.isMaximized ? 0 : position.x,
        top: w.isMaximized ? 0 : position.y,
        width: w.isMaximized ? "100%" : w.defaultSize.width,
        height: w.isMaximized ? "calc(100% - 30px)" : w.defaultSize.height,
        backgroundColor: "#0054E3", // The distinct XP blue border color
        zIndex: w.zIndex,
        boxShadow: isActive ? '2px 2px 10px rgba(0,0,0,0.5)' : 'none',
        borderRadius: w.isMaximized ? '0' : '8px 8px 0 0',
      }}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onClick={onFocus}
    >
      {/* Title Bar */}
      <div
        className="h-[30px] flex items-center justify-between px-2 cursor-default select-none relative overflow-hidden rounded-t-[5px]"
        style={{
          background: isActive
            ? 'linear-gradient(to bottom, #0058EE 0%, #3593FF 4%, #288EFF 18%, #121D79 100%)'
            : 'linear-gradient(to bottom, #7697E7 0%, #7C9EEB 3%, #7F9FEF 100%)'
        }}
        onMouseDown={handleMouseDown}
        onDoubleClick={onMaximize}
      >
        <div className="text-white font-bold text-[13px] px-1 drop-shadow-[1px_1px_1px_black] truncate flex-1 pointer-events-none" style={{ textShadow: '1px 1px 0 #000' }}>
          {w.title}
        </div>

        <div className="flex gap-[2px] ml-2 window-controls">
          <button
            onClick={(e) => { e.stopPropagation(); onMinimize(); }}
            className="w-[21px] h-[21px] bg-[#2257D5] rounded-[3px] border border-white/60 shadow-[inset_1px_1px_2px_rgba(255,255,255,0.7),1px_1px_1px_rgba(0,0,0,0.4)] flex items-center justify-center hover:brightness-125 active:brightness-90 opacity-80 hover:opacity-100 transition-all"
          >
            <div className="w-[8px] h-[2px] bg-white rounded-[1px] mt-1 shadow-sm"></div>
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); onMaximize(); }}
            className="w-[21px] h-[21px] bg-[#2257D5] rounded-[3px] border border-white/60 shadow-[inset_1px_1px_2px_rgba(255,255,255,0.7),1px_1px_1px_rgba(0,0,0,0.4)] flex items-center justify-center hover:brightness-125 active:brightness-90 opacity-80 hover:opacity-100 transition-all"
          >
            <div className="w-[10px] h-[9px] border-[2px] border-white rounded-[1px] shadow-sm"></div>
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); onClose(); }}
            className="w-[21px] h-[21px] bg-[#E05333] rounded-[3px] border border-white/60 shadow-[inset_1px_1px_2px_rgba(255,255,255,0.7),1px_1px_1px_rgba(0,0,0,0.4)] flex items-center justify-center hover:bg-[#FF5533] active:brightness-90 transition-all ml-0.5"
          >
            <X className="w-4 h-4 text-white drop-shadow-md" strokeWidth={3} />
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 bg-[#ECE9D8] pt-0 flex flex-col">
        {/* Menu Bar */}
        <div className="h-[22px] bg-[#ECE9D8] flex items-center px-1 text-[11px] border-b border-[#D1D1D1]">
          <span className="px-2 py-0.5 hover:bg-[#1660E8] hover:text-white cursor-default">File</span>
          <span className="px-2 py-0.5 hover:bg-[#1660E8] hover:text-white cursor-default">Edit</span>
          <span className="px-2 py-0.5 hover:bg-[#1660E8] hover:text-white cursor-default">View</span>
          <span className="px-2 py-0.5 hover:bg-[#1660E8] hover:text-white cursor-default">Favorites</span>
          <span className="px-2 py-0.5 hover:bg-[#1660E8] hover:text-white cursor-default">Tools</span>
          <span className="px-2 py-0.5 hover:bg-[#1660E8] hover:text-white cursor-default">Help</span>
          <div className="flex-1 text-right px-2 hidden lg:block text-gray-400">
            <div className="w-4 h-4 bg-windows-logo inline-block opacity-50"></div>
          </div>
        </div>

        {/* Toolbar */}
        <div className="h-[38px] bg-[#ECE9D8] border-b border-[#D1D1D1] flex items-center px-2 gap-2 shadow-[inset_0_-1px_0_rgba(255,255,255,0.5)]">
          <div className="flex items-center gap-1 text-[11px]">
            <button className="flex items-center gap-1 px-1 py-1 hover:border border-gray-400 hover:shadow-inner rounded-sm disabled:opacity-50">
              <div className="w-6 h-6 rounded-full bg-[#2E9C19] border border-[#1E6E11] flex items-center justify-center shadow-sm">
                <span className="text-white font-bold leading-none text-[14px] pb-0.5">←</span>
              </div>
              Back
            </button>
            <button className="p-1 hover:border border-gray-400 hover:shadow-inner rounded-sm">
              <div className="w-6 h-6 rounded-full bg-[#2E9C19] border border-[#1E6E11] flex items-center justify-center shadow-sm opacity-50">
                <span className="text-white font-bold leading-none text-[14px] pb-0.5">→</span>
              </div>
            </button>
          </div>

          <div className="h-[24px] w-[1px] bg-gray-400/50 mx-1 border-r border-white/50"></div>

          <div className="flex-1 flex items-center gap-2">
            <span className="text-gray-600 text-[11px]">Address</span>
            <div className="flex-1 bg-white border border-[#7F9DB9] h-[22px] flex items-center px-1 text-[12px] shadow-[inset_1px_1px_1px_rgba(0,0,0,0.1)]">
              <div className="w-3 h-3 mr-1"><FolderOpen className="w-full h-full text-yellow-500" /></div>
              C:\{w.title}
            </div>
            <button className="px-2 h-[22px] bg-[#F1F1F1] border border-gray-400 text-[11px] rounded-sm hover:bg-white flex items-center gap-1">
              <span className="text-[#2E9C19] font-bold">Total Go</span>
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 bg-white overflow-hidden p-0 flex">
          {/* Sidebar */}
          <div className="w-[180px] bg-gradient-to-b from-[#748AFF] to-[#4057D6] p-3 hidden sm:flex flex-col gap-3 overflow-y-auto">
            <div className="bg-white rounded-t-[4px] overflow-hidden">
              <div className="bg-gradient-to-r from-[#F0F1FF] to-[#E2E6FF] h-[24px] flex items-center px-3 cursor-pointer">
                <span className="text-[#00136B] font-bold text-[11px] flex-1">System Tasks</span>
                <div className="w-4 h-4 rounded-full border border-white bg-[#C9D8FC] flex items-center justify-center text-[#00136B] font-bold text-[10px]">^</div>
              </div>
              <div className="p-3 flex flex-col gap-2 bg-[#D6DFF7]">
                <div className="flex gap-1.5 items-center cursor-pointer hover:underline text-[#00136B]">
                  <Monitor className="w-3 h-3" />
                  <span className="text-[11px]">View system info</span>
                </div>
                <div className="flex gap-1.5 items-center cursor-pointer hover:underline text-[#00136B]">
                  <div className="w-3 h-3 bg-green-500 rounded-[1px]"></div>
                  <span className="text-[11px]">Add or remove programs</span>
                </div>
                <div className="flex gap-1.5 items-center cursor-pointer hover:underline text-[#00136B]">
                  <div className="w-3 h-3 bg-blue-500 rounded-[1px]"></div>
                  <span className="text-[11px]">Change a setting</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-t-[4px] overflow-hidden">
              <div className="bg-gradient-to-r from-[#F0F1FF] to-[#E2E6FF] h-[24px] flex items-center px-3 cursor-pointer">
                <span className="text-[#00136B] font-bold text-[11px] flex-1">Other Places</span>
                <div className="w-4 h-4 rounded-full border border-white bg-[#C9D8FC] flex items-center justify-center text-[#00136B] font-bold text-[10px]">^</div>
              </div>
              <div className="p-3 flex flex-col gap-2 bg-[#D6DFF7]">
                <div className="flex gap-1.5 items-center cursor-pointer hover:underline text-[#00136B]">
                  <Monitor className="w-3 h-3" />
                  <span className="text-[11px]">My Computer</span>
                </div>
                <div className="flex gap-1.5 items-center cursor-pointer hover:underline text-[#00136B]">
                  <FileText className="w-3 h-3" />
                  <span className="text-[11px]">My Documents</span>
                </div>
                <div className="flex gap-1.5 items-center cursor-pointer hover:underline text-[#00136B]">
                  <Wifi className="w-3 h-3" />
                  <span className="text-[11px]">My Network Places</span>
                </div>
              </div>
            </div>
          </div>

          {/* Files */}
          <div className="flex-1 bg-white h-full overflow-auto">
            {w.content}
          </div>
        </div>

        {/* Status Bar */}
        <div className="h-[20px] bg-[#ECE9D8] border-t border-[#D1D1D1] flex items-center px-2 gap-2 text-[11px] text-gray-600 shadow-[inset_0_1px_0_white]">
          <div className="flex-1">3 objects</div>
          <div className="w-[1px] h-[14px] bg-gray-400"></div>
          <div>My Computer</div>
        </div>
      </div>
    </div>
  );
}

// Generic Explorer Window Component
function ExplorerWindow({ title, icon, items }: { title: string, icon: any, items: { name: string, type: string }[] }) {
  const Icon = icon;
  return (
    <div className="p-4 grid grid-cols-[repeat(auto-fill,minmax(80px,1fr))] gap-4 content-start">
      {items.map((item, i) => (
        <div key={i} className="flex flex-col items-center gap-0.5 group w-[80px] cursor-default">
          <Icon className="w-10 h-10 text-yellow-500 drop-shadow-sm opacity-90 group-hover:opacity-100 transition-opacity" />
          <span className="text-[11px] text-center text-gray-700 group-hover:bg-[#316AC5] group-hover:text-white px-1 leading-[1.2] border border-transparent group-hover:border-dotted group-hover:border-yellow-200 rounded-[1px]">
            {item.name}
          </span>
          <span className="text-[10px] text-gray-400 group-hover:text-blue-200 hidden">{item.type}</span>
        </div>
      ))}
    </div>
  )
}