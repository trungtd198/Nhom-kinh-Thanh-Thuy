import { existsSync, readdirSync } from 'fs';
import path from 'path';

import type { CategoryId } from '@/data/categories';

const PUBLIC_ASSET_PREFIX = '/assets/images/';
const PUBLIC_IMAGE_DIRECTORY = path.join(
  process.cwd(),
  'public',
  'assets',
  'images',
);
const IMAGE_EXTENSIONS = new Set([
  '.avif',
  '.gif',
  '.jpeg',
  '.jpg',
  '.png',
  '.webp',
]);

export type Product = {
  slug: string;
  name: string;
  heroTitle: string;
  subtitle: string;
  categoryId: CategoryId;
  category: string;
  excerpt: string;
  description: string;
  image: string;
  overview: {
    description: string;
    value: string;
    targetUsers: string;
    reasons: string[];
  };
  models: { name: string; type: string; image: string }[];
  highlights: string[];
  advantages: string[];
  specs: { label: string; value: string }[];
  technicalSpecs: {
    material: string;
    thickness: string;
    glass: string;
    accessories: string;
    colors: string;
    sizes: string;
  };
  applications: string[];
  pricing: { type: string; price: string }[];
  priceNote: string;
  faqs: { question: string; answer: string }[];
};

export const createModelSlug = (name: string) =>
  name
    .toLowerCase()
    .replace(/đ/g, 'd')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

const commonFaqs = (productName: string) => [
  {
    question: `${productName} có bảo hành không?`,
    answer:
      'Có. Sản phẩm được bảo hành theo từng cấu hình vật tư, phụ kiện và điều kiện sử dụng thực tế. Thông tin bảo hành được ghi rõ khi báo giá.',
  },
  {
    question: 'Thời gian thi công mất bao lâu?',
    answer:
      'Thông thường từ 3 đến 15 ngày tùy số lượng, mẫu mã, màu sắc và mức độ phức tạp của công trình.',
  },
  {
    question: 'Có khảo sát tận nơi không?',
    answer:
      'Có. Đội kỹ thuật hỗ trợ khảo sát, đo đạc hiện trạng và tư vấn phương án phù hợp trước khi chốt báo giá.',
  },
];

const sortByImageName = (items: string[]) =>
  [...items].sort((first, second) =>
    first.localeCompare(second, 'vi', {
      numeric: true,
      sensitivity: 'base',
    }),
  );

export const getProductModelImages = (modelImage: string) => {
  if (!modelImage.startsWith(PUBLIC_ASSET_PREFIX)) {
    return [modelImage];
  }

  const directoryUrl = modelImage.slice(0, modelImage.lastIndexOf('/'));
  const relativeDirectory = directoryUrl.replace(PUBLIC_ASSET_PREFIX, '');
  const directoryPath = path.join(
    PUBLIC_IMAGE_DIRECTORY,
    ...relativeDirectory.split('/'),
  );

  if (!existsSync(directoryPath)) {
    return [modelImage];
  }

  const images = sortByImageName(
    readdirSync(directoryPath, { withFileTypes: true })
      .filter(
        (entry) =>
          entry.isFile() &&
          IMAGE_EXTENSIONS.has(path.extname(entry.name).toLowerCase()),
      )
      .map((entry) => `${directoryUrl}/${entry.name}`),
  );

  return images.length > 0 ? images : [modelImage];
};

