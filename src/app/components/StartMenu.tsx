import { User, FolderOpen, FileText, Mail, Settings, Power } from 'lucide-react';

interface StartMenuProps {
  onOpenWindow: (id: string, title: string) => void;
  onClose: () => void;
}

export function StartMenu({ onOpenWindow, onClose }: StartMenuProps) {
  const menuItems = [
    { id: 'about', icon: User, label: 'About Me', color: '#FF6B6B' },
    { id: 'projects', icon: FolderOpen, label: 'Projects', color: '#4ECDC4' },
    { id: 'skills', icon: FileText, label: 'Skills', color: '#45B7D1' },
    { id: 'contact', icon: Mail, label: 'Contact', color: '#96CEB4' },
  ];

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0" 
        style={{ zIndex: 999 }}
        onClick={onClose}
      />
      
      {/* Start Menu */}
      <div
        className="fixed bottom-10 left-0 w-96 rounded-tr-lg overflow-hidden"
        style={{
          background: 'linear-gradient(to bottom, #245EDC 0%, #3F8CF3 3%, #FFFFFF 3%)',
          border: '3px solid #0054E3',
          borderBottom: 'none',
          borderLeft: 'none',
          boxShadow: '4px 4px 12px rgba(0,0,0,0.4)',
          zIndex: 1000,
        }}
      >
        <div className="flex">
          {/* Left Banner */}
          <div
            className="w-12 flex items-end p-2"
            style={{
              background: 'linear-gradient(to bottom, #245EDC 0%, #3F8CF3 100%)',
            }}
          >
            <div className="transform -rotate-90 origin-bottom-left whitespace-nowrap">
              <span className="text-white text-lg font-bold">Windows XP</span>
            </div>
          </div>

          {/* Menu Items */}
          <div className="flex-1 bg-white">
            {/* User Info */}
            <div className="p-3 border-b border-[#5A8DE8] bg-gradient-to-r from-[#5A8DE8] to-[#3F8CF3]">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                  <User className="w-6 h-6 text-white" />
                </div>
                <span className="text-white font-bold">Your Name</span>
              </div>
            </div>

            {/* Pinned Items */}
            <div className="p-2">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    onOpenWindow(item.id, item.label);
                    onClose();
                  }}
                  className="w-full flex items-center gap-3 px-3 py-2 hover:bg-[#3F8CF3] hover:text-white rounded transition-colors group"
                >
                  <div 
                    className="w-8 h-8 rounded flex items-center justify-center"
                    style={{ backgroundColor: item.color }}
                  >
                    <item.icon className="w-5 h-5 text-white" />
                  </div>
                  <span>{item.label}</span>
                </button>
              ))}
            </div>

            {/* All Programs */}
            <div className="border-t border-[#D3D3D3] p-2">
              <button className="w-full flex items-center gap-3 px-3 py-2 hover:bg-[#3F8CF3] hover:text-white rounded transition-colors">
                <Settings className="w-5 h-5" />
                <span>All Programs</span>
              </button>
            </div>

            {/* Bottom Section */}
            <div className="border-t border-[#D3D3D3] p-2 bg-[#D3E5FA]">
              <button className="w-full flex items-center gap-3 px-3 py-2 hover:bg-[#3F8CF3] hover:text-white rounded transition-colors">
                <Power className="w-5 h-5" />
                <span>Turn Off Computer</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
