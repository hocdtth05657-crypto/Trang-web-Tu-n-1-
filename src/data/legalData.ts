export interface LegalPreset {
  id: string;
  title: string;
  type: 'text' | 'image' | 'code' | 'brand' | 'product';
  badge: string;
  description: string;
  originalContent: string;
  suspectContent: string;
  context: string;
  originalImage?: string;
  suspectImage?: string;
}

export const LEGAL_PRESETS: LegalPreset[] = [
  {
    id: 'case-article-plagiarism',
    title: 'Đạo văn bài viết nghiên cứu & SEO báo chí',
    type: 'text',
    badge: 'Quyền tác giả văn học / báo chí',
    description: 'Sao chép 85% nội dung nghiên cứu thị trường, thay đổi một số đại từ và sắp xếp lại mở bài nhưng giữ nguyên cấu trúc phân tích cốt lõi.',
    originalContent: `Nghiên cứu của Viện Công nghệ Chiến lược Việt Nam chỉ ra rằng: Xu hướng chuyển đổi số trong logistics năm 2026 tập trung vào 3 trụ cột cốt lõi: Tự động hóa kho vận bằng robot AMR, Tối ưu hóa định tuyến theo thời gian thực nhờ AI, và Ứng dụng hóa đơn số tích hợp chuỗi cung ứng xanh. Các doanh nghiệp áp dụng giải pháp này đã cắt giảm trung bình 32% chi phí lưu kho và rút ngắn 40% thời gian giao nhận chặng cuối. Bản quyền báo cáo thuộc về Viện Công nghệ Chiến lược, mọi hành vi sao chép không trích nguồn đều bị nghiêm cấm.`,
    suspectContent: `Báo cáo mới nhất về ngành vận tải cho thấy: Làn sóng số hóa logistics năm 2026 đặt trọng tâm vào 3 yếu tố then chốt: Sử dụng robot AMR tự động hóa kho bãi, Tối ưu hóa tuyến đường thời gian thực bằng trí tuệ nhân tạo, và Áp dụng hóa đơn số cho chuỗi cung ứng thân thiện môi trường. Nhờ vậy, các đơn vị đã giảm được 32% ngân sách tồn kho và tiết kiệm 40% thời gian chặng giao hàng cuối cùng. (Đăng tải bởi trang tin TechLogis, không trích dẫn nguồn gốc tác giả).`,
    context: 'Bài viết gốc đã xuất bản có dấu thời gian (timestamp) ngày 12/03/2026. Trang tin nghi vấn sao chép lại toàn bộ số liệu và cấu trúc ngày 15/04/2026 nhằm kéo traffic thương mại bán dịch vụ.',
  },
  {
    id: 'case-brand-counterfeit',
    title: 'Xâm phạm nhãn hiệu & Làm giả nhận diện đồ uống',
    type: 'brand',
    badge: 'Nhãn hiệu & Cạnh tranh không lành mạnh',
    description: 'Sử dụng tên gọi tương tự gây nhầm lẫn "HighLands Bean" và tông màu đỏ nâu, biểu trưng đồi núi tương tự nhãn hiệu nổi tiếng đã bảo hộ.',
    originalContent: `Nhãn hiệu được bảo hộ: "HIGHLANDS COFFEE" theo Giấy chứng nhận ĐKNH số 129840 cấp bởi Cục Sở hữu Trí tuệ Việt Nam. Bảo hộ cho nhóm 30 (Cà phê, trà, đồ uống) và nhóm 43 (Dịch vụ nhà hàng, quán cà phê). Dấu hiệu đặc trưng gồm biểu tượng hạt cà phê cách điệu dáng đồi núi, vòng tròn viền đỏ bo góc cùng font chữ in hoa dày dặn màu trắng trên nền đỏ đô đậm.`,
    suspectContent: `Cơ sở kinh doanh sử dụng biển hiệu và bao bì mang tên "HIGHLAND BEAN COFFEE" với logo hình đồi núi hai tầng viền tròn đỏ mận, menu đồ uống freeze và phin truyền thống giống 90% chuỗi gốc. Sản phẩm đóng gói bán trên sàn online không có nguồn gốc xuất xứ chứng minh được phép nhượng quyền.`,
    context: 'Căn cứ Điều 129 Luật SHTT 2022 về hành vi sử dụng dấu hiệu tương tự gây nhầm lẫn về nguồn gốc hàng hóa, dịch vụ và Điều 130 về cạnh tranh không lành mạnh.',
  },
  {
    id: 'case-gpl-code-clone',
    title: 'Vi phạm giấy phép nguồn mở GPLv3 & Đạo mã nguồn',
    type: 'code',
    badge: 'Bản quyền phần mềm & Bản quyền mã nguồn',
    description: 'Doanh nghiệp đóng gói phần mềm thương mại độc quyền nhưng sao chép nguyên vẹn thuật toán xử lý dữ liệu từ kho lưu trữ mã nguồn mở cấp phép GNU General Public License v3 (GPLv3).',
    originalContent: `// Copyright (C) 2024 OpenAlgo Foundation
// Licensed under the GNU General Public License v3.0 (GPLv3)
// Anyone distributing binaries must make full corresponding source code available.
function calculateOptimalRouting(nodes: NetworkNode[], constraints: RoutingConstraint): RoutingResult {
  const distanceMatrix = computeHaversineMatrix(nodes);
  const geneticSolver = new GeneticTSP(distanceMatrix, constraints.maxHop, constraints.alphaDecay);
  const convergedSolution = geneticSolver.runWithSimulatedAnnealing(1000, 0.005);
  return {
    optimalPath: convergedSolution.path,
    efficiencyGain: convergedSolution.gainFactor,
    checksum: computeCryptographicProof(convergedSolution)
  };
}`,
    suspectContent: `// Internal Enterprise Core Routing Module - Confidential Proprietary 2026
// All rights reserved. Do not distribute.
function getOptimalDeliveryPath(nodes: any[], config: any) {
  const dMatrix = computeHaversineMatrix(nodes);
  const solver = new GeneticTSP(dMatrix, config.maxHop, config.alphaDecay);
  const res = solver.runWithSimulatedAnnealing(1000, 0.005);
  return {
    optimalPath: res.path,
    efficiencyGain: res.gainFactor,
    checksum: computeCryptographicProof(res)
  };
}`,
    context: 'Phần mềm thương mại phân phối đóng gói thu phí 50.000.000đ/license mà không cung cấp mã nguồn theo ràng buộc ' + 'copyleft' + ' của GPLv3, xóa bỏ phần ghi nhận bản quyền (copyright notice).',
  },
  {
    id: 'case-ecommerce-design',
    title: 'Hàng nhái kiểu dáng & Gian lận hình ảnh trên Sàn TMĐT',
    type: 'product',
    badge: 'Kiểu dáng công nghiệp & Thương mại điện tử',
    description: 'Gian hàng trực tuyến sao chép toàn bộ bộ ảnh chụp bản quyền của thương hiệu thời trang thiết kế, gắn logo watermark che mờ và bán sản phẩm nhái giá rẻ.',
    originalContent: `Bộ sưu tập áo dài dạ hội lụa tơ tằm thêu tay hoa sen 'Hương Sen Việt' thuộc quyền sở hữu của Nhà thiết kế An Nhiên. Toàn bộ hình ảnh lookbook chụp độc quyền người mẫu được đăng ký bản quyền tác phẩm mỹ thuật ứng dụng tại Cục Bản quyền tác giả số 412/2025/QTG. Giá niêm yết: 4.500.000 VNĐ.`,
    suspectContent: `Gian hàng 'Tổng Kho Thời Trang Giá Xưởng VIP' trên sàn TMĐT đăng bán sản phẩm tiêu đề: '[ẢNH THẬT] Áo dài dạ hội cao cấp thêu hoa sen hot trend 2026 giống hệt mẫu An Nhiên chỉ 199k'. Sử dụng toàn bộ ảnh gốc của NTK An Nhiên nhưng xóa tên tác giả, làm mờ logo thương hiệu.`,
    context: 'Vi phạm nghiêm trọng quyền nhân thân (đứng tên tác giả, bảo vệ sự toàn vẹn của tác phẩm theo Điều 19) và quyền tài sản (sao chép, truyền đạt tác phẩm đến công chúng theo Điều 20 Luật SHTT 2022).',
  },
];

