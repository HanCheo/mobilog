import { useRouter } from 'next/router'
import Script from 'next/script'
import {
  FC,
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useEffect
} from 'react'

const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS

export const GaScript = () =>
  process.env.VERCEL_ENV === 'production' ? (
    <>
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
    </>
  ) : null

type GooglaAnalyticsContextProps = {
  pageview: (url: string) => void
  event: (_: {
    action: string
    category: string
    label: string
    value: unknown
  }) => void
}

const GooglaAnalyticsContext = createContext<GooglaAnalyticsContextProps>({
  pageview: () => {},
  event: () => {}
})

export const GooglaAnalyticsProvider: FC<PropsWithChildren<unknown>> = ({
  children
}) => {
  const router = useRouter()

  // https://developers.google.com/analytics/devguides/collection/gtagjs/pages
  const pageview = useCallback((url) => {
    if (process.env.VERCEL_ENV !== 'production') {
      return
    }
    ;(window as any).gtag('config', GA_TRACKING_ID, {
      page_path: url
    })
  }, [])

  // https://developers.google.com/analytics/devguides/collection/gtagjs/events
  const event = useCallback(({ action, category, label, value }) => {
    if (process.env.VERCEL_ENV !== 'production') {
      return
    }
    ;(window as any).gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value
    })
  }, [])

  useEffect(() => {
    function onRouteChangeComplete(url: string) {
      if (GA_TRACKING_ID) {
        pageview(url)
      }
    }

    router.events.on('routeChangeComplete', onRouteChangeComplete)
    router.events.on('hashChangeComplete', onRouteChangeComplete)

    return () => {
      router.events.off('routeChangeComplete', onRouteChangeComplete),
        router.events.off('hashChangeComplete', onRouteChangeComplete)
    }
  }, [pageview, router.events])

  return (
    <GooglaAnalyticsContext.Provider value={{ pageview, event }}>
      {children}
    </GooglaAnalyticsContext.Provider>
  )
}

export const useGoogleAnaliytics = () => useContext(GooglaAnalyticsContext)
