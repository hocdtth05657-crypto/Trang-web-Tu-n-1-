import React, { useState } from 'react';
import { X, CheckCircle2, AlertTriangle, ShieldCheck, ArrowRight, RotateCcw, Sparkles } from 'lucide-react';
import { SELF_CHECK_QUESTIONS } from '../data/legalData';

interface SelfAuditModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SelfAuditModal: React.FC<SelfAuditModalProps> = ({ isOpen, onClose }) => {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [isCalculated, setIsCalculated] = useState(false);

  if (!isOpen) return null;

  const handleSelect = (questionId: string, score: number) => {
    setSelectedAnswers((prev) => ({ ...prev, [questionId]: score }));
  };

  const handleCalculate = () => {
    setIsCalculated(true);
  };

  const handleReset = () => {
    setSelectedAnswers({});
    setIsCalculated(false);
  };

  const totalScore = Object.values(selectedAnswers).reduce((a, b) => a + b, 0);
  const avgScore = Math.round(totalScore / SELF_CHECK_QUESTIONS.length);

  const allAnswered = Object.keys(selectedAnswers).length === SELF_CHECK_QUESTIONS.length;

  const getVerdict = (score: number) => {
    if (score >= 70) {
      return {
        level: 'RỦI RO RẤT CAO / NGUY CƠ VI PHẠM PHÁP LUẬT',
        color: 'text-rose-400 bg-rose-500/10 border-rose-500/30',
        barColor: 'bg-rose-500',
        advice:
          'Nội dung hoặc sản phẩm của bạn đang có dấu hiệu xâm phạm nghiêm trọng quyền tác giả hoặc nhãn hiệu. Tuyệt đối không xuất bản hoặc thương mại hóa khi chưa có văn bản thỏa thuận bản quyền hoặc chuyển giao quyền của chủ sở hữu. Bạn có nguy cơ bị xử phạt hành chính từ 15-50 triệu đồng và bồi thường thiệt hại toàn bộ.',
      };
    }
    if (score >= 35) {
      return {
        level: 'RỦI RO TRUNG BÌNH / CẦN HOÀN THIỆN PHÁP LÝ',
        color: 'text-amber-400 bg-amber-500/10 border-amber-500/30',
        barColor: 'bg-amber-500',
        advice:
          'Một số thành phần bạn sử dụng có thể chưa tuân thủ đầy đủ các điều kiện trích dẫn hợp lý (Điều 25) hoặc giấy phép nguồn mở. Cần bổ sung nguồn trích dẫn rõ ràng, kiểm tra lại thỏa thuận bản quyền hình ảnh trước khi triển khai chiến dịch quảng bá.',
      };
    }
    return {
      level: 'AN TOÀN / TUÂN THỦ TỐT QUY ĐỊNH BẢN QUYỀN',
      color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30',
      barColor: 'bg-emerald-500',
      advice:
        'Tác phẩm của bạn có tính nguyên gốc cao và độc lập sáng tạo. Để bảo vệ tối đa quyền lợi trước nguy cơ bị bên thứ ba sao chép trộm, bạn nên nộp hồ sơ Đăng ký Quyền tác giả tại Cục Bản quyền tác giả (Bộ VHTTDL) hoặc đăng ký Nhãn hiệu tại Cục SHTT.',
    };
  };

  const verdict = getVerdict(avgScore);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="mb-6">
          <div className="inline-flex items-center px-2.5 py-0.5 rounded text-[11px] font-semibold bg-amber-500/10 text-amber-300 border border-amber-500/20 mb-2">
            <Sparkles className="w-3 h-3 mr-1 text-amber-400" />
            Checklist Kiểm Tra Nhanh
          </div>
          <h3 className="text-xl font-bold text-white">
            Tự Đánh Giá Rủi Ro Vi Phạm Sở Hữu Trí Tuệ Trước Khi Xuất Bản
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Trả lời 4 câu hỏi nhanh để xác định mức độ an toàn pháp lý của tác phẩm, logo hoặc sản phẩm của bạn.
          </p>
        </div>

