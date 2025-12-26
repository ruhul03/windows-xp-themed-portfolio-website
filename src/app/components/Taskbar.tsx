import { FC } from "react";

interface TaskbarProps {
  openWindows: { id: string; title: string; icon?: React.ReactNode }[];
  activeWindowId: string | null;
  onTaskClick: (id: string) => void;
  onStartClick: () => void;
}

export const Taskbar: FC<TaskbarProps> = ({ openWindows, activeWindowId, onTaskClick, onStartClick }) => {
  return (
    <div className="absolute bottom-0 left-0 w-full h-10 bg-[#C0C0C0] flex items-center px-2 shadow-inner border-t border-gray-400">
      {/* Start Button */}
      <button
        onClick={onStartClick}
        className="bg-[#0A64AD] hover:bg-[#1A78D0] text-white px-3 py-1 rounded flex items-center font-bold shadow-inner"
      >
        Start
      </button>

      {/* Open windows */}
      <div className="flex ml-2 gap-1 flex-1 overflow-x-auto">
        {openWindows.map(win => (
          <button
            key={win.id}
            onClick={() => onTaskClick(win.id)}
            className={`px-3 py-1 rounded font-medium truncate whitespace-nowrap shadow-inner text-sm
              ${activeWindowId === win.id ? "bg-blue-500 text-white" : "bg-gray-200 hover:bg-gray-300"}`}
          >
            {win.icon && <span className="mr-1">{win.icon}</span>}
            {win.title}
          </button>
        ))}
      </div>

      {/* System Tray placeholder */}
      <div className="flex gap-2 items-center pr-2">
        <span className="text-xs text-gray-700">12:00 PM</span>
      </div>
    </div>
  );
};
