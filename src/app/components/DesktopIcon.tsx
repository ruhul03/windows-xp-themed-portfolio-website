interface DesktopIconProps {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
}

export function DesktopIcon({ icon, label, onClick }: DesktopIconProps) {
  return (
    <button
      onClick={onClick}
      onDoubleClick={onClick}
      className="flex flex-col items-center gap-1 p-2 rounded hover:bg-[#0054E3]/20 transition-colors w-20 group"
    >
      <div className="w-12 h-12 flex items-center justify-center bg-white/80 rounded border-2 border-white/40 group-hover:border-white/60">
        {icon}
      </div>
      <span className="text-white text-xs text-center drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] leading-tight">
        {label}
      </span>
    </button>
  );
}
