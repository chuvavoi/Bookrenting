export type Book = {
  id: string;
  title: string;
  author: string;
  category: string;
  cover: string; // gradient class
  accent: string;
  rating: number;
  available: number;
  pages: number;
  year: number;
  description: string;
  excerpt: string;
  preface: string; // Free content - Lời mở đầu
  tableOfContents: string; // Free content - Mục lục
  fullContent: string; // Paid content - Nội dung đầy đủ
};

export const categories = [
  "Tất cả",
  "Văn học",
  "Tiểu thuyết",
  "Lịch sử",
  "Khoa học",
  "Thiếu nhi",
  "Kỹ năng",
];

export const books: Book[] = [
  {
    id: "1",
    title: "Đắc Nhân Tâm",
    author: "Dale Carnegie",
    category: "Kỹ năng",
    cover: "from-amber-700 to-amber-900",
    accent: "oklch(0.55 0.16 50)",
    rating: 4.8,
    available: 5,
    pages: 320,
    year: 1936,
    description:
      "Cuốn sách kinh điển về nghệ thuật ứng xử, giao tiếp và xây dựng mối quan hệ.",
    excerpt:
      "Bất kỳ ai cũng có thể chỉ trích, oán trách và than phiền — và phần lớn những kẻ ngu xuẩn đều làm thế. Nhưng phải là người biết tự chủ và có một tâm hồn cao thượng mới có thể hiểu và biết tha thứ...",
    preface:
      "Lời mở đầu: Cuốn sách này dựa trên ba mươi năm kinh nghiệm giảng dạy về mối quan hệ con người. Tác giả Dale Carnegie đã từng là diễn giả, tác gia, và huấn luyện viên. Ông tin rằng giáo dục hữu ích nhất là học cách sống với người khác một cách hạnh phúc và hiệu quả.",
    tableOfContents:
      "Mục lục:\n1. Những nguyên lý cơ bản\n2. Sáu cách để làm cho mọi người thích bạn\n3. Cách thuyết phục mọi người\n4. Làm thế nào để là một người dẫn dắt\n5. Chín cách để thay đổi mọi người mà không làm tổn thương họ hoặc tạo thù ghét",
    fullContent:
      "PHẦN I: NHỮNG NGUYÊN LÝ CƠ BẢN\n\nChương 1: Bí mật cơ bản để thành công trong các mối quan hệ\n\nBất kỳ ai cũng có thể chỉ trích, oán trách và than phiền — và phần lớn những kẻ ngu xuẩn đều làm thế. Nhưng phải là người biết tự chủ và có một tâm hồn cao thượng mới có thể hiểu và biết tha thứ.\n\nTôi bắt đầu nhận thức ra rằng những bình luận chỉ trích rất ít có giá trị. Tôi cũng nhận ra rằng mỗi người tôi gặp đều cảm thấy vượt trội hơn tôi ở một số điểm. Đó là cơ sở của một nguyên lý cơ bản: HÃY TÔN TRỌNG NHỮNG ĐIỂM KHÁC BIỆT CỦA NGƯỜI KHÁC.\n\nNhư một kết quả của việc hiểu rõ hơn về tâm lý con người, tôi đã phát triển một số nguyên lý giúp tôi trở nên một người bạn tốt hơn, một cha cha tốt hơn, một nhân viên tốt hơn. Các nguyên lý này đã thay đổi cuộc đời của hàng triệu người.\n\nNguyên lý 1: Đừng chỉ trích, oán trách hay than phiền. Vì thế sẽ không mang lại kết quả mà chỉ làm cho mọi người cảm thấy xúc phạm và phòng vệ.\n\nKhi chúng ta chỉ trích, điều tệ nhất là gì? Nó khiến người đó cảm thấy tệ hơn và khiến anh ta muốn trả thù. Nhưng khi chúng ta khen ngợi? Người đó cảm thấy tốt hơn. Họ muốn lặp lại những hành động tốt. Đây là bí mật để thay đổi mọi người mà không tạo thù ghét.",
  },
  {
    id: "2",
    title: "Số Đỏ",
    author: "Vũ Trọng Phụng",
    category: "Văn học",
    cover: "from-rose-700 to-rose-900",
    accent: "oklch(0.5 0.18 25)",
    rating: 4.7,
    available: 3,
    preface:
      "Lời mở đầu: Tác phẩm 'Số Đỏ' được viết vào năm 1936, trong thời kỳ Việt Nam đang chịu sự thống trị của Pháp. Vũ Trọng Phụng là một trong những tác giả nổi bật nhất của văn học hiện đại Việt Nam.",
    tableOfContents:
      "Mục lục:\nPhần I: Xuân - Kẻ vô học\nPhần II: Sự nổi tiếng bất ngờ\nPhần III: Rơi từ đỉnh cao\nPhần IV: Cái kết đầy châm biếm",
    fullContent:
      "SỐ ĐỎ\n\nPhần I: XUÂN - KẺ VÔ HỌC\n\nXuân tóc đỏ — một kẻ vô học bỗng chốc trở thành người nổi tiếng nhờ những trò may rủi của thời cuộc. Câu chuyện phơi bày sự lố lăng của xã hội thượng lưu.\n\nXuân sinh ra trong một gia đình bình dân. Ông ta không bao giờ học hành, không có tài năng gì đặc biệt. Nhưng lại có cái vận may kỳ diệu: một ngày nọ, ông ta trúng xổ số. Số tiền khổng lồ ấy thay đổi cả cuộc đời.\n\nVới tiền bạc, Xuân mua được mọi thứ. Ông ta mua được bạn bè, ông ta mua được vợ, ông ta mua được địa vị xã hội. Những người giàu có, những nhân vật sáng giá ở Hà Nội bây giờ đều chú ý đến ông.\n\nNhưng Xuân không hiểu rằng: tất cả những thứ mua được bằng tiền đều có ngày bị mất. Sự thực tế ấy sẽ dạy cho Xuân một bài học đắng cay.",
    pages: 268,
    year: 1936,
    description:
      "Tiểu thuyết trào phúng về xã hội Việt Nam thời thực dân nửa phong kiến.",
    excerpt:
      "Xuân tóc đỏ — một kẻ vô học bỗng chốc trở thành người nổi tiếng nhờ những trò may rủi của thời cuộc. Câu chuyện phơi bày sự lố lăng của xã hội thượng lưu...",
  },
  {
    id: "3",
    title: "Sapiens",
    preface:
      "Lời mở đầu: Sapiens là một cuốn sách lịch sử tham vọng và thú vị, từ sự ra đời của Homo sapiens cho đến thế giới hiện đại. Yuval Noah Harari là một nhà sử học, triết gia và tác giả bestseller.",
    tableOfContents:
      "Mục lục:\nPhần I: Cuộc cách mạng nhân tư (Cognitive Revolution)\nPhần II: Cuộc cách mạng nông nghiệp (Agricultural Revolution)\nPhần III: Sự thống nhất nhân loại\nPhần IV: Cuộc cách mạng khoa học\nPhần V: Kỷ nguyên hiện đại",
    fullContent:
      "SAPIENS: LƯỢC SỬ LOÀI NGƯỜI\n\nPhần I: CUỘC CÁCH MẠNG NHÂN TƯ\n\nChương 1: Vật loài lạ lùng\n\n100.000 năm trước, có ít nhất sáu loài người sinh sống trên Trái Đất. Hôm nay chỉ còn lại một. Chúng ta. Homo sapiens. Làm thế nào loài chúng ta thống trị hành tinh?\n\nCác nhà khoa học phân loại loài người vào chi Homo. Các loài khác trong chi này đều đã tuyệt chủng. Chúng được gọi là các loài người tuyệt chủng. Homo sapiens là loài duy nhất sống sót.\n\nNhưng Homo sapiens không phải lúc nào cũng là loài chiếm ưu thế. Trong phần lớn lịch sử của chúng ta, Homo sapiens chỉ là một trong nhiều loài người.\n\nCuộc cách mạng nhân tư xảy ra khoảng 70.000 năm trước. Đó là lúc mà nhận thức con người thay đổi một cách toàn bộ. Homo sapiens bắt đầu có khả năng sáng tạo, tưởng tượng, và tin tưởng vào những thứ không thực tế.",
    author: "Yuval Noah Harari",
    category: "Lịch sử",
    cover: "from-stone-700 to-stone-900",
    accent: "oklch(0.4 0.04 60)",
    rating: 4.9,
    available: 2,
    pages: 512,
    year: 2011,
    description:
      "Lược sử loài người — hành trình từ thời kỳ đồ đá đến kỷ nguyên công nghệ.",
    excerpt:
      "100.000 năm trước, có ít nhất sáu loài người sinh sống trên Trái Đất. Hôm nay chỉ còn lại một. Chúng ta. Homo sapiens. Làm thế nào loài chúng ta thống trị hành tinh?",
  },
  {
    id: "4",
    title: "Nhà Giả Kim",
    author: "Paulo Coelho",
    category: "Tiểu thuyết",
    cover: "from-yellow-600 to-orange-800",
    accent: "oklch(0.62 0.18 60)",
    rating: 4.6,
    available: 7,
    pages: 224,
    year: 1988,
    description:
      "Câu chuyện về Santiago — chàng chăn cừu đi tìm kho báu và khám phá bản thân.",
    excerpt:
      "Khi bạn thực sự khao khát một điều gì đó, cả vũ trụ sẽ hợp lực giúp bạn đạt được điều đó. Đây là chân lý lớn nhất trên Trái Đất...",
    preface:
      "Lời mở đầu: Nhà Giả Kim là một cuốn sách về việc tìm tòi các đam mê của cuộc đời. Tác giả Paulo Coelho, thông qua nhân vật chính Santiago, truyền tải thông điệp rằng mỗi người đều có một 'Tiền Chỉ Định' của riêng mình.",
    tableOfContents:
      "Mục lục:\nPhần I: Phòng khách trong ký túc xá\nPhần II: Người may mắn ở Tangier\nPhần III: Cuộc hành trình sa mạc\nPhần IV: Những bài học từ sa mạc\nPhần V: Kho báu ở Ai Cập",
    fullContent:
      "NHÀ GIẢ KIM\n\nChương 1: Giấc mơ lặp lại\n\nChàng chăn cừu Santiago đã nằm mơ thấy cùng một giấc mơ hai lần. Trong giấc mơ, một cô bé đưa ông đến sa mạc và nói rằng nếu ông đào ở đó, ông sẽ tìm thấy một kho báu.\n\nSantiago quyết định tìm kiếm kho báu này. Ông rời bỏ bàn chế tác giả kim loại mà ông đang làm việc, bán lạc đà của ông, và bắt đầu hành trình sang Ai Cập.\n\nTrên con đường, Santiago gặp rất nhiều người. Mỗi người dạy cho ông một bài học. Ông học được rằng kho báu thực sự không phải là vàng bạc hay tài sản. Kho báu thực sự là sự tự khám phá và sự phát triển cá nhân.\n\nKhi bạn thực sự khao khát một điều gì đó, cả vũ trụ sẽ hợp lực giúp bạn đạt được điều đó. Đây là Tiền Chỉ Định của bạn, hay còn gọi là Mục Đích Sống của cuộc đời.",
  },
  {
    id: "5",
    title: "Vũ Trụ Trong Vỏ Hạt Dẻ",
    author: "Stephen Hawking",
    category: "Khoa học",
    cover: "from-indigo-800 to-slate-900",
    accent: "oklch(0.35 0.1 270)",
    rating: 4.7,
    available: 4,
    pages: 224,
    year: 2001,
    description:
      "Hành trình khám phá vũ trụ qua lăng kính vật lý lý thuyết hiện đại.",
    excerpt:
      "Ai đó đã từng nói rằng tôi đã đặt cả vũ trụ vào vỏ hạt dẻ. Có lẽ ý họ là khả năng tóm gọn những ý tưởng phức tạp về không-thời gian...",
    preface:
      "Lời mở đầu: Cuốn sách này là kết quả của bài giảng BBC Reith năm 2016. Trong đó, Stephen Hawking, một trong những nhà vật lý vĩ đại nhất của thế kỷ 20, giải thích các khái niệm phức tạp về vũ trụ.",
    tableOfContents:
      "Mục lục:\n1. Hình dạng của thời gian\n2. Lỗ đen và những vật thể khác\n3. Sự bắt đầu của thời gian\n4. Việc dự đoán tương lai\n5. Bảo vệ thông tin\n6. Tương lai của vũ trụ",
    fullContent:
      "VŨ TRỤ TRONG VỎ HẠT DẺ\n\nChương 1: Hình Dạng Của Thời Gian\n\nVũ trụ không phải là tĩnh tại. Nó đang giãn nở. Khi chúng ta nhìn lên bầu trời ban đêm, ánh sáng từ những ngôi sao xa xôi đó mất hàng triệu năm để đến tới chúng ta.\n\nThời gian không phải là thứ tuyệt đối. Thời gian là tương đối. Nó phụ thuộc vào tốc độ và trường hấp dẫn. Theo thuyết tương đối rộng của Einstein, thời gian có thể bị uốn cong bởi vật chất và năng lượng.\n\nNhững lỗ đen là những nơi mà trường hấp dẫn cực kỳ mạnh mẽ. Nếu bạn rơi vào một lỗ đen, thời gian sẽ chậm lại rất nhiều. Từ quan điểm của bạn, toàn bộ vũ trụ sẽ sống qua từng triệu năm trong một giây.",
  },
  {
    id: "6",
    title: "Dế Mèn Phiêu Lưu Ký",
    author: "Tô Hoài",
    category: "Thiếu nhi",
    cover: "from-emerald-700 to-emerald-900",
    accent: "oklch(0.45 0.12 160)",
    rating: 4.8,
    available: 6,
    preface:
      "Lời mở đầu: Dế Mèn Phiêu Lưu Ký là một trong những tác phẩm văn học thiếu nhi kinh điển của Việt Nam. Tác phẩm này dạy những bài học quý báu cho trẻ em về sự độc lập, can đảm và bền chí.",
    tableOfContents:
      "Mục lục:\nChương 1: Cuộc ra đi\nChương 2: Dế Mèn ở rừng\nChương 3: Gặp những bạn mới\nChương 4: Những thử thách\nChương 5: Quay về nhà",
    fullContent:
      "DẾ MÈN PHIÊU LƯU KÝ\n\nChương 1: Cuộc Ra Đi\n\nTôi sống độc lập từ thuở bé. Ấy là tục lệ lâu đời trong họ nhà dế chúng tôi. Vả lại, mẹ thường bảo chúng tôi rằng: phải như thế để các con biết kiếm ăn một mình, phải như thế để các con biết tự bảo vệ mình.\n\nNhưng thế mà tôi vẫn sợ. Sợ khi lần đầu tiên tôi rời xa nhà. Sợ khi tôi bước vào rừng sâu, không biết những gì đang chờ đợi tôi ở phía trước.\n\nCó hôm, tôi gặp một chú dế lớn. Chú ấy tên là Dế Mèn. Chú Dế Mèn rất can đảm. Chú ấy không sợ gì cả. Chú ấy nói với tôi rằng: 'Sợ sệt là thứ không bao giờ giúp ích gì cho chúng ta. Chúng ta phải dũng cảm đối mặt với cuộc sống.'",
    pages: 180,
    year: 1941,
    description:
      "Cuộc phiêu lưu thú vị của chú Dế Mèn qua những vùng đất mới lạ.",
    excerpt:
      "Tôi sống độc lập từ thuở bé. Ấy là tục lệ lâu đời trong họ nhà dế chúng tôi. Vả lại, mẹ thường bảo chúng tôi rằng: phải như thế để các con biết kiếm ăn một mình...",
  },
  {
    id: "7",
    title: "Tuổi Trẻ Đáng Giá Bao Nhiêu",
    author: "Rosie Nguyễn",
    category: "Kỹ năng",
    cover: "from-pink-600 to-rose-800",
    accent: "oklch(0.55 0.2 15)",
    rating: 4.5,
    available: 8,
    pages: 290,
    year: 2016,
    description: "Cẩm nang truyền cảm hứng cho người trẻ trên hành trình tự khám phá.",
    excerpt:
      "Tuổi trẻ là khoảng thời gian đẹp nhất và cũng dễ tổn thương nhất. Hãy sống sao cho khi nhìn lại, bạn không phải hối tiếc vì những điều mình đã không làm...",
    preface:
      "Lời mở đầu: Cuốn sách này dành cho những bạn trẻ đang tìm kiếm ý nghĩa trong cuộc sống. Rosie Nguyễn, qua các trải nghiệm thực tế của mình, chia sẻ những bài học quý báu.",
    tableOfContents:
      "Mục lục:\nPhần 1: Khám phá bản thân\nPhần 2: Xây dựng đam mê\nPhần 3: Vượt qua thất bại\nPhần 4: Xây dựng mối quan hệ\nPhần 5: Hành động ngay hôm nay",
    fullContent:
      "TUỔI TRẺ ĐÁNG GIÁ BAO NHIÊU\n\nMục đích của cuốn sách này là giúp bạn nhận ra rằng tuổi trẻ của bạn là tài sản quý báu nhất. Nó không phải là về thành công hay tiền bạc, mà là về việc sống một cuộc đời đầy ý nghĩa.\n\nKhi tôi còn trẻ, tôi thường được hỏi: 'Bạn muốn trở thành gì khi lớn lên?' Tôi không biết trả lời. Tôi cảm thấy bị áp lực phải có một kế hoạch hoàn hảo cho tương lai.\n\nNhưng sau này tôi nhận ra rằng: cuộc sống không bao giờ theo kế hoạch. Điều quan trọng là chúng ta phải linh hoạt, sẵn sàng thay đổi, và luôn tìm kiếm những gì làm con tim chúng ta đập nhanh.",
  },
  {
    id: "8",
    title: "1984",
    author: "George Orwell",
    category: "Tiểu thuyết",
    cover: "from-zinc-700 to-zinc-900",
    accent: "oklch(0.3 0.02 250)",
    rating: 4.8,
    available: 1,
    pages: 368,
    year: 1949,
    description: "Tác phẩm dystopia kinh điển về một xã hội bị giám sát toàn trị.",
    excerpt:
      "Đó là một ngày tháng Tư lạnh giá và trong sáng, đồng hồ điểm mười ba giờ. Winston Smith, cằm rụt vào ngực để tránh gió rét, lướt nhanh qua cánh cửa kính...",
    preface:
      "Lời mở đầu: 1984 là một trong những cuốn sách chính trị ấn tượng nhất của thế kỷ 20. Tác giả George Orwell cảnh báo về nguy hiểm của toàn trị chủ nghĩa và kiểm soát tư tưởng.",
    tableOfContents:
      "Mục lục:\nPhần I: Mục tiêu của chiến tranh\nPhần II: Tình yêu chiến thắng\nPhần III: Sự thật chiến thắng",
    fullContent:
      "1984\n\nPhần I: Mục Tiêu Của Chiến Tranh\n\nĐó là một ngày tháng Tư lạnh giá và trong sáng, đồng hồ điểm mười ba giờ. Winston Smith, cằm rụt vào ngực để tránh gió rét, lướt nhanh qua cánh cửa kính ra vào một tòa nhà nào đó, nhưng không quá nhanh để những chiếc máy quay phim trên các góc phố không thể ghi lại mặt anh ta.\n\nRất khó mà nói được rằng từ ngoài nhìn vào, bức tranh toàn cảnh của Oceania là gì. Có ba quyền lực lớn trên thế giới: Oceania, Eurasia, và Eastasia. Chúng luôn luôn đang chiến tranh với nhau. Khi một cục được chiếm giữ từ cục này sang cục khác, những tờ báo cũ được tiêu hủy và những tờ báo mới được tạo ra, nói rằng những đất đó chưa bao giờ bị chiếm giữ.",
  },
];

export const getBookById = (id: string) => books.find((b) => b.id === id);
