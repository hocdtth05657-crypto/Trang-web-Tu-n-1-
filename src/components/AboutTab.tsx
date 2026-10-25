import React from 'react';
import {
  ShieldCheck,
  BookOpen,
  Scale,
  ExternalLink,
  CheckCircle2,
  FileCheck,
  AlertCircle,
  Building,
  Globe2,
  Award,
  Cpu
} from 'lucide-react';

interface VerifiedSource {
  title: string;
  code: string;
  promulgatedBy: string;
  effectiveDate: string;
  status: 'Đang có hiệu lực' | 'Được sửa đổi, bổ sung';
  summary: string;
  officialUrl: string;
  category: 'Luật Quốc hội' | 'Nghị định Chính phủ' | 'Bộ luật Hình sự' | 'Điều ước quốc tế';
}

const VERIFIED_LEGAL_SOURCES: VerifiedSource[] = [
  {
    title: 'Luật Sở hữu trí tuệ (sửa đổi, bổ sung năm 2022)',
    code: 'Luật số 07/2022/QH15',
    promulgatedBy: 'Quốc hội khóa XV nước CHXHCN Việt Nam',
    effectiveDate: '01/01/2023',
    status: 'Đang có hiệu lực',
    summary: 'Văn bản luật nền tảng điều chỉnh toàn bộ các quan hệ sở hữu trí tuệ: Quyền tác giả, quyền liên quan, quyền sở hữu công nghiệp (nhãn hiệu, sáng chế, kiểu dáng) và quyền đối với giống cây trồng.',
    officialUrl: 'https://thuvienphapluat.vn/van-ban/So-huu-tri-tue/Luat-So-huu-tri-tue-sua-doi-2022-so-07-2022-QH15-381404.aspx',
    category: 'Luật Quốc hội',
  },
  {
    title: 'Luật Sở hữu trí tuệ năm 2005 (hợp nhất các lần sửa đổi)',
    code: 'Luật số 50/2005/QH11',
    promulgatedBy: 'Quốc hội khóa XI',
    effectiveDate: '01/07/2006',
    status: 'Được sửa đổi, bổ sung',
    summary: 'Luật gốc ban đầu xác lập hệ thống bảo hộ quyền tác giả, nhãn hiệu và sở hữu công nghiệp tại Việt Nam.',
    officialUrl: 'https://vbpl.vn/TW/Pages/vbpq-toanvan.aspx?ItemID=18596',
    category: 'Luật Quốc hội',
  },
  {
    title: 'Nghị định quy định chi tiết một số điều và biện pháp thi hành Luật SHTT về quyền tác giả, quyền liên quan',
    code: 'Nghị định 17/2023/NĐ-CP',
    promulgatedBy: 'Chính phủ nước CHXHCN Việt Nam',
    effectiveDate: '26/04/2023',
    status: 'Đang có hiệu lực',
    summary: 'Hướng dẫn cụ thể về quyền nhân thân, quyền tài sản, chuyển giao quyền, các trường hợp ngoại lệ không xâm phạm quyền tác giả trong môi trường số.',
    officialUrl: 'https://vanban.chinhphu.vn/?pageid=27160&docid=207753',
    category: 'Nghị định Chính phủ',
  },
  {
    title: 'Nghị định quy định xử phạt vi phạm hành chính về quyền tác giả, quyền liên quan',
    code: 'Nghị định 131/2013/NĐ-CP (sửa đổi bởi NĐ 28/2017/NĐ-CP)',
    promulgatedBy: 'Chính phủ nước CHXHCN Việt Nam',
    effectiveDate: '01/12/2013',
    status: 'Đang có hiệu lực',
    summary: 'Khung mức phạt tiền từ 3.000.000đ đến 250.000.000đ đối với cá nhân (đến 500.000.000đ với tổ chức) về các hành vi sao chép, truyền đạt trái phép tác phẩm trên mạng.',
    officialUrl: 'https://vanban.chinhphu.vn/?pageid=27160&docid=170889',
    category: 'Nghị định Chính phủ',
  },
  {
    title: 'Nghị định quy định xử phạt vi phạm hành chính trong lĩnh vực sở hữu công nghiệp',
    code: 'Nghị định 99/2013/NĐ-CP (sửa đổi bởi NĐ 126/2021/NĐ-CP)',
    promulgatedBy: 'Chính phủ nước CHXHCN Việt Nam',
    effectiveDate: '15/10/2013',
    status: 'Đang có hiệu lực',
    summary: 'Xử phạt các hành vi sản xuất, buôn bán hàng hóa giả mạo nhãn hiệu, xâm phạm quyền đối với nhãn hiệu, tên thương mại, chỉ dẫn địa lý và cạnh tranh không lành mạnh.',
    officialUrl: 'https://vanban.chinhphu.vn/?pageid=27160&docid=170138',
    category: 'Nghị định Chính phủ',
  },
  {
    title: 'Bộ luật Hình sự năm 2015 (sửa đổi, bổ sung 2017) - Điều 225',
    code: 'Bộ luật số 100/2015/QH13',
    promulgatedBy: 'Quốc hội khóa XIII',
    effectiveDate: '01/01/2018',
    status: 'Đang có hiệu lực',
    summary: 'Quy định tội danh Tội xâm phạm quyền tác giả, quyền liên quan với mức phạt tiền lên tới 1 tỷ đồng hoặc phạt tù tới 5 năm (đối với cá nhân) và phạt tiền tới 3 tỷ đồng (đối với pháp nhân thương mại).',
    officialUrl: 'https://vbpl.vn/TW/Pages/vbpq-toanvan.aspx?ItemID=96425',
    category: 'Bộ luật Hình sự',
  },
  {
    title: 'Công ước Berne về bảo hộ tác phẩm văn học và nghệ thuật',
    code: 'Berne Convention (Paris Act 1971)',
    promulgatedBy: 'Tổ chức Sở hữu Trí tuệ Thế giới (WIPO)',
    effectiveDate: 'Việt Nam gia nhập từ 26/10/2004',
    status: 'Đang có hiệu lực',
    summary: 'Quy tắc công nhận và bảo hộ tự động quyền tác giả giữa các quốc gia thành viên mà không phụ thuộc vào bất kỳ thủ tục đăng ký hình thức nào.',
    officialUrl: 'https://www.wipo.int/treaties/en/ip/berne/',
    category: 'Điều ước quốc tế',
  },
  {
    title: 'Hiệp định về các khía cạnh liên quan tới thương mại của quyền sở hữu trí tuệ (TRIPS)',
    code: 'TRIPS Agreement (WTO)',
    promulgatedBy: 'Tổ chức Thương mại Thế giới (WTO)',
    effectiveDate: 'Việt Nam áp dụng từ 11/01/2007',
    status: 'Đang có hiệu lực',
    summary: 'Thiết lập các tiêu chuẩn tối thiểu về thực thi quyền sở hữu trí tuệ và bảo vệ quyền tác giả, sáng chế, nhãn hiệu trong thương mại quốc tế.',
    officialUrl: 'https://www.wto.org/english/tratop_e/trips_e/trips_e.htm',
    category: 'Điều ước quốc tế',
  },
];