export interface LegalArticle {
  id: string;
  category: 'copyright' | 'trademark' | 'patent' | 'penal' | 'decree';
  code: string;
  name: string;
  lawName: string;
  summary: string;
  penaltySummary: string;
  keyPoints: string[];
}

export const VIETNAM_IP_LAWS: LegalArticle[] = [
  {
    id: 'art-28',
    category: 'copyright',
    code: 'Điều 28',
    name: 'Hành vi xâm phạm quyền tác giả',
    lawName: 'Luật Sở hữu Trí tuệ 2022 (sửa đổi, bổ sung)',
    summary: 'Quy định chi tiết 16 nhóm hành vi xâm phạm quyền tác giả, bao gồm chiếm đoạt, mạo danh tác giả, công bố tác phẩm không được phép, làm tác phẩm phái sinh không xin phép, sao chép tác phẩm, phân phối và truyền đạt tác phẩm đến công chúng.',
    penaltySummary: 'Xử phạt hành chính từ 10 - 250 triệu đồng; buộc dỡ bỏ, tiêu hủy bản sao; bồi thường thiệt hại toàn bộ.',
    keyPoints: [
      'Chiếm đoạt quyền tác giả đối với tác phẩm văn học, nghệ thuật, khoa học.',
      'Mạo danh tác giả, cố ý thay đổi thông tin quản lý quyền dưới hình thức điện tử.',
      'Công bố, phân phối tác phẩm mà không được phép của tác giả, chủ sở hữu.',
      'Sản xuất bản sao tác phẩm mà không được phép (trừ các trường hợp giới hạn tại Điều 25).',
      'Cố ý hủy bỏ hoặc làm vô hiệu biện pháp công nghệ hữu hiệu do chủ sở hữu quyền áp dụng.',
    ],
  },
  {
    id: 'art-25',
    category: 'copyright',
    code: 'Điều 25',
    name: 'Các trường hợp giới hạn quyền tác giả (Sử dụng hợp lý - Fair Use)',
    lawName: 'Luật Sở hữu Trí tuệ 2022',
    summary: 'Các trường hợp sử dụng tác phẩm đã công bố không phải xin phép, không phải trả tiền bản quyền nhưng phải thông tin về tên tác giả và nguồn gốc tác phẩm.',
    penaltySummary: 'Không vi phạm nếu thỏa mãn đầy đủ các điều kiện trích dẫn hợp lý phi thương mại.',
    keyPoints: [
      'Tự sao chép một bản để nghiên cứu khoa học, học tập của cá nhân và không nhằm mục đích thương mại.',
      'Trích dẫn hợp lý tác phẩm mà không làm sai ý tác giả để bình luận, giới thiệu hoặc minh họa trong tác phẩm của mình.',
      'Trích dẫn tác phẩm để giảng dạy trong nhà trường mà không làm sai ý tác giả, không nhằm mục đích thương mại.',
      'Chụp ảnh, truyền hình tác phẩm tạo hình, kiến trúc, nhiếp ảnh được trưng bày tại nơi công cộng nhằm giới thiệu hình ảnh của tác phẩm đó.',
    ],
  },
  {
    id: 'art-129',
    category: 'trademark',
    code: 'Điều 129',
    name: 'Hành vi xâm phạm quyền đối với nhãn hiệu, tên thương mại',
    lawName: 'Luật Sở hữu Trí tuệ 2022',
    summary: 'Bảo vệ quyền độc quyền nhãn hiệu đã được cấp văn bằng bảo hộ hoặc nhãn hiệu nổi tiếng tại Việt Nam.',
    penaltySummary: 'Phạt tiền đến 500 triệu đồng với tổ chức, tịch thu tang vật giả mạo nhãn hiệu, đình chỉ kinh doanh.',
    keyPoints: [
      'Sử dụng dấu hiệu trùng với nhãn hiệu được bảo hộ cho hàng hóa, dịch vụ trùng.',
      'Sử dụng dấu hiệu tương tự đến mức gây nhầm lẫn về nguồn gốc hàng hóa, dịch vụ.',
      'Sử dụng dấu hiệu trùng hoặc tương tự với nhãn hiệu nổi tiếng có khả năng gây nhầm lẫn hoặc làm suy giảm tính phân biệt.',
      'Sử dụng tên thương mại trùng hoặc tương tự gây nhầm lẫn về chủ thể kinh doanh.',
    ],
  },
  {
    id: 'art-nd131',
    category: 'decree',
    code: 'Nghị định 131/2013/NĐ-CP',
    name: 'Xử phạt vi phạm hành chính về quyền tác giả, quyền liên quan',
    lawName: 'Nghị định Chính phủ (sửa đổi bởi NĐ 28/2017/NĐ-CP)',
    summary: 'Khung chế tài xử phạt tiền và biện pháp khắc phục hậu quả đối với từng hành vi vi phạm cụ thể trong môi trường số và vật lý.',
    penaltySummary: 'Mức phạt từ 3 triệu đến 250 triệu đồng đối với cá nhân (gấp 2 lần đối với tổ chức).',
    keyPoints: [
      'Điều 18: Phạt 15 - 35 triệu đồng với hành vi sao chép tác phẩm mà không được phép.',
      'Điều 17: Phạt 10 - 30 triệu đồng với hành vi truyền đạt tác phẩm đến công chúng qua mạng viễn thông.',
      'Điều 21: Phạt 10 - 20 triệu đồng về hành vi xuất khẩu/nhập khẩu bản sao vi phạm.',
      'Buộc dỡ bỏ bản sao tác phẩm vi phạm dưới hình thức điện tử trên mạng Internet.',
    ],
  },
  {
    id: 'art-blhs225',
    category: 'penal',
    code: 'Điều 225 BLHS',
    name: 'Tội xâm phạm quyền tác giả, quyền liên quan',
    lawName: 'Bộ luật Hình sự số 100/2015/QH13 (sửa đổi 2017)',
    summary: 'Chế tài hình sự đối với hành vi sao chép tác phẩm, bản ghi âm, bản ghi hình hoặc phân phối đến công chúng quy mô thương mại hoặc thu lợi bất chính từ 50 triệu đồng trở lên.',
    penaltySummary: 'Phạt tiền từ 50 triệu đến 1 tỷ đồng hoặc phạt cải tạo không giam giữ đến 03 năm hoặc phạt tù từ 06 tháng đến 05 năm.',
    keyPoints: [
      'Áp dụng khi thu lợi bất chính từ 50.000.000 đồng đến dưới 300.000.000 đồng hoặc gây thiệt hại từ 100 triệu đến dưới 500 triệu đồng.',
      'Khung tăng nặng: Có tổ chức, phạm tội 02 lần trở lên, thu lợi bất chính 300 triệu đồng trở lên: Phạt tù từ 02 năm đến 05 năm.',
      'Pháp nhân thương mại phạm tội: Phạt tiền từ 1 tỷ đến 3 tỷ đồng hoặc đình chỉ hoạt động có thời hạn đến 02 năm.',
    ],
  },
];

