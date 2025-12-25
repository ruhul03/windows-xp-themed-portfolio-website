import { useState, useEffect } from 'react';

interface StartupAnimationProps {
  onComplete: () => void;
}

export function StartupAnimation({ onComplete }: StartupAnimationProps) {
  const [stage, setStage] = useState<'boot' | 'signin' | 'welcome'>('boot');
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Boot screen progress animation
    if (stage === 'boot') {
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setTimeout(() => setStage('signin'), 500);
            return 100;
          }
          return prev + 2;
        });
      }, 40);

      return () => clearInterval(interval);
    }
  }, [stage]);

  useEffect(() => {
    // Welcome screen duration
    if (stage === 'welcome') {
      const timeout = setTimeout(() => {
        onComplete();
      }, 2000);

      return () => clearTimeout(timeout);
    }
  }, [stage, onComplete]);

  const handleSignIn = () => {
    setStage('welcome');
  };

  const handleTurnOff = () => {
    // Show shutdown screen then close tab
    const shutdownScreen = document.createElement('div');
    shutdownScreen.style.cssText = `
      position: fixed;
      inset: 0;
      background: #003399;
      z-index: 10000;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 1rem;
    `;
    shutdownScreen.innerHTML = `
      <div style="color: white; font-size: 2rem; font-family: Trebuchet MS, sans-serif;">
        Windows is shutting down...
      </div>
    `;
    document.body.appendChild(shutdownScreen);
    
    setTimeout(() => {
      // Try to close the tab
      window.close();
      // If that doesn't work (some browsers block it), show a message
      setTimeout(() => {
        if (!document.hidden) {
          shutdownScreen.innerHTML = `
            <div style="color: white; font-size: 1.5rem; font-family: Trebuchet MS, sans-serif; text-align: center; max-width: 600px;">
              It's now safe to close this window
              <div style="font-size: 1rem; margin-top: 1rem; opacity: 0.8;">
                (You can close this tab manually)
              </div>
            </div>
          `;
        }
      }, 500);
    }, 1500);
  };

  if (stage === 'boot') {
    return (
      <div className="fixed inset-0 bg-black flex items-center justify-center z-[9999]">
        <div className="flex flex-col items-center gap-12">
          {/* Windows XP Logo */}
          <div className="flex items-center gap-4">
            <div className="relative">
              {/* Windows logo made with divs */}
              <div className="grid grid-cols-2 gap-2 w-24 h-24">
                <div className="bg-[#D93831] rounded-tl-3xl" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 20% 100%)' }} />
                <div className="bg-[#4CB748] rounded-tr-3xl" style={{ clipPath: 'polygon(0 0, 100% 0, 80% 100%, 0 100%)' }} />
                <div className="bg-[#F7B519] rounded-bl-3xl" style={{ clipPath: 'polygon(20% 0, 100% 0, 100% 100%, 0 100%)' }} />
                <div className="bg-[#1FA2DC] rounded-br-3xl" style={{ clipPath: 'polygon(0 0, 80% 0, 100% 100%, 0 100%)' }} />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-white text-5xl" style={{ fontFamily: 'Trebuchet MS, sans-serif' }}>
                Microsoft<sup className="text-2xl">®</sup>
              </span>
              <span className="text-white text-3xl -mt-1" style={{ fontFamily: 'Trebuchet MS, sans-serif' }}>
                Windows<sup className="text-lg">®</sup> XP
              </span>
            </div>
          </div>

          {/* Loading Bar */}
          <div className="w-64">
            <div className="h-3 bg-[#1a1a1a] rounded-full border border-gray-700 overflow-hidden">
              <div className="h-full flex gap-0.5">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className="h-full w-8 bg-gradient-to-r from-[#0066CC] via-[#0088FF] to-[#0066CC] rounded-full animate-pulse"
                    style={{
                      animation: `slide 1s ease-in-out infinite`,
                      animationDelay: `${i * 0.15}s`,
                      transform: `translateX(${progress * 2.4}px)`,
                      transition: 'transform 0.1s linear',
                    }}
                  />
                ))}
              </div>
            </div>
          </div>

          <style>{`
            @keyframes slide {
              0%, 100% { opacity: 0.4; }
              50% { opacity: 1; }
            }
          `}</style>
        </div>
      </div>
    );
  }

  if (stage === 'signin') {
    return (
      <div 
        className="fixed inset-0 flex flex-col items-center justify-center z-[9999]"
        style={{
          background: 'linear-gradient(to bottom, #5A98D7 0%, #78B1E8 50%, #AACFF0 100%)',
        }}
      >
        {/* Header */}
        <div className="absolute top-8 left-1/2 -translate-x-1/2 text-center">
          <h1 className="text-3xl text-[#003399] mb-1" style={{ fontFamily: 'Trebuchet MS, sans-serif' }}>
            To begin, click your user name
          </h1>
        </div>

        {/* User Selection */}
        <div className="flex flex-col items-center gap-6">
          <button
            onClick={handleSignIn}
            className="group flex flex-col items-center gap-3 p-8 rounded-lg transition-all hover:bg-white/30 active:scale-95"
          >
            {/* User Avatar */}
            <div 
              className="w-32 h-32 rounded-lg flex items-center justify-center overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                border: '4px solid white',
                boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
              }}
            >
              <span className="text-7xl">👤</span>
            </div>

            {/* Username */}
            <div 
              className="px-6 py-3 rounded-lg"
              style={{
                background: 'linear-gradient(to bottom, #4A8FD9, #3A7FC9)',
                border: '2px solid #2A6FB9',
                boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
              }}
            >
              <span className="text-white text-xl" style={{ fontFamily: 'Trebuchet MS, sans-serif' }}>
                Guest
              </span>
            </div>
          </button>
        </div>

        {/* Footer */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-8">
          <button className="flex items-center gap-2 px-4 py-2 rounded hover:bg-white/20 transition-colors" onClick={handleTurnOff}>
            <div className="w-6 h-6 bg-[#E81123] rounded flex items-center justify-center">
              <span className="text-white text-xs">⏻</span>
            </div>
            <span className="text-[#003399]">Turn off computer</span>
          </button>
        </div>

        <style>{`
          @keyframes fade-in {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}</style>
      </div>
    );
  }

  // Welcome screen
  return (
    <div className="fixed inset-0 flex items-center justify-center z-[9999]"
      style={{
        background: 'linear-gradient(to bottom, #5A98D7 0%, #78B1E8 50%, #AACFF0 100%)',
      }}
    >
      <div className="flex flex-col items-center gap-8 animate-fade-in">
        {/* Welcome message */}
        <div className="text-center">
          <h1 className="text-5xl text-[#003399] mb-2" style={{ fontFamily: 'Trebuchet MS, sans-serif' }}>
            Welcome
          </h1>
          <p className="text-xl text-[#003399]">Please wait...</p>
        </div>

        {/* Animated loading indicator */}
        <div className="flex gap-2">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="w-3 h-3 bg-[#003399] rounded-full"
              style={{
                animation: 'bounce 1.4s ease-in-out infinite',
                animationDelay: `${i * 0.2}s`,
              }}
            />
          ))}
        </div>

        <style>{`
          @keyframes bounce {
            0%, 80%, 100% { transform: translateY(0); }
            40% { transform: translateY(-12px); }
          }
          @keyframes fade-in {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          .animate-fade-in {
            animation: fade-in 0.5s ease-in;
          }
        `}</style>
      </div>
    </div>
  );
}