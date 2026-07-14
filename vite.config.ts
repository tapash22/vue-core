import { fileURLToPath, URL } from "node:url";

import vue from "@vitejs/plugin-vue";
import Icons from "unplugin-icons/vite";
import { defineConfig, loadEnv } from "vite"; // 👈 Imported loadEnv
import vueDevTools from "vite-plugin-vue-devtools";
import vuetify from "vite-plugin-vuetify";

export default defineConfig(({ mode }) => {
  // 1. Load env file based on current mode (development/production) in the current directory
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [
      vue(),
      vuetify({ autoImport: true }), // Crucial for automatic Vuetify treeshaking
      Icons({
        compiler: "vue3", // Generates Vue 3 components out of icons
        autoInstall: true, // Optional: auto-installs icon sets when you import them
      }),
      vueDevTools(),
    ],
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
    // 2. Explicitly compile environment variables directly into the client bundle.
    // This forces Vite to expose them, even if normal auto-loading fails.
    define: {
      "import.meta.env.VITE_SALES_API_URL": JSON.stringify(
        env.VITE_SALES_API_URL,
      ),
      "import.meta.env.VITE_BACKEND_URL": JSON.stringify(env.VITE_BACKEND_URL),
    },
  };
});
