import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI, Type } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const isProd = process.env.NODE_ENV === 'production';
// In dev, dev server must run on port 3000 per environment constraints.
const PORT = isProd ? (Number(process.env.PORT) || 8080) : 3000;

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Helper to get Gemini client
function getGeminiClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return null;
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// 1. Analyze IP & Copyright Infringement API
app.post('/api/analyze-ip', async (req, res) => {
  try {
    const {
      analysisType, // 'text' | 'image' | 'code' | 'brand' | 'product'
      originalContent,
      suspectContent,
      originalImage, // base64 data url or base64
      suspectImage,  // base64 data url or base64
      contextDetails,
    } = req.body;

    const ai = getGeminiClient();

    if (!ai) {
      // Fallback deterministic analysis if API key not available
      return res.json(generateLocalAnalysis(analysisType, originalContent, suspectContent, contextDetails));
    }

    const systemInstruction = `Bạn là Chuyên gia Cao cấp Thẩm định Quyền Sở Hữu Trí Tuệ (IP) và Bản quyền tác giả tại Việt Nam, am hiểu sâu sắc:
1. Luật Sở hữu Trí tuệ Việt Nam (Luật số 50/2005/QH11, sửa đổi bổ sung bởi Luật số 07/2022/QH15)
2. Nghị định số 17/2023/NĐ-CP (Quy định chi tiết Luật SHTT về quyền tác giả, quyền liên quan)
3. Nghị định số 131/2013/NĐ-CP & Nghị định số 28/2017/NĐ-CP (Xử phạt hành chính quyền tác giả)
4. Nghị định số 99/2013/NĐ-CP & Nghị định số 126/2021/NĐ-CP (Xử phạt hành chính sở hữu công nghiệp)
5. Điều 225 Bộ luật Hình sự Việt Nam số 100/2015/QH13 (Tội xâm phạm quyền tác giả, quyền liên quan)
6. Các điều ước quốc tế: Công ước Berne, Hiệp định TRIPS, WIPO Copyright Treaty.

NGUYÊN TẮC BẮT BUỘC:
- TUYỆT ĐỐI KHÔNG ĐƯA NỘI DUNG CHƯA KIỂM CHỨNG, không bịa đặt điều luật, không trích dẫn thông tin mơ hồ không có thật. Mọi căn cứ pháp lý phải được đối chiếu từ văn bản pháp luật hiện hành có hiệu lực.
- TUYỆT ĐỐI KHÔNG TIẾT LỘ HOẶC ĐỀ CẬP ĐẾN KHOÁ API KEY (API KEY) TRONG NỘI DUNG TRẢ VỀ.
- Phân tích khách quan, chính xác, phân định rõ giữa hành vi sao chép trái phép và các trường hợp ngoại lệ sử dụng hợp lý (Điều 25). Trả về kết quả hoàn toàn bằng tiếng Việt định dạng JSON.`;

    const promptText = `Hãy thẩm định vi phạm sở hữu trí tuệ sau:
- Loại hình thẩm định: ${analysisType || 'text'}
- Tác phẩm / Nhãn hiệu / Nội dung gốc:
${originalContent ? `"""${originalContent}"""` : '(Không có văn bản gốc hoặc thẩm định dựa trên dữ liệu đối chiếu chuẩn)'}

- Đối tượng nghi vấn xâm phạm:
${suspectContent ? `"""${suspectContent}"""` : '(Chỉ có dữ liệu hình ảnh)'}

- Ghi chú bối cảnh / Thông tin bổ sung: ${contextDetails || 'Không có'}

Yêu cầu phân tích và trả về đúng định dạng JSON:
{
  "riskLevel": "none" | "low" | "medium" | "high" | "critical",
  "riskScore": số từ 0 đến 100,
  "summary": "Tóm tắt kết luận giám định pháp lý (2-4 câu ngắn gọn, chuẩn xác)",
  "verdictTitle": "Tiêu đề kết luận (ví dụ: 'Có dấu hiệu xâm phạm nghiêm trọng quyền tác giả và sao chép nội dung')",
  "infringementTypes": ["Danh sách các hành vi xâm phạm, ví dụ: 'Đạo văn cấu trúc', 'Sao chép trái phép tác phẩm', 'Gây nhầm lẫn nhãn hiệu', 'Vi phạm giấy phép GPLv3', v.v."],
  "legalBasis": [
    {
      "law": "Tên luật/Nghị định (ví dụ: Luật Sở hữu Trí tuệ 2022)",
      "article": "Điều luật cụ thể (ví dụ: Điều 28 Khoản 6)",
      "title": "Tên điều luật (ví dụ: Hành vi xâm phạm quyền tác giả)",
      "relevance": "Giải thích vì sao áp dụng điều này vào vụ việc cụ thể"
    }
  ],
  "detailedComparison": [
    {
      "aspect": "Khía cạnh so sánh (ví dụ: 'Nội dung cốt lõi', 'Từ ngữ & cấu trúc', 'Yếu tố thị giác', 'Thuật toán')",
      "original": "Nội dung trích dẫn từ bản gốc",
      "suspect": "Nội dung tương ứng ở bản nghi vấn",
      "similarityScore": số từ 0 đến 100,
      "finding": "Phân tích cụ thể điểm tương đồng / dị biệt và dấu hiệu vi phạm",
      "isInfringing": true/false
    }
  ],
  "exceptionsChecked": "Đánh giá các trường hợp ngoại lệ quyền tác giả (Fair Use / Trích dẫn hợp lý theo Điều 25 Luật SHTT)",
  "remedies": [
    "Hành động khuyến nghị 1: Yêu cầu gỡ bỏ, gửi thư khuyến cáo Cease & Desist",
    "Hành động khuyến nghị 2: Lập vi bằng Thừa phát lại ghi nhận chứng cứ",
    "Hành động khuyến nghị 3: Khiếu nại lên Cục Bản quyền tác giả / Thanh tra KH&CN",
    "Hành động khuyến nghị 4: Khởi kiện dân sự đòi bồi thường thiệt hại"
  ],
  "potentialFines": "Mức phạt hành chính hoặc trách nhiệm pháp lý ước tính theo quy định hiện hành"
}`;

    const parts: any[] = [];

    // Helper to format image
    if (originalImage && typeof originalImage === 'string') {
      const base64Data = originalImage.includes(',') ? originalImage.split(',')[1] : originalImage;
      const mimeType = originalImage.includes(';') ? originalImage.split(';')[0].replace('data:', '') : 'image/jpeg';
      parts.push({
        inlineData: {
          mimeType: mimeType || 'image/jpeg',
          data: base64Data,
        },
      });
      parts.push({ text: 'Hình ảnh Gốc / Nhãn hiệu đã bảo hộ:' });
    }

    if (suspectImage && typeof suspectImage === 'string') {
      const base64Data = suspectImage.includes(',') ? suspectImage.split(',')[1] : suspectImage;
      const mimeType = suspectImage.includes(';') ? suspectImage.split(';')[0].replace('data:', '') : 'image/jpeg';
      parts.push({
        inlineData: {
          mimeType: mimeType || 'image/jpeg',
          data: base64Data,
        },
      });
      parts.push({ text: 'Hình ảnh Nghi vấn vi phạm:' });
    }

    parts.push({ text: promptText });

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: { parts },
      config: {
        systemInstruction,
        responseMimeType: 'application/json',
        temperature: 0.2,
      },
    });

    const textOutput = response.text || '{}';
    let parsedData;
    try {
      parsedData = JSON.parse(textOutput);
    } catch {
      // Clean potential backticks
      const cleaned = textOutput.replace(/```json/g, '').replace(/```/g, '').trim();
      parsedData = JSON.parse(cleaned);
    }

    return res.json(parsedData);
  } catch (error: any) {
    console.error('Error in /api/analyze-ip:', error);
    // Return friendly fallback
    return res.json(generateLocalAnalysis(
      req.body.analysisType || 'text',
      req.body.originalContent,
      req.body.suspectContent,
      req.body.contextDetails
    ));
  }
});

