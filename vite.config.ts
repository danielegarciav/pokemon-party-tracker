import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { browserslistToTargets } from 'lightningcss';
import browserslist from 'browserslist';

// https://vitejs.dev/config/
// lightningcss setup: https://lightningcss.dev/docs.html#with-vite
export default defineConfig({
  plugins: [react()],
  css: {
    transformer: 'lightningcss',
    lightningcss: {
      targets: browserslistToTargets(browserslist('defaults')),
    },
  },
  build: {
    cssMinify: 'lightningcss',
  },
});