export const products: Product[] = [
  {
    slug: 'cua-nhom',
    name: 'Cửa nhôm',
    heroTitle: 'Cửa nhôm cao cấp',
    subtitle: 'Bền đẹp - cách âm - cách nhiệt - thẩm mỹ hiện đại',
    categoryId: 'cua-nhom',
    category: 'Cửa nhôm kính',
    excerpt:
      'Cửa nhôm cho nhà ở, cửa hàng, văn phòng và công trình dân dụng với nhiều hệ nhôm, màu sắc và kiểu mở.',
    description:
      'Cửa nhôm được tư vấn theo kích thước thực tế, hướng nắng gió và nhu cầu sử dụng. Sản phẩm phù hợp cho cửa đi, cửa sổ, cửa ban công, cửa lùa và các hạng mục nhôm kính đồng bộ.',
    image: '/assets/images/cua-nhom/cua-mo-quay/cua-nhom-1.jpeg',
    overview: {
      description:
        'Cửa nhôm là giải pháp cửa hiện đại cho công trình dân dụng và thương mại, kết hợp thanh nhôm định hình, kính an toàn và phụ kiện đồng bộ để tạo độ kín khít, bền chắc và thẩm mỹ.',
      value:
        'Sản phẩm giúp tối ưu ánh sáng, tăng độ thoáng, giảm tiếng ồn và nâng cấp diện mạo mặt tiền mà vẫn dễ vệ sinh, bảo trì.',
      targetUsers:
        'Phù hợp nhà phố, biệt thự, căn hộ, showroom, văn phòng và các công trình cần cửa bền đẹp, vận hành ổn định.',
      reasons: [
        'Tư vấn hệ nhôm theo đúng khẩu độ và vị trí lắp đặt',
        'Báo giá rõ vật tư, kính, phụ kiện và phương án thi công',
        'Đo đạc sản xuất theo kích thước thực tế của từng công trình',
      ],
    },
    models: [
      {
        name: 'Cửa nhôm mở quay',
        type: 'Cửa đi, cửa thông phòng',
        image: '/assets/images/cua-nhom/cua-mo-quay/cua-nhom-1.jpeg',
      },
      {
        name: 'Cửa nhôm mở lùa',
        type: 'Ban công, mặt tiền, không gian hẹp',
        image: '/assets/images/cua-nhom/cua-nhom-mo-lua/cua-lua-1.jpeg',
      },
      {
        name: 'Cửa sổ nhôm kính',
        type: 'Mở quay, mở hất, mở trượt',
        image: '/assets/images/cua-nhom/cua-so-nhom-kinh/cua-so-1.jpeg',
      },
    ],
    highlights: [
      'Đa dạng hệ nhôm, kiểu mở quay, mở trượt, mở hất',
      'Kính cường lực, kính dán an toàn hoặc kính hộp',
      'Màu sơn phổ biến: trắng, đen, ghi, vân gỗ, champagne',
      'Phụ kiện đồng bộ, vận hành chắc chắn và dễ bảo trì',
    ],
    advantages: [
      'Cách âm tốt khi kết hợp kính và gioăng phù hợp',
      'Cách nhiệt tốt hơn cửa sắt hoặc kính đơn thông thường',
      'Chống nước nhờ ray thoát nước và xử lý silicon đúng kỹ thuật',
      'Độ bền cao, ít cong vênh, dễ vệ sinh',
      'Thẩm mỹ sang trọng, hợp kiến trúc hiện đại',
      'An toàn sử dụng với kính cường lực hoặc kính dán',
    ],
    specs: [
      { label: 'Hệ cửa', value: 'Cửa đi, cửa sổ, cửa lùa, cửa hất' },
      { label: 'Vật liệu', value: 'Thanh nhôm hệ kết hợp kính an toàn' },
      { label: 'Kính', value: '8mm - 12mm hoặc theo thiết kế' },
      { label: 'Ứng dụng', value: 'Nhà phố, biệt thự, cửa hàng, văn phòng' },
    ],
    technicalSpecs: {
      material: 'Nhôm hệ sơn tĩnh điện hoặc anodize',
      thickness: '1.2mm - 2.0mm tùy hệ nhôm và vị trí lắp',
      glass: 'Kính cường lực, kính dán an toàn hoặc kính hộp',
      accessories: 'Bản lề, khóa, tay nắm, bánh xe, gioăng, ke góc đồng bộ',
      colors: 'Trắng, đen, ghi, vân gỗ, champagne hoặc màu theo bảng mẫu',
      sizes: 'Sản xuất theo kích thước khảo sát thực tế',
    },
    applications: ['Nhà phố', 'Biệt thự', 'Chung cư', 'Showroom', 'Văn phòng'],
    pricing: [
      {
        type: 'Cửa nhôm kính phổ thông',
        price: 'Liên hệ theo hệ nhôm và kính',
      },
      { type: 'Cửa nhôm hệ cao cấp', price: 'Báo giá theo cấu hình vật tư' },
      { type: 'Cửa nhôm kính hộp/cách âm', price: 'Báo giá sau khảo sát' },
    ],
    priceNote:
      'Giá thay đổi theo hệ nhôm, độ dày, loại kính, phụ kiện, màu sơn và số lượng thực tế.',
    faqs: commonFaqs('Cửa nhôm'),
  },
  {
    slug: 'cua-cuon',
    name: 'Cửa cuốn',
    heroTitle: 'Cửa cuốn an toàn',
    subtitle: 'Chắc chắn - tiết kiệm diện tích - vận hành tiện lợi',
    categoryId: 'cua-an-ninh',
    category: 'Cửa an ninh',
    excerpt:
      'Cửa cuốn khe thoáng và cửa cuốn tấm liền cho nhà ở, ki-ốt, gara và mặt bằng kinh doanh.',
    description:
      'Cửa cuốn giúp tối ưu an ninh và tiết kiệm diện tích cho mặt tiền. Hệ cửa được tư vấn theo khẩu độ, tần suất đóng mở và yêu cầu vận hành bằng motor hoặc kéo tay.',
    image: '/assets/images/cua-cuon/cua-cuon-khe-thoang/cua-khe-thoang-1.jpeg',
    overview: {
      description:
        'Cửa cuốn là lựa chọn phổ biến cho mặt tiền nhà phố, gara, cửa hàng và kho nhỏ nhờ khả năng đóng mở gọn, bảo vệ tốt và dễ tích hợp motor điều khiển từ xa.',
      value:
        'Sản phẩm giúp bảo vệ tài sản, tối ưu diện tích sử dụng và tăng sự tiện nghi khi ra vào hằng ngày.',
      targetUsers:
        'Phù hợp nhà phố kinh doanh, gara ô tô, ki-ốt, nhà kho, cửa hàng và các vị trí cần an ninh cao.',
      reasons: [
        'Tư vấn loại nan cửa theo khẩu độ và tần suất sử dụng',
        'Có phương án motor, lưu điện, remote và khóa an toàn',
        'Lắp đặt ray dẫn hướng, hộp kỹ thuật và kiểm tra vận hành trước bàn giao',
      ],
    },
    models: [
      {
        name: 'Cửa cuốn khe thoáng',
        type: 'Mặt tiền nhà phố, cửa hàng',
        image:
          '/assets/images/cua-cuon/cua-cuon-khe-thoang/cua-khe-thoang-1.jpeg',
      },
      {
        name: 'Cửa cuốn tấm liền',
        type: 'Gara, kho nhỏ, công trình dân dụng',
        image: '/assets/images/cua-cuon/cua-cuon-tam-lien/cua-tam-lien-1.jpg',
      },
    ],
    highlights: [
      'Có lựa chọn khe thoáng, tấm liền hoặc nan nhôm cao cấp',
      'Motor, lưu điện, remote và khóa an toàn tùy cấu hình',
      'Thi công phù hợp gara, ki-ốt, cửa hàng và nhà phố',
      'Hỗ trợ bảo trì, cân chỉnh và thay thế phụ kiện',
    ],
    advantages: [
      'Tăng an ninh cho mặt tiền và khu vực để xe',
      'Tiết kiệm diện tích nhờ cơ chế cuốn lên trục',
      'Vận hành tiện lợi với motor và remote',
      'Đa dạng mẫu nan, màu sắc và độ thoáng',
      'Có thể tích hợp lưu điện khi mất điện',
      'Dễ bảo trì, thay thế linh kiện khi cần',
    ],
    specs: [
      { label: 'Loại cửa', value: 'Khe thoáng, tấm liền, nan nhôm' },
      { label: 'Vận hành', value: 'Motor, remote, lưu điện hoặc kéo tay' },
      { label: 'Màu sắc', value: 'Ghi, kem, cà phê, vân gỗ tùy mẫu' },
      { label: 'Ứng dụng', value: 'Gara, cửa hàng, nhà phố, kho nhỏ' },
    ],
    technicalSpecs: {
      material: 'Nan nhôm, thép hoặc tấm liền theo mẫu',
      thickness: 'Theo từng dòng nan và khẩu độ cửa',
      glass: 'Không áp dụng kính; có thể phối ô thoáng theo mẫu cửa',
      accessories: 'Motor, trục cuốn, ray dẫn hướng, remote, lưu điện, khóa',
      colors: 'Ghi, kem, cà phê, vân gỗ hoặc màu theo catalogue',
      sizes: 'Gia công theo chiều rộng, chiều cao và hộp kỹ thuật thực tế',
    },
    applications: ['Nhà phố', 'Gara', 'Cửa hàng', 'Showroom', 'Kho nhỏ'],
    pricing: [
      { type: 'Cửa cuốn tấm liền', price: 'Liên hệ theo kích thước' },
      { type: 'Cửa cuốn khe thoáng', price: 'Báo giá theo dòng nan' },
      { type: 'Motor, lưu điện, remote', price: 'Báo giá theo thương hiệu' },
    ],
    priceNote:
      'Giá phụ thuộc dòng nan, motor, bộ lưu điện, khẩu độ cửa, vị trí lắp đặt và yêu cầu hoàn thiện.',
    faqs: commonFaqs('Cửa cuốn'),
  },
  {
    slug: 'cua-thep-van-go',
    name: 'Cửa thép vân gỗ',
    heroTitle: 'Cửa thép vân gỗ',
    subtitle: 'An toàn - sang trọng - bền màu - chống cong vênh',
    categoryId: 'cua-thep',
    category: 'Cửa thép',
    excerpt:
      'Cửa thép vân gỗ cho cửa chính, cửa thông phòng và cửa căn hộ, kết hợp độ bền kim loại với bề mặt giả gỗ sang trọng.',
    description:
      'Cửa thép vân gỗ là lựa chọn bền chắc, ổn định và dễ vệ sinh cho nhà ở. Sản phẩm phù hợp với công trình cần tính an ninh, thẩm mỹ gỗ và chi phí hợp lý.',
    image: '/assets/images/cua-van-go/cua-mot-canh/cua-mot-canh-1.jpg',
    overview: {
      description:
        'Cửa thép vân gỗ sử dụng kết cấu thép sơn tĩnh điện kết hợp bề mặt vân gỗ, mang lại cảm giác ấm áp của gỗ nhưng ổn định và bền hơn trong quá trình sử dụng.',
      value:
        'Sản phẩm tăng khả năng bảo vệ, giảm rủi ro cong vênh, hạn chế mối mọt và giữ được vẻ sang trọng cho cửa chính hoặc cửa phòng.',
      targetUsers:
        'Phù hợp nhà phố, căn hộ, biệt thự, văn phòng và công trình cần cửa chắc chắn, mẫu mã đẹp.',
      reasons: [
        'Nhiều mẫu pano, ô kính và màu vân gỗ',
        'Kết cấu chắc chắn, phù hợp cửa chính và cửa phòng',
        'Tư vấn đồng bộ kích thước, khuôn, nẹp và phụ kiện khóa',
      ],
    },
    models: [
      {
        name: 'Cửa thép 1 cánh',
        type: 'Cửa phòng, cửa căn hộ',
        image: '/assets/images/cua-van-go/cua-mot-canh/cua-mot-canh-1.jpg',
      },
      {
        name: 'Cửa thép 2 cánh',
        type: 'Cửa chính nhà phố',
        image: '/assets/images/cua-van-go/cua-hai-canh/cua-hai-canh-1.jpeg',
      },
      {
        name: 'Cửa thép ô kính',
        type: 'Tăng sáng, tạo điểm nhấn mặt tiền',
        image: '/assets/images/cua-van-go/cua-o-kinh/cua-o-kinh-1.jpg',
      },
      {
        name: 'Cửa sổ',
        type: 'Thông gió, lấy sáng',
        image: '/assets/images/cua-van-go/cua-so/cua-so-1.jpeg',
      },
    ],
    highlights: [
      'Khung và cánh thép sơn tĩnh điện vân gỗ',
      'Bề mặt chống cong vênh, hạn chế mối mọt so với gỗ tự nhiên',
      'Đa dạng mẫu pano, ô kính, màu vân gỗ',
      'Phù hợp cửa chính, cửa phòng, cửa căn hộ',
    ],
    advantages: [
      'Độ bền cao, kết cấu chắc chắn',
      'Thẩm mỹ giống gỗ, phù hợp nhiều phong cách nhà',
      'Hạn chế cong vênh và mối mọt',
      'Dễ vệ sinh, bảo trì đơn giản',
      'An toàn hơn cho cửa chính và cửa căn hộ',
      'Chi phí hợp lý so với nhiều dòng gỗ tự nhiên',
    ],
    specs: [
      { label: 'Vật liệu', value: 'Thép mạ điện sơn tĩnh điện vân gỗ' },
      { label: 'Kiểu cửa', value: '1 cánh, 2 cánh, pano hoặc ô kính' },
      { label: 'Phụ kiện', value: 'Khóa, bản lề, gioăng giảm chấn' },
      { label: 'Ứng dụng', value: 'Nhà phố, căn hộ, văn phòng, biệt thự' },
    ],
    technicalSpecs: {
      material: 'Thép mạ điện, bề mặt sơn tĩnh điện vân gỗ',
      thickness: 'Theo tiêu chuẩn từng dòng cửa và vị trí sử dụng',
      glass: 'Có thể phối ô kính cường lực hoặc kính trang trí theo mẫu',
      accessories: 'Khuôn, nẹp, khóa, bản lề, gioăng giảm chấn',
      colors: 'Nhiều màu vân gỗ, nâu, óc chó, lim, ghi hoặc theo mẫu',
      sizes: 'Theo kích thước ô chờ và quy chuẩn sản xuất',
    },
    applications: ['Nhà phố', 'Biệt thự', 'Chung cư', 'Văn phòng', 'Căn hộ'],
    pricing: [
      {
        type: 'Cửa thép vân gỗ 1 cánh',
        price: 'Báo giá theo mẫu và kích thước',
      },
      { type: 'Cửa thép vân gỗ 2 cánh', price: 'Báo giá theo ô chờ thực tế' },
      { type: 'Phụ kiện khóa cao cấp', price: 'Tùy chọn theo nhu cầu' },
    ],
    priceNote:
      'Giá thay đổi theo mẫu pano, kích thước, màu vân gỗ, loại khóa, khuôn nẹp và vị trí lắp đặt.',
    faqs: commonFaqs('Cửa thép vân gỗ'),
  },
  {
    slug: 'lan-can-cau-thang-kinh',
    name: 'Lan can - cầu thang kính',
    heroTitle: 'Lan can - cầu thang kính',
    subtitle: 'Thông thoáng - an toàn - hiện đại - nâng tầm không gian',
    categoryId: 'kinh-lan-can',
    category: 'Kính an toàn',
    excerpt:
      'Lan can kính, cầu thang kính cho nhà phố, biệt thự và công trình thương mại cần không gian sáng, thoáng và hiện đại.',
    description:
      'Hạng mục lan can - cầu thang kính được xử lý theo tiêu chuẩn an toàn, dùng kính cường lực hoặc kính dán an toàn kết hợp trụ, pad kẹp, tay vịn hoặc hệ âm sàn.',
    image:
      '/assets/images/lan-can-cau-thang-kinh/lan-can-kinh-ban-cong/lan-can-1.jpeg',
    overview: {
      description:
        'Lan can và cầu thang kính giúp không gian rộng hơn về thị giác, giữ ánh sáng tự nhiên và tạo đường nét kiến trúc hiện đại cho nhà phố, biệt thự, showroom.',
      value:
        'Sản phẩm vừa đảm bảo an toàn vừa tăng tính thẩm mỹ, đặc biệt phù hợp công trình muốn tối giản chi tiết che chắn.',
      targetUsers:
        'Phù hợp nhà phố cao tầng, biệt thự, khách sạn, showroom, văn phòng và khu vực ban công, cầu thang, sân thượng.',
      reasons: [
        'Kính được đo cắt theo hiện trạng và mài cạnh an toàn',
        'Nhiều phương án trụ, pad kẹp, tay vịn hoặc âm sàn',
        'Tư vấn chiều cao, độ dày kính và phụ kiện theo vị trí lắp',
      ],
    },
    models: [
      {
        name: 'Lan can kính ban công',
        type: 'Ban công, sân thượng, hành lang',
        image:
          '/assets/images/lan-can-cau-thang-kinh/lan-can-kinh-ban-cong/lan-can-1.jpeg',
      },
      {
        name: 'Cầu thang kính tay vịn',
        type: 'Tay vịn inox, gỗ hoặc nhôm',
        image:
          '/assets/images/lan-can-cau-thang-kinh/cau-thang-kinh-tay-vin/cau-thang-1.jpeg',
      },
      {
        name: 'Lan can kính không trụ',
        type: 'Pad kẹp, âm sàn, tối giản',
        image:
          '/assets/images/lan-can-cau-thang-kinh/lan-can-kinh-khong-tru/lan-can-1.jpeg',
      },
    ],
    highlights: [
      'Kính cường lực hoặc kính dán an toàn',
      'Trụ inox, pad kẹp, tay vịn inox/gỗ hoặc hệ không tay vịn',
      'Cạnh kính mài bóng, đo đạc theo hiện trạng',
      'Thiết kế giúp không gian thoáng và tăng tính hiện đại',
    ],
    advantages: [
      'Không che tầm nhìn, tạo cảm giác rộng thoáng',
      'An toàn khi dùng kính và phụ kiện đúng tiêu chuẩn',
      'Thẩm mỹ sang trọng, hợp kiến trúc hiện đại',
      'Dễ lau chùi và bảo trì',
      'Chống nước tốt ở khu vực ban công, sân thượng',
      'Linh hoạt nhiều kiểu tay vịn và trụ đỡ',
    ],
    specs: [
      { label: 'Kính', value: '10mm - 12mm hoặc kính dán an toàn' },
      { label: 'Phụ kiện', value: 'Inox 304, pad kẹp, trụ cao, trụ lửng' },
      { label: 'Tay vịn', value: 'Inox, gỗ, nhôm hoặc không tay vịn' },
      {
        label: 'Ứng dụng',
        value: 'Cầu thang, ban công, sân thượng, hành lang',
      },
    ],
    technicalSpecs: {
      material: 'Kính cường lực hoặc kính dán an toàn',
      thickness: '10mm - 12mm hoặc theo thiết kế an toàn',
      glass: 'Kính cường lực trong, mờ, màu trà hoặc kính dán an toàn',
      accessories: 'Trụ inox 304, pad kẹp, bas âm sàn, tay vịn inox/gỗ/nhôm',
      colors: 'Kính trong, kính mờ, kính màu trà; phụ kiện inox bóng/mờ',
      sizes: 'Đo đạc theo chiều dài cầu thang, ban công và cao độ thực tế',
    },
    applications: ['Nhà phố', 'Biệt thự', 'Chung cư', 'Showroom', 'Văn phòng'],
    pricing: [
      { type: 'Lan can kính trụ inox', price: 'Báo giá theo mét dài' },
      { type: 'Cầu thang kính tay vịn', price: 'Báo giá theo cấu hình' },
      { type: 'Lan can kính âm sàn/pad kẹp', price: 'Báo giá sau khảo sát' },
    ],
    priceNote:
      'Giá thay đổi theo độ dày kính, loại phụ kiện, chiều dài, cao độ thi công và kiểu tay vịn.',
    faqs: commonFaqs('Lan can - cầu thang kính'),
  },
  {
    slug: 'cua-nhua-composite',
    name: 'Cửa nhựa composite',
    heroTitle: 'Cửa nhựa composite',
    subtitle: 'Chống ẩm - bền đẹp - nhẹ êm - phù hợp nội thất',
    categoryId: 'cua-noi-that',
    category: 'Cửa nội thất',
    excerpt:
      'Cửa nhựa composite cho phòng ngủ, nhà vệ sinh và không gian nội thất cần chống ẩm, dễ vệ sinh và chi phí hợp lý.',
    description:
      'Cửa nhựa composite có khả năng chống ẩm tốt, màu sắc đa dạng và phù hợp với nhiều phong cách nội thất. Đây là lựa chọn phổ biến cho nhà ở, căn hộ và công trình hoàn thiện số lượng lớn.',
    image: '/assets/images/cua-composite/cua-composite/cua-composite-1.webp',
    overview: {
      description:
        'Cửa nhựa composite sử dụng vật liệu nhựa gỗ, phù hợp cho không gian nội thất cần chống ẩm, ổn định và đồng bộ màu sắc.',
      value:
        'Sản phẩm giúp giảm chi phí hoàn thiện, lắp đặt nhanh, dễ vệ sinh và có nhiều mẫu vân gỗ phù hợp phòng ngủ, nhà vệ sinh.',
      targetUsers:
        'Phù hợp căn hộ, nhà phố, khách sạn, homestay, nhà trọ cao cấp và công trình cần lắp nhiều cửa nội thất.',
      reasons: [
        'Chống ẩm tốt cho khu vực nhà vệ sinh',
        'Mẫu mã đa dạng, dễ phối nội thất',
        'Khuôn, nẹp và khóa được tư vấn đồng bộ',
      ],
    },
    models: [
      {
        name: 'Cửa composite',
        type: 'Phòng ngủ, phòng làm việc',
        image:
          '/assets/images/cua-composite/cua-composite/cua-composite-1.webp',
      },
      {
        name: 'Cửa composite chỉ nổi',
        type: 'Nội thất hiện đại, căn hộ',
        image:
          '/assets/images/cua-composite/cua-composite-chi-noi/cua-chi-noi-1.jpeg',
      },
      {
        name: 'Cửa composite ô kính',
        type: 'Nhà vệ sinh, khu phụ trợ',
        image:
          '/assets/images/cua-composite/cua-composite-o-kinh/cua-o-kinh-1.png',
      },
    ],
    highlights: [
      'Chống ẩm tốt, phù hợp khu vực nhà vệ sinh',
      'Không cong vênh, hạn chế mối mọt',
      'Nhiều màu film, vân gỗ và mẫu chỉ trang trí',
      'Lắp đặt nhanh, dễ vệ sinh và bảo trì',
    ],
    advantages: [
      'Chống nước và chống ẩm tốt trong môi trường nội thất',
      'Không mối mọt, ít cong vênh',
      'Đóng mở nhẹ, êm và dễ sử dụng',
      'Thẩm mỹ đa dạng với nhiều màu vân gỗ',
      'Chi phí hợp lý cho công trình nhiều phòng',
      'Lắp đặt nhanh, ít ảnh hưởng sinh hoạt',
    ],
    specs: [
      { label: 'Vật liệu', value: 'Nhựa gỗ composite phủ film hoặc sơn' },
      { label: 'Kiểu cửa', value: 'Cửa phòng, cửa vệ sinh, cửa thông phòng' },
      { label: 'Phụ kiện', value: 'Khóa tay gạt, bản lề, nẹp khuôn đồng bộ' },
      { label: 'Ứng dụng', value: 'Căn hộ, nhà phố, khách sạn, homestay' },
    ],
    technicalSpecs: {
      material: 'Nhựa gỗ composite, bề mặt phủ film hoặc sơn',
      thickness: 'Theo mẫu cửa, khuôn và nẹp đồng bộ',
      glass: 'Có thể phối ô kính mờ hoặc kính trang trí theo mẫu',
      accessories: 'Khóa tay gạt, bản lề, khuôn, nẹp, gioăng giảm chấn',
      colors: 'Vân gỗ, trắng, ghi, kem hoặc màu theo bảng mẫu',
      sizes: 'Theo kích thước ô chờ cửa phòng và cửa vệ sinh',
    },
    applications: ['Nhà phố', 'Chung cư', 'Khách sạn', 'Homestay', 'Văn phòng'],
    pricing: [
      { type: 'Cửa composite cơ bản', price: 'Liên hệ theo mẫu và kích thước' },
      { type: 'Cửa composite chỉ nổi', price: 'Báo giá theo mẫu hoàn thiện' },
      { type: 'Phụ kiện khóa, khuôn, nẹp', price: 'Tùy chọn theo nhu cầu' },
    ],
    priceNote:
      'Giá thay đổi theo mẫu cánh, màu film, khuôn nẹp, khóa, số lượng và hiện trạng ô chờ.',
    faqs: commonFaqs('Cửa nhựa composite'),
  },
  {
    slug: 'cua-kinh-cuong-luc',
    name: 'Cửa kính cường lực',
    heroTitle: 'Cửa kính cường lực',
    subtitle: 'Sang trọng - sáng thoáng - an toàn - tối ưu mặt tiền',
    categoryId: 'cua-kinh',
    category: 'Cửa kính',
    excerpt:
      'Cửa kính cường lực cho showroom, văn phòng, cửa hàng và nhà ở cần không gian mở, sáng và sang trọng.',
    description:
      'Cửa kính cường lực dùng kính an toàn kết hợp phụ kiện inox, bản lề sàn, kẹp kính hoặc hệ lùa để tạo mặt tiền thoáng và hiện đại cho công trình.',
    image:
      '/assets/images/cua-kinh-cuong-luc/cua-ban-le-san/cua-ban-le-san-1.jpeg',
    overview: {
      description:
        'Cửa kính cường lực tạo mặt tiền rộng sáng, tăng khả năng trưng bày và giữ vẻ hiện đại cho showroom, văn phòng, cửa hàng và nhà ở.',
      value:
        'Sản phẩm giúp không gian sáng hơn, dễ quan sát, tối ưu nhận diện thương hiệu và tạo trải nghiệm ra vào chuyên nghiệp.',
      targetUsers:
        'Phù hợp showroom, văn phòng, spa, nhà hàng, cửa hàng, nhà phố và các khu vực cần cửa kính lớn.',
      reasons: [
        'Tư vấn độ dày kính theo kích thước cánh và tần suất sử dụng',
        'Phụ kiện inox, bản lề sàn, kẹp kính được chọn theo tải trọng',
        'Có thể kết hợp decal mờ, logo hoặc film nhận diện thương hiệu',
      ],
    },
    models: [
      {
        name: 'Cửa bản lề sàn',
        type: 'Showroom, văn phòng, cửa hàng',
        image:
          '/assets/images/cua-kinh-cuong-luc/cua-ban-le-san/cua-ban-le-san-1.jpeg',
      },
      {
        name: 'Cửa lùa',
        type: 'Không gian hẹp, tối ưu diện tích',
        image: '/assets/images/cua-kinh-cuong-luc/cua-lua/cua-lua-1.jpeg',
      },
      {
        name: 'Cửa 2 cánh',
        type: 'Mặt tiền rộng, sảnh vào',
        image:
          '/assets/images/cua-kinh-cuong-luc/cua-2-canh/cua-kinh-hai-canh-1.jpg',
      },
    ],
    highlights: [
      'Kính cường lực 10mm - 12mm theo nhu cầu sử dụng',
      'Bản lề sàn, kẹp kính, tay nắm inox hoặc hệ lùa',
      'Phù hợp showroom, văn phòng, cửa hàng và nhà ở',
      'Có thể kết hợp film mờ, logo hoặc decal nhận diện',
    ],
    advantages: [
      'Tăng ánh sáng tự nhiên và cảm giác rộng thoáng',
      'Thẩm mỹ sang trọng cho mặt tiền kinh doanh',
      'An toàn hơn kính thường khi dùng đúng độ dày',
      'Dễ vệ sinh và bảo trì phụ kiện',
      'Tối ưu nhận diện thương hiệu với decal, film, logo',
      'Linh hoạt cửa mở quay, mở lùa, một cánh hoặc hai cánh',
    ],
    specs: [
      { label: 'Kính', value: 'Kính cường lực 10mm - 12mm' },
      { label: 'Phụ kiện', value: 'Inox, bản lề sàn, kẹp kính, ray lùa' },
      { label: 'Kiểu mở', value: 'Mở quay, mở lùa, cửa 1 cánh hoặc 2 cánh' },
      { label: 'Ứng dụng', value: 'Showroom, văn phòng, cửa hàng, nhà phố' },
    ],
    technicalSpecs: {
      material: 'Kính cường lực kết hợp phụ kiện inox hoặc nhôm',
      thickness: '10mm - 12mm hoặc theo tính toán tải trọng',
      glass: 'Kính cường lực trong, mờ, màu trà hoặc dán film',
      accessories: 'Bản lề sàn, kẹp kính, tay nắm, khóa sàn, ray lùa',
      colors: 'Kính trong, kính mờ, kính màu trà; phụ kiện inox bóng/mờ',
      sizes: 'Theo kích thước mặt tiền, ô chờ và phương án mở cửa',
    },
    applications: ['Nhà phố', 'Showroom', 'Văn phòng', 'Cửa hàng', 'Spa'],
    pricing: [
      { type: 'Cửa kính bản lề sàn', price: 'Báo giá theo m2 và phụ kiện' },
      { type: 'Cửa kính lùa', price: 'Báo giá theo hệ ray và kính' },
      { type: 'Decal, film mờ, logo', price: 'Tùy chọn theo thiết kế' },
    ],
    priceNote:
      'Giá thay đổi theo độ dày kính, loại phụ kiện, kích thước cánh, số lượng và yêu cầu nhận diện.',
    faqs: commonFaqs('Cửa kính cường lực'),
  },
];

export const getProductBySlug = (slug: string) =>
  products.find((product) => product.slug === slug);

export const getProductModelBySlug = (
  productSlug: string,
  modelSlug: string,
) => {
  const product = getProductBySlug(productSlug);
  const model = product?.models.find(
    (item) => createModelSlug(item.name) === modelSlug,
  );

  return { product, model };
};
