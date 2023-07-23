import 'reflect-metadata'
import 'react-loading-skeleton/dist/skeleton.css'
import type { AppProps } from 'next/app'

import {
  GaScript,
  GooglaAnalyticsProvider
} from 'client/providers/GoogleAnalyticsProvider'
import { Analytics } from '@vercel/analytics/react'
import {
  Hydrate,
  QueryClient,
  QueryClientProvider
} from '@tanstack/react-query'
// used for rendering equations (optional)
import 'katex/dist/katex.min.css'
// used for code syntax highlighting (optional)
import 'prismjs/themes/prism-coy.css'
// core styles shared by all of react-notion-x (required)
import '@/styles/react-notion-x.css'
import '@/styles/global.css'
// global style overrides for notion
import '@/styles/notion.css'
// global style overrides for prism theme (optional)
import { useState } from 'react'
import { Footer, Head, Header } from '@/client/components'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { THEME, ThemeProvider } from 'client/providers/ThemeProvider'
import { defaultPageCover, description, domain, name } from '@/config/config'

export default function App({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient())
  const title = name
  const canonicalPageUrl = `https://${domain}`
  const socialImage = defaultPageCover
  const socialDescription = description

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <Analytics />
        <Head
          title={title}
          description={socialDescription}
          image={socialImage}
          url={canonicalPageUrl}
        />
        <GooglaAnalyticsProvider>
          <GaScript />
          <ThemeProvider defaultTheme={THEME.Light}>
            <Header />
            <Component {...pageProps} />
            <Footer />
          </ThemeProvider>
        </GooglaAnalyticsProvider>
      </Hydrate>
      <ReactQueryDevtools initialIsOpen={true} />
    </QueryClientProvider>
  )
}
