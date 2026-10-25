import React, { useState } from 'react';
import {
  ShieldAlert,
  FileCode,
  FileText,
  Image as ImageIcon,
  ShoppingBag,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Copy,
  Printer,
  ChevronDown,
  Upload,
  RefreshCw,
  Info,
  Scale,
  Gavel,
  ShieldCheck,
  Zap
} from 'lucide-react';
import { LEGAL_PRESETS, LegalPreset } from '../data/legalData';

interface AnalysisResult {
  riskLevel: 'none' | 'low' | 'medium' | 'high' | 'critical';
  riskScore: number;
  verdictTitle: string;
  summary: string;
  infringementTypes: string[];
  legalBasis: Array<{
    law: string;
    article: string;
    title: string;
    relevance: string;
  }>;
  detailedComparison: Array<{
    aspect: string;
    original: string;
    suspect: string;
    similarityScore: number;
    finding: string;
    isInfringing: boolean;
  }>;
  exceptionsChecked?: string;
  remedies: string[];
  potentialFines?: string;
}

interface ScannerTabProps {
  onSendToNotice: (data: {
    workTitle: string;
    infringingParty: string;
    infringingUrl: string;
    evidenceSummary: string;
  }) => void;
}

export const ScannerTab: React.FC<ScannerTabProps> = ({ onSendToNotice }) => {
  const [analysisType, setAnalysisType] = useState<'text' | 'code' | 'brand' | 'product'>('text');
  const [originalContent, setOriginalContent] = useState('');
  const [suspectContent, setSuspectContent] = useState('');
  const [contextDetails, setContextDetails] = useState('');
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [suspectImage, setSuspectImage] = useState<string | null>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  // Load Preset
  const handleLoadPreset = (preset: LegalPreset) => {
    setAnalysisType(preset.type as any);
    setOriginalContent(preset.originalContent);
    setSuspectContent(preset.suspectContent);
    setContextDetails(preset.context);
    setResult(null);
    setErrorMsg(null);
  };

  // Image Upload Handler
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, target: 'original' | 'suspect') => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        if (target === 'original') {
          setOriginalImage(reader.result);
        } else {
          setSuspectImage(reader.result);
        }
      }
    };
    reader.readAsDataURL(file);
  };

  // Perform Analysis
  const handleAnalyze = async () => {
    if (!originalContent.trim() && !originalImage && !suspectContent.trim() && !suspectImage) {
      setErrorMsg('Vui lòng nhập nội dung hoặc tải ảnh đối chứng để hệ thống tiến hành thẩm định.');
      return;
    }

    setIsLoading(true);
    setErrorMsg(null);
    setLoadingStep(1);

    const stepInterval = setInterval(() => {
      setLoadingStep((prev) => (prev < 4 ? prev + 1 : prev));
    }, 900);

    try {
      const response = await fetch('/api/analyze-ip', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          analysisType,
          originalContent,
          suspectContent,
          originalImage,
          suspectImage,
          contextDetails,
        }),
      });

      if (!response.ok) {
        throw new Error(`Server returned ${response.status}`);
      }

      const data: AnalysisResult = await response.json();
      setResult(data);
    } catch (err: any) {
      console.error('Error during analysis:', err);
      setErrorMsg('Có lỗi xảy ra trong quá trình kết nối máy chủ AI. Vui lòng thử lại.');
    } finally {
      clearInterval(stepInterval);
      setIsLoading(false);
    }
  };

  const getRiskBadge = (level: string, score: number) => {
    if (score >= 80 || level === 'critical') {
      return {
        bg: 'bg-rose-500/10 border-rose-500/30 text-rose-400',
        bar: 'bg-rose-500',
        label: 'XÂM PHẠM NGHIÊM TRỌNG',
        icon: XCircle,
      };
    }
    if (score >= 60 || level === 'high') {
      return {
        bg: 'bg-orange-500/10 border-orange-500/30 text-orange-400',
        bar: 'bg-orange-500',
        label: 'NGUY CƠ VI PHẠM CAO',
        icon: AlertTriangle,
      };
    }
    if (score >= 35 || level === 'medium') {
      return {
        bg: 'bg-amber-500/10 border-amber-500/30 text-amber-400',
        bar: 'bg-amber-500',
        label: 'RỦI RO TRUNG BÌNH (CẦN XEM XÉT)',
        icon: Info,
      };
    }
    return {
      bg: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400',
      bar: 'bg-emerald-500',
      label: 'AN TOÀN / MỨC ĐỘ THẤP',
      icon: CheckCircle2,
    };
  };

  const handleCopySummary = () => {
    if (!result) return;
    const text = `KẾT QUẢ THẨM ĐỊNH BẢN QUYỀN & SHTT:
Tiêu đề: ${result.verdictTitle}
Mức độ rủi ro: ${result.riskScore}% (${result.riskLevel})
Tóm tắt: ${result.summary}
Căn cứ: ${result.legalBasis.map((b) => `${b.law} - ${b.article}`).join('; ')}
Mức phạt dự kiến: ${result.potentialFines || 'Theo quy định'}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Hero Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-indigo-950/60 to-slate-900 border border-slate-800 p-6 sm:p-8 shadow-xl">
        <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 -mb-12 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-4xl">
          <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 mb-3">
            <Sparkles className="w-3.5 h-3.5 mr-1.5 text-indigo-400" />
            AI Giám Định Đa Phương Thức Tiên Tiến (Gemini 3.8 Flash)
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-snug">
            Nhận Diện & Thẩm Định Vi Phạm Bản Quyền & Sở Hữu Trí Tuệ
          </h1>
          <p className="mt-2 text-sm sm:text-base text-slate-300 leading-relaxed">
            Đối chiếu tự động giữa tác phẩm gốc và đối tượng nghi vấn theo các quy định của{' '}
            <strong className="text-amber-300 font-semibold">Luật Sở hữu Trí tuệ Việt Nam 2022</strong>, Nghị định 131/2013,
            Nghị định 99/2013 và các công ước quốc tế Berne / TRIPS.
          </p>

          {/* Quick Presets Bar */}
          <div className="mt-6 pt-5 border-t border-slate-800">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2.5 flex items-center">
              <Zap className="w-3.5 h-3.5 mr-1 text-amber-400" /> Chọn kịch bản thẩm định mẫu để thử nghiệm nhanh:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
              {LEGAL_PRESETS.map((preset) => (
                <button
                  key={preset.id}
                  onClick={() => handleLoadPreset(preset)}
                  className="text-left p-2.5 rounded-lg bg-slate-800/60 hover:bg-slate-700/80 border border-slate-700 hover:border-indigo-500/50 transition-all text-xs group"
                >
                  <div className="font-semibold text-slate-200 group-hover:text-indigo-300 flex items-center justify-between">
                    <span className="truncate">{preset.title}</span>
                    <ArrowRight className="w-3 h-3 text-slate-400 group-hover:text-indigo-400 group-hover:translate-x-0.5 transition-all shrink-0 ml-1" />
                  </div>
                  <span className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">{preset.badge}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Input Configuration */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-lg">
        {/* Type Selector */}
        <div className="flex items-center justify-between flex-wrap gap-4 pb-5 border-b border-slate-800">
          <div>
            <h2 className="text-base font-bold text-white flex items-center">
              <Scale className="w-5 h-5 mr-2 text-indigo-400" />
              1. Chọn Loại Hình Đối Tượng Thẩm Định
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">Mỗi loại hình áp dụng các thuật toán và căn cứ điều luật riêng biệt</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 w-full sm:w-auto">
            <button
              onClick={() => setAnalysisType('text')}
              className={`flex items-center justify-center px-3.5 py-2 rounded-lg text-xs font-semibold transition-all ${
                analysisType === 'text'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              <FileText className="w-4 h-4 mr-1.5" />
              Văn bản & Đạo văn
            </button>

            <button
              onClick={() => setAnalysisType('code')}
              className={`flex items-center justify-center px-3.5 py-2 rounded-lg text-xs font-semibold transition-all ${
                analysisType === 'code'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              <FileCode className="w-4 h-4 mr-1.5" />
              Mã nguồn & Giấy phép OSS
            </button>

            <button
              onClick={() => setAnalysisType('brand')}
              className={`flex items-center justify-center px-3.5 py-2 rounded-lg text-xs font-semibold transition-all ${
                analysisType === 'brand'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              <ImageIcon className="w-4 h-4 mr-1.5" />
              Nhãn hiệu & Logo
            </button>

            <button
              onClick={() => setAnalysisType('product')}
              className={`flex items-center justify-center px-3.5 py-2 rounded-lg text-xs font-semibold transition-all ${
                analysisType === 'product'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              <ShoppingBag className="w-4 h-4 mr-1.5" />
              Sản phẩm & Gian hàng TMĐT
            </button>
          </div>
        </div>

        {/* Dual Input Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          {/* Left: Original / Protected Work */}
          <div className="flex flex-col bg-slate-950/60 border border-slate-800 rounded-xl p-5">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 font-bold text-xs">
                  A
                </span>
                <label className="text-sm font-bold text-emerald-300">
                  Tác Phẩm / Nhãn Hiệu Gốc Được Bảo Hộ
                </label>
              </div>
              <span className="text-[11px] text-slate-400 bg-slate-800 px-2 py-0.5 rounded">
                Bên Chủ thể quyền
              </span>
            </div>

            <textarea
              value={originalContent}
              onChange={(e) => setOriginalContent(e.target.value)}
              placeholder={
                analysisType === 'code'
                  ? `Dán mã nguồn gốc đã đăng ký bản quyền hoặc kèm thông tin giấy phép (ví dụ: GPLv3, MIT, Apache)...`
                  : analysisType === 'brand'
                  ? `Mô tả nhãn hiệu đã được bảo hộ (Tên nhãn hiệu, số văn bằng bảo hộ, đặc điểm nhận diện, nhóm sản phẩm theo Thỏa ước Nice)...`
                  : analysisType === 'product'
                  ? `Mô tả tác phẩm thiết kế mỹ thuật ứng dụng, kiểu dáng công nghiệp, hoặc bộ ảnh sản phẩm gốc...`
                  : `Dán nội dung bài viết, sách, nghiên cứu, kịch bản hoặc tài liệu gốc...`
              }
              rows={9}
              className="w-full bg-slate-900 border border-slate-800 rounded-lg p-3 text-xs sm:text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 font-mono resize-y"
            />

            {/* Optional Image Upload for Original */}
            {(analysisType === 'brand' || analysisType === 'product') && (
              <div className="mt-3 pt-3 border-t border-slate-800/80">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-300 font-medium flex items-center">
                    <ImageIcon className="w-3.5 h-3.5 mr-1 text-slate-400" /> Ảnh nhãn hiệu / Logo gốc:
                  </span>
                  <label className="cursor-pointer text-xs font-semibold text-indigo-400 hover:text-indigo-300 bg-slate-800 hover:bg-slate-700 px-2.5 py-1 rounded border border-slate-700 flex items-center">
                    <Upload className="w-3 h-3 mr-1" /> Tải ảnh lên
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleImageUpload(e, 'original')}
                    />
                  </label>
                </div>
                {originalImage && (
                  <div className="mt-2 relative inline-block">
                    <img
                      src={originalImage}
                      alt="Original Reference"
                      className="h-20 w-auto rounded border border-slate-700 object-contain bg-slate-900 p-1"
                    />
                    <button
                      onClick={() => setOriginalImage(null)}
                      className="absolute -top-1.5 -right-1.5 bg-rose-600 text-white rounded-full p-0.5 hover:bg-rose-500"
                    >
                      <XCircle className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Right: Suspect Infringing Work */}
          <div className="flex flex-col bg-slate-950/60 border border-slate-800 rounded-xl p-5">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-rose-500/20 text-rose-400 font-bold text-xs">
                  B
                </span>
                <label className="text-sm font-bold text-rose-300">
                  Đối Tượng Nghi Vấn Xâm Phạm Bản Quyền
                </label>
              </div>
              <span className="text-[11px] text-slate-400 bg-slate-800 px-2 py-0.5 rounded">
                Bên Bị nghi vấn
              </span>
            </div>

            <textarea
              value={suspectContent}
              onChange={(e) => setSuspectContent(e.target.value)}
              placeholder={
                analysisType === 'code'
                  ? `Dán đoạn mã nghi vấn sao chép, phần mềm thương mại bị nghi ngờ nhúng code không tuân thủ giấy phép...`
                  : analysisType === 'brand'
                  ? `Mô tả hoặc dán tên thương hiệu nghi vấn nhái, slogan, menu hoặc bao bì gây nhầm lẫn...`
                  : analysisType === 'product'
                  ? `Dán tiêu đề, mô tả sản phẩm trên sàn TMĐT (Shopee, TikTok, Lazada) hoặc đường dẫn nghi vấn...`
                  : `Dán văn bản nghi ngờ sao chép, bài đăng trên website/mạng xã hội của bên thứ ba...`
              }
              rows={9}
              className="w-full bg-slate-900 border border-slate-800 rounded-lg p-3 text-xs sm:text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500 font-mono resize-y"
            />

            {/* Optional Image Upload for Suspect */}
            {(analysisType === 'brand' || analysisType === 'product') && (
              <div className="mt-3 pt-3 border-t border-slate-800/80">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-300 font-medium flex items-center">
                    <ImageIcon className="w-3.5 h-3.5 mr-1 text-slate-400" /> Ảnh sản phẩm / Logo nghi vấn:
                  </span>
                  <label className="cursor-pointer text-xs font-semibold text-rose-400 hover:text-rose-300 bg-slate-800 hover:bg-slate-700 px-2.5 py-1 rounded border border-slate-700 flex items-center">
                    <Upload className="w-3 h-3 mr-1" /> Tải ảnh lên
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleImageUpload(e, 'suspect')}
                    />
                  </label>
                </div>
                {suspectImage && (
                  <div className="mt-2 relative inline-block">
                    <img
                      src={suspectImage}
                      alt="Suspect Reference"
                      className="h-20 w-auto rounded border border-slate-700 object-contain bg-slate-900 p-1"
                    />
                    <button
                      onClick={() => setSuspectImage(null)}
                      className="absolute -top-1.5 -right-1.5 bg-rose-600 text-white rounded-full p-0.5 hover:bg-rose-500"
                    >
                      <XCircle className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Optional Context Field */}
        <div className="mt-4 pt-4 border-t border-slate-800">
          <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center">
            <Info className="w-3.5 h-3.5 mr-1.5 text-indigo-400" />
            Thông tin bối cảnh pháp lý bổ sung (Tùy chọn):
          </label>
          <input
            type="text"
            value={contextDetails}
            onChange={(e) => setContextDetails(e.target.value)}
            placeholder="Ví dụ: Tác phẩm đã được Cục Bản quyền tác giả cấp số 123/2025/QTG; bên vi phạm dùng cho mục đích thương mại bán hàng..."
            className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3.5 py-2 text-xs sm:text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
          />
        </div>

        {/* Error message */}
        {errorMsg && (
          <div className="mt-4 p-3 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center">
            <AlertTriangle className="w-4 h-4 mr-2 shrink-0 text-rose-400" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Action Button & Loading Steps */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-800">
          <div className="text-xs text-slate-400 flex items-center">
            <ShieldCheck className="w-4 h-4 mr-1.5 text-emerald-400" />
            Hệ thống bảo mật dữ liệu, không lưu trữ văn bản riêng tư của bạn.
          </div>

          <button
            onClick={handleAnalyze}
            disabled={isLoading}
            className={`w-full sm:w-auto px-6 py-3 rounded-xl font-bold text-sm text-white flex items-center justify-center transition-all shadow-lg ${
              isLoading
                ? 'bg-slate-700 cursor-not-allowed text-slate-400'
                : 'bg-gradient-to-r from-indigo-600 via-indigo-500 to-purple-600 hover:from-indigo-500 hover:to-purple-500 shadow-indigo-600/25 active:scale-[0.98]'
            }`}
          >
            {isLoading ? (
              <>
                <RefreshCw className="w-4 h-4 mr-2 animate-spin text-indigo-400" />
                <span>Đang Thẩm Định Vi Phạm...</span>
              </>
            ) : (
              <>
                <ShieldAlert className="w-4 h-4 mr-2" />
                <span>Bắt Đầu Giám Định Bản Quyền & SHTT</span>
              </>
            )}
          </button>
        </div>

        {/* Loading Animated Steps */}
        {isLoading && (
          <div className="mt-6 p-4 rounded-xl bg-indigo-950/30 border border-indigo-500/20">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-indigo-300 flex items-center">
                <RefreshCw className="w-3.5 h-3.5 mr-1.5 animate-spin text-indigo-400" />
                Đang xử lý đối chiếu thông minh qua Gemini 3.8 Flash...
              </span>
              <span className="text-xs text-indigo-400 font-mono">{loadingStep * 25}%</span>
            </div>
            <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-gradient-to-r from-indigo-500 to-purple-500 h-full transition-all duration-500"
                style={{ width: `${loadingStep * 25}%` }}
              />
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-3 text-[11px] text-slate-400">
              <span className={loadingStep >= 1 ? 'text-indigo-300 font-medium' : ''}>
                ✓ 1. Trích xuất đặc trưng & cấu trúc
              </span>
              <span className={loadingStep >= 2 ? 'text-indigo-300 font-medium' : ''}>
                ✓ 2. Đối chiếu quy định Luật SHTT 2022
              </span>
              <span className={loadingStep >= 3 ? 'text-indigo-300 font-medium' : ''}>
                ✓ 3. Rà soát ngoại lệ Điều 25 (Fair use)
              </span>
              <span className={loadingStep >= 4 ? 'text-indigo-300 font-medium' : ''}>
                ✓ 4. Kết luận mức độ rủi ro & chế tài
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Analysis Results Display */}
      {result && (
        <div id="results-panel" className="space-y-6 pt-2">
          {/* Verdict Card */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-slate-800">
              <div className="flex-1">
                {(() => {
                  const badge = getRiskBadge(result.riskLevel, result.riskScore);
                  const Icon = badge.icon;
                  return (
                    <div className="flex items-center space-x-2 mb-3">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-extrabold border ${badge.bg}`}>
                        <Icon className="w-4 h-4 mr-1.5" />
                        {badge.label}
                      </span>
                      <span className="text-xs text-slate-400">
                        Chỉ số rủi ro: <strong className="text-white text-sm">{result.riskScore}/100</strong>
                      </span>
                    </div>
                  );
                })()}

                <h2 className="text-xl sm:text-2xl font-black text-white leading-tight">
                  {result.verdictTitle}
                </h2>
                <p className="mt-2 text-sm text-slate-300 leading-relaxed">
                  {result.summary}
                </p>
              </div>

              {/* Score Gauge Circle */}
              <div className="flex flex-col items-center justify-center p-4 rounded-xl bg-slate-950/80 border border-slate-800 shrink-0 w-full sm:w-44 text-center">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">
                  Độ Trùng Lặp / Rủi Ro
                </span>
                <div className="relative flex items-center justify-center">
                  <span className={`text-4xl font-black ${
                    result.riskScore >= 70 ? 'text-rose-400' : result.riskScore >= 40 ? 'text-amber-400' : 'text-emerald-400'
                  }`}>
                    {result.riskScore}%
                  </span>
                </div>
                <div className="w-full bg-slate-800 h-2 rounded-full mt-2.5 overflow-hidden">
                  <div
                    className={`h-full ${
                      result.riskScore >= 70 ? 'bg-rose-500' : result.riskScore >= 40 ? 'bg-amber-500' : 'bg-emerald-500'
                    }`}
                    style={{ width: `${result.riskScore}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Infringement Types Tags */}
            {result.infringementTypes && result.infringementTypes.length > 0 && (
              <div className="mt-5">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">
                  Dấu hiệu hành vi cấu thành vi phạm:
                </span>
                <div className="flex flex-wrap gap-2">
                  {result.infringementTypes.map((type, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 rounded-lg text-xs font-medium bg-rose-500/10 text-rose-300 border border-rose-500/20"
                    >
                      ⚠️ {type}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Side-by-side Comparative Analysis */}
            {result.detailedComparison && result.detailedComparison.length > 0 && (
              <div className="mt-8">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-3 flex items-center">
                  <Scale className="w-4 h-4 mr-1.5 text-indigo-400" />
                  Đối Chiếu Chi Tiết Từng Khía Cạnh (Comparative Matrix)
                </h3>
                <div className="space-y-3">
                  {result.detailedComparison.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 hover:border-slate-700 transition-all"
                    >
                      <div className="flex items-center justify-between flex-wrap gap-2 mb-2 pb-2 border-b border-slate-800/80">
                        <span className="text-xs font-bold text-indigo-300">
                          Khía cạnh: {item.aspect}
                        </span>
                        <div className="flex items-center space-x-2">
                          <span className="text-xs text-slate-400">Tương đồng:</span>
                          <span
                            className={`text-xs font-bold px-2 py-0.5 rounded ${
                              item.similarityScore >= 70
                                ? 'bg-rose-500/20 text-rose-300'
                                : 'bg-amber-500/20 text-amber-300'
                            }`}
                          >
                            {item.similarityScore}%
                          </span>
                          {item.isInfringing ? (
                            <span className="text-[11px] font-semibold text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded border border-rose-500/20">
                              Xâm phạm
                            </span>
                          ) : (
                            <span className="text-[11px] font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                              Hợp lệ / Khác biệt
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs font-mono">
                        <div className="p-2.5 rounded bg-slate-900 border border-slate-800">
                          <span className="text-[10px] text-emerald-400 font-sans font-bold uppercase block mb-1">
                            Trích dẫn bản gốc:
                          </span>
                          <p className="text-slate-300 line-clamp-4">{item.original}</p>
                        </div>
                        <div className="p-2.5 rounded bg-slate-900 border border-slate-800">
                          <span className="text-[10px] text-rose-400 font-sans font-bold uppercase block mb-1">
                            Bản nghi vấn tương ứng:
                          </span>
                          <p className="text-slate-300 line-clamp-4">{item.suspect}</p>
                        </div>
                      </div>

                      <p className="mt-2 text-xs text-slate-300 bg-slate-900/40 p-2 rounded border border-slate-800/50">
                        <strong className="text-indigo-400 font-medium">Nhận xét giám định:</strong> {item.finding}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Legal Basis Cards */}
            {result.legalBasis && result.legalBasis.length > 0 && (
              <div className="mt-8">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-3 flex items-center">
                  <Gavel className="w-4 h-4 mr-1.5 text-amber-400" />
                  Căn Cứ Pháp Lý & Điều Khoản Áp Dụng (Theo Luật SHTT Việt Nam)
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {result.legalBasis.map((basis, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-xl bg-amber-500/5 border border-amber-500/20 text-xs"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-extrabold text-amber-300 text-sm">{basis.article}</span>
                        <span className="text-[11px] text-slate-400">{basis.law}</span>
                      </div>
                      <h4 className="font-bold text-white mb-1.5">{basis.title}</h4>
                      <p className="text-slate-300 leading-relaxed">{basis.relevance}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Exceptions / Fair Use Checked */}
            {result.exceptionsChecked && (
              <div className="mt-6 p-4 rounded-xl bg-slate-950/70 border border-slate-800">
                <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-1 flex items-center">
                  <Info className="w-3.5 h-3.5 mr-1 text-indigo-400" />
                  Thẩm Định Ngoại Lệ Sử Dụng Hợp Lý (Điều 25 Luật SHTT - Fair Use):
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {result.exceptionsChecked}
                </p>
              </div>
            )}

            {/* Potential Fines & Sanctions */}
            {result.potentialFines && (
              <div className="mt-4 p-4 rounded-xl bg-rose-500/10 border border-rose-500/30">
                <h4 className="text-xs font-bold text-rose-300 uppercase tracking-wider mb-1 flex items-center">
                  <AlertTriangle className="w-3.5 h-3.5 mr-1 text-rose-400" />
                  Ước Tính Chế Tài Xử Phạt Hành Chính & Trách Nhiệm Dân Sự:
                </h4>
                <p className="text-xs text-slate-200 font-medium leading-relaxed">
                  {result.potentialFines}
                </p>
              </div>
            )}

            {/* Recommended Remedies */}
            {result.remedies && result.remedies.length > 0 && (
              <div className="mt-8 pt-6 border-t border-slate-800">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-3 flex items-center">
                  <CheckCircle2 className="w-4 h-4 mr-1.5 text-emerald-400" />
                  Khuyến Nghị Các Bước Hành Động Dành Cho Chủ Thể Quyền:
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {result.remedies.map((remedy, idx) => (
                    <div
                      key={idx}
                      className="flex items-start p-3 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-300"
                    >
                      <span className="flex items-center justify-center w-5 h-5 rounded-full bg-indigo-500/20 text-indigo-400 font-bold text-[10px] mr-2 shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <span>{remedy}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Bottom Actions Bar */}
            <div className="mt-8 pt-6 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center space-x-2">
                <button
                  onClick={handleCopySummary}
                  className="px-3.5 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center transition-all border border-slate-700"
                >
                  <Copy className="w-3.5 h-3.5 mr-1.5" />
                  {copied ? 'Đã sao chép!' : 'Sao chép kết luận'}
                </button>
                <button
                  onClick={() => window.print()}
                  className="px-3.5 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center transition-all border border-slate-700"
                >
                  <Printer className="w-3.5 h-3.5 mr-1.5" />
                  In / Xuất PDF
                </button>
              </div>

              <button
                onClick={() => {
                  onSendToNotice({
                    workTitle: originalContent.slice(0, 80) || 'Tác phẩm sáng tạo đã xác lập quyền',
                    infringingParty: 'Bên sở hữu kênh/trang đăng tải nghi vấn',
                    infringingUrl: 'https://...',
                    evidenceSummary: result.summary,
                  });
                }}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-slate-950 font-extrabold text-xs sm:text-sm flex items-center shadow-lg shadow-orange-500/20 transition-all active:scale-95"
              >
                <span>Chuyển Sang Soạn Thư Khuyến Cáo (C&D)</span>
                <ArrowRight className="w-4 h-4 ml-1.5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
