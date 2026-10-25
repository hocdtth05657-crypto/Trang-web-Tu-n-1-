import React from 'react';
import { ShieldAlert, Scale, FileText, BookOpen, Sparkles, CheckCircle2, Info } from 'lucide-react';

interface HeaderProps {
  activeTab: 'scanner' | 'notice' | 'knowledge' | 'cases' | 'about';
  setActiveTab: (tab: 'scanner' | 'notice' | 'knowledge' | 'cases' | 'about') => void;
  onOpenSelfAudit: () => void;
  onOpenShare: () => void;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab, onOpenSelfAudit, onOpenShare }) => {
  return (
    <header className="sticky top-0 z-40 bg-[#0f172a]/90 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo & Brand */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab('scanner')}>
            <div className="relative flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-tr from-amber-500 via-rose-500 to-indigo-600 shadow-lg shadow-indigo-500/20 text-white font-bold">
              <Scale className="w-6 h-6" />
              <span className="absolute -bottom-1 -right-1 flex h-3.5 w-3.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500 border-2 border-slate-900"></span>
              </span>
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent">
                  IPGuard <span className="text-amber-400 font-black">AI</span>
                </span>
                <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  <CheckCircle2 className="w-3 h-3 mr-1" /> Luật SHTT 2022
                </span>
              </div>
              <p className="text-xs text-slate-400 hidden sm:block">
                Hệ thống Nhận diện & Giám định Vi phạm Bản quyền & Sở hữu Trí tuệ
              </p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <nav className="flex items-center space-x-1 sm:space-x-2">
            <button
              onClick={() => setActiveTab('scanner')}
              className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'scanner'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <ShieldAlert className="w-4 h-4 mr-1.5" />
              <span className="hidden sm:inline">Trình Quét Vi Phạm</span>
              <span className="sm:hidden">Quét</span>
            </button>

            <button
              onClick={() => setActiveTab('notice')}
              className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'notice'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <FileText className="w-4 h-4 mr-1.5" />
              <span className="hidden md:inline">Soạn Thư C&D / Gỡ Bỏ</span>
              <span className="md:hidden">Soạn Đơn</span>
            </button>

            <button
              onClick={() => setActiveTab('knowledge')}
              className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'knowledge'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <BookOpen className="w-4 h-4 mr-1.5" />
              <span className="hidden lg:inline">Cơ Sở Pháp Lý & Trợ Lý</span>
              <span className="lg:hidden">Pháp Lý</span>
            </button>

            <button
              onClick={() => setActiveTab('cases')}
              className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'cases'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Scale className="w-4 h-4 mr-1.5" />
              <span className="hidden md:inline">Án Lệ Thực Tế</span>
              <span className="md:hidden">Án Lệ</span>
            </button>

            <button
              onClick={() => setActiveTab('about')}
              className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'about'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Info className="w-4 h-4 mr-1.5" />
              <span className="hidden sm:inline">Giới Thiệu & Nguồn Tham Khảo</span>
              <span className="sm:hidden">Giới Thiệu</span>
            </button>
          </nav>

          {/* Quick Action Buttons */}
          <div className="flex items-center space-x-2">
            <button
              onClick={onOpenShare}
              className="flex items-center px-3 py-1.5 rounded-lg text-xs font-bold bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 border border-indigo-500/40 transition-all shadow-sm active:scale-95"
            >
              <span className="mr-1.5 text-indigo-400">🔗</span>
              <span>Lấy Link Web</span>
            </button>

            <button
              onClick={onOpenSelfAudit}
              className="hidden lg:flex items-center px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-gradient-to-r from-amber-500/20 to-orange-500/20 hover:from-amber-500/30 hover:to-orange-500/30 text-amber-300 border border-amber-500/30 transition-all shadow-sm"
            >
              <Sparkles className="w-3.5 h-3.5 mr-1.5 text-amber-400" />
              Tự Kiểm Tra Rủi Ro SHTT
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
