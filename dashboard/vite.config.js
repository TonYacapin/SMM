import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: 'localhost',
    port: 3000,  // Make sure it's a number
  },
  base: '/SIA2FinalProject-2', // Set this to '/' if deploying to the root on Vercel
});
