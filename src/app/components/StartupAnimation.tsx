import { useEffect, useState } from "react";

type Stage = "boot" | "signin" | "welcome" | "shutdown";

interface StartupAnimationProps {
  onComplete: () => void;
}

export function StartupAnimation({ onComplete }: StartupAnimationProps) {
  const [stage, setStage] = useState<Stage>("boot");
  const [progress, setProgress] = useState(0);

  /* ---------------- Boot Progress ---------------- */
  useEffect(() => {
    if (stage !== "boot") return;

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setStage("signin"), 500);
          return 100;
        }
        return prev + 2;
      });
    }, 40);

    return () => clearInterval(interval);
  }, [stage]);

  /* ---------------- Welcome Screen ---------------- */
  useEffect(() => {
    if (stage !== "welcome") return;

    const timeout = setTimeout(onComplete, 2000);
    return () => clearTimeout(timeout);
  }, [stage, onComplete]);

  /* ---------------- Handlers ---------------- */
  const handleSignIn = () => setStage("welcome");
  const handleTurnOff = () => setStage("shutdown");

  /* ---------------- Shutdown Screen ---------------- */
  if (stage === "shutdown") {
    return (
      <div className="fixed inset-0 bg-[#003399] z-[10000] flex flex-col items-center justify-center gap-4">
        <h1
          className="text-white text-2xl"
          style={{ fontFamily: "Trebuchet MS, sans-serif" }}
        >
          Windows is shutting down...
        </h1>
        <p className="text-white/80 text-sm">
          It is now safe to close this tab
        </p>
      </div>
    );
  }

  /* ---------------- Boot Screen ---------------- */
  if (stage === "boot") {
    return (
      <div className="fixed inset-0 bg-black flex items-center justify-center z-[9999]">
        <div className="flex flex-col items-center gap-12">
          {/* Logo */}
          <div className="flex items-center gap-4">
            <div className="grid grid-cols-2 gap-2 w-24 h-24">
              <div className="bg-[#D93831] rounded-tl-3xl" />
              <div className="bg-[#4CB748] rounded-tr-3xl" />
              <div className="bg-[#F7B519] rounded-bl-3xl" />
              <div className="bg-[#1FA2DC] rounded-br-3xl" />
            </div>
            <div>
              <div className="text-white text-5xl font-[Trebuchet MS]">
                Microsoft<sup className="text-2xl">®</sup>
              </div>
              <div className="text-white text-3xl -mt-1 font-[Trebuchet MS]">
                Windows<sup className="text-lg">®</sup> XP
              </div>
            </div>
          </div>

          {/* Loading Bar */}
          <div className="w-64 h-3 bg-[#1a1a1a] rounded-full border border-gray-700 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#0066CC] via-[#0088FF] to-[#0066CC] transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>
    );
  }

  /* ---------------- Sign-in Screen ---------------- */
  if (stage === "signin") {
    return (
      <div
        className="fixed inset-0 flex items-center justify-center z-[9999]"
        style={{
          background:
            "linear-gradient(to bottom, #5A98D7 0%, #78B1E8 50%, #AACFF0 100%)",
        }}
      >
        <button
          onClick={handleSignIn}
          className="flex flex-col items-center gap-4 p-8 rounded-lg hover:bg-white/30 transition-all"
        >
          <div className="w-32 h-32 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center border-4 border-white shadow-lg">
            <span className="text-7xl">👤</span>
          </div>
          <div className="px-6 py-2 rounded-lg bg-blue-600 border border-blue-800 shadow">
            <span className="text-white text-xl font-[Trebuchet MS]">
              Guest
            </span>
          </div>
        </button>

        <button
          onClick={handleTurnOff}
          className="absolute bottom-10 flex items-center gap-2 text-[#003399]"
        >
          <span className="w-6 h-6 bg-red-600 rounded flex items-center justify-center text-white">
            ⏻
          </span>
          Turn off computer
        </button>
      </div>
    );
  }

  /* ---------------- Welcome Screen ---------------- */
  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-[9999]"
      style={{
        background:
          "linear-gradient(to bottom, #5A98D7 0%, #78B1E8 50%, #AACFF0 100%)",
      }}
    >
      <div className="text-center animate-fade-in">
        <h1 className="text-5xl text-[#003399] mb-2 font-[Trebuchet MS]">
          Welcome
        </h1>
        <p className="text-xl text-[#003399]">Please wait...</p>
      </div>
    </div>
  );
}
