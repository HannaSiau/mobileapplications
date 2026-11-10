import { ScrollViewStyleReset } from 'expo-router/html';
import type { PropsWithChildren } from 'react';

const BASE = '/mobileapplications';

export default function Root({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no, viewport-fit=cover"
        />
        <link rel="manifest" href={`${BASE}/manifest.json`} />
        <meta name="theme-color" content="#1e1b4b" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-title" content="Monster Mash" />
        <link rel="apple-touch-icon" href={`${BASE}/apple-touch-icon.png`} />
        <ScrollViewStyleReset />
      </head>
      <body>
        {children}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function () {
                  navigator.serviceWorker.register('${BASE}/sw.js', { scope: '${BASE}/' });
                });
              }
            `,
          }}
        />
      </body>
    </html>
  );
}