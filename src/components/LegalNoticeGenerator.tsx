import React, { useState, useEffect } from 'react';
import {
  FileText,
  Send,
  Printer,
  Copy,
  CheckCircle2,
  AlertTriangle,
  Gavel,
  Clock,
  Sparkles,
  Download,
  ShieldAlert,
  ArrowRight
} from 'lucide-react';

interface NoticeGeneratorProps {
  initialData?: {
    workTitle?: string;
    infringingParty?: string;
    infringingUrl?: string;
    evidenceSummary?: string;
  };
}

export const LegalNoticeGenerator: React.FC<NoticeGeneratorProps> = ({ initialData }) => {
  const [noticeType, setNoticeType] = useState<'cease_and_desist' | 'ecommerce_report' | 'dmca_takedown'>('cease_and_desist');
  const [holderName, setHolderName] = useState('');
  const [holderRepresentative, setHolderRepresentative] = useState('');
  const [infringingParty, setInfringingParty] = useState('');
  const [infringingUrl, setInfringingUrl] = useState('');
  const [workTitle, setWorkTitle] = useState('');
  const [registrationNumber, setRegistrationNumber] = useState('');
  const [evidenceSummary, setEvidenceSummary] = useState('');
  const [deadlineDays, setDeadlineDays] = useState('03');

  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedDoc, setGeneratedDoc] = useState<{
    documentTitle: string;
    documentCode: string;
    fullContent: string;
    keyRequirements: string[];
    nextLegalSteps: string[];
  } | null>(null);

  const [copied, setCopied] = useState(false);

  // Sync initialData when provided
  useEffect(() => {
    if (initialData) {
      if (initialData.workTitle) setWorkTitle(initialData.workTitle);
      if (initialData.infringingParty) setInfringingParty(initialData.infringingParty);
      if (initialData.infringingUrl) setInfringingUrl(initialData.infringingUrl);
      if (initialData.evidenceSummary) setEvidenceSummary(initialData.evidenceSummary);
    }
  }, [initialData]);

  // Handle generation
  const handleGenerate = async () => {
    setIsGenerating(true);
    try {
      const response = await fetch('/api/generate-notice', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          noticeType,
          holderName: holderName || 'Công ty Cổ phần Công nghệ Sáng tạo & Bản quyền Số',
          holderRepresentative: holderRepresentative || 'Đại diện theo ủy quyền sở hữu trí tuệ',
          infringingParty: infringingParty || 'Cá nhân/Đơn vị sở hữu kênh truyền thông hoặc gian hàng nghi vấn',
          infringingUrl: infringingUrl || 'https://shopee.vn/san-pham-nghi-van-vi-pham-123',
          workTitle: workTitle || 'Tác phẩm mỹ thuật ứng dụng / Bài viết sáng tạo / Nhãn hiệu độc quyền',
          registrationNumber: registrationNumber || 'Xác lập tự động theo Điều 6 Luật SHTT 2022',
          evidenceSummary: evidenceSummary || 'Sao chép nguyên văn, không trích dẫn nguồn, khai thác thương mại trái phép',
          deadlineDays,
        }),
      });

      const data = await response.json();
      setGeneratedDoc(data);
    } catch (err) {
      console.error('Error generating notice:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = () => {
    if (!generatedDoc) return;
    navigator.clipboard.writeText(generatedDoc.fullContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    if (!generatedDoc) return;
    const element = document.createElement('a');
    const file = new Blob([generatedDoc.fullContent], { type: 'text/plain;charset=utf-8' });
    element.href = URL.createObjectURL(file);
    element.download = `${generatedDoc.documentCode || 'Thu-Khuyen-Cao-SHTT'}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Title */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl">
        <div className="max-w-3xl">
          <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-300 border border-amber-500/20 mb-3">
            <Gavel className="w-3.5 h-3.5 mr-1.5 text-amber-400" />
            Văn Bản Pháp Lý Chuẩn Thể Thức Luật Sư SHTT
          </div>
          <h2 className="text-2xl font-extrabold text-white">
            Trình Soạn Thảo Thư Khuyến Cáo & Đơn Yêu Cầu Gỡ Bỏ Vi Phạm (C&D / Takedown)
          </h2>
          <p className="mt-2 text-sm text-slate-300 leading-relaxed">
            Hệ thống tự động biên soạn văn bản pháp lý chính thức yêu cầu bên vi phạm chấm dứt hành vi,
            gỡ bỏ nội dung trên môi trường số hoặc khiếu nại lên các sàn TMĐT (Shopee, TikTok, Lazada) và mạng xã hội.
          </p>
        </div>

        {/* Template Type Choice */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-6 pt-5 border-t border-slate-800">
          <button
            onClick={() => setNoticeType('cease_and_desist')}
            className={`p-3.5 rounded-xl text-left border transition-all ${
              noticeType === 'cease_and_desist'
                ? 'bg-indigo-600/20 border-indigo-500 text-white shadow-md'
                : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700'
            }`}
          >
            <div className="font-bold text-xs sm:text-sm flex items-center justify-between">
              <span>1. Thư Khuyến Cáo (C&D)</span>
              {noticeType === 'cease_and_desist' && <CheckCircle2 className="w-4 h-4 text-indigo-400" />}
            </div>
            <p className="text-[11px] text-slate-400 mt-1">
              Gửi trực tiếp bên xâm phạm yêu cầu chấm dứt trước khi khởi kiện
            </p>
          </button>

          <button
            onClick={() => setNoticeType('ecommerce_report')}
            className={`p-3.5 rounded-xl text-left border transition-all ${
              noticeType === 'ecommerce_report'
                ? 'bg-indigo-600/20 border-indigo-500 text-white shadow-md'
                : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700'
            }`}
          >
            <div className="font-bold text-xs sm:text-sm flex items-center justify-between">
              <span>2. Khiếu Nại Sàn TMĐT</span>
              {noticeType === 'ecommerce_report' && <CheckCircle2 className="w-4 h-4 text-indigo-400" />}
            </div>
            <p className="text-[11px] text-slate-400 mt-1">
              Gửi Trung tâm Hỗ trợ Shopee, TikTok Shop, Lazada khóa gian hàng nhái
            </p>
          </button>

          <button
            onClick={() => setNoticeType('dmca_takedown')}
            className={`p-3.5 rounded-xl text-left border transition-all ${
              noticeType === 'dmca_takedown'
                ? 'bg-indigo-600/20 border-indigo-500 text-white shadow-md'
                : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700'
            }`}
          >
            <div className="font-bold text-xs sm:text-sm flex items-center justify-between">
              <span>3. DMCA Takedown Quốc Tế</span>
              {noticeType === 'dmca_takedown' && <CheckCircle2 className="w-4 h-4 text-indigo-400" />}
            </div>
            <p className="text-[11px] text-slate-400 mt-1">
              Gửi Google Search, Facebook, YouTube, Web Host gỡ bỏ nội dung số
            </p>
          </button>
        </div>

        {/* Form Inputs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Chủ thể quyền (Tác giả / Doanh nghiệp sở hữu):
            </label>
            <input
              type="text"
              value={holderName}
              onChange={(e) => setHolderName(e.target.value)}
              placeholder="Ví dụ: Công ty TNHH Sáng Tạo Việt / Tác giả Nguyễn Văn A"
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3.5 py-2 text-xs sm:text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Người đại diện / Luật sư / Chức vụ:
            </label>
            <input
              type="text"
              value={holderRepresentative}
              onChange={(e) => setHolderRepresentative(e.target.value)}
              placeholder="Ví dụ: Giám đốc Pháp chế / Đại diện theo ủy quyền"
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3.5 py-2 text-xs sm:text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Bên có hành vi vi phạm (Tên tổ chức / cá nhân / shop):
            </label>
            <input
              type="text"
              value={infringingParty}
              onChange={(e) => setInfringingParty(e.target.value)}
              placeholder="Ví dụ: Gian hàng Shopee 'Tổng Kho VIP' / Công ty Cổ phần ABC"
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3.5 py-2 text-xs sm:text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Tác phẩm / Nhãn hiệu gốc bị vi phạm:
            </label>
            <input
              type="text"
              value={workTitle}
              onChange={(e) => setWorkTitle(e.target.value)}
              placeholder="Ví dụ: Nhãn hiệu HIGHLANDS COFFEE / Bộ ảnh lookbook Hương Sen"
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3.5 py-2 text-xs sm:text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Số giấy chứng nhận / Văn bằng bảo hộ (nếu có):
            </label>
            <input
              type="text"
              value={registrationNumber}
              onChange={(e) => setRegistrationNumber(e.target.value)}
              placeholder="Ví dụ: Văn bằng số 129840/ĐKNH cấp bởi Cục SHTT (hoặc để trống)"
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3.5 py-2 text-xs sm:text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Thời hạn yêu cầu khắc phục / gỡ bỏ (Ngày làm việc):
            </label>
            <div className="flex items-center space-x-3">
              <input
                type="number"
                min="1"
                max="15"
                value={deadlineDays}
                onChange={(e) => setDeadlineDays(e.target.value)}
                className="w-24 bg-slate-950 border border-slate-800 rounded-lg px-3.5 py-2 text-xs sm:text-sm text-slate-200 focus:outline-none focus:border-indigo-500"
              />
              <span className="text-xs text-slate-400">ngày kể từ thời điểm nhận văn bản</span>
            </div>
          </div>

          <div className="md:col-span-2">
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Đường dẫn vi phạm (URL gian hàng / Link bài viết / Kênh):
            </label>
            <input
              type="text"
              value={infringingUrl}
              onChange={(e) => setInfringingUrl(e.target.value)}
              placeholder="https://shopee.vn/gian-hang-nghi-van-vi-pham hoặc https://trangweb.com/bai-viet-dao-van"
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3.5 py-2 text-xs sm:text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Tóm tắt hành vi vi phạm & kết luận đối chiếu:
            </label>
            <textarea
              value={evidenceSummary}
              onChange={(e) => setEvidenceSummary(e.target.value)}
              rows={3}
              placeholder="Ví dụ: Đã sao chép 85% nội dung bài nghiên cứu; sử dụng logo tương tự gây nhầm lẫn trên bao bì; vi phạm Điều 28 và 129 Luật SHTT..."
              className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-xs sm:text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
            />
          </div>
        </div>

        {/* Generate Button */}
        <div className="mt-6 flex justify-end">
          <button
            onClick={handleGenerate}
            disabled={isGenerating}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-slate-950 font-extrabold text-sm flex items-center shadow-lg shadow-orange-500/20 active:scale-95 transition-all"
          >
            {isGenerating ? (
              <>
                <Sparkles className="w-4 h-4 mr-2 animate-spin" />
                Đang Tự Động Soạn Thảo Văn Bản...
              </>
            ) : (
              <>
                <Send className="w-4 h-4 mr-2" />
                Tạo Thư Khuyến Cáo / Đơn Khiếu Nại Hoàn Chỉnh
              </>
            )}
          </button>
        </div>
      </div>

      {/* Generated Document Display */}
      {generatedDoc && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6">
          <div className="flex items-center justify-between flex-wrap gap-4 pb-4 border-b border-slate-800">
            <div>
              <span className="text-xs font-mono text-amber-400 uppercase tracking-widest block">
                Số hiệu: {generatedDoc.documentCode}
              </span>
              <h3 className="text-lg font-bold text-white mt-1">
                {generatedDoc.documentTitle}
              </h3>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={handleCopy}
                className="px-3.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center border border-slate-700 transition-all"
              >
                <Copy className="w-3.5 h-3.5 mr-1.5" />
                {copied ? 'Đã sao chép!' : 'Sao chép văn bản'}
              </button>

              <button
                onClick={handleDownload}
                className="px-3.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center border border-slate-700 transition-all"
              >
                <Download className="w-3.5 h-3.5 mr-1.5" />
                Tải file .txt
              </button>

              <button
                onClick={() => window.print()}
                className="px-3.5 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center shadow-sm transition-all"
              >
                <Printer className="w-3.5 h-3.5 mr-1.5" />
                In ấn / Lưu PDF
              </button>
            </div>
          </div>

          {/* Key Requirements Highlights */}
          {generatedDoc.keyRequirements && (
            <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20">
              <h4 className="text-xs font-bold text-amber-300 uppercase tracking-wider mb-2 flex items-center">
                <AlertTriangle className="w-4 h-4 mr-1.5 text-amber-400" />
                Các Yêu Cầu Cốt Lõi Buộc Bên Vi Phạm Phải Thực Hiện:
              </h4>
              <ul className="space-y-1 text-xs text-slate-200">
                {generatedDoc.keyRequirements.map((req, i) => (
                  <li key={i} className="flex items-start">
                    <span className="text-amber-400 mr-2 font-bold">•</span>
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Official Document Sheet */}
          <div className="p-8 sm:p-12 rounded-xl bg-slate-950 text-slate-200 border border-slate-800 font-serif leading-relaxed text-sm whitespace-pre-wrap shadow-inner print-only-sheet">
            {generatedDoc.fullContent}
          </div>

          {/* Next Legal Steps if Non-compliant */}
          {generatedDoc.nextLegalSteps && (
            <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-xs">
              <h4 className="font-bold text-rose-300 uppercase tracking-wider mb-2 flex items-center">
                <Gavel className="w-4 h-4 mr-1.5 text-rose-400" />
                Các Bước Thủ Tục Pháp Lý Tiếp Theo Nếu Bên Vi Phạm Không Hợp Tác:
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-2">
                {generatedDoc.nextLegalSteps.map((step, idx) => (
                  <div key={idx} className="p-2.5 rounded bg-slate-950/80 border border-slate-800">
                    <span className="text-rose-400 font-bold block mb-1">Bước {idx + 1}:</span>
                    <p className="text-slate-300">{step}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
