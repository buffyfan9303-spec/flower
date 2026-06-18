// 드디어 플라워 — 카탈로그 데이터 (네오블루매 라인업 참고한 현실적 구성)
// 이미지는 Unsplash 더미 URL + SmartImage 그라데이션/보태니컬 폴백으로 처리됩니다.
// 실제 사진은 /public/products 에 넣고 image 경로만 교체하면 됩니다.

export const u = (id: string) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=900&q=80`;

export type Collection = {
  slug: string;
  name: string;
  en: string;
  desc: string;
  image: string;
  palette: [string, string];
};

/** 가격이 붙는 선택 옵션(사이즈/타입). 첫 항목이 기본값, delta는 기본가 대비 증감액. */
export type Variant = { id: string; label: string; delta: number };
/** 가격 영향 없는 선택(컬러/향 등) */
export type Swatch = { name: string; options: string[] };

export type Product = {
  id: string;
  name: string;
  en: string;
  price: number; // 기본가(미디움/기본 기준)
  compareAt: number; // 정가(0이면 할인 없음)
  category: string;
  tag?: "BEST" | "NEW" | "한정" | "";
  desc: string;
  detail: string;
  flowers: string[];
  care: string;
  rating: number;
  reviewCount: number;
  stock: number;
  image: string;
  gallery: string[];
  palette: [string, string];
  variants: Variant[];
  swatch?: Swatch;
  addWrap: boolean; // 포장 옵션 노출 여부(생화류)
  hidden?: boolean; // 관리자: 공개 사이트 노출 여부
};

export type EventItem = {
  slug: string;
  name: string;
  en: string;
  desc: string;
  productIds: string[];
  palette: [string, string];
};

export type SiteSettings = {
  announcements: string[];
  hero: { eyebrow: string; title: string; subtitle: string; image: string };
  contact: {
    brandDesc: string;
    phone: string;
    email: string;
    address: string;
    businessNo: string;
    mailOrderNo: string;
    hours: string;
  };
  social: { instagram: string };
  freeShipThreshold: number;
  shippingFee: number;
};

export const defaultSettings: SiteSettings = {
  announcements: [
    "서울 당일배송 · 전국 새벽배송",
    "정기구독 첫 달 10% 할인",
    "5만원 이상 무료배송",
    "신선도 100% 책임 보장",
  ],
  hero: {
    eyebrow: "SEOUL FLORIST · SINCE 2026",
    title: "드디어, 당신에게\n어울리는 꽃",
    subtitle:
      "매일 새벽 가장 신선한 꽃을, 플로리스트의 손길로.\n오늘의 마음을 가장 아름답게 전합니다.",
    image:
      "https://images.unsplash.com/photo-1525310072745-f49212b5ac6d?auto=format&fit=crop&w=1900&q=80",
  },
  contact: {
    brandDesc:
      "드디어, 당신에게 어울리는 꽃. 매일 가장 신선한 꽃을 플로리스트의 손길로 전해드립니다.",
    phone: "02-1234-5678",
    email: "hello@deudieo.flower",
    address: "서울특별시 성동구 성수일로 12",
    businessNo: "123-45-67890",
    mailOrderNo: "2026-서울성동-0001",
    hours: "평일 10:00–18:00",
  },
  social: { instagram: "@deudieo.flower" },
  freeShipThreshold: 50000,
  shippingFee: 3500,
};

/** 생화류 공통 포장 옵션 */
export const WRAP_OPTIONS: Variant[] = [
  { id: "kraft", label: "크라프트 포장", delta: 0 },
  { id: "box", label: "박스 포장", delta: 5000 },
  { id: "clear", label: "투명 럭스 포장", delta: 3000 },
];

/** 함께 담기(크로스셀) 애드온 */
export type Addon = {
  id: string;
  name: string;
  price: number;
  image: string;
  palette: [string, string];
};
export const addons: Addon[] = [
  { id: "a-card", name: "핸드라이팅 메시지 카드", price: 3000, image: u("1606041008023-472dfb5e530f"), palette: ["#EDE7DD", "#C9C0B2"] },
  { id: "a-vase", name: "유리 화병 추가", price: 12000, image: u("1455659817273-f96807779a8a"), palette: ["#E9C8C2", "#D49C94"] },
  { id: "a-choco", name: "수제 초콜릿 박스", price: 15000, image: u("1481391319762-47dff72954d9"), palette: ["#D8C7BE", "#A88B7A"] },
  { id: "a-diffuser", name: "미니 룸 디퓨저", price: 9000, image: u("1602910344008-22f323cc1817"), palette: ["#9AA48C", "#6F7A63"] },
];

export const collections: Collection[] = [
  { slug: "bouquet", name: "꽃다발", en: "Bouquet", desc: "그날 가장 좋은 생화로 엮는 유럽풍 핸드타이드", image: u("1457089328109-e5d9bd499191"), palette: ["#E3C2BB", "#C99B92"] },
  { slug: "basket", name: "꽃바구니·박스", en: "Basket & Box", desc: "축하와 위로의 마음을 풍성하게", image: u("1490750967868-88aa4486c946"), palette: ["#E8D5A8", "#B89B6E"] },
  { slug: "preserved", name: "프리저브드", en: "Preserved", desc: "1년 이상 시들지 않는 보존화", image: u("1606041008023-472dfb5e530f"), palette: ["#D8C7BE", "#A88B7A"] },
  { slug: "diffuser", name: "디퓨저·향", en: "Scent", desc: "꽃과 향을 함께 담은 룸 프래그런스", image: u("1602910344008-22f323cc1817"), palette: ["#9AA48C", "#6F7A63"] },
  { slug: "plant", name: "화분·식물", en: "Plant", desc: "개업·승진 축하와 공간을 위한 식물", image: u("1416879595882-3373a0480b5b"), palette: ["#9AA48C", "#515B47"] },
  { slug: "vase", name: "화병꽃·구독", en: "Vase & Subscription", desc: "센터피스와 매주 받는 정기구독", image: u("1519378058457-4c29a0a2efac"), palette: ["#E3C2BB", "#C99B92"] },
];

const SIZE3: Variant[] = [
  { id: "m", label: "미디움", delta: 0 },
  { id: "s", label: "스몰", delta: -18000 },
  { id: "l", label: "라지", delta: 25000 },
];

export const products: Product[] = [
  {
    id: "signature-bouquet",
    name: "드디어 시그니처 꽃다발",
    en: "Signature Bouquet",
    price: 68000, compareAt: 0, category: "bouquet", tag: "BEST",
    desc: "그날 가장 좋은 제철 꽃으로 엮는 대표 핸드타이드",
    detail:
      "남대문 꽃시장에서 새벽에 고른 제철 메인 꽃에 풍성한 소재를 더해 자연스러운 결로 묶어냅니다. 어떤 자리에도 어울리는 드디어 플라워의 얼굴 같은 꽃다발입니다. 색감과 분위기는 요청에 맞춰 큐레이션됩니다.",
    flowers: ["장미", "라넌큘러스", "튤립", "유칼립투스"],
    care: "받는 즉시 줄기 끝을 사선으로 자르고 깨끗한 물에 꽂아 직사광선을 피해 두세요.",
    rating: 4.9, reviewCount: 213, stock: 12,
    image: u("1457089328109-e5d9bd499191"),
    gallery: [u("1457089328109-e5d9bd499191"), u("1469259943454-aa100abba749"), u("1490750967868-88aa4486c946")],
    palette: ["#E3C2BB", "#C99B92"],
    variants: SIZE3, swatch: { name: "톤", options: ["베이지", "핑크", "블루", "믹스"] }, addWrap: true,
  },
  {
    id: "graduation-bouquet",
    name: "졸업·합격 축하 꽃다발",
    en: "Graduation Bouquet",
    price: 75000, compareAt: 85000, category: "bouquet", tag: "BEST",
    desc: "졸업·입학·합격을 빛내는 화사한 대형 꽃다발",
    detail:
      "졸업 시즌 가장 인기 있는 풍성한 구성으로, 사진이 잘 나오는 화사한 컬러와 큼직한 실루엣이 특징입니다. 메시지 카드와 방수 포장이 기본 포함됩니다.",
    flowers: ["거베라", "튤립", "프리지아", "스토크"],
    care: "포장을 풀고 물에 꽂으면 더 오래 감상할 수 있어요. 차량 안 더운 곳은 피해주세요.",
    rating: 4.9, reviewCount: 168, stock: 7,
    image: u("1508610048659-a06b669e3321"),
    gallery: [u("1508610048659-a06b669e3321"), u("1457089328109-e5d9bd499191"), u("1518895949257-7621c3c786d7")],
    palette: ["#E8D5A8", "#C2A567"],
    variants: [
      { id: "m", label: "미디움", delta: 0 },
      { id: "l", label: "라지", delta: 20000 },
    ],
    swatch: { name: "컬러", options: ["옐로우", "핑크", "화이트"] }, addWrap: true,
  },
  {
    id: "foret-mini-bouquet",
    name: "포레 미니 꽃다발",
    en: "Foret Mini Bouquet",
    price: 29000, compareAt: 0, category: "bouquet", tag: "NEW",
    desc: "부담 없이 전하는 손바닥 사이즈 데일리 꽃다발",
    detail:
      "가벼운 마음을 전하기 좋은 작은 꽃다발입니다. 한두 종의 꽃을 단정하게 묶어 책상이나 식탁 위 작은 화병에 그대로 꽂아 즐기기 좋습니다.",
    flowers: ["소국", "튤립", "왁스플라워"],
    care: "작은 화병에 물을 자주 갈아주면 오래 신선하게 유지됩니다.",
    rating: 4.8, reviewCount: 94, stock: 20,
    image: u("1518895949257-7621c3c786d7"),
    gallery: [u("1518895949257-7621c3c786d7"), u("1487530811176-3780de880c2d"), u("1490750967868-88aa4486c946")],
    palette: ["#EDE7DD", "#C9C0B2"],
    variants: [{ id: "basic", label: "기본", delta: 0 }],
    swatch: { name: "컬러", options: ["화이트", "핑크", "믹스"] }, addWrap: true,
  },
  {
    id: "proposal-rose",
    name: "프러포즈 로즈 부케",
    en: "Proposal Rose Bouquet",
    price: 120000, compareAt: 135000, category: "bouquet", tag: "한정",
    desc: "특별한 고백을 위한 프리미엄 로즈 부케",
    detail:
      "한 가지 톤의 장미를 가득 담아 깊고 우아한 분위기를 연출한 프러포즈 전용 부케입니다. 고급 포장과 리본, 핸드 메시지 카드가 포함됩니다.",
    flowers: ["수입 장미", "안개꽃", "루스커스"],
    care: "행사 직전까지 물에 꽂아 두고, 사용 후에는 거꾸로 매달아 드라이플라워로 보관할 수 있어요.",
    rating: 5.0, reviewCount: 76, stock: 4,
    image: u("1469259943454-aa100abba749"),
    gallery: [u("1469259943454-aa100abba749"), u("1455659817273-f96807779a8a"), u("1457089328109-e5d9bd499191")],
    palette: ["#C99B92", "#9E5C57"],
    variants: [
      { id: "std", label: "스탠다드 (50송이)", delta: 0 },
      { id: "deluxe", label: "딜럭스 (100송이)", delta: 60000 },
    ],
    swatch: { name: "컬러", options: ["레드", "핑크", "화이트"] }, addWrap: true,
  },
  {
    id: "blooming-basket",
    name: "블루밍 꽃바구니",
    en: "Blooming Basket",
    price: 65000, compareAt: 0, category: "basket", tag: "",
    desc: "축하 자리를 풍성하게 채우는 생화 바구니",
    detail:
      "오아시스에 꽂아 그대로 두고 감상할 수 있는 생화 바구니로, 받는 즉시 물만 보충하면 되는 실용적인 구성입니다. 개업·생일·집들이 선물로 인기가 많습니다.",
    flowers: ["장미", "카네이션", "리시안셔스", "스프레이국화"],
    care: "바구니 속 플로랄폼이 마르지 않도록 2~3일에 한 번 물을 부어주세요.",
    rating: 4.8, reviewCount: 121, stock: 9,
    image: u("1490750967868-88aa4486c946"),
    gallery: [u("1490750967868-88aa4486c946"), u("1457089328109-e5d9bd499191"), u("1469259943454-aa100abba749")],
    palette: ["#E9C8C2", "#D49C94"],
    variants: [
      { id: "m", label: "미디움", delta: 0 },
      { id: "l", label: "라지", delta: 25000 },
    ],
    swatch: { name: "톤", options: ["파스텔", "비비드", "화이트"] }, addWrap: false,
  },
  {
    id: "white-comfort-box",
    name: "위로의 화이트 박스",
    en: "White Comfort Box",
    price: 55000, compareAt: 0, category: "basket", tag: "",
    desc: "차분한 화이트 톤으로 마음을 전하는 플라워 박스",
    detail:
      "흰색과 그린을 중심으로 단정하게 구성한 박스 플라워입니다. 감사·위로·문병 등 절제된 마음을 전할 때 어울리며, 박스 그대로 두고 감상할 수 있습니다.",
    flowers: ["흰 장미", "리시안셔스", "유칼립투스"],
    care: "직사광선과 난방기를 피하고 폼이 마르면 소량의 물을 더해주세요.",
    rating: 4.9, reviewCount: 58, stock: 11,
    image: u("1487530811176-3780de880c2d"),
    gallery: [u("1487530811176-3780de880c2d"), u("1518895949257-7621c3c786d7"), u("1490750967868-88aa4486c946")],
    palette: ["#EDE7DD", "#C9C0B2"],
    variants: [
      { id: "basic", label: "기본", delta: 0 },
      { id: "large", label: "라지", delta: 22000 },
    ],
    addWrap: false,
  },
  {
    id: "ever-preserved-dome",
    name: "에버 프리저브드 돔",
    en: "Ever Preserved Dome",
    price: 79000, compareAt: 89000, category: "preserved", tag: "BEST",
    desc: "유리돔 속에 멈춘 1년 이상의 아름다움",
    detail:
      "보존 처리한 장미를 유리돔 안에 담아 먼지와 변색 없이 오래 감상할 수 있는 프리저브드 작품입니다. 기념일 선물과 인테리어 소품으로 모두 사랑받습니다.",
    flowers: ["프리저브드 장미", "프리저브드 수국"],
    care: "물이 필요 없으며, 직사광선과 습기를 피해 실내에 두면 1년 이상 유지됩니다.",
    rating: 4.9, reviewCount: 142, stock: 6,
    image: u("1606041008023-472dfb5e530f"),
    gallery: [u("1606041008023-472dfb5e530f"), u("1455659817273-f96807779a8a"), u("1469259943454-aa100abba749")],
    palette: ["#D8C7BE", "#A88B7A"],
    variants: [
      { id: "s", label: "스몰", delta: 0 },
      { id: "m", label: "미디움", delta: 20000 },
    ],
    swatch: { name: "컬러", options: ["레드", "핑크", "블루", "화이트"] }, addWrap: false,
  },
  {
    id: "preserved-carnation",
    name: "카네이션 프리저브드 박스",
    en: "Preserved Carnation Box",
    price: 38000, compareAt: 0, category: "preserved", tag: "",
    desc: "시들지 않는 마음을 담은 카네이션 보존화",
    detail:
      "어버이날·스승의날에 가장 사랑받는 프리저브드 카네이션을 박스에 담았습니다. 생화처럼 부드러운 질감을 그대로 살려 오래 간직할 수 있습니다.",
    flowers: ["프리저브드 카네이션", "프리저브드 안개꽃"],
    care: "물 없이 보관하며 직사광선만 피하면 됩니다. 먼지는 부드러운 붓으로 털어주세요.",
    rating: 4.8, reviewCount: 203, stock: 15,
    image: u("1455659817273-f96807779a8a"),
    gallery: [u("1455659817273-f96807779a8a"), u("1606041008023-472dfb5e530f"), u("1490750967868-88aa4486c946")],
    palette: ["#E9C8C2", "#D49C94"],
    variants: [
      { id: "basic", label: "기본", delta: 0 },
      { id: "mini", label: "미니", delta: -8000 },
    ],
    swatch: { name: "컬러", options: ["레드", "핑크"] }, addWrap: false,
  },
  {
    id: "preserved-frame",
    name: "프리저브드 액자 프레임",
    en: "Preserved Flower Frame",
    price: 95000, compareAt: 0, category: "preserved", tag: "NEW",
    desc: "벽에 거는 보존화 플라워 아트 프레임",
    detail:
      "보존화와 드라이 소재를 입체적으로 배치해 액자에 담은 인테리어 작품입니다. 시간이 지나도 형태가 유지되어 집과 사무실 벽면을 오래 장식할 수 있습니다.",
    flowers: ["프리저브드 장미", "프리저브드 아지란텀", "목화"],
    care: "습기 많은 욕실 인근은 피하고, 직사광선이 닿지 않는 벽에 걸어주세요.",
    rating: 5.0, reviewCount: 41, stock: 5,
    image: u("1487070183336-b863922373d4"),
    gallery: [u("1487070183336-b863922373d4"), u("1606041008023-472dfb5e530f"), u("1487530811176-3780de880c2d")],
    palette: ["#D8C7BE", "#A88B7A"],
    variants: [
      { id: "square", label: "정사각", delta: 0 },
      { id: "rect", label: "직사각", delta: 15000 },
    ],
    swatch: { name: "프레임", options: ["우드", "화이트"] }, addWrap: false,
  },
  {
    id: "flower-diffuser",
    name: "플라워 디퓨저 세트",
    en: "Flower Diffuser Set",
    price: 42000, compareAt: 0, category: "diffuser", tag: "BEST",
    desc: "프리저브드 꽃과 향을 함께 담은 디퓨저",
    detail:
      "디퓨저 용기에 프리저브드 꽃을 함께 연출해 향과 비주얼을 동시에 즐기는 제품입니다. 집들이·생일·기념일 선물로 인기가 높습니다.",
    flowers: ["프리저브드 장미", "프리저브드 수국"],
    care: "리드 스틱을 주기적으로 뒤집어 향을 유지하고, 액체가 꽃에 직접 닿지 않게 해주세요.",
    rating: 4.9, reviewCount: 187, stock: 18,
    image: u("1602910344008-22f323cc1817"),
    gallery: [u("1602910344008-22f323cc1817"), u("1606041008023-472dfb5e530f"), u("1487530811176-3780de880c2d")],
    palette: ["#9AA48C", "#6F7A63"],
    variants: [{ id: "200", label: "200ml", delta: 0 }],
    swatch: { name: "향", options: ["화이트머스크", "프리지아", "우디"] }, addWrap: false,
  },
  {
    id: "room-mist-set",
    name: "룸 미스트 & 카드 세트",
    en: "Room Mist & Card Set",
    price: 26000, compareAt: 0, category: "diffuser", tag: "",
    desc: "꽃향을 담은 룸 미스트와 핸드 카드 선물 세트",
    detail:
      "공간을 가볍게 환기시키는 룸 미스트에 손글씨 카드를 더한 소품 세트입니다. 작은 답례나 가벼운 선물로 좋습니다.",
    flowers: ["드라이 라벤더 장식"],
    care: "공간에 2~3회 분사하고, 직물에는 일정 거리를 두고 사용하세요.",
    rating: 4.7, reviewCount: 63, stock: 24,
    image: u("1519378058457-4c29a0a2efac"),
    gallery: [u("1519378058457-4c29a0a2efac"), u("1602910344008-22f323cc1817"), u("1606041008023-472dfb5e530f")],
    palette: ["#E3C2BB", "#C99B92"],
    variants: [{ id: "100", label: "100ml", delta: 0 }],
    swatch: { name: "향", options: ["화이트머스크", "시트러스", "플로럴"] }, addWrap: false,
  },
  {
    id: "oriental-orchid",
    name: "축하 동양란 (보세란)",
    en: "Oriental Orchid",
    price: 85000, compareAt: 0, category: "plant", tag: "",
    desc: "개업·승진·취임 축하의 정석, 동양란 화분",
    detail:
      "은은한 향과 단정한 자태로 비즈니스 축하 선물의 대표격인 동양란입니다. 도자기 화분과 축하 리본, 메시지 명판이 포함됩니다.",
    flowers: ["보세란"],
    care: "통풍이 잘되는 반음지에 두고 흙 표면이 마르면 물을 흠뻑 주세요.",
    rating: 4.9, reviewCount: 88, stock: 8,
    image: u("1416879595882-3373a0480b5b"),
    gallery: [u("1416879595882-3373a0480b5b"), u("1485955900006-10f4d324d411"), u("1487530811176-3780de880c2d")],
    palette: ["#9AA48C", "#515B47"],
    variants: [
      { id: "3", label: "3촉", delta: 0 },
      { id: "5", label: "5촉", delta: 30000 },
    ],
    swatch: { name: "화분", options: ["화이트", "네이비"] }, addWrap: false,
  },
  {
    id: "tabletop-plant",
    name: "테이블 관엽 화분",
    en: "Tabletop Plant",
    price: 49000, compareAt: 0, category: "plant", tag: "",
    desc: "공간에 생기를 더하는 데스크 사이즈 관엽",
    detail:
      "사무실 책상이나 거실 한쪽에 두기 좋은 중소형 관엽 화분입니다. 관리가 쉬운 품종으로 구성해 식물 초보자에게도 잘 어울립니다.",
    flowers: ["관엽식물"],
    care: "흙이 마르면 물을 주고 직사광선을 피한 밝은 실내에 두세요.",
    rating: 4.8, reviewCount: 52, stock: 14,
    image: u("1485955900006-10f4d324d411"),
    gallery: [u("1485955900006-10f4d324d411"), u("1416879595882-3373a0480b5b"), u("1487530811176-3780de880c2d")],
    palette: ["#9AA48C", "#6F7A63"],
    variants: [
      { id: "skin", label: "스킨답서스", delta: 0 },
      { id: "palm", label: "테이블야자", delta: 6000 },
    ],
    swatch: { name: "화분", options: ["토분", "세라믹"] }, addWrap: false,
  },
  {
    id: "centerpiece-vase",
    name: "센터피스 화병꽃",
    en: "Centerpiece Vase",
    price: 72000, compareAt: 0, category: "vase", tag: "NEW",
    desc: "테이블 중앙을 채우는 유럽풍 화병 연출",
    detail:
      "신선한 생화를 화병에 자연스럽게 연출한 센터피스로, 식탁·상담 테이블·매장 디스플레이에 어울립니다. 화병 포함/미포함을 선택할 수 있습니다.",
    flowers: ["작약", "장미", "델피니움", "스프레이장미"],
    care: "이틀에 한 번 물을 갈고 줄기 끝을 다듬으면 더 오래 감상할 수 있어요.",
    rating: 4.9, reviewCount: 47, stock: 6,
    image: u("1561181286-d3fee7d55364"),
    gallery: [u("1561181286-d3fee7d55364"), u("1455659817273-f96807779a8a"), u("1457089328109-e5d9bd499191")],
    palette: ["#E3C2BB", "#C99B92"],
    variants: [
      { id: "m", label: "미디움", delta: 0 },
      { id: "l", label: "라지", delta: 28000 },
    ],
    swatch: { name: "화병", options: ["화병 포함", "화병 미포함"] }, addWrap: false,
  },
  {
    id: "weekly-subscription",
    name: "위클리 꽃 정기구독",
    en: "Weekly Subscription",
    price: 39000, compareAt: 0, category: "vase", tag: "BEST",
    desc: "매주·격주로 받아보는 제철 꽃 한 다발",
    detail:
      "그 주 가장 좋은 제철 꽃을 작은 다발로 정기 배송하는 구독 상품입니다. 일상에 꾸준히 꽃을 들이고 싶은 분께 적합하며, 배송 주기를 선택할 수 있습니다. 약정 없이 언제든 일시정지·해지할 수 있습니다.",
    flowers: ["제철 생화 (주차별 변동)"],
    care: "받는 즉시 줄기를 사선으로 잘라 화병에 꽂고 물을 자주 갈아주세요.",
    rating: 5.0, reviewCount: 156, stock: 99,
    image: u("1519378058457-4c29a0a2efac"),
    gallery: [u("1519378058457-4c29a0a2efac"), u("1490750967868-88aa4486c946"), u("1518895949257-7621c3c786d7")],
    palette: ["#9AA48C", "#6F7A63"],
    variants: [
      { id: "weekly-mini", label: "주 1회 · 미니", delta: 0 },
      { id: "weekly-basic", label: "주 1회 · 기본", delta: 10000 },
      { id: "biweekly", label: "격주 · 기본", delta: 5000 },
    ],
    addWrap: false,
  },
];

export function getProduct(id: string) {
  return products.find((p) => p.id === id);
}
export function relatedProducts(p: Product, n = 4) {
  const same = products.filter((x) => x.category === p.category && x.id !== p.id);
  const pool = same.length >= n ? same : [...same, ...products.filter((x) => x.id !== p.id && !same.includes(x))];
  return pool.slice(0, n);
}

export type Testimonial = { name: string; meta: string; body: string; rating: number };
export const testimonials: Testimonial[] = [
  { name: "김*은", meta: "기념일 꽃다발", rating: 5, body: "포장부터 꽃 상태까지 완벽했어요. 받는 사람이 인생 꽃다발이라고 했습니다." },
  { name: "이*호", meta: "정기구독 6개월", rating: 5, body: "매주 다른 꽃이 와서 집 분위기가 완전히 달라졌어요. 큐레이션 감각이 정말 좋아요." },
  { name: "박*린", meta: "개업 축하화", rating: 5, body: "당일 배송으로 급하게 부탁드렸는데 시간 맞춰 도착했고 너무 예뻤습니다." },
  { name: "정*아", meta: "프리저브드 박스", rating: 5, body: "반 년이 지나도 처음 그대로예요. 선물로 또 주문하려고요." },
];

export type Step = { no: string; title: string; desc: string };
export const steps: Step[] = [
  { no: "01", title: "당일 입고된 꽃", desc: "매일 새벽 시장에서 가장 신선한 꽃만 선별해 입고합니다." },
  { no: "02", title: "플로리스트의 손길", desc: "10년 경력 플로리스트가 한 송이씩 직접 디자인합니다." },
  { no: "03", title: "정성스러운 포장", desc: "꽃이 다치지 않도록 전용 박스에 안전하게 포장합니다." },
  { no: "04", title: "안전한 배송", desc: "서울 당일배송과 전국 새벽배송으로 신선하게 전해드립니다." },
];

export const instagram: { palette: [string, string]; image: string }[] = [
  { palette: ["#E3C2BB", "#C99B92"], image: u("1457089328109-e5d9bd499191") },
  { palette: ["#9AA48C", "#6F7A63"], image: u("1469259943454-aa100abba749") },
  { palette: ["#E8D5A8", "#C2A567"], image: u("1508610048659-a06b669e3321") },
  { palette: ["#EDE7DD", "#C9C0B2"], image: u("1518895949257-7621c3c786d7") },
  { palette: ["#E9C8C2", "#D49C94"], image: u("1455659817273-f96807779a8a") },
  { palette: ["#D8C7BE", "#A88B7A"], image: u("1606041008023-472dfb5e530f") },
];

/** 시즌 기획전 */
export const events = [
  { slug: "graduation", name: "졸업·입학 기획전", en: "Graduation", desc: "새로운 시작을 축하하는 화사한 꽃", productIds: ["graduation-bouquet", "signature-bouquet", "foret-mini-bouquet"], palette: ["#E8D5A8", "#C2A567"] as [string, string] },
  { slug: "parents", name: "어버이날 기획전", en: "Parents' Day", desc: "감사의 마음을 담은 카네이션", productIds: ["preserved-carnation", "blooming-basket", "ever-preserved-dome"], palette: ["#E9C8C2", "#D49C94"] as [string, string] },
  { slug: "opening", name: "개업·축하 기획전", en: "Congratulations", desc: "성공을 기원하는 축하 화환·화분", productIds: ["oriental-orchid", "blooming-basket", "centerpiece-vase"], palette: ["#9AA48C", "#515B47"] as [string, string] },
];

export function formatKRW(n: number) {
  return n.toLocaleString("ko-KR") + "원";
}
export function discountRate(price: number, compareAt: number) {
  if (!compareAt || compareAt <= price) return 0;
  return Math.round(((compareAt - price) / compareAt) * 100);
}

export const FREE_SHIP_THRESHOLD = 50000;
export const SHIPPING_FEE = 3500;
