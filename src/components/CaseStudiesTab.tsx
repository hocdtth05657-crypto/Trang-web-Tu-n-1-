import React, { useState } from 'react';
import { Scale, BookOpen, AlertTriangle, ShieldCheck, ChevronRight, Award, ExternalLink } from 'lucide-react';

interface CaseStudy {
  id: string;
  title: string;
  year: string;
  category: string;
  badgeColor: string;
  parties: {
    plaintiff: string;
    defendant: string;
  };
  summary: string;
  legalConflict: string;
  ruling: string;
  lessons: string[];
}

const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'case-1',
    title: 'Tranh chấp quyền tác giả 4 hình tượng nhân vật "Thần Đồng Đất Việt"',
    year: '2007 - 2019 (Án lệ kinh điển Việt Nam)',
    category: 'Quyền Tác Giả & Quyền Nhân Thân',
    badgeColor: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
    parties: {
      plaintiff: 'Họa sĩ Lê Phong Linh (Lê Linh)',
      defendant: 'Công ty TNHH Truyền thông Giáo dục Phan Thị & Bà Phan Thị Mỹ Hạnh',
    },
    summary:
      'Họa sĩ Lê Linh vẽ và sáng tạo 4 hình tượng nhân vật Trạng Tí, Sửu Ẹo, Dần Béo, Cả Mẹo từ tập 1 đến tập 78. Sau khi chấm dứt hợp tác, Phan Thị tiếp tục thuê họa sĩ khác vẽ tiếp các tập sau và biến thể nhân vật với danh xưng đồng tác giả.',
    legalConflict:
      'Mâu thuẫn giữa Quyền nhân thân của tác giả trực tiếp sáng tạo (Điều 19 Luật SHTT) và Quyền tài sản của chủ sở hữu quyền tác giả/công ty đầu tư kinh phí (Điều 20 Luật SHTT).',
    ruling:
      'Tòa án nhân dân TP.HCM và Tòa cấp cao công nhận Họa sĩ Lê Linh là TÁC GIẢ DUY NHẤT của 4 hình tượng nhân vật; buộc Phan Thị chấm dứt việc sáng tạo các biến thể nhân vật, xin lỗi công khai và bồi thường chi phí luật sư.',
    lessons: [
      'Quyền nhân thân (đứng tên tác giả, bảo vệ sự toàn vẹn của tác phẩm) gắn liền vĩnh viễn với người trực tiếp sáng tạo, không thể chuyển giao dù công ty có trả tiền lương hay kinh phí.',
      'Làm tác phẩm phái sinh (biến thể nhân vật sang tập mới, chuyển thể phim hoạt hình) bắt buộc phải có sự đồng ý của tác giả gốc.',
      'Cần phân định rạch ròi giữa quyền tác giả (tác giả sáng tạo) và quyền chủ sở hữu tác phẩm (người trả tiền đầu tư).',
    ],
  },
  {
    id: 'case-2',
    title: 'Xâm phạm quyền nhãn hiệu & Cạnh tranh không lành mạnh ngành F&B',
    year: '2022 - 2024',
    category: 'Nhãn Hiệu & Chỉ Dẫn Thương Mại',
    badgeColor: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    parties: {
      plaintiff: 'Chủ sở hữu nhãn hiệu chuỗi cà phê lớn tại Việt Nam',
      defendant: 'Các cơ sở kinh doanh F&B tự phát sử dụng dấu hiệu "Highland..." hoặc "Trung Nguyên Legend nhái"',
    },
    summary:
      'Nhiều quán cà phê tại các tỉnh thành sử dụng bảng hiệu viền đỏ bo tròn, bố cục chữ in hoa, đồng thời đặt tên gần giống như "Highland Bean", "Highland Tea & Coffee" bán các dòng trà sen vàng và freeze tương tự chuỗi chính hãng.',
    legalConflict:
      'Căn cứ Điều 129 Luật SHTT về hành vi sử dụng dấu hiệu tương tự gây nhầm lẫn cho người tiêu dùng về nguồn gốc dịch vụ và Điều 130 về hành vi chỉ dẫn thương mại gây nhầm lẫn (Cạnh tranh không lành mạnh).',
    ruling:
      'Thanh tra Bộ Khoa học & Công nghệ và Đội Quản lý thị trường lập biên bản vi phạm hành chính, phạt tiền từ 20 - 50 triệu đồng theo Nghị định 99/2013/NĐ-CP, buộc tháo dỡ toàn bộ biển hiệu, tiêu hủy cốc ly và bao bì in nhãn hiệu vi phạm.',
    lessons: [
      'Không được đăng ký hoặc sử dụng biển hiệu có phát âm, bố cục, màu sắc tạo ấn tượng tổng thể gây nhầm lẫn với nhãn hiệu đã được bảo hộ rộng rãi.',
      'Việc kinh doanh đồ uống hay nhượng quyền bắt buộc phải tra cứu kỹ cơ sở dữ liệu WIPO / Cục Sở hữu Trí tuệ Việt Nam (VNIPPA) trước khi đầu tư mặt bằng.',
    ],
  },
  {
    id: 'case-3',
    title: 'Tranh chấp bản quyền âm nhạc số, beat phối khí trên YouTube',
    year: '2021 - 2023',
    category: 'Bản Quyền Số & Nền Tảng Trực Tuyến (DMCA)',
    badgeColor: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
    parties: {
      plaintiff: 'Nhà sản xuất âm nhạc / Nhạc sĩ sáng tác',
      defendant: 'Đơn vị phát hành nhạc trực tuyến & Kênh YouTube triệu view',
    },
    summary:
      'Bài hát nổi tiếng được một đơn vị khác hòa âm phối khí lại (remix/lofi), đưa lên kho nhạc ngắn TikTok và YouTube Content ID mà không xin phép tác giả sáng tác ca khúc, thu về hàng trăm triệu đồng tiền quảng cáo.',
    legalConflict:
      'Vi phạm Điều 28 Khoản 7 Luật SHTT về việc "Làm tác phẩm phái sinh mà không được phép của tác giả" và phân phối bản ghi âm trên mạng viễn thông.',
    ruling:
      'Hệ thống YouTube thực thi gỡ bỏ theo đơn DMCA Takedown; Trung tâm Bảo vệ Quyền Tác giả Âm nhạc Việt Nam (VCPMC) can thiệp truy thu toàn bộ tiền tác quyền và bồi thường doanh thu cho tác giả gốc.',
    lessons: [
      'Cover, remix, phối khí lại bài hát dù tự bỏ công làm nhạc vẫn là "Tác phẩm phái sinh", bắt buộc phải xin phép và thanh toán tiền tác quyền cho tác giả phần lời và giai điệu gốc.',
      'Sử dụng các công cụ Content ID và khiếu nại bản quyền số là biện pháp bảo vệ hiệu quả, nhanh chóng trong môi trường trực tuyến.',
    ],
  },
  {
    id: 'case-4',
    title: 'Xâm phạm bản quyền mã nguồn đóng gói thương mại không tuân thủ GPLv3',
    year: '2023 - 2025',
    category: 'Bản Quyền Phần Mềm & Mã Nguồn Mở',
    badgeColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    parties: {
      plaintiff: 'Cộng đồng phát triển phần mềm mã nguồn mở',
      defendant: 'Doanh nghiệp phần mềm giải pháp doanh nghiệp',
    },
    summary:
      'Doanh nghiệp lấy một lõi xử lý dữ liệu cấp phép GNU General Public License v3 (GPLv3), xóa bỏ file LICENSE và phần chú thích bản quyền, sau đó dịch ngược sang mã nhị phân bán cho khách hàng với giá hàng chục triệu đồng/license.',
    legalConflict:
      'Giấy phép GPLv3 có điều khoản "Copyleft": Bất kỳ ai phân phối phần mềm có chứa mã GPLv3 đều phải cung cấp toàn bộ mã nguồn của tác phẩm phái sinh và không được phép áp đặt các hạn chế bổ sung.',
    ruling:
      'Bên vi phạm bị buộc phải công khai toàn bộ mã nguồn theo giấy phép GPLv3, hoặc gỡ bỏ hoàn toàn module sao chép khỏi sản phẩm thương mại và xin lỗi công khai cộng đồng.',
    lessons: [
      'Giấy phép mã nguồn mở (Open Source License) là hợp đồng pháp lý có giá trị ràng buộc trước pháp luật, không đồng nghĩa với việc "muốn dùng thế nào cũng được".',
      'Doanh nghiệp phát triển phần mềm cần kiểm soát nghiêm ngặt giấy phép (MIT, Apache vs GPL, AGPL) trước khi tích hợp vào sản phẩm thương mại.',
    ],
  },
];

