import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: 'localhost',
    port: 3000, // Make sure it's a number
  },
  base: '/SMM/', // Set base to '/SMM/' for GitHub Pages
});
