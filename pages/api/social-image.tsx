import { NextRequest } from 'next/server'
import { ImageResponse } from '@vercel/og'
import { api, apiHost, rootNotionPageId } from '@/config/config'
import type { NotionPageInfo } from '@/config/types'
import { siteConfig } from '@/config/siteConfig'
import { Page } from '@/client/components/icons'

const fontReguler = fetch(
  new URL('../../public/fonts/GmarketSansMedium.woff', import.meta.url)
).then((res) => res.arrayBuffer())

export const config = {
  runtime: 'edge'
}

export default async function OGImage(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const pageId = searchParams.get('id') || rootNotionPageId
  if (!pageId) {
    return new Response('Invalid notion page id', { status: 400 })
  }

  const pageInfoRes = await fetch(`${apiHost}${api.getNotionPageInfo}`, {
    method: 'POST',
    body: JSON.stringify({ pageId }),
    headers: {
      'content-type': 'application/json'
    }
  })
  if (!pageInfoRes.ok) {
    return new Response(pageInfoRes.statusText, { status: pageInfoRes.status })
  }
  const pageInfo: NotionPageInfo = await pageInfoRes.json()
  const [RegularFont] = await Promise.all([fontReguler])

  const publishedAt = pageInfo.publishedAt
    ? new Date(pageInfo.publishedAt)
    : undefined

  return new ImageResponse(
    (
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          alignItems: 'center',
          justifyContent: 'space-between',
          fontFamily: 'Gmarket-Sans, sans-serif',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <div />
        {pageInfo.image && (
          <img
            src={pageInfo.image}
            style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              filter: 'blur(5px)'
            }}
          />
        )}

        <div
          style={{
            zIndex: '1',
            background: 'rgba(255,255,255,0.8)',
            display: 'flex',
            width: 600,
            borderRadius: 16,
            flexDirection: 'column',
            padding: '24px 48px',
            alignItems: 'center',
            textAlign: 'center'
          }}
        >
          <div
            style={{
              height: 94,
              width: 94,
              display: 'flex',
              marginBottom: 20,
              overflow: 'hidden',
              borderRadius: '50%'
            }}
          >
            {pageInfo.authorImage ? (
              <img
                src={pageInfo.authorImage}
                style={{
                  width: '100%',
                  height: '100%'
                }}
              />
            ) : (
              <div
                style={{
                  display: 'flex',
                  width: '100%',
                  padding: 12
                }}
              >
                <Page width={70} />
              </div>
            )}
          </div>
          <div
            style={{
              display: 'flex',
              marginBottom: 20,
              fontSize: 25,
              wordBreak: 'normal',
              fontWeight: 700
            }}
          >
            {pageInfo.title}
          </div>

          <div
            style={{
              display: 'flex',
              fontSize: 20,
              fontWeight: 700
            }}
          >
            {pageInfo.detail}
          </div>
          {publishedAt && (
            <div
              style={{
                display: 'flex',
                marginTop: 24
              }}
            >
              {publishedAt.getFullYear().toString().slice(2, 4) +
                '.' +
                (publishedAt.getMonth() + 1 < 10
                  ? '0' + (publishedAt.getMonth() + 1)
                  : publishedAt.getMonth() + 1) +
                '.' +
                (publishedAt.getDate() + 1 < 10
                  ? '0' + (publishedAt.getDate() + 1)
                  : publishedAt.getDate() + 1)}
            </div>
          )}
        </div>
        <div
          style={{
            position: 'relative',
            width: '100%',
            height: 140,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            background: 'rgba(255,255,255,0.8)'
          }}
        >
          <img src={'https://mobilog.me/favicon.png'} width={40} />
          <div
            style={{
              display: 'flex',
              fontSize: 20,
              marginTop: 5
            }}
          >
            {siteConfig.domain}
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: 'Gmarket-Sans',
          data: RegularFont,
          style: 'normal'
        }
      ]
    }
  )
}
