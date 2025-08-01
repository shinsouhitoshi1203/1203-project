/// <reference types='vitest' />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(() => ({
    root: __dirname,
    cacheDir: '../../../node_modules/.vite/apps/fe/personal-portfolio',
    server: {
        port: 8080,
        host: 'localhost',
    },
    preview: {
        port: 8080,
        host: 'localhost',
    },
    plugins: [react()],
    // Uncomment this if you are using workers.
    // worker: {
    //  plugins: [ nxViteTsPaths() ],
    // },
    build: {
        outDir: './dist',
        emptyOutDir: true,
        reportCompressedSize: true,
        commonjsOptions: {
            transformMixedEsModules: true,
        },
    },
    define: {
        'import.meta.vitest': undefined,
    },
}));
