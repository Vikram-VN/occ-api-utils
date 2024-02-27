import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react';
import jsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [jsconfigPaths(), react()],
  test: {
    globals: true,
    environment: 'jsdom',
  },
})