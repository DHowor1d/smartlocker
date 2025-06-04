/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        // 지속 시간을 3초로 변경 (1.5s -> 3s)
        pulse: "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        // 슬라이드 다운/업 애니메이션 추가
        "slide-down-up": "slideDownUp 2.5s ease-in-out forwards",
      },
      keyframes: {
        pulse: {
          "0%, 100%": { opacity: 1 },
          "50%": { opacity: 0.3 },
          slideDownUp: {
            "0%": { transform: "translateY(-100%)", opacity: 0 },
            "10%": { transform: "translateY(0)", opacity: 1 },
            "90%": { transform: "translateY(0)", opacity: 1 },
            "100%": { transform: "translateY(-100%)", opacity: 0 },
          },
        },
      },
    },
  },
  plugins: [],
};