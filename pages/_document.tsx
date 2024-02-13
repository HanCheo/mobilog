import { Head, Html, Main, NextScript } from 'next/document'

export default () => {
  return (
    <Html lang='en'>
      <Head>
        <link rel='shortcut icon' href='/favicon.ico' />
        <link rel='icon' type='image/png' sizes='32x32' href='favicon.png' />
        <link rel='manifest' href='/manifest.json' />
        <meta
          name='naver-site-verification'
          content='5770b408b415c074792f17dc04f3c22bf425cd93'
        />
        <script
          async
          src='https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2614705753736856'
          crossOrigin='anonymous'
        ></script>
      </Head>

      <body>
        <Main />
        <div id='portal-root' />
        <NextScript />
      </body>
    </Html>
  )
}