        {/* Questions or Results */}
        {!isCalculated ? (
          <div className="space-y-6">
            {SELF_CHECK_QUESTIONS.map((q, idx) => (
              <div key={q.id} className="p-4 rounded-xl bg-slate-950/60 border border-slate-800">
                <span className="text-xs font-bold text-indigo-400 block mb-1">
                  Câu hỏi {idx + 1}:
                </span>
                <p className="text-sm font-semibold text-white mb-3">{q.question}</p>
                <div className="space-y-2">
                  {q.options.map((opt, optIdx) => {
                    const isSelected = selectedAnswers[q.id] === opt.score;
                    return (
                      <button
                        key={optIdx}
                        onClick={() => handleSelect(q.id, opt.score)}
                        className={`w-full text-left p-2.5 rounded-lg text-xs transition-all border ${
                          isSelected
                            ? 'bg-indigo-600/20 border-indigo-500 text-white font-medium'
                            : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                        }`}
                      >
                        <div className="flex items-center space-x-2">
                          <span
                            className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center shrink-0 ${
                              isSelected ? 'border-indigo-400 bg-indigo-500' : 'border-slate-600'
                            }`}
                          >
                            {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                          </span>
                          <span>{opt.text}</span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}

            <div className="pt-2 flex justify-end">
              <button
                onClick={handleCalculate}
                disabled={!allAnswered}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-xs sm:text-sm disabled:opacity-50 disabled:cursor-not-allowed shadow-md transition-all flex items-center"
              >
                <span>Xem Kết Quả Đánh Giá</span>
                <ArrowRight className="w-4 h-4 ml-1.5" />
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-6 animate-fadeIn">
            {/* Score Banner */}
            <div className={`p-6 rounded-2xl border ${verdict.color}`}>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-extrabold uppercase tracking-wider">
                  Kết Luận Tự Đánh Giá
                </span>
                <span className="text-2xl font-black">{avgScore}/100</span>
              </div>
              <h4 className="text-lg font-black text-white">{verdict.level}</h4>
              <p className="mt-2 text-xs sm:text-sm text-slate-200 leading-relaxed">
                {verdict.advice}
              </p>
              <div className="w-full bg-slate-950/60 h-2 rounded-full mt-4 overflow-hidden">
                <div
                  className={`h-full ${verdict.barColor} transition-all duration-700`}
                  style={{ width: `${avgScore}%` }}
                />
              </div>
            </div>

            {/* Checklist recommendations */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs space-y-2">
              <span className="font-bold text-slate-300 block mb-1">
                4 Nguyên Tắc Vàng Bảo Vệ Bản Quyền Tại Việt Nam:
              </span>
              <p className="text-slate-400 flex items-start">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 mr-1.5 shrink-0 mt-0.5" />
                <span>1. Giữ lại bản phác thảo, nhật ký sáng tạo, file gốc có timestamp để chứng minh ngày tạo lập đầu tiên.</span>
              </p>
              <p className="text-slate-400 flex items-start">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 mr-1.5 shrink-0 mt-0.5" />
                <span>2. Đăng ký văn bằng bảo hộ tại Cục Bản quyền tác giả / Cục SHTT để có hiệu lực chứng cứ tuyệt đối.</span>
              </p>
              <p className="text-slate-400 flex items-start">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 mr-1.5 shrink-0 mt-0.5" />
                <span>3. Ghi rõ tên tác giả và trích dẫn nguồn theo đúng quy định tại Điều 25 Luật SHTT khi tham khảo.</span>
              </p>
              <p className="text-slate-400 flex items-start">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 mr-1.5 shrink-0 mt-0.5" />
                <span>4. Soát xét các giấy phép nguồn mở (GPL, MIT, Apache) trong mã nguồn trước khi bán thương mại.</span>
              </p>
            </div>

            <div className="flex items-center justify-between pt-2">
              <button
                onClick={handleReset}
                className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold flex items-center transition-all"
              >
                <RotateCcw className="w-3.5 h-3.5 mr-1.5" />
                Làm lại đánh giá
              </button>
              <button
                onClick={onClose}
                className="px-5 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all"
              >
                Đã hiểu & Đóng
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
