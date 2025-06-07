// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // Certifique-se que seus caminhos estão corretos
  ],
  theme: {
    extend: {
      keyframes: {
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '10%, 30%, 50%, 70%, 90%': { transform: 'translateX(-6px)' }, // Ajuste a intensidade do shake
          '20%, 40%, 60%, 80%': { transform: 'translateX(6px)' },  // Ajuste a intensidade do shake
        }
      },

      // Você pode opcionalmente definir uma utilidade de animação nomeada aqui se preferir
      // animation: {
      //   shake: 'shake 0.5s ease-in-out',
      // }
      // Se você definir 'shake' aqui, poderá usar a classe 'animate-shake' diretamente,
      // mas 'animate-[shake_0.5s_ease-in-out]' também funcionará com os keyframes definidos.
    },
  },
  plugins: [],
}

