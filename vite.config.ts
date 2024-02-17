import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
    base: '/so24/',
    resolve: {
        alias: {
            '@Components': path.resolve(__dirname, './src/components'),
            '@Contexts': path.resolve(__dirname, './src/contexts'),
            '@Foundations': path.resolve(__dirname, './src/foundations'),
            '@Hooks': `${path.resolve(__dirname, './src/hooks/')}`,
            '@Icons': `${path.resolve(__dirname, './src/icons/')}`,
            '@Screens': `${path.resolve(__dirname, './src/screens/')}`,
            '@Stores': `${path.resolve(__dirname, './src/stores/')}`,
            '@Types': `${path.resolve(__dirname, './src/types/')}`,
        },
    },
    plugins: [
        react(),
        VitePWA({
            manifest: {
                short_name: 'So24',
                name: 'So24',
                icons: [
                    {
                        src: 'vite.svg',
                        sizes: '48x48 72x72 96x96 128x128 256x256 512x512',
                        type: 'image/svg+xml',
                        purpose: 'any',
                    },
                ],
            },
        }),
    ],
});
