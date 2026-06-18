// 서버 전용 알림 스텁.
// 실제 전송 대신 콘솔 로그 + 약간의 지연으로 모킹합니다.
// TODO: 운영 시 SendGrid/Resend(이메일), 카카오 알림톡(솔라피/비즈메시지) 연동.
//   필요한 환경변수 예: RESEND_API_KEY, KAKAO_ALIMTALK_KEY, OPERATOR_EMAIL

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export async function sendEmail(opts: {
  to: string;
  subject: string;
  html: string;
}) {
  // TODO: Resend/SendGrid 연동 지점
  console.log("[notify:email]", opts.to, "—", opts.subject);
  await sleep(120);
  return { ok: true as const };
}

export async function sendKakaoAlimtalk(opts: {
  to: string;
  templateCode: string;
  vars: Record<string, string>;
}) {
  // TODO: 카카오 알림톡 API 연동 지점
  console.log("[notify:kakao]", opts.to, "—", opts.templateCode, opts.vars);
  await sleep(120);
  return { ok: true as const };
}

const OPERATOR_EMAIL = process.env.OPERATOR_EMAIL || "hello@deudieo.flower";

export async function notifyOrder(id: string, data: any) {
  await Promise.all([
    sendEmail({
      to: OPERATOR_EMAIL,
      subject: `[신규주문] ${id} · ${data.ordererName}`,
      html: `<pre>${JSON.stringify(data, null, 2)}</pre>`,
    }),
    data.ordererPhone &&
      sendKakaoAlimtalk({
        to: data.ordererPhone,
        templateCode: "ORDER_CONFIRM",
        vars: { orderId: id, name: data.ordererName ?? "" },
      }),
  ]);
}

export async function notifySubscription(id: string, data: any) {
  await Promise.all([
    sendEmail({
      to: OPERATOR_EMAIL,
      subject: `[정기구독 신청] ${id} · ${data.name}`,
      html: `<pre>${JSON.stringify(data, null, 2)}</pre>`,
    }),
    data.phone &&
      sendKakaoAlimtalk({
        to: data.phone,
        templateCode: "SUBSCRIPTION_CONFIRM",
        vars: { subId: id, name: data.name ?? "" },
      }),
  ]);
}

export async function notifyInquiry(id: string, data: any) {
  await sendEmail({
    to: OPERATOR_EMAIL,
    subject: `[${data.type === "corporate" ? "기업/단체 문의" : "일반 문의"}] ${id} · ${data.name}`,
    html: `<pre>${JSON.stringify(data, null, 2)}</pre>`,
  });
}
