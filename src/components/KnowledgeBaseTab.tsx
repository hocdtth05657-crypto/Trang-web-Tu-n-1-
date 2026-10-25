import React, { useState } from 'react';
import {
  BookOpen,
  Search,
  Gavel,
  ShieldAlert,
  Send,
  Sparkles,
  ExternalLink,
  ChevronRight,
  HelpCircle,
  Scale,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { VIETNAM_IP_LAWS, LegalArticle } from '../data/legalData';

export const KnowledgeBaseTab: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeArticle, setActiveArticle] = useState<LegalArticle | null>(VIETNAM_IP_LAWS[0]);

  // AI Assistant state
  const [userQuestion, setUserQuestion] = useState('');
  const [isAsking, setIsAsking] = useState(false);
  const [aiAnswer, setAiAnswer] = useState<{
    answer: string;
    relatedArticles?: string[];
    actionableSteps?: string[];
  } | null>(null);

  const sampleQuestions = [
    'Sử dụng hình ảnh trên mạng xã hội rồi ghi nguồn "Nguồn: Sưu tầm" có vi phạm bản quyền không?',
    'Phần mềm sử dụng thư viện mã nguồn mở GPLv3 đóng gói bán thu phí thì có phạm luật không?',
    'Mức phạt tiền tối đa đối với hành vi xâm phạm quyền tác giả và nhãn hiệu là bao nhiêu?',
    'Điều 25 Luật SHTT quy định các trường hợp nào được sử dụng tác phẩm mà không phải xin phép?',
  ];

  const handleAsk = async (questionToAsk?: string) => {
    const q = questionToAsk || userQuestion;
    if (!q.trim()) return;

    setIsAsking(true);
    try {
      const response = await fetch('/api/ask-legal-assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: q }),
      });
      const data = await response.json();
      setAiAnswer(data);
    } catch (err) {
      console.error('Error asking assistant:', err);
    } finally {
      setIsAsking(false);
    }
  };

  const filteredArticles = VIETNAM_IP_LAWS.filter((art) => {
    const matchCat = selectedCategory === 'all' || art.category === selectedCategory;
    const matchSearch =
      art.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      art.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      art.summary.toLowerCase().includes(searchTerm.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="space-y-8 pb-16">
      {/* Top Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl">
        <div className="max-w-3xl">
          <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 mb-3">
            <BookOpen className="w-3.5 h-3.5 mr-1.5 text-indigo-400" />
            Cẩm Nang Tra Cứu & Trợ Lý Luật SHTT Việt Nam 2022
          </div>
          <h2 className="text-2xl font-extrabold text-white">
            Hệ Thống Quy Định Pháp Luật & Trợ Lý Pháp Lý AI
          </h2>
          <p className="mt-2 text-sm text-slate-300 leading-relaxed">
            Tra cứu các điều khoản then chốt về Quyền tác giả, Nhãn hiệu, Kiểu dáng công nghiệp,
            các trường hợp sử dụng hợp lý (Fair Use), chế tài xử phạt hành chính và hình sự.
          </p>
        </div>
      </div>

      {/* Interactive AI Legal Q&A */}
      <div className="bg-slate-900/90 border border-indigo-500/20 rounded-2xl p-6 shadow-xl">
        <div className="flex items-center space-x-2 mb-3">
          <Sparkles className="w-5 h-5 text-indigo-400" />
          <h3 className="text-base font-bold text-white">
            Trợ Lý Pháp Lý AI - Giải Đáp Trực Tuyến Luật Sở Hữu Trí Tuệ
          </h3>
        </div>

        <div className="flex gap-2">
          <input
            type="text"
            value={userQuestion}
            onChange={(e) => setUserQuestion(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAsk()}
            placeholder="Đặt câu hỏi pháp lý... Ví dụ: 'Khi nào việc sao chép bị coi là tội phạm hình sự theo Điều 225 BLHS?'"
            className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs sm:text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
          />
          <button
            onClick={() => handleAsk()}
            disabled={isAsking}
            className="px-5 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs sm:text-sm flex items-center transition-all shadow-md active:scale-95 disabled:bg-slate-700"
          >
            {isAsking ? (
              <Sparkles className="w-4 h-4 animate-spin" />
            ) : (
              <>
                <Send className="w-4 h-4 mr-1.5" />
                <span>Hỏi Luật Sư AI</span>
              </>
            )}
          </button>
        </div>

        {/* Suggested Quick Questions */}
        <div className="mt-3 flex flex-wrap items-center gap-1.5">
          <span className="text-[11px] text-slate-400 font-semibold mr-1">Gợi ý câu hỏi:</span>
          {sampleQuestions.map((sq, i) => (
            <button
              key={i}
              onClick={() => {
                setUserQuestion(sq);
                handleAsk(sq);
              }}
              className="text-[11px] text-slate-300 hover:text-indigo-300 bg-slate-800/80 hover:bg-slate-700 px-2.5 py-1 rounded-full border border-slate-700 transition-all text-left truncate max-w-xs sm:max-w-md"
            >
              {sq}
            </button>
          ))}
        </div>

        {/* AI Answer Box */}
        {aiAnswer && (
          <div className="mt-5 p-5 rounded-xl bg-slate-950 border border-indigo-500/30 shadow-inner">
            <div className="flex items-center space-x-2 mb-2 pb-2 border-b border-slate-800">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-indigo-600 text-white text-xs font-bold">
                AI
              </span>
              <span className="text-xs font-bold text-indigo-300">
                Ý Kiến Tư Vấn Pháp Lý Của Trợ Lý SHTT:
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed whitespace-pre-wrap">
              {aiAnswer.answer}
            </p>

            {aiAnswer.relatedArticles && aiAnswer.relatedArticles.length > 0 && (
              <div className="mt-4 pt-3 border-t border-slate-800 flex flex-wrap items-center gap-2">
                <span className="text-[11px] text-slate-400 font-bold">Điều luật viện dẫn:</span>
                {aiAnswer.relatedArticles.map((art, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-0.5 rounded text-[11px] font-mono bg-amber-500/10 text-amber-300 border border-amber-500/20"
                  >
                    ⚖️ {art}
                  </span>
                ))}
              </div>
            )}

            {aiAnswer.actionableSteps && aiAnswer.actionableSteps.length > 0 && (
              <div className="mt-3 pt-3 border-t border-slate-800">
                <span className="text-[11px] text-slate-400 font-bold block mb-1">
                  Khuyến nghị hành động:
                </span>
                <ul className="text-xs text-slate-300 space-y-1">
                  {aiAnswer.actionableSteps.map((step, idx) => (
                    <li key={idx} className="flex items-center">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 mr-1.5 shrink-0" />
                      <span>{step}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Statutory Code Explorer */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Filter & Article List */}
        <div className="lg:col-span-1 bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-lg flex flex-col h-[600px]">
          <div className="mb-3">
            <h3 className="text-sm font-bold text-white mb-2 flex items-center">
              <Gavel className="w-4 h-4 mr-1.5 text-amber-400" />
              Tra Cứu Điều Luật Trọng Yếu
            </h3>
            {/* Search */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-3 top-3 text-slate-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Tìm điều luật, mức phạt..."
                className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-8 pr-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
              />
            </div>

            {/* Category tabs */}
            <div className="flex flex-wrap gap-1 mt-2.5">
              {[
                { id: 'all', label: 'Tất cả' },
                { id: 'copyright', label: 'Quyền tác giả' },
                { id: 'trademark', label: 'Nhãn hiệu' },
                { id: 'decree', label: 'Nghị định phạt' },
                { id: 'penal', label: 'Hình sự' },
              ].map((c) => (
                <button
                  key={c.id}
                  onClick={() => setSelectedCategory(c.id)}
                  className={`px-2 py-0.5 rounded text-[10px] font-semibold transition-all ${
                    selectedCategory === c.id
                      ? 'bg-indigo-600 text-white'
                      : 'bg-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>
          </div>

          {/* List */}
          <div className="flex-1 overflow-y-auto space-y-2 pr-1">
            {filteredArticles.map((art) => (
              <div
                key={art.id}
                onClick={() => setActiveArticle(art)}
                className={`p-3 rounded-xl cursor-pointer border transition-all ${
                  activeArticle?.id === art.id
                    ? 'bg-indigo-600/15 border-indigo-500 text-white'
                    : 'bg-slate-950/50 border-slate-800 hover:border-slate-700 text-slate-300'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-amber-300">{art.code}</span>
                  <span className="text-[10px] text-slate-400">{art.lawName.slice(0, 25)}...</span>
                </div>
                <h4 className="text-xs font-semibold text-slate-100 line-clamp-1">{art.name}</h4>
                <p className="text-[11px] text-slate-400 line-clamp-2 mt-1">{art.summary}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Detailed View of Active Article */}
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-lg flex flex-col justify-between">
          {activeArticle ? (
            <div className="space-y-6">
              <div className="pb-4 border-b border-slate-800">
                <span className="text-xs font-bold font-mono text-indigo-400 uppercase tracking-widest block">
                  {activeArticle.lawName}
                </span>
                <h3 className="text-xl font-extrabold text-white mt-1">
                  {activeArticle.code}: {activeArticle.name}
                </h3>
              </div>

              {/* Summary */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                  Tóm tắt nội dung quy định:
                </h4>
                <p className="text-sm text-slate-200 leading-relaxed bg-slate-950/70 p-4 rounded-xl border border-slate-800">
                  {activeArticle.summary}
                </p>
              </div>

              {/* Key points */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                  Các hành vi và dấu hiệu đặc trưng:
                </h4>
                <div className="space-y-2">
                  {activeArticle.keyPoints.map((kp, idx) => (
                    <div
                      key={idx}
                      className="flex items-start p-3 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-300"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 mr-2.5 mt-1.5 shrink-0" />
                      <span>{kp}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Penalty Card */}
              <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/20">
                <div className="flex items-center space-x-2 text-rose-300 font-bold text-xs mb-1">
                  <AlertCircle className="w-4 h-4 text-rose-400" />
                  <span>Chế tài xử phạt & Hệ quả pháp lý:</span>
                </div>
                <p className="text-xs text-slate-200 leading-relaxed">
                  {activeArticle.penaltySummary}
                </p>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-slate-500 text-xs">
              Chọn một điều luật ở danh sách bên trái để xem chi tiết.
            </div>
          )}

          <div className="mt-6 pt-4 border-t border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
            <span>Nguồn tư liệu: Cục Sở hữu Trí tuệ (Bộ KH&CN) & Cục Bản quyền tác giả (Bộ VHTTDL)</span>
            <span className="text-indigo-400 font-semibold">Cập nhật Luật SHTT số 07/2022/QH15</span>
          </div>
        </div>
      </div>
    </div>
  );
};
