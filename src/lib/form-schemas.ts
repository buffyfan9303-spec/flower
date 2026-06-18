// 폼 검증: 외부 라이브러리 없이 순수 함수. 클라이언트/서버 라우트가 동일 함수 재사용.

export type Errors = Record<string, string>;

const reEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const rePhone = /^01[0-9]-?\d{3,4}-?\d{4}$/;

const need = (v: unknown) => typeof v === "string" && v.trim().length > 0;

export type OrderInput = {
  ordererName: string;
  ordererPhone: string;
  receiverName: string;
  receiverPhone: string;
  address: string;
  addressDetail?: string;
  deliveryDate?: string;
  deliverySlot?: string;
  request?: string;
  payment: string;
  agree: boolean;
  items?: { name: string; qty: number; unitPrice: number }[];
};

export function validateOrder(v: Partial<OrderInput>): Errors {
  const e: Errors = {};
  if (!v.items || v.items.length === 0) e.items = "장바구니가 비어 있습니다.";
  if (!need(v.ordererName)) e.ordererName = "주문자 이름을 입력해 주세요.";
  if (!need(v.ordererPhone)) e.ordererPhone = "연락처를 입력해 주세요.";
  else if (!rePhone.test(v.ordererPhone!.trim())) e.ordererPhone = "올바른 휴대폰 번호를 입력해 주세요.";
  if (!need(v.receiverName)) e.receiverName = "받는 분 이름을 입력해 주세요.";
  if (!need(v.receiverPhone)) e.receiverPhone = "받는 분 연락처를 입력해 주세요.";
  else if (!rePhone.test(v.receiverPhone!.trim())) e.receiverPhone = "올바른 휴대폰 번호를 입력해 주세요.";
  if (!need(v.address)) e.address = "배송지 주소를 입력해 주세요.";
  if (!need(v.payment)) e.payment = "결제 수단을 선택해 주세요.";
  if (!v.agree) e.agree = "주문 내용 및 약관에 동의해 주세요.";
  return e;
}

export type SubscriptionInput = {
  name: string;
  phone: string;
  email?: string;
  plan: string;
  duration: string;
  cycle?: string;
  startDate?: string;
  address: string;
  mood?: string;
  agree: boolean;
};

export function validateSubscription(v: Partial<SubscriptionInput>): Errors {
  const e: Errors = {};
  if (!need(v.name)) e.name = "이름을 입력해 주세요.";
  if (!need(v.phone)) e.phone = "연락처를 입력해 주세요.";
  else if (!rePhone.test(v.phone!.trim())) e.phone = "올바른 휴대폰 번호를 입력해 주세요.";
  if (v.email && !reEmail.test(v.email.trim())) e.email = "올바른 이메일을 입력해 주세요.";
  if (!need(v.plan)) e.plan = "플랜을 선택해 주세요.";
  if (!need(v.duration)) e.duration = "구독 기간을 선택해 주세요.";
  if (!need(v.address)) e.address = "배송지 주소를 입력해 주세요.";
  if (!v.agree) e.agree = "구독 약관에 동의해 주세요.";
  return e;
}

export type InquiryInput = {
  type: "corporate" | "general";
  name: string;
  phone: string;
  email?: string;
  company?: string;
  budget?: string;
  quantity?: string;
  dueDate?: string;
  usage?: string; // 기업주문 용도
  topic?: string; // 일반문의 유형
  subject?: string;
  message: string;
  agree: boolean;
};

export function validateInquiry(v: Partial<InquiryInput>): Errors {
  const e: Errors = {};
  if (!need(v.name)) e.name = "이름(담당자)을 입력해 주세요.";
  if (!need(v.phone)) e.phone = "연락처를 입력해 주세요.";
  else if (!rePhone.test(v.phone!.trim())) e.phone = "올바른 휴대폰 번호를 입력해 주세요.";
  if (v.email && !reEmail.test(v.email.trim())) e.email = "올바른 이메일을 입력해 주세요.";
  if (v.type === "corporate" && !need(v.company)) e.company = "회사/단체명을 입력해 주세요.";
  if (!need(v.message)) e.message = "문의 내용을 입력해 주세요.";
  if (!v.agree) e.agree = "개인정보 수집·이용에 동의해 주세요.";
  return e;
}
