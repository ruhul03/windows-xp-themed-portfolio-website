interface DesktopIconProps {
  icon: React.ReactNode;
  label: string;
  onOpen: () => void;
}

export function DesktopIcon({
  icon,
  label,
  onOpen,
}: DesktopIconProps) {
  const handleClick = () => {
    onOpen();
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLButtonElement>
  ) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onOpen();
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      onDoubleClick={handleClick}
      onKeyDown={handleKeyDown}
      aria-label={label}
      className="
        flex flex-col items-center gap-1 p-2 w-20 rounded
        transition-colors group
        hover:bg-[#0054E3]/20
        focus:outline-none focus:ring-2 focus:ring-[#0054E3]/60
      "
    >
      <div className="w-12 h-12 flex items-center justify-center bg-white/80 rounded border-2 border-white/40 group-hover:border-white/60">
        {icon}
      </div>

      <span className="text-white text-xs text-center leading-tight drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
        {label}
      </span>
    </button>
  );
}