export const AboutTab: React.FC = () => {
  return (
    <div className="space-y-10 pb-16">
      {/* 1. Header Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-indigo-950/70 to-slate-900 border border-slate-800 p-6 sm:p-10 shadow-2xl">
        <div className="max-w-4xl relative z-10">
          <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 mb-3">
            <CheckCircle2 className="w-3.5 h-3.5 mr-1.5 text-emerald-400" />
            Dữ Liệu Đã Được Thẩm Định &amp; Đối Chiếu Chuẩn Pháp Luật
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Giới Thiệu Hệ Thống IPGuard AI &amp; Nguồn Dữ Liệu Tham Khảo
          </h1>
          <p className="mt-3 text-sm sm:text-base text-slate-300 leading-relaxed">
            Nền tảng ứng dụng trí tuệ nhân tạo chuyên biệt trong thẩm định sơ bộ nguy cơ xâm phạm quyền tác giả,
            nhãn hiệu và quyền sở hữu trí tuệ tại Việt Nam, phục vụ tác giả, doanh nghiệp, nhà sáng tạo nội dung và lập trình viên.
          </p>
        </div>
      </div>

      {/* Student & Project Authorship Credit */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-amber-500/10 via-indigo-500/10 to-purple-500/10 border border-amber-500/30 p-6 shadow-xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
          <div className="flex items-center space-x-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-500 via-orange-500 to-indigo-600 text-white font-black flex items-center justify-center text-xl shadow-lg shadow-amber-500/20 shrink-0">
              ĐTH
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                  Học viên thực hiện đề án
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  Nhóm 2
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-white mt-0.5">
                Đỗ Thái Học
              </h2>
              <p className="text-xs text-slate-300 font-mono mt-0.5">
                Mã sinh viên: <strong className="text-indigo-400 font-bold">TH05657</strong>
              </p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 text-xs sm:text-right w-full sm:w-auto">
            <span className="text-[11px] text-slate-400 uppercase tracking-wider block font-semibold mb-0.5">
              Đơn vị thực hiện:
            </span>
            <p className="font-bold text-slate-100 text-sm">
              Chương trình Thực tập sinh Đợt 15
            </p>
            <div className="flex items-center sm:justify-end space-x-1.5 mt-1">
              <span className="px-2 py-0.5 rounded bg-orange-500/20 text-orange-400 font-bold border border-orange-500/30 text-[11px]">
                FPT Polytechnic
              </span>
              <span className="text-slate-500 font-bold">×</span>
              <span className="px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-400 font-bold border border-indigo-500/30 text-[11px]">
                IMTA TECH
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Core Principles */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-lg flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center mb-4">
              <FileCheck className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white mb-2">Chỉ Dẫn Chiếu Nguồn Đã Kiểm Chứng</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Hệ thống không cung cấp nhận định suy đoán vô căn cứ. Mọi kết luận thẩm định và đề xuất chế tài đều được gắn liền trực tiếp với điều khoản cụ thể trong Luật SHTT Việt Nam 2022 và các Nghị định của Chính phủ.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] text-amber-300 font-semibold flex items-center">
            <Scale className="w-3.5 h-3.5 mr-1" /> 100% căn cứ pháp quy hiện hành
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-lg flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center mb-4">
              <Cpu className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white mb-2">Mô Hình AI Phân Tích Chuyên Biệt</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Ứng dụng công nghệ xử lý ngôn ngữ và đối sánh đa phương thức (Gemini 3.8 Flash) với hướng dẫn hệ thống (System Instructions) được cấu hình theo chuẩn giám định sở hữu trí tuệ, phân biệt rõ hành vi sao chép và ngoại lệ sử dụng hợp lý.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] text-purple-300 font-semibold flex items-center">
            <CheckCircle2 className="w-3.5 h-3.5 mr-1" /> Trí tuệ nhân tạo thế hệ mới
          </div>
        </div>
      </div>

      {/* 3. Section: Verified Legal Sources (Nguồn Tham Khảo Chính Thống) */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl">
        <div className="flex items-center justify-between flex-wrap gap-4 pb-5 border-b border-slate-800">
          <div>
            <div className="flex items-center space-x-2">
              <BookOpen className="w-5 h-5 text-indigo-400" />
              <h2 className="text-xl font-bold text-white">
                Mục Nguồn Tham Khảo &amp; Cơ Sở Pháp Quy Đã Kiểm Chứng
              </h2>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Danh mục các văn bản quy phạm pháp luật chính thống được trích dẫn và dùng làm căn cứ thuật toán thẩm định
            </p>
          </div>

          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
            Tổng số: 08 Văn bản trọng yếu
          </span>
        </div>

        {/* Sources Table / Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          {VERIFIED_LEGAL_SOURCES.map((source, index) => (
            <div
              key={index}
              className="p-5 rounded-xl bg-slate-950/80 border border-slate-800/80 hover:border-slate-700 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                    {source.code}
                  </span>
                  <span className="text-[11px] text-emerald-400 font-medium flex items-center">
                    <CheckCircle2 className="w-3 h-3 mr-1" /> {source.status}
                  </span>
                </div>

                <h3 className="text-sm font-bold text-white mb-1.5 leading-snug">
                  {source.title}
                </h3>

                <p className="text-xs text-slate-400 mb-3 leading-relaxed">
                  {source.summary}
                </p>

                <div className="text-[11px] text-slate-500 space-y-0.5">
                  <p>• Cơ quan ban hành: <strong className="text-slate-400">{source.promulgatedBy}</strong></p>
                  <p>• Hiệu lực: <strong className="text-slate-400">{source.effectiveDate}</strong></p>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between">
                <span className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">
                  {source.category}
                </span>
                <a
                  href={source.officialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 flex items-center transition-colors"
                >
                  <span>Xem văn bản gốc</span>
                  <ExternalLink className="w-3.5 h-3.5 ml-1" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Project Specifications & Social Impact (Đặc Tả Đề Án & Hồ Sơ Kỹ Thuật) */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl space-y-6">
        <div className="border-b border-slate-800 pb-4">
          <div className="inline-flex items-center px-2.5 py-0.5 rounded text-[11px] font-semibold bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 mb-2">
            <Cpu className="w-3 h-3 mr-1 text-indigo-400" />
            Hồ Sơ Thiết Kế Hệ Thống &amp; Đặc Tả Đề Án
          </div>
          <h2 className="text-xl font-bold text-white">
            1. Vấn Đề Giải Quyết &amp; Mục Tiêu Xã Hội Của Ứng Dụng
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Ứng dụng sinh ra để giải quyết khoảng trống lớn giữa nhu cầu bảo vệ bản quyền số và chi phí tư vấn pháp lý đắt đỏ
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-slate-300 leading-relaxed">
          <div className="p-5 rounded-xl bg-slate-950 border border-slate-800">
            <h3 className="font-bold text-rose-400 text-sm mb-2 flex items-center">
              <AlertCircle className="w-4 h-4 mr-1.5" />
              Vấn Đề Xã Hội Cần Giải Quyết:
            </h3>
            <ul className="space-y-2">
              <li className="flex items-start">
                <span className="text-rose-400 mr-1.5 font-bold">•</span>
                <span><strong>Bùng nổ vi phạm bản quyền số:</strong> Sự phát triển của mạng xã hội, sàn TMĐT và công nghệ AI khiến hành vi sao chép nội dung, ăn cắp mã nguồn, nhái nhãn hiệu diễn ra chỉ trong vài giây.</span>
              </li>
              <li className="flex items-start">
                <span className="text-rose-400 mr-1.5 font-bold">•</span>
                <span><strong>Chi phí tư vấn &amp; giám định cao:</strong> Một vụ giám định và thuê luật sư SHTT truyền thống tốn từ 10 - 50 triệu đồng và kéo dài nhiều tuần, khiến các tác giả cá nhân và startup nhỏ phải chấp nhận bị xâm phạm.</span>
              </li>
              <li className="flex items-start">
                <span className="text-rose-400 mr-1.5 font-bold">•</span>
                <span><strong>Thiếu hiểu biết pháp lý:</strong> Đa phần người dùng không phân biệt được ranh giới giữa "Sử dụng hợp lý" (Fair use - Điều 25) và hành vi "Xâm phạm quyền tác giả" (Điều 28 Luật SHTT).</span>
              </li>
            </ul>
          </div>

          <div className="p-5 rounded-xl bg-slate-950 border border-slate-800">
            <h3 className="font-bold text-emerald-400 text-sm mb-2 flex items-center">
              <Globe2 className="w-4 h-4 mr-1.5" />
              Mục Tiêu Xã Hội Phục Vụ:
            </h3>
            <ul className="space-y-2">
              <li className="flex items-start">
                <span className="text-emerald-400 mr-1.5 font-bold">•</span>
                <span><strong>Dân chủ hóa công cụ bảo vệ pháp lý:</strong> Giúp bất kỳ ai cũng có thể tự rà soát rủi ro vi phạm trong 30 giây hoàn toàn miễn phí.</span>
              </li>
              <li className="flex items-start">
                <span className="text-emerald-400 mr-1.5 font-bold">•</span>
                <span><strong>Nâng cao ý thức thượng tôn pháp luật:</strong> Lan tỏa kiến thức Luật Sở hữu Trí tuệ 2022 và các chế tài hành chính/hình sự đến cộng đồng sáng tạo.</span>
              </li>
              <li className="flex items-start">
                <span className="text-emerald-400 mr-1.5 font-bold">•</span>
                <span><strong>Thúc đẩy kinh tế sáng tạo lành mạnh:</strong> Khuyến khích đổi mới sáng tạo, bảo vệ doanh thu hợp pháp của nhà sáng tạo nội dung, doanh nghiệp công nghệ và thương hiệu Việt Nam.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* 2. Target Users & Tech Literacy */}
        <div className="pt-4 border-t border-slate-800">
          <h2 className="text-xl font-bold text-white mb-3">
            2. Chân Dung Người Dùng Mục Tiêu &amp; Trình Độ Công Nghệ
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs">
              <span className="text-indigo-400 font-bold text-sm block mb-1">
                Tác giả &amp; Creator
              </span>
              <p className="text-slate-400 mb-2">Nhà văn, nhà báo, nhiếp ảnh gia, YouTuber, Tiktoker, KOL.</p>
              <div className="p-2 rounded bg-slate-900 text-[11px] text-slate-300">
                <strong className="text-amber-300">Trình độ công nghệ:</strong> Cơ bản đến Trung bình. Cần giao diện trực quan kéo thả, 1-click tải ảnh so sánh, văn bản giải thích dễ hiểu không dùng thuật ngữ rườm rà.
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs">
              <span className="text-amber-400 font-bold text-sm block mb-1">
                Chủ Shop &amp; Doanh Nghiệp SMEs
              </span>
              <p className="text-slate-400 mb-2">Nhà bán hàng Shopee, Lazada, TikTok Shop, chuỗi F&amp;B, thời trang.</p>
              <div className="p-2 rounded bg-slate-900 text-[11px] text-slate-300">
                <strong className="text-amber-300">Trình độ công nghệ:</strong> Trung bình. Cần chức năng phát hiện hàng nhái, nhái bao bì và tự động soạn Đơn khiếu nại gửi sàn TMĐT.
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs">
              <span className="text-emerald-400 font-bold text-sm block mb-1">
                Lập Trình Viên &amp; Startup IT
              </span>
              <p className="text-slate-400 mb-2">Kỹ sư phần mềm, quản lý dự án công nghệ, nhà phát triển ứng dụng.</p>
              <div className="p-2 rounded bg-slate-900 text-[11px] text-slate-300">
                <strong className="text-amber-300">Trình độ công nghệ:</strong> Nâng cao. Cần kiểm tra vi phạm giấy phép nguồn mở (GPLv3 copyleft, MIT, Apache) và đạo mã nguồn trong sản phẩm thương mại.
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs">
              <span className="text-purple-400 font-bold text-sm block mb-1">
                Chuyên Viên Pháp Chế &amp; Luật Sư
              </span>
              <p className="text-slate-400 mb-2">Pháp chế doanh nghiệp, luật sư tập sự, nhân viên kiểm duyệt nội dung.</p>
              <div className="p-2 rounded bg-slate-900 text-[11px] text-slate-300">
                <strong className="text-amber-300">Trình độ công nghệ:</strong> Cơ bản đến Khá. Cần trích dẫn chính xác số hiệu điều luật, khung phạt tiền và xuất bản Thư khuyến cáo C&amp;D chuẩn thể thức.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 5. Official Competent Authorities (Cơ quan có thẩm quyền tại Việt Nam) */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl">
        <h2 className="text-lg font-bold text-white mb-4 flex items-center">
          <Building className="w-5 h-5 mr-2 text-amber-400" />
          Các Cơ Quan Quản Lý &amp; Thực Thi Quyền Sở Hữu Trí Tuệ Tại Việt Nam
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs">
            <span className="text-amber-400 font-bold block mb-1 text-sm">
              Cục Bản quyền Tác giả (COV)
            </span>
            <p className="text-slate-300 mb-2">Trực thuộc Bộ Văn hóa, Thể thao và Du lịch.</p>
            <p className="text-slate-400 leading-relaxed">
              Thẩm quyền: Cấp Giấy chứng nhận đăng ký quyền tác giả, quyền liên quan; quản lý và giám sát các hành vi xâm phạm tác phẩm nghệ thuật, văn học, âm nhạc, phần mềm.
            </p>
            <a
              href="http://www.cov.gov.vn"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center text-indigo-400 hover:underline font-semibold"
            >
              cov.gov.vn <ExternalLink className="w-3 h-3 ml-1" />
            </a>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs">
            <span className="text-indigo-400 font-bold block mb-1 text-sm">
              Cục Sở hữu Trí tuệ (IP Viet Nam)
            </span>
            <p className="text-slate-300 mb-2">Trực thuộc Bộ Khoa học và Công nghệ.</p>
            <p className="text-slate-400 leading-relaxed">
              Thẩm quyền: Tiếp nhận và thẩm định đơn đăng ký nhãn hiệu, sáng chế, kiểu dáng công nghiệp, giải pháp hữu ích; cấp Văn bằng bảo hộ độc quyền; giải quyết khiếu nại sở hữu công nghiệp.
            </p>
            <a
              href="https://ipvietnam.gov.vn"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center text-indigo-400 hover:underline font-semibold"
            >
              ipvietnam.gov.vn <ExternalLink className="w-3 h-3 ml-1" />
            </a>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs">
            <span className="text-rose-400 font-bold block mb-1 text-sm">
              Cơ quan Thực thi &amp; Tòa án
            </span>
            <p className="text-slate-300 mb-2">Thanh tra Bộ KH&amp;CN, Quản lý thị trường, TAND.</p>
            <p className="text-slate-400 leading-relaxed">
              Thẩm quyền: Thanh tra, xử phạt vi phạm hành chính, tịch thu tang vật vi phạm nhãn hiệu; Tòa án nhân dân thụ lý giải quyết tranh chấp dân sự, bồi thường thiệt hại và xét xử hình sự (Điều 225 BLHS).
            </p>
          </div>
        </div>
      </div>

      {/* 5. Legal Disclaimer (Tuyên bố Miễn trừ Trách nhiệm) */}
      <div className="p-6 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-slate-200">
        <div className="flex items-center space-x-2 text-amber-400 font-bold text-sm mb-2">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <span>Tuyên Bố Về Tính Chính Xác &amp; Miễn Trừ Trách Nhiệm Pháp Lý:</span>
        </div>
        <div className="text-xs text-slate-300 leading-relaxed space-y-2">
          <p>
            1. <strong>Mục đích hỗ trợ:</strong> Hệ thống <em>IPGuard AI</em> được xây dựng nhằm cung cấp công cụ thẩm định sơ bộ, phân tích tương đồng và tham khảo quy định pháp lý cho người dùng.
          </p>
          <p>
            2. <strong>Không thay thế Luật sư hoặc Cơ quan Giám định:</strong> Kết quả phân tích từ hệ thống không tạo thành văn bản tư vấn pháp lý chính thức mang tính bảo đảm tố tụng. Để xác định hành vi xâm phạm có hiệu lực tại Tòa án hoặc cơ quan chức năng, bạn cần trưng cầu giám định tại Viện Khoa học Sở hữu Trí tuệ (VIPRI) hoặc tham vấn ý kiến Luật sư chuyên môn.
          </p>
          <p>
            3. <strong>Cam kết kiểm chứng:</strong> Toàn bộ thuật toán đối chiếu pháp lý chỉ trích dẫn các văn bản quy phạm pháp luật đang có hiệu lực thi hành tại Việt Nam; tuyệt đối không đưa các nội dung phỏng đoán, tin đồn hoặc dữ liệu chưa được kiểm chứng.
          </p>
        </div>
      </div>
    </div>
  );
};