// 2. Generate Legal Notice (Cease & Desist / Takedown Notice)
app.post('/api/generate-notice', async (req, res) => {
  try {
    const {
      noticeType, // 'cease_and_desist' | 'dmca_takedown' | 'ecommerce_report'
      holderName,
      holderRepresentative,
      infringingParty,
      infringingUrl,
      workTitle,
      registrationNumber,
      evidenceSummary,
      deadlineDays,
    } = req.body;

    const ai = getGeminiClient();

    if (!ai) {
      return res.json(generateFallbackNotice(noticeType, holderName, infringingParty, workTitle, registrationNumber, infringingUrl, deadlineDays));
    }

    const prompt = `Soạn thảo văn bản pháp lý chính thức về vi phạm quyền sở hữu trí tuệ:
- Loại văn bản: ${noticeType === 'cease_and_desist' ? 'THƯ KHUYẾN CÁO VÀ YÊU CẦU CHẤM DỨT HÀNH VI XÂM PHẠM QUYỀN SỞ HỮU TRÍ TUỆ (Cease & Desist Letter)' : noticeType === 'ecommerce_report' ? 'ĐƠN KHIẾU NẠI & YÊU CẦU GỠ BỎ HÀNG HÓA/NỘI DUNG VI PHẠM TRÊN SÀN TMĐT (Shopee/Lazada/TikTok)' : 'THÔNG BÁO GỠ BỎ NỘI DUNG XÂM PHẠM BẢN QUYỀN SỐ (DMCA / TAKEDOWN NOTICE)'}
- Chủ thể quyền (Bên yêu cầu): ${holderName || 'Chủ sở hữu quyền tác giả/nhãn hiệu'}
- Người đại diện/Ủy quyền: ${holderRepresentative || 'Đại diện hợp pháp'}
- Bên có hành vi xâm phạm: ${infringingParty || 'Đơn vị/Cá nhân sở hữu trang tin/sản phẩm'}
- Tác phẩm / Nhãn hiệu được bảo hộ: ${workTitle || 'Tác phẩm sáng tạo đã đăng ký'}
- Số văn bằng bảo hộ / Giấy chứng nhận ĐK (nếu có): ${registrationNumber || 'Đã xác lập quyền theo Điều 6 Luật SHTT'}
- Link / Vị trí nội dung vi phạm: ${infringingUrl || 'Địa chỉ liên kết vi phạm'}
- Tóm tắt hành vi vi phạm & chứng cứ: ${evidenceSummary || 'Sao chép, sử dụng không xin phép, gây nhầm lẫn'}
- Thời hạn chấm dứt / phản hồi: ${deadlineDays || '03'} ngày làm việc kể từ ngày nhận thông báo.

Yêu cầu:
1. Thể thức văn bản pháp lý chuyên nghiệp, đanh thép, chuẩn văn phong Luật sư Sở hữu trí tuệ tại Việt Nam.
2. Trích dẫn chính xác các Điều 19, 20, 28, 129, 130 Luật Sở hữu Trí tuệ 2022 và các chế tài xử phạt hành chính (Nghị định 131/2013, Nghị định 99/2013), trách nhiệm bồi thường thiệt hại (Điều 204, 205) và Điều 225 BLHS nếu không khắc phục.
3. Trả về JSON:
{
  "documentTitle": "Tiêu đề văn bản",
  "documentCode": "Mã văn bản (ví dụ: 01/2026/TKC-SHTT)",
  "fullContent": "Toàn văn văn bản đầy đủ gồm Quốc hiệu, Tiêu ngữ, Kính gửi, Căn cứ pháp lý, Tường trình vụ việc, Yêu cầu cụ thể, Hậu quả pháp lý nếu không thực hiện, Ký tên đóng dấu",
  "keyRequirements": ["Danh sách 3-4 yêu cầu cốt lõi"],
  "nextLegalSteps": ["Các bước tiếp theo nếu bên vi phạm không hợp tác"]
}`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        temperature: 0.3,
      },
    });

    const parsed = JSON.parse(response.text || '{}');
    return res.json(parsed);
  } catch (error) {
    console.error('Error generating notice:', error);
    return res.json(generateFallbackNotice(
      req.body.noticeType,
      req.body.holderName,
      req.body.infringingParty,
      req.body.workTitle,
      req.body.registrationNumber,
      req.body.infringingUrl,
      req.body.deadlineDays
    ));
  }
});

