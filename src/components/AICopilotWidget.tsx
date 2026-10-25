import React, { useState, useRef, useEffect } from 'react';
import {
  MessageSquare,
  X,
  Send,
  Sparkles,
  Scale,
  RotateCcw,
  BookOpen,
  ChevronDown,
  ExternalLink,
  ShieldAlert,
  HelpCircle,
  CornerDownLeft
} from 'lucide-react';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  text: string;
  citations?: string[];
  suggestedNextQuestions?: string[];
  timestamp: string;
}

const DEFAULT_STARTER_PROMPTS = [
  'Dùng ảnh trên mạng rồi ghi "Nguồn: Sưu tầm" có vi phạm bản quyền không?',
  'Phần mềm nhúng mã nguồn mở GPLv3 đem bán thu phí có vi phạm luật không?',
  'Phát hiện đối thủ nhái logo và nhãn hiệu thì cần làm những bước gì?',
  'Điều 25 Luật SHTT cho phép các trường hợp nào sử dụng tác phẩm không cần xin phép?',
  'Mức phạt tiền vi phạm bản quyền và trách nhiệm hình sự theo Điều 225 BLHS?',
];

export const AICopilotWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-1',
      role: 'assistant',
      text: 'Xin chào! Tôi là **IPGuard Copilot** — Trợ lý Trí tuệ Nhân tạo chuyên giải đáp pháp lý về **Bản quyền tác giả & Quyền Sở hữu Trí tuệ** theo quy định của Luật SHTT Việt Nam 2022.\n\nTôi có thể giúp bạn:\n• Thẩm định nhanh nguy cơ vi phạm của bài viết, logo, mã nguồn hoặc sản phẩm\n• Giải thích các trường hợp sử dụng hợp lý (Fair Use)\n• Hướng dẫn thủ tục lập vi bằng, gửi Thư khuyến cáo (C&D) và nộp đơn tại Cục Bản quyền tác giả/Cục SHTT\n\nBạn đang có câu hỏi hoặc tình huống thực tế nào cần giải đáp?',
      citations: ['Luật SHTT 2022 (Luật số 07/2022/QH15)', 'Nghị định 17/2023/NĐ-CP'],
      suggestedNextQuestions: [
        'Dùng ảnh trên mạng có bị phạt không?',
        'Thủ tục đăng ký quyền tác giả thế nào?',
        'Khi nào việc sao chép bị coi là tội phạm hình sự?'
      ],
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      inputRef.current?.focus();
    }
  }, [isOpen, messages]);

  const handleSendMessage = async (customText?: string) => {
    const textToSend = customText || inputMessage;
    if (!textToSend.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      text: textToSend.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const historyPayload = messages.slice(-6).map((m) => ({
        role: m.role,
        text: m.text,
      }));

      const response = await fetch('/api/copilot-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userMsg.text,
          history: historyPayload,
        }),
      });

      const data = await response.json();

      const assistantMsg: ChatMessage = {
        id: `asst-${Date.now()}`,
        role: 'assistant',
        text: data.reply || 'Hệ thống đã ghi nhận. Vui lòng thử lại câu hỏi với chi tiết cụ thể hơn.',
        citations: data.citations || ['Luật SHTT 2022'],
        suggestedNextQuestions: data.suggestedNextQuestions || [],
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch (error) {
      console.error('Error talking to copilot:', error);
      const fallbackMsg: ChatMessage = {
        id: `asst-err-${Date.now()}`,
        role: 'assistant',
        text: 'Căn cứ Luật Sở hữu Trí tuệ 2022: Mọi hành vi sao chép hoặc phân phối tác phẩm/nhãn hiệu không được phép của chủ sở hữu đều cấu thành hành vi xâm phạm theo Điều 28 và 129. Bạn nên lập vi bằng để lưu trữ chứng cứ và gửi văn bản khuyến cáo trước khi khởi kiện.',
        citations: ['Điều 28 Luật SHTT 2022'],
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: `welcome-${Date.now()}`,
        role: 'assistant',
        text: 'Hội thoại đã được làm mới. Tôi sẵn sàng giải đáp các câu hỏi tiếp theo về Sở hữu Trí tuệ và Bản quyền số!',
        citations: ['Luật SHTT 2022'],
        suggestedNextQuestions: [
          'Dùng ảnh mạng có bị phạt không?',
          'Lập vi bằng chứng cứ vi phạm cần gì?'
        ],
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
  };

  return (
    <>
      {/* Floating Trigger Button */}
      <div className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-50 no-print">
        {!isOpen && (
          <button
            onClick={() => setIsOpen(true)}
            className="group relative flex items-center space-x-2.5 px-4 py-3 rounded-full bg-gradient-to-r from-indigo-600 via-indigo-500 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white shadow-2xl shadow-indigo-500/40 border border-indigo-400/30 transition-all duration-300 hover:scale-105 active:scale-95"
            aria-label="Mở Trợ lý Pháp lý AI"
          >
            <div className="relative flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-amber-300 animate-pulse" />
              <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
            </div>
            <span className="text-xs sm:text-sm font-bold tracking-tight">
              Trợ Lý AI SHTT
            </span>
            <span className="hidden md:inline-flex px-1.5 py-0.5 rounded text-[10px] font-extrabold bg-white/20 text-white">
              Hỏi Đáp 24/7
            </span>
          </button>
        )}
      </div>

      {/* Floating Chat Modal / Drawer */}
      {isOpen && (
        <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-[440px] h-[600px] max-h-[85vh] flex flex-col bg-[#0f172a]/95 backdrop-blur-2xl border border-indigo-500/40 rounded-2xl shadow-2xl overflow-hidden animate-fadeIn no-print">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3.5 bg-gradient-to-r from-indigo-950 via-slate-900 to-slate-950 border-b border-indigo-500/20">
            <div className="flex items-center space-x-2.5">
              <div className="relative flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-500 to-indigo-600 text-white shadow-md">
                <Scale className="w-5 h-5" />
                <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-500 border-2 border-slate-900 rounded-full" />
              </div>
              <div>
                <div className="flex items-center space-x-1.5">
                  <h3 className="text-sm font-extrabold text-white">
                    IPGuard <span className="text-amber-400">Copilot</span>
                  </h3>
                  <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                    AI SHTT
                  </span>
                </div>
                <p className="text-[11px] text-slate-400">
                  Tư vấn pháp lý Luật SHTT 2022
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-1">
              <button
                onClick={handleResetChat}
                title="Làm mới cuộc trò chuyện"
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                title="Đóng cửa sổ"
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[88%] p-3.5 rounded-2xl leading-relaxed whitespace-pre-wrap ${
                    msg.role === 'user'
                      ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-br-none shadow-md'
                      : 'bg-slate-950/90 text-slate-200 border border-slate-800 rounded-bl-none shadow-inner'
                  }`}
                >
                  {msg.text}
                </div>

                {/* Citations if assistant */}
                {msg.role === 'assistant' && msg.citations && msg.citations.length > 0 && (
                  <div className="mt-1.5 flex flex-wrap gap-1 max-w-[88%]">
                    {msg.citations.map((cite, i) => (
                      <span
                        key={i}
                        className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono bg-amber-500/10 text-amber-300 border border-amber-500/20"
                      >
                        <BookOpen className="w-2.5 h-2.5 mr-1 text-amber-400" />
                        {cite}
                      </span>
                    ))}
                  </div>
                )}

                {/* Suggested Next Questions */}
                {msg.role === 'assistant' && msg.suggestedNextQuestions && msg.suggestedNextQuestions.length > 0 && (
                  <div className="mt-2 space-y-1 max-w-[88%]">
                    <span className="text-[10px] text-slate-400 font-semibold block">
                      Gợi ý câu hỏi tiếp theo:
                    </span>
                    <div className="flex flex-col gap-1">
                      {msg.suggestedNextQuestions.map((q, qIdx) => (
                        <button
                          key={qIdx}
                          onClick={() => handleSendMessage(q)}
                          className="text-left text-[11px] text-slate-300 hover:text-indigo-300 bg-slate-900/90 hover:bg-slate-800 p-1.5 rounded-lg border border-slate-800 transition-colors flex items-center justify-between group"
                        >
                          <span className="truncate">{q}</span>
                          <Sparkles className="w-3 h-3 text-indigo-400 group-hover:scale-110 shrink-0 ml-1" />
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <span className="text-[10px] text-slate-500 mt-1 px-1">
                  {msg.timestamp}
                </span>
              </div>
            ))}

            {/* Loading Indicator */}
            {isLoading && (
              <div className="flex items-center space-x-2 p-3 bg-slate-950/80 border border-slate-800 rounded-2xl w-fit text-slate-400 text-xs">
                <Sparkles className="w-3.5 h-3.5 text-indigo-400 animate-spin" />
                <span>Trợ lý AI đang tra cứu và soạn thảo phản hồi...</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Starters Bar (when few messages) */}
          {messages.length <= 2 && (
            <div className="px-4 py-2 border-t border-slate-800/80 bg-slate-950/50">
              <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
                Chủ đề thường gặp:
              </span>
              <div className="flex gap-1.5 overflow-x-auto pb-1 text-[11px]">
                {DEFAULT_STARTER_PROMPTS.slice(0, 3).map((prompt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSendMessage(prompt)}
                    className="whitespace-nowrap px-2.5 py-1 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-colors shrink-0"
                  >
                    {prompt.slice(0, 32)}...
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input Area */}
          <div className="p-3 bg-slate-950 border-t border-slate-800">
            <div className="relative flex items-center">
              <input
                ref={inputRef}
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
                disabled={isLoading}
                placeholder="Hỏi về bản quyền, nhãn hiệu, điều luật..."
                className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-3 pr-10 py-2.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
              />
              <button
                onClick={() => handleSendMessage()}
                disabled={isLoading || !inputMessage.trim()}
                className="absolute right-1.5 p-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                title="Gửi câu hỏi (Enter)"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
            <p className="text-[10px] text-slate-400 text-center mt-1.5 leading-tight">
              IPGuard Copilot tra cứu theo Luật SHTT 2022. Không thay thế tư vấn chính thức của Luật sư.
            </p>
          </div>
        </div>
      )}
    </>
  );
};
