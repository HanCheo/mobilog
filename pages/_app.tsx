// global styles shared across the entire site
import type { AppProps } from 'next/app'

import { GooglaAnalyticsProvider } from 'front/providers/GoogleAnalyticsProvider'
import { ThemeProvider } from 'front/providers/ThemeProvider'
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
import 'react-notion-x/src/styles.css'
import '@/styles/global.css'
// global style overrides for notion
import '@/styles/notion.css'
// global style overrides for prism theme (optional)
import { useState } from 'react'
import { Footer } from 'front/components'

export default function App({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient())

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <Analytics />
        <GooglaAnalyticsProvider>
          <ThemeProvider>
            <Component {...pageProps} />
            <Footer />
          </ThemeProvider>
        </GooglaAnalyticsProvider>
      </Hydrate>
    </QueryClientProvider>
  )
}
