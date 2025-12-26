import { FC } from "react";

interface StartMenuProps {
  onOpenWindow: (id: string, title: string) => void;
  onClose: () => void;
}

export const StartMenu: FC<StartMenuProps> = ({ onOpenWindow, onClose }) => {
  const items = [
    { id: "about", label: "About Me" },
    { id: "projects", label: "My Projects" },
    { id: "skills", label: "Skills" },
    { id: "contact", label: "Contact" },
  ];

  return (
    <div
      className="absolute bottom-10 left-2 w-48 bg-[#C0C0C0] shadow-lg border border-gray-500 rounded-sm overflow-hidden animate-slideUp"
      onMouseLeave={onClose}
    >
      <div className="bg-[#0A64AD] text-white px-3 py-1 font-bold">Start Menu</div>
      <div className="flex flex-col">
        {items.map(item => (
          <button
            key={item.id}
            onClick={() => { onOpenWindow(item.id, item.label); onClose(); }}
            className="text-left px-3 py-2 hover:bg-[#1A78D0] hover:text-white transition-colors text-sm"
          >
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
};