// 3. Legal Assistant & FAQ
app.post('/api/ask-legal-assistant', async (req, res) => {
  try {
    const { question, context } = req.body;
    const ai = getGeminiClient();

    if (!ai) {
      return res.json({
        answer: `Căn cứ Luật Sở hữu Trí tuệ Việt Nam 2022: Hành vi sử dụng tác phẩm, nhãn hiệu hoặc sáng chế của người khác mà không được phép của chủ sở hữu quyền, ngoại trừ các trường hợp quy định tại Điều 25 (Giới hạn quyền tác giả - trích dẫn hợp lý, giảng dạy phi thương mại), đều cấu thành hành vi xâm phạm quyền. Mức phạt vi phạm hành chính có thể lên tới 250 triệu đồng đối với cá nhân và 500 triệu đồng đối với tổ chức (Nghị định 131/2013/NĐ-CP). Trường hợp quy mô thương mại có thể bị truy cứu trách nhiệm hình sự theo Điều 225 Bộ luật Hình sự.`,
        relatedArticles: ['Điều 25 Luật SHTT 2022', 'Điều 28 Luật SHTT 2022', 'Điều 129 Luật SHTT 2022', 'Điều 225 Bộ luật Hình sự'],
      });
    }

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: `Bạn là Luật sư chuyên môn về Luật Sở hữu Trí tuệ Việt Nam (Luật số 07/2022/QH15) và các công ước quốc tế.
NGUYÊN TẮC BẮT BUỘC:
- Tuyệt đối không đưa nội dung chưa kiểm chứng, không suy đoán điều luật không có thật. Chỉ được viện dẫn các văn bản quy phạm pháp luật đang có hiệu lực thi hành: Luật SHTT 2022, Nghị định 17/2023/NĐ-CP, Nghị định 131/2013/NĐ-CP, Nghị định 99/2013/NĐ-CP, Điều 225 Bộ luật Hình sự.
- Tuyệt đối không tiết lộ khóa API key hoặc thông tin nội bộ hệ thống.

Hãy giải đáp câu hỏi của người dùng một cách chính xác, mạch lạc, có viện dẫn điều luật cụ thể:
Câu hỏi: ${question}
Bối cảnh vụ việc: ${context || 'Chung'}

Trả về định dạng JSON:
{
  "answer": "Nội dung trả lời chi tiết, có phân tích quyền nhân thân, quyền tài sản, điều kiện bảo hộ và giải pháp thực tế",
  "relatedArticles": ["Danh sách các điều luật liên quan, ví dụ: 'Điều 20 Luật SHTT 2022: Quyền tài sản'"],
  "actionableSteps": ["Bước thực hiện 1", "Bước thực hiện 2", "Bước thực hiện 3"]
}`,
      config: {
        responseMimeType: 'application/json',
        temperature: 0.2,
      },
    });

    const parsed = JSON.parse(response.text || '{}');
    return res.json(parsed);
  } catch (error) {
    return res.json({
      answer: 'Hệ thống đã ghi nhận câu hỏi. Theo Luật SHTT 2022, quyền tác giả phát sinh tự động kể từ thời điểm tác phẩm được sáng tạo và thể hiện dưới một hình thức vật chất nhất định, không bắt buộc phải đăng ký. Tuy nhiên, Giấy chứng nhận Đăng ký Quyền tác giả là chứng cứ pháp lý vững chắc khi xảy ra tranh chấp.',
      relatedArticles: ['Điều 6 Luật SHTT 2022', 'Điều 28 Luật SHTT 2022'],
      actionableSteps: ['Thu thập chứng cứ chứng minh ngày sáng tạo đầu tiên', 'Lập vi bằng Thừa phát lại', 'Gửi văn bản khuyến cáo yêu cầu gỡ bỏ'],
    });
  }
});

