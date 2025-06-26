import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import { defineConfig } from "vite";
import vercel from "vite-plugin-vercel";
import tsconfigPaths from "vite-tsconfig-paths";


export default defineConfig({
  server: {
    port: process.env.PORT as unknown as number,
  },
  plugins: [
    tailwindcss(), 
    reactRouter(), 
    tsconfigPaths(),
    vercel(),
  ],
  resolve: {
    alias: {
      '@assets': path.resolve(__dirname, './assets')
    }
  },
  // ssr: {
  //   noExternal: true,
  // },
});
