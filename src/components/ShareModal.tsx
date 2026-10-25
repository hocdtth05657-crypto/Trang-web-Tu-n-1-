import React, { useState } from 'react';
import { X, Copy, CheckCircle2, ExternalLink, Share2, Globe, Send, MessageCircle } from 'lucide-react';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ShareModal: React.FC<ShareModalProps> = ({ isOpen, onClose }) => {
  const [copiedLink, setCopiedLink] = useState<string | null>(null);

  if (!isOpen) return null;

  const currentOrigin = typeof window !== 'undefined' ? window.location.origin : '';
  const sharedUrl = 'https://ais-pre-macl7sypnmijdgrapm3iuw-772456406656.asia-southeast1.run.app';
  const devUrl = 'https://ais-dev-macl7sypnmijdgrapm3iuw-772456406656.asia-southeast1.run.app';
  const effectivePublicUrl = currentOrigin || sharedUrl;

  const handleCopy = (url: string, type: string) => {
    navigator.clipboard.writeText(url);
    setCopiedLink(type);
    setTimeout(() => setCopiedLink(null), 2500);
  };

  const shareText = encodeURIComponent(
    'IPGuard AI — Hệ Thống Nhận Diện & Thẩm Định Vi Phạm Bản Quyền & Sở Hữu Trí Tuệ theo Luật SHTT Việt Nam 2022:'
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-lg bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-6 sm:p-7">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center space-x-3 mb-5">
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-indigo-600/20 text-indigo-400 border border-indigo-500/30">
            <Share2 className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">
              Đường Dẫn Truy Cập Sản Phẩm (App Links)
            </h3>
            <p className="text-xs text-slate-400">
              Chia sẻ liên kết trực tiếp để người khác có thể sử dụng IPGuard AI
            </p>
          </div>
        </div>

        {/* Public Share Link Card */}
        <div className="p-4 rounded-xl bg-slate-950/80 border border-indigo-500/30 mb-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-1.5">
              <Globe className="w-4 h-4 text-emerald-400" />
              <span className="text-xs font-bold text-slate-200">
                Link Công Khai / Chia Sẻ Trực Tiếp:
              </span>
            </div>
            <span className="text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded border border-emerald-500/20">
              Khuyến nghị
            </span>
          </div>

          <div className="flex items-center space-x-2 bg-slate-900 border border-slate-800 rounded-lg p-2 font-mono text-xs text-indigo-300 break-all select-all">
            <span className="flex-1 truncate">{sharedUrl}</span>
            <button
              onClick={() => handleCopy(sharedUrl, 'public')}
              className="px-3 py-1.5 rounded-md bg-indigo-600 hover:bg-indigo-500 text-white font-sans text-xs font-semibold shrink-0 transition-all flex items-center shadow-sm"
            >
              {copiedLink === 'public' ? (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5 mr-1 text-emerald-300" />
                  Đã copy!
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 mr-1" />
                  Copy Link
                </>
              )}
            </button>
          </div>

          <p className="text-[11px] text-slate-400 mt-2 leading-relaxed">
            Link này hoạt động trên mọi trình duyệt, máy tính, máy tính bảng và điện thoại di động mà không cần cài đặt.
          </p>
        </div>

        {/* Development Link Card */}
        <div className="p-3.5 rounded-xl bg-slate-950/50 border border-slate-800 mb-5">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs font-semibold text-slate-300">
              Link Môi Trường Phát Triển (Dev URL):
            </span>
          </div>
          <div className="flex items-center space-x-2 bg-slate-900/80 border border-slate-800 rounded-lg p-2 font-mono text-[11px] text-slate-400 select-all">
            <span className="flex-1 truncate">{devUrl}</span>
            <button
              onClick={() => handleCopy(devUrl, 'dev')}
              className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 font-sans text-[11px] font-medium shrink-0 transition-all"
            >
              {copiedLink === 'dev' ? 'Đã copy!' : 'Copy'}
            </button>
          </div>
        </div>

        {/* Quick Share Buttons */}
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2.5">
            Chia sẻ nhanh qua mạng xã hội:
          </span>
          <div className="grid grid-cols-3 gap-2">
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(sharedUrl)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center p-2.5 rounded-xl bg-[#1877F2]/10 hover:bg-[#1877F2]/20 border border-[#1877F2]/30 text-[#1877F2] text-xs font-semibold transition-all"
            >
              <ExternalLink className="w-3.5 h-3.5 mr-1.5" />
              Facebook
            </a>

            <a
              href={`https://t.me/share/url?url=${encodeURIComponent(sharedUrl)}&text=${shareText}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center p-2.5 rounded-xl bg-[#229ED9]/10 hover:bg-[#229ED9]/20 border border-[#229ED9]/30 text-[#229ED9] text-xs font-semibold transition-all"
            >
              <Send className="w-3.5 h-3.5 mr-1.5" />
              Telegram
            </a>

            <a
              href={`mailto:?subject=${encodeURIComponent('IPGuard AI - Nhận diện vi phạm bản quyền')}&body=${shareText}%20${encodeURIComponent(sharedUrl)}`}
              className="flex items-center justify-center p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs font-semibold transition-all"
            >
              <MessageCircle className="w-3.5 h-3.5 mr-1.5" />
              Email
            </a>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 pt-4 border-t border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-all"
          >
            Đóng cửa sổ
          </button>
        </div>
      </div>
    </div>
  );
};
