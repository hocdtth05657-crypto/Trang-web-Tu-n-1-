import React, { useState } from 'react';
import { Header } from './components/Header';
import { ScannerTab } from './components/ScannerTab';
import { LegalNoticeGenerator } from './components/LegalNoticeGenerator';
import { KnowledgeBaseTab } from './components/KnowledgeBaseTab';
import { CaseStudiesTab } from './components/CaseStudiesTab';
import { AboutTab } from './components/AboutTab';
import { SelfAuditModal } from './components/SelfAuditModal';
import { ShareModal } from './components/ShareModal';
import { AICopilotWidget } from './components/AICopilotWidget';
import { Scale, ShieldCheck, FileCheck2, ExternalLink, HelpCircle } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'scanner' | 'notice' | 'knowledge' | 'cases' | 'about'>('scanner');
  const [noticeData, setNoticeData] = useState<{
    workTitle?: string;
    infringingParty?: string;
    infringingUrl?: string;
    evidenceSummary?: string;
  }>({});
  const [isSelfAuditOpen, setIsSelfAuditOpen] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);

  const handleSendToNotice = (data: {
    workTitle: string;
    infringingParty: string;
    infringingUrl: string;
    evidenceSummary: string;
  }) => {
    setNoticeData(data);
    setActiveTab('notice');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0b0f19] text-slate-100 antialiased selection:bg-indigo-500 selection:text-white">
      {/* Navigation Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenSelfAudit={() => setIsSelfAuditOpen(true)}
        onOpenShare={() => setIsShareOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8">
        {activeTab === 'scanner' && (
          <ScannerTab onSendToNotice={handleSendToNotice} />
        )}

        {activeTab === 'notice' && (
          <LegalNoticeGenerator initialData={noticeData} />
        )}

        {activeTab === 'knowledge' && (
          <KnowledgeBaseTab />
        )}

        {activeTab === 'cases' && (
          <CaseStudiesTab />
        )}

        {activeTab === 'about' && (
          <AboutTab />
        )}
      </main>

      {/* Self-audit Modal */}
      <SelfAuditModal
        isOpen={isSelfAuditOpen}
        onClose={() => setIsSelfAuditOpen(false)}
      />

      {/* Share Modal */}
      <ShareModal
        isOpen={isShareOpen}
        onClose={() => setIsShareOpen(false)}
      />

      {/* Floating 24/7 AI Legal Assistant */}
      <AICopilotWidget />

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-800/80 bg-slate-950/70 py-8 text-xs text-slate-400 no-print">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-indigo-600/20 text-indigo-400 font-bold">
              <Scale className="w-4 h-4" />
            </div>
            <div>
              <p className="font-bold text-slate-200">
                IPGuard AI — Hệ Thống Nhận Diện &amp; Thẩm Định Vi Phạm Bản Quyền &amp; Sở Hữu Trí Tuệ
              </p>
              <p className="text-[11px] text-amber-300 font-medium mt-0.5">
                Học viên thực hiện: <span className="font-bold text-white">Đỗ Thái Học</span> (MSV: <span className="font-mono text-indigo-300">TH05657</span>) — Nhóm 2 | Chương trình TTS Đợt 15 FPT Polytechnic × IMTA TECH
              </p>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Căn cứ theo Luật Sở hữu Trí tuệ số 07/2022/QH15, Công ước Berne, Hiệp định TRIPS &amp; DMCA
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-4 text-xs">
            <button
              onClick={() => {
                setActiveTab('about');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="hover:text-indigo-400 transition-colors font-medium text-slate-300"
            >
              Giới thiệu &amp; Nguồn tham khảo
            </button>
            <span className="text-slate-700">•</span>
            <button
              onClick={() => {
                setActiveTab('knowledge');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="hover:text-indigo-400 transition-colors"
            >
              Cơ sở pháp lý
            </button>
            <span className="text-slate-700">•</span>
            <button
              onClick={() => {
                setActiveTab('cases');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="hover:text-indigo-400 transition-colors"
            >
              Án lệ thực tế
            </button>
            <span className="text-slate-700">•</span>
            <button
              onClick={() => setIsShareOpen(true)}
              className="text-indigo-400 hover:text-indigo-300 font-semibold transition-colors flex items-center"
            >
              <span className="mr-1">🔗</span> Lấy Link Chia Sẻ
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
