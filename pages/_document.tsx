import { Head, Html, Main, NextScript } from 'next/document'
import Script from 'next/script'

import { IconContext } from '@react-icons/all-files'

import { GA_TRACKING_ID } from '@/lib/gtag'

export default () => {
  return (
    <IconContext.Provider value={{ style: { verticalAlign: 'middle' } }}>
      <Html lang='en'>
        <Head>
          <link rel='shortcut icon' href='/favicon.ico' />
          <link rel='icon' type='image/png' sizes='32x32' href='favicon.png' />
          <Script
            strategy='afterInteractive'
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
          />
          <Script
            id='gtag-init'
            strategy='afterInteractive'
            dangerouslySetInnerHTML={{
              __html: `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${GA_TRACKING_ID}', {
          page_path: window.location.pathname,
        });
      `
            }}
          />

          <link rel='manifest' href='/manifest.json' />
        </Head>

        <body>
          <Main />

          <NextScript />
        </body>
      </Html>
    </IconContext.Provider>
  )
}