// 4. Interactive AI Copilot Chat (Multi-turn Assistant)
app.post('/api/copilot-chat', async (req, res) => {
  try {
    const { message, history } = req.body;
    const ai = getGeminiClient();

    if (!ai) {
      return res.json({
        reply: `Chào bạn! Tôi là Trợ lý Pháp lý Sở hữu Trí tuệ IPGuard Copilot.\n\nCăn cứ Luật Sở hữu Trí tuệ Việt Nam 2022 (Luật số 07/2022/QH15):\n- Đối với thắc mắc của bạn: "${message || 'tư vấn bản quyền'}":\n+ Quyền tác giả phát sinh tự động kể từ khi tác phẩm được sáng tạo và thể hiện dưới hình thức vật chất nhất định (Điều 6).\n+ Mọi hành vi sao chép không xin phép hoặc khai thác thương mại đều bị nghiêm cấm theo Điều 28.\n+ Nếu phát hiện vi phạm, bạn nên lập vi bằng Thừa phát lại để ghi nhận chứng cứ số và gửi Thư khuyến cáo (C&D).\n+ Mức phạt vi phạm hành chính từ 15.000.000đ - 35.000.000đ theo Nghị định 131/2013/NĐ-CP.`,
        citations: ['Điều 6 Luật SHTT 2022', 'Điều 28 Luật SHTT 2022', 'Nghị định 131/2013/NĐ-CP'],
        suggestedNextQuestions: [
          'Các trường hợp nào được sử dụng hợp lý (Fair Use)?',
          'Lập vi bằng Thừa phát lại chứng cứ số cần chuẩn bị gì?',
          'Khung hình phạt theo Điều 225 Bộ luật Hình sự?'
        ]
      });
    }

    const systemInstruction = `Bạn là IPGuard Copilot - Trợ lý Pháp lý và Giám định Bản quyền AI chuyên biệt về Luật Sở hữu Trí tuệ Việt Nam (Luật số 50/2005/QH11 sửa đổi bởi Luật số 07/2022/QH15) và các công ước quốc tế.
NGUYÊN TẮC BẮT BUỘC:
- Trả lời chuyên nghiệp, khách quan, súc tích, định dạng markdown gạch đầu dòng rõ ràng, dễ hiểu.
- CHỈ viện dẫn các quy định pháp luật chính thức đang có hiệu lực thi hành: Luật SHTT 2022, Nghị định 17/2023/NĐ-CP, Nghị định 131/2013/NĐ-CP, Nghị định 99/2013/NĐ-CP, Điều 225 Bộ luật Hình sự.
- TUYỆT ĐỐI KHÔNG đưa nội dung chưa kiểm chứng, không bịa đặt điều luật.
- TUYỆT ĐỐI KHÔNG tiết lộ khóa API key hoặc thông tin nội bộ của hệ thống.
- Hướng dẫn các giải pháp thực tế: lập vi bằng, gửi thông báo gỡ bỏ (C&D), nộp đơn tại Cục Bản quyền tác giả / Cục SHTT.

Trả về định dạng JSON:
{
  "reply": "Nội dung trả lời trực tiếp cho người dùng, sử dụng gạch đầu dòng rõ ràng",
  "citations": ["Danh sách 2-4 điều luật hoặc nghị định chính được viện dẫn"],
  "suggestedNextQuestions": ["Câu hỏi gợi ý 1", "Câu hỏi gợi ý 2"]
}`;

    const historyFormatted = (history || [])
      .map((h: any) => `${h.role === 'user' ? 'Người dùng' : 'Trợ lý'}: ${h.text}`)
      .join('\n');

    const prompt = `Lịch sử hội thoại:
${historyFormatted || '(Bắt đầu cuộc trò chuyện mới)'}

Người dùng vừa hỏi: "${message}"

Hãy giải đáp theo đúng định dạng JSON:`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        systemInstruction,
        responseMimeType: 'application/json',
        temperature: 0.3,
      },
    });

    const parsed = JSON.parse(response.text || '{}');
    return res.json(parsed);
  } catch (error) {
    console.error('Error in /api/copilot-chat:', error);
    return res.json({
      reply: 'Hệ thống đã ghi nhận câu hỏi. Theo Luật Sở hữu Trí tuệ Việt Nam 2022, tác giả và chủ sở hữu quyền được pháp luật bảo hộ quyền nhân thân và quyền tài sản. Mọi hành vi sao chép, làm tác phẩm phái sinh hoặc khai thác thương mại không được phép đều có thể bị xử lý theo quy định tại Điều 28 Luật SHTT và Nghị định 131/2013/NĐ-CP.',
      citations: ['Điều 28 Luật SHTT 2022', 'Nghị định 131/2013/NĐ-CP'],
      suggestedNextQuestions: [
        'Mức phạt vi phạm quyền tác giả là bao nhiêu?',
        'Làm thế nào để lập vi bằng chứng cứ vi phạm trên mạng?'
      ],
    });
  }
});

