/** @type {import('next').NextConfig} */

// نشتق اسم المضيف تلقائياً من S3_PUBLIC_BASE_URL (بدل الاعتماد على متغيّر بيئة
// منفصل غير موثّق S3_PUBLIC_HOSTNAME كان بلا قيمة افتراضية حقيقية) — هذا يمنع
// عطلاً صامتاً في next/image لكل صور الأخبار/الوسائط بعد ربط bucket فعلي في
// الإنتاج، إذ كانت الصور ستُرفض لعدم وجود اسم مضيفها ضمن remotePatterns.
function resolveS3Hostname() {
  const raw = process.env.S3_PUBLIC_BASE_URL || process.env.S3_PUBLIC_HOSTNAME;
  if (!raw) return "cdn.example.gov.sd";
  try {
    return new URL(raw.includes("://") ? raw : `https://${raw}`).hostname;
  } catch {
    return "cdn.example.gov.sd";
  }
}

// وضع التطوير (next dev) يبني جافاسكربت المتصفح بأسلوب eval-source-map ويستخدم WebSocket
// للتحديث الفوري؛ سياسة CSP الصارمة بدون 'unsafe-eval' كانت تحجب تنفيذ جافاسكربت الصفحة
// بالكامل في التطوير، فلا يعمل زر "تسجيل الدخول" (يُرسل النموذج كطلب عادي بدل signIn).
// لذلك يُضاف 'unsafe-eval' و ws: في التطوير فقط، أما الإنتاج فيبقى بنفس السياسة الصارمة.
const isDev = process.env.NODE_ENV !== "production";

const securityHeaders = [
  { key: "X-DNS-Prefetch-Control", value: "on" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      "img-src 'self' data: https:",
      "media-src 'self' https:",
      // تضمين فيديو يوتيوب/فيميو داخل الخبر (حقل رابط الفيديو) — بدونها يحجب المتصفح الإطار
      "frame-src https://www.youtube-nocookie.com https://www.youtube.com https://player.vimeo.com",
      isDev ? "script-src 'self' 'unsafe-inline' 'unsafe-eval'" : "script-src 'self' 'unsafe-inline'",
      ...(isDev ? ["connect-src 'self' ws: wss:"] : []),
      "style-src 'self' 'unsafe-inline'",
      "frame-ancestors 'none'",
      "base-uri 'self'",
      "form-action 'self'",
    ].join("; "),
  },
];

const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  // يُستخدم في SmartImage لمعرفة النطاق الذي يمكن تحسين صوره عبر next/image
  env: { NEXT_PUBLIC_IMAGE_HOST: resolveS3Hostname() },
  experimental: {
    // يقلل حجم JavaScript المُحمَّل: يستورد الأيقونات/الدوال المستعملة فقط بدل المكتبة كاملة
    optimizePackageImports: ["lucide-react", "date-fns", "recharts"],
  },
  images: {
    minimumCacheTTL: 60 * 60 * 24 * 7, // صور محسّنة تُخزَّن أسبوعاً (كانت 60 ثانية)
    deviceSizes: [360, 640, 768, 1024, 1280, 1600, 1920],
    remotePatterns: [
      {
        protocol: "https",
        hostname: resolveS3Hostname(),
      },
    ],
    formats: ["image/avif", "image/webp"],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
  async redirects() {
    return [];
  },
};

module.exports = nextConfig;
