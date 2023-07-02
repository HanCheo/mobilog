import { Head, Html, Main, NextScript } from 'next/document'
import { IconContext } from '@react-icons/all-files'

export default () => {
  return (
    <IconContext.Provider value={{ style: { verticalAlign: 'middle' } }}>
      <Html lang='en'>
        <Head>
          <link rel='shortcut icon' href='/favicon.ico' />
          <link rel='icon' type='image/png' sizes='32x32' href='favicon.png' />
          <link rel='manifest' href='/manifest.json' />
          <meta
            name='google-site-verification'
            content='q4oalwUGELyfH7huZ4Ly1FBTWFbyoPZ6LbitF_76THg'
          />
          <meta
            name='naver-site-verification'
            content='f27a9e9c59cf024a065a45ccd1f034304ec66a43'
          />
        </Head>

        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    </IconContext.Provider>
  )
}