export const SELF_CHECK_QUESTIONS = [
  {
    id: 'q1',
    question: 'Tác phẩm / nội dung của bạn có tự sáng tạo từ đầu hay có sử dụng tài liệu của người khác?',
    options: [
      { text: '100% do tôi/đội ngũ tự nghiên cứu sáng tạo từ đầu', score: 0 },
      { text: 'Có tham khảo ý tưởng nhưng tự viết lại toàn bộ bằng ngôn từ riêng', score: 10 },
      { text: 'Có trích dẫn nguyên văn một số đoạn có dẫn link nguồn tác giả rõ ràng', score: 20 },
      { text: 'Sao chép đoạn văn/ảnh của bên khác chưa xin phép nhưng nghĩ trên mạng là dùng được', score: 60 },
      { text: 'Sao chép trực tiếp lượng lớn nội dung và đang khai thác kinh doanh thương mại', score: 95 },
    ],
  },
  {
    id: 'q2',
    question: 'Hình ảnh, logo hoặc biểu tượng bạn đang sử dụng có xuất xứ từ đâu?',
    options: [
      { text: 'Được thiết kế độc quyền, đã nộp đơn đăng ký nhãn hiệu tại Cục SHTT', score: 0 },
      { text: 'Mua bản quyền giấy phép thương mại từ các kho ảnh bản quyền (Shutterstock, Getty)', score: 5 },
      { text: 'Sử dụng ảnh miễn phí từ kho mã mở (Unsplash, Pexels) tuân thủ CC0', score: 10 },
      { text: 'Tìm trên Google Image hoặc mạng xã hội, xóa watermark hoặc cắt bớt logo của chủ ảnh', score: 85 },
      { text: 'Tạo logo gần giống thương hiệu nổi tiếng để khách hàng dễ liên tưởng', score: 95 },
    ],
  },
  {
    id: 'q3',
    question: 'Mã nguồn phần mềm hoặc thư viện sử dụng tuân thủ giấy phép nào?',
    options: [
      { text: 'Mã nguồn tự viết hoặc dùng thư viện MIT/Apache 2.0 đã kèm file LICENSE', score: 0 },
      { text: 'Chỉ dùng thư viện nội bộ có bản quyền doanh nghiệp', score: 0 },
      { text: 'Dùng mã nguồn mở GPLv3 nhưng chưa rõ sản phẩm thương mại có cần mở mã nguồn không', score: 55 },
      { text: 'Bẻ khóa (crack) phần mềm thương mại hoặc copy trộm mã nguồn từ công ty cũ', score: 100 },
    ],
  },
  {
    id: 'q4',
    question: 'Mục đích sử dụng của bạn đối với nội dung/tác phẩm đó là gì?',
    options: [
      { text: 'Nghiên cứu học tập cá nhân, phi lợi nhuận (Điều 25 Luật SHTT)', score: 0 },
      { text: 'Giảng dạy học thuật trong trường học có ghi nhận tác giả', score: 5 },
      { text: 'Đăng tải lên website công ty, fanpage để giới thiệu chung', score: 35 },
      { text: 'Quảng cáo bán hàng, kiếm tiền trực tiếp từ quảng cáo/sản phẩm thương mại', score: 75 },
    ],
  },
];
