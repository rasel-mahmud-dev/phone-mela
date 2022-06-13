import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

import * as path from "path"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: "0.0.0.0"
  },
  resolve: {
    alias: {
      "src": path.resolve("./src"),
      "pages": path.resolve("./src/pages"),
      "store": path.resolve("./src/store"),
      "actions": path.resolve("./src/store/actions"),
      "components": path.resolve("./src/components"),
      "UI": path.resolve("./src/components/UI"),
      "apis": path.resolve("./src/apis")
    }
  }
})