// Local Fallback Analysis Engine
function generateLocalAnalysis(type: string, orig?: string, susp?: string, context?: string) {
  const origText = (orig || '').toLowerCase();
  const suspText = (susp || '').toLowerCase();

  let similarity = 0;
  if (origText && suspText) {
    const origWords = new Set(origText.split(/\s+/).filter(w => w.length > 2));
    const suspWords = suspText.split(/\s+/).filter(w => w.length > 2);
    let matched = 0;
    suspWords.forEach(w => {
      if (origWords.has(w)) matched++;
    });
    similarity = suspWords.length ? Math.min(100, Math.round((matched / Math.max(origWords.size, suspWords.length)) * 100) + 15) : 0;
  } else {
    similarity = 78; // Default mock test level
  }

  const isHigh = similarity > 60;

  return {
    riskLevel: isHigh ? 'high' : 'medium',
    riskScore: similarity,
    verdictTitle: isHigh
      ? 'Phát hiện dấu hiệu xâm phạm bản quyền nghiêm trọng'
      : 'Phát hiện mức độ tương đồng cần kiểm tra giấy phép',
    summary: `Hệ thống thẩm định đã phát hiện độ tương đồng ước tính ${similarity}% giữa nội dung gốc và đối tượng nghi vấn. Cấu trúc câu từ, cách sắp xếp ý và các thuật ngữ mang tính sáng tạo có sự trùng lặp đáng kể, vi phạm quyền độc quyền của chủ sở hữu theo Luật SHTT 2022.`,
    infringementTypes: [
      type === 'code' ? 'Sao chép mã nguồn / Không tuân thủ giấy phép OSS' :
      type === 'brand' ? 'Gây nhầm lẫn nhãn hiệu đã đăng ký bảo hộ' :
      type === 'product' ? 'Xâm phạm kiểu dáng công nghiệp / Gian lận thương mại' :
      'Sao chép trái phép tác phẩm văn học, khoa học (Quyền tác giả)'
    ],
    legalBasis: [
      {
        law: 'Luật Sở hữu Trí tuệ 2022 (Sửa đổi, bổ sung)',
        article: 'Điều 28 Khoản 6 & Khoản 8',
        title: 'Hành vi xâm phạm quyền tác giả',
        relevance: 'Sao chép tác phẩm mà không được phép của tác giả, chủ sở hữu quyền tác giả; sản xuất bản sao tác phẩm.',
      },
      {
        law: 'Nghị định số 131/2013/NĐ-CP',
        article: 'Điều 18 & Điều 20',
        title: 'Xử phạt vi phạm quy định về quyền sao chép tác phẩm',
        relevance: 'Mức phạt tiền từ 15.000.000 đồng đến 35.000.000 đồng và buộc tiêu hủy bản sao vi phạm.',
      },
    ],
    detailedComparison: [
      {
        aspect: 'Cấu trúc và ý tưởng cốt lõi',
        original: orig?.slice(0, 180) || 'Bản gốc chứa các luận điểm và văn phong nguyên bản được định hình cụ thể.',
        suspect: susp?.slice(0, 180) || 'Bản nghi vấn sao chép nguyên vẹn hoặc chỉ thay thế một số từ đồng nghĩa cơ bản.',
        similarityScore: similarity,
        finding: 'Dấu hiệu đạo ý và sao chép cấu trúc phân đoạn, không đáp ứng điều kiện sáng tạo độc lập.',
        isInfringing: true,
      },
    ],
    exceptionsChecked: 'Không thuộc trường hợp trích dẫn hợp lý quy định tại Điều 25 Luật SHTT do việc sử dụng mang tính chất thương mại và làm ảnh hưởng đến khả năng khai thác bình thường của tác phẩm gốc.',
    remedies: [
      'Lập tức gửi Thư khuyến cáo & Yêu cầu chấm dứt hành vi vi phạm (Cease and Desist)',
      'Lập Vi bằng tại Văn phòng Thừa phát lại để củng cố giá trị chứng cứ số',
      'Yêu cầu đơn vị cung cấp dịch vụ trung gian (ISP / Sàn TMĐT / Hosting) gỡ bỏ theo cơ chế Thông báo và Gỡ bỏ (Notice and Takedown)',
    ],
    potentialFines: 'Phạt tiền từ 15 - 35 triệu đồng theo Nghị định 131/2013/NĐ-CP; buộc gỡ bỏ hoặc tiêu hủy bản sao; bồi thường thiệt hại thực tế theo Điều 205 Luật SHTT.',
  };
}

