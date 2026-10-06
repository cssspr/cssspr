import type { Config } from "tailwindcss";

// نظام الألوان مستوحى من الهوية البصرية لمواقع الأمم المتحدة/المفوضيات الدولية
// (مثل موقع مفوضية شؤون اللاجئين UNHCR):
// - أزرق أساسي (UN Blue #0072BC) كلون الهوية الرئيسي.
// - كحلي داكن للرأس العلوي والتذييل والعناصر الثقيلة بصرياً.
// - أصفر ذهبي كلون تمييز واحد فقط (تواريخ، خطوط تحت العناوين، Hover).
// - أحمر مخصص حصرياً لعلامة "عاجل" لضمان تباين قوي وواضح.
// - خلفية بيضاء نظيفة بدل الألوان الدافئة، مطابقة لأسلوب المواقع الأممية.
const config: Config = {
  darkMode: "class",
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "#101828",
          50: "#F9FAFB",
          100: "#E4E7EC",
          300: "#98A2B3",
          500: "#475467",
          700: "#1D2939",
          900: "#101828",
        },
        commission: {
          50: "#EAF4FB",
          100: "#CCE3F2",
          300: "#66AAD7",
          500: "#0072BC",
          600: "#045C99",
          700: "#0B3754",
          900: "#18375F",
        },
        ember: {
          50: "#FEF6DC",
          300: "#FFC740",
          500: "#E4A202",
          600: "#B98405",
        },
        urgent: {
          500: "#D25A45",
          600: "#AF4D3C",
        },
        parchment: {
          DEFAULT: "#FFFFFF",
          100: "#FFFFFF",
          200: "#F2F4F7",
        },
      },
      fontFamily: {
        display: ["var(--font-kufi)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
      },
      maxWidth: {
        prose: "72ch",
      },
      typography: {
        DEFAULT: {
          css: {
            "--tw-prose-body": "#1D2939",
            "--tw-prose-headings": "#101828",
            "--tw-prose-links": "#045C99",
            "--tw-prose-quotes": "#1D2939",
            "--tw-prose-quote-borders": "#FFC740",
            maxWidth: "none",
            fontSize: "1.0625rem",
            lineHeight: "2",
            "h2, h3, h4": { fontFamily: "var(--font-kufi), sans-serif", lineHeight: "1.5" },
            h2: { fontSize: "1.6em", marginTop: "2em", marginBottom: "0.7em" },
            h3: { fontSize: "1.3em", marginTop: "1.7em", marginBottom: "0.6em" },
            a: { textDecoration: "underline", textUnderlineOffset: "3px", fontWeight: "500" },
            "a:hover": { color: "#0072BC" },
            img: { borderRadius: "0.5rem", marginInline: "auto", height: "auto" },
            figure: { marginInline: "auto" },
            figcaption: { textAlign: "center" },
            blockquote: {
              fontStyle: "normal",
              fontWeight: "500",
              borderInlineStartWidth: "4px",
              borderInlineStartColor: "#FFC740",
              paddingInlineStart: "1.1em",
              quotes: "none",
              backgroundColor: "#F9FAFB",
              borderRadius: "0 0.25rem 0.25rem 0",
              paddingBlock: "0.4em",
            },
            "blockquote p:first-of-type::before": { content: "none" },
            "blockquote p:last-of-type::after": { content: "none" },
            table: { display: "block", overflowX: "auto", width: "100%" },
            "th, td": { border: "1px solid #E4E7EC", padding: "0.5rem 0.75rem" },
            thead: { backgroundColor: "#F9FAFB" },
            hr: { marginBlock: "2.5em" },
          },
        },
      },
      borderRadius: {
        sm: "2px",
        DEFAULT: "4px",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};

export default config;
