import React from "react";
import { Sprout, Database, Info, MessageSquare, Shield, Sun, Moon } from "lucide-react";

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  connectionStatus?: "connected" | "offline" | "checking";
}

export default function Header({ activeTab, setActiveTab, isDarkMode, toggleDarkMode, connectionStatus = "checking" }: HeaderProps) {
  const navItems = [
    { id: "lab", label: "Diagnostic Lab", icon: Sprout },
    { id: "datasets", label: "Datasets Hub", icon: Database },
    { id: "about", label: "About Us", icon: Info },
    { id: "contact", label: "Contact Us", icon: MessageSquare },
  ];

  return (
    <header className={`sticky top-0 z-50 border-b backdrop-blur-md transition-all duration-300 ${
      isDarkMode 
        ? "bg-slate-900/95 border-emerald-900/50 text-slate-100 shadow-xl" 
        : "bg-white/95 border-emerald-100/80 text-slate-900 shadow-sm"
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-20">
          
          {/* Logo Brand Brand */}
          <div className="flex items-center space-x-3 cursor-pointer select-none" onClick={() => setActiveTab("lab")}>
            <div className={`p-2 sm:p-2.5 rounded-xl border shadow-inner flex items-center justify-center group ${
              isDarkMode ? "bg-emerald-950 border-emerald-800" : "bg-emerald-50 border-emerald-200"
            }`}>
              <Sprout className="h-6 w-6 sm:h-7 sm:w-7 text-emerald-550 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-black tracking-tight flex items-center gap-1 font-sans">
                <span className="text-emerald-550">Plan</span>toos
              </h1>
              <p className={`hidden sm:block text-[10px] tracking-widest font-mono font-bold ${
                isDarkMode ? "text-emerald-400/70" : "text-emerald-700/80"
              }`}>
                AI PLANT HEALTH PORTAL
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-1 lg:space-x-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center space-x-1.5 px-3.5 py-2.5 rounded-xl text-sm font-bold transition-all duration-200 ${
                    isActive
                      ? "bg-emerald-605 text-white shadow-md shadow-emerald-600/10 hover:bg-emerald-700"
                      : isDarkMode
                        ? "text-slate-300 hover:bg-emerald-950/40 hover:text-white"
                        : "text-emerald-800 hover:bg-emerald-50 hover:text-emerald-950"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Accented Actions Bar */}
          <div className="flex items-center space-x-3">
            
            {/* Dark mode switch */}
            <button
              onClick={toggleDarkMode}
              className={`p-2 sm:p-2.5 rounded-lg border transition-all duration-200 hover:scale-105 active:scale-95 ${
                isDarkMode 
                  ? "bg-slate-800 border-slate-700 text-amber-400 hover:bg-slate-750" 
                  : "bg-emerald-50 border-emerald-100 text-emerald-700 hover:bg-emerald-100"
              }`}
              title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {isDarkMode ? <Sun className="h-4.5 w-4.5" /> : <Moon className="h-4.5 w-4.5" />}
            </button>

            {/* Server Connection Status Indicator */}
            {connectionStatus === "connected" ? (
              <div 
                className={`flex items-center space-x-2 py-1.5 px-3 rounded-full border text-xs font-semibold uppercase tracking-wider font-mono shadow-sm transition-all duration-300 ${
                  isDarkMode 
                    ? "bg-emerald-950/40 border-emerald-800 text-emerald-400" 
                    : "bg-emerald-50 border-emerald-250/50 text-emerald-800"
                }`}
                title="Connected to Plantoos Live Diagnostic Server"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-450 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span className="hidden xs:inline">Server Online</span>
                <span className="xs:hidden">Live</span>
              </div>
            ) : connectionStatus === "offline" ? (
              <div 
                className={`flex items-center space-x-2 py-1.5 px-3 rounded-full border text-xs font-semibold uppercase tracking-wider font-mono shadow-sm transition-all duration-300 ${
                  isDarkMode 
                    ? "bg-amber-950/20 border-amber-900/40 text-amber-500" 
                    : "bg-amber-50/70 border-amber-200 text-amber-700"
                }`}
                title="Running in disconnected Local Hardware Database Fallback Mode"
              >
                <span className="relative flex h-2 w-2">
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
                </span>
                <span className="hidden xs:inline">Offline Fallback</span>
                <span className="xs:hidden font-sans">Offline</span>
              </div>
            ) : (
              <div 
                className={`flex items-center space-x-2 py-1.5 px-3 rounded-full border text-xs font-semibold uppercase tracking-wider font-mono shadow-sm transition-all duration-300 ${
                  isDarkMode 
                    ? "bg-slate-800 border-slate-700 text-slate-400" 
                    : "bg-slate-100 border-slate-200 text-slate-600"
                }`}
                title="Checking diagnostics pipeline status..."
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-pulse relative inline-flex rounded-full h-2 w-2 bg-slate-400"></span>
                </span>
                <span className="hidden xs:inline">Connecting...</span>
                <span className="xs:hidden">Syncing</span>
              </div>
            )}

          </div>
        </div>
      </div>

      {/* Mobile Sticky Tab Rail */}
      <div className={`md:hidden flex justify-around border-t py-2 px-1 ${
        isDarkMode ? "bg-slate-900 border-slate-800" : "bg-white/95 border-emerald-50"
      }`}>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col items-center justify-center flex-1 py-1 px-0.5 rounded-xl text-[10px] sm:text-xs font-semibold transition-all ${
                isActive
                  ? isDarkMode
                    ? "text-emerald-300 bg-emerald-950/60 border border-emerald-900"
                    : "text-emerald-750 bg-emerald-50 border border-emerald-100"
                  : isDarkMode
                    ? "text-slate-400 hover:text-slate-200"
                    : "text-emerald-600/70 hover:text-emerald-800"
              }`}
            >
              <Icon className="h-4.5 w-4.5 mb-1" />
              <span className="truncate max-w-[62px]">{item.label.split(" ")[0]}</span>
            </button>
          );
        })}
      </div>
    </header>
  );
}