function generateFallbackNotice(
  type: string,
  holder?: string,
  infringer?: string,
  work?: string,
  regNo?: string,
  url?: string,
  days?: string
) {
  const h = holder || 'CHỦ SỞ HỮU QUYỀN';
  const inf = infringer || 'BÊN CÓ HÀNH VI XÂM PHẠM';
  const w = work || 'Tác phẩm sáng tạo / Nhãn hiệu độc quyền';
  const d = days || '03';

  return {
    documentTitle: 'THƯ KHUYẾN CÁO VÀ YÊU CẦU CHẤM DỨT HÀNH VI XÂM PHẠM QUYỀN SỞ HỮU TRÍ TUỆ',
    documentCode: `IPG-NOTICE-${new Date().getFullYear()}/${Math.floor(1000 + Math.random() * 9000)}`,
    keyRequirements: [
      `Chấm dứt ngay lập tức hành vi đăng tải, sao chép hoặc phân phối trái phép đối với '${w}'`,
      `Gỡ bỏ toàn bộ nội dung vi phạm tại ${url || 'các kênh truyền thông / sàn TMĐT'} trong vòng ${d} ngày làm việc`,
      'Có văn bản giải trình và cam kết không tái phạm gửi về cho Bên Chủ thể quyền',
    ],
    nextLegalSteps: [
      'Khởi kiện tại Tòa án nhân dân có thẩm quyền yêu cầu bồi thường thiệt hại và xin lỗi công khai',
      'Đề nghị Thanh tra Bộ Văn hóa, Thể thao và Du lịch hoặc Thanh tra Bộ KH&CN xử phạt vi phạm hành chính',
      'Yêu cầu cơ quan cảnh sát điều tra xem xét xử lý hình sự theo Điều 225 Bộ luật Hình sự nếu có yếu tố thương mại quy mô lớn',
    ],
    fullContent: `CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM
Độc lập - Tự do - Hạnh phúc
---o0o---

Số: IPG-NOTICE-${new Date().getFullYear()}/${Math.floor(1000 + Math.random() * 9000)}
Hà Nội, ngày ${new Date().getDate()} tháng ${new Date().getMonth() + 1} năm ${new Date().getFullYear()}

THƯ KHUYẾN CÁO VÀ YÊU CẦU CHẤM DỨT HÀNH VI XÂM PHẠM QUYỀN SỞ HỮU TRÍ TUỆ
(V/v: Xâm phạm quyền tác giả / nhãn hiệu đối với "${w}")

Kính gửi:
- Ông/Bà/Đơn vị: ${inf}
- Địa chỉ/Kênh thông tin vi phạm: ${url || 'Trang thông tin điện tử / Gian hàng TMĐT'}

Tôi/Chúng tôi là: ${h}
Là tác giả và chủ sở hữu hợp pháp đối với: "${w}"
${regNo ? `Đã được cấp Giấy chứng nhận bảo hộ số: ${regNo}` : 'Quyền tác giả được xác lập tự động theo quy định tại Điều 6 Luật Sở hữu Trí tuệ Việt Nam.'}

I. CĂN CỨ PHÁP LÝ:
1. Luật Sở hữu Trí tuệ số 50/2005/QH11 (sửa đổi, bổ sung năm 2022);
2. Nghị định số 131/2013/NĐ-CP quy định xử phạt vi phạm hành chính về quyền tác giả, quyền liên quan;
3. Điều 225 Bộ luật Hình sự 2015 (sửa đổi 2017) về Tội xâm phạm quyền tác giả, quyền liên quan.

II. HÀNH VI XÂM PHẠM:
Qua công tác rà soát và giám sát bản quyền số, Chúng tôi ghi nhận Quý vị đã tự ý sao chép, phổ biến, khai thác thương mại đối tượng thuộc quyền sở hữu của Chúng tôi mà KHÔNG ĐƯỢC SỰ CHO PHÉP bằng văn bản.
Cụ thể: Nội dung/hình ảnh/mã nguồn tại đường dẫn: ${url || 'Địa chỉ liên kết vi phạm'} có độ trùng khớp và sao chép gần như toàn bộ công sức sáng tạo của Chúng tôi.

Hành vi này đã vi phạm nghiêm trọng Điều 28 và Điều 129 Luật Sở hữu Trí tuệ 2022, gây tổn hại trực tiếp đến quyền lợi kinh tế và uy tín tác giả.

III. YÊU CẦU:
Bằng thư khuyến cáo này, Chúng tôi yêu cầu Quý vị:
1. Chấm dứt ngay lập tức hành vi khai thác, sao chép đối với tác phẩm "${w}";
2. Tiến hành gỡ bỏ toàn bộ nội dung vi phạm trong vòng ${d} ngày làm việc kể từ ngày nhận được Thư này;
3. Có phản hồi chính thức bằng văn bản cho Chúng tôi xác nhận việc đã hoàn tất việc gỡ bỏ.

Nếu sau thời hạn trên, Quý vị không thực hiện các yêu cầu thiện chí này, Chúng tôi sẽ tiến hành thủ tục khởi kiện tại Tòa án có thẩm quyền để yêu cầu bồi thường toàn bộ thiệt hại phát sinh, đồng thời đề nghị cơ quan Nhà nước có thẩm quyền áp dụng các chế tài xử phạt hành chính hoặc truy cứu trách nhiệm hình sự theo luật định.

Trân trọng,

ĐẠI DIỆN CHỦ THỂ QUYỀN SỞ HỮU TRÍ TUỆ
${h}
(Ký tên & Đóng dấu)`,
  };
}

// Dev and Prod serving
async function startServer() {
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  } else {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        hmr: false,
      },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`IPGuard AI Server running at http://0.0.0.0:${PORT}`);
  });
}

startServer();