export const CaseStudiesTab: React.FC = () => {
  const [selectedCase, setSelectedCase] = useState<CaseStudy>(CASE_STUDIES[0]);

  return (
    <div className="space-y-8 pb-16">
      {/* Top Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl">
        <div className="max-w-3xl">
          <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-300 border border-amber-500/20 mb-3">
            <Scale className="w-3.5 h-3.5 mr-1.5 text-amber-400" />
            Tổng Hợp Án Lệ & Tranh Chấp Thực Tế Tại Việt Nam
          </div>
          <h2 className="text-2xl font-extrabold text-white">
            Các Vụ Việc Điển Hình & Bài Học Pháp Lý Về Sở Hữu Trí Tuệ
          </h2>
          <p className="mt-2 text-sm text-slate-300 leading-relaxed">
            Nghiên cứu các tiền lệ tranh chấp bản quyền tác giả, nhãn hiệu và mã nguồn phần mềm để
            rút ra bài học quản trị rủi ro và bảo vệ quyền lợi hợp pháp của tác giả, doanh nghiệp.
          </p>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Cases List */}
        <div className="lg:col-span-1 space-y-3">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
            Danh sách án lệ & vụ việc tiêu biểu:
          </h3>
          {CASE_STUDIES.map((c) => (
            <div
              key={c.id}
              onClick={() => setSelectedCase(c)}
              className={`p-4 rounded-xl cursor-pointer border transition-all ${
                selectedCase.id === c.id
                  ? 'bg-indigo-600/15 border-indigo-500 shadow-md text-white'
                  : 'bg-slate-900/70 border-slate-800 hover:border-slate-700 text-slate-300'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${c.badgeColor}`}>
                  {c.category}
                </span>
                <span className="text-[11px] text-slate-400">{c.year.slice(0, 11)}</span>
              </div>
              <h4 className="text-xs sm:text-sm font-bold text-slate-100 line-clamp-2 mt-1">
                {c.title}
              </h4>
            </div>
          ))}
        </div>

        {/* Detailed Case View */}
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl space-y-6">
          <div>
            <div className="flex items-center space-x-2 mb-2">
              <span className={`text-xs font-bold px-2.5 py-0.5 rounded border ${selectedCase.badgeColor}`}>
                {selectedCase.category}
              </span>
              <span className="text-xs text-slate-400 font-mono">{selectedCase.year}</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white leading-snug">
              {selectedCase.title}
            </h3>
          </div>

          {/* Litigants */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs">
            <div>
              <span className="text-emerald-400 font-bold block mb-1">Bên Khởi kiện / Nguyên đơn:</span>
              <p className="text-slate-200">{selectedCase.parties.plaintiff}</p>
            </div>
            <div>
              <span className="text-rose-400 font-bold block mb-1">Bên Bị kiện / Bị đơn:</span>
              <p className="text-slate-200">{selectedCase.parties.defendant}</p>
            </div>
          </div>

          {/* Summary */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
              Diễn biến vụ việc:
            </h4>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed bg-slate-950/60 p-4 rounded-xl border border-slate-800">
              {selectedCase.summary}
            </p>
          </div>

          {/* Legal Conflict */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5 flex items-center">
              <AlertTriangle className="w-3.5 h-3.5 mr-1 text-amber-400" />
              Điểm mấu chốt tranh chấp pháp lý:
            </h4>
            <p className="text-xs sm:text-sm text-amber-200/90 leading-relaxed bg-amber-500/10 p-4 rounded-xl border border-amber-500/20">
              {selectedCase.legalConflict}
            </p>
          </div>

          {/* Ruling */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5 flex items-center">
              <Scale className="w-3.5 h-3.5 mr-1 text-indigo-400" />
              Phán quyết của Tòa án / Cơ quan có thẩm quyền:
            </h4>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed bg-indigo-500/10 p-4 rounded-xl border border-indigo-500/20">
              {selectedCase.ruling}
            </p>
          </div>

          {/* Practical Lessons */}
          <div className="pt-4 border-t border-slate-800">
            <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-2 flex items-center">
              <ShieldCheck className="w-4 h-4 mr-1.5 text-emerald-400" />
              Bài học thực tiễn phòng ngừa rủi ro cho tác giả & doanh nghiệp:
            </h4>
            <div className="space-y-2">
              {selectedCase.lessons.map((lesson, idx) => (
                <div
                  key={idx}
                  className="flex items-start p-3 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-300"
                >
                  <span className="flex items-center justify-center w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 font-bold text-[10px] mr-2 shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span>{lesson}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
