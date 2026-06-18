export type RibbonMessage = { to?: string; from?: string; body?: string };

export type CartItem = {
  key: string; // 고유키 = productId + optionId (옵션 조합별 분리 라인)
  productId: string;
  name: string;
  en: string;
  image: string;
  palette: [string, string];
  optionId: string;
  optionLabel: string; // 예: "미디움 / 박스 포장 / 핑크"
  unitPrice: number; // 기본가 + 옵션 추가금 (1개 단가)
  qty: number;
  ribbon?: RibbonMessage;
  deliveryDate?: string; // yyyy-mm-dd
};

export type CartState = {
  items: CartItem[];
  isOpen: boolean;
  hydrated: boolean;
};

export type CartActions = {
  addItem: (input: Omit<CartItem, "key">) => void;
  removeItem: (key: string) => void;
  setQty: (key: string, qty: number) => void;
  increment: (key: string) => void;
  decrement: (key: string) => void;
  clear: () => void;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  setHydrated: (v: boolean) => void;
};

export type CartStore = CartState & CartActions;
