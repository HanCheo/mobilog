import { Head, Html, Main, NextScript } from 'next/document'

import { GaScript } from 'client/providers/GoogleAnalyticsProvider'
import { IconContext } from '@react-icons/all-files'

export default () => {
  return (
    <IconContext.Provider value={{ style: { verticalAlign: 'middle' } }}>
      <Html lang='en'>
        <Head>
          <link rel='shortcut icon' href='/favicon.ico' />
          <link rel='icon' type='image/png' sizes='32x32' href='favicon.png' />

          <GaScript />
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
