import { VitePWA } from 'vite-plugin-pwa'

export default {
    plugins: [
        VitePWA({
            registerType: 'autoUpdate',
            manifest: {
            name: 'Monster Mash!',
            short_name: 'Monster Mash',
            start_url: '/',
            display: 'standalone',
            theme_color: '#ffffff',
            background_color: '#ffffff',
            icons: [
                { src: '/icon-192.png', sizes: '192x192', type: 'image/png' },
                { src: '/icon-512.png', sizes: '512x512', type: 'image/png' },
                ],
            },
            workbox: {
                navigateFallbackDenylist: [/^\/auth/],
                runtimeCaching: [{
                    urlPattern: ({ url }) => url.hostname.endsWith('.supabase.co'),
                    handler: 'NetworkOnly',
                    },
                ],
            },
        }),
    ],
}