import { NextRequest } from 'next/server'
import { ImageResponse } from '@vercel/og'
import { api, apiHost, rootNotionPageId } from '@/config/config'
import { Page } from '@/client/components/icons'
import { NotionPageInfo } from '@/config/types'
import { format } from 'date-fns'
import { siteConfig } from '@/config/siteConfig'

const fontReguler = fetch(
  new URL('../../public/fonts/GmarketSansMedium.otf', import.meta.url)
).then((res) => res.arrayBuffer())

export const config = {
  runtime: 'experimental-edge'
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

  return new ImageResponse(
    (
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          alignItems: 'center',
          justifyContent: 'space-between',
          display: 'flex',
          flexDirection: 'column',
          fontFamily: '"Gmarket-Sans", sans-serif'
        }}
      >
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
            marginTop: 150,
            zIndex: '1',
            background: 'rgba(255,255,255,0.8)',
            display: 'flex',
            width: 600,
            borderRadius: 16,
            gap: 20,
            flexDirection: 'column',
            justifyContent: 'space-around',
            padding: 48,
            alignItems: 'center',
            textAlign: 'center'
          }}
        >
          <div
            style={{
              height: 94,
              width: 94,
              overflow: 'hidden',
              borderRadius: '50%'
            }}
          >
            {!pageInfo.authorImage ? (
              <img
                src={pageInfo.authorImage}
                style={{
                  width: '100%',
                  height: '100%'
                }}
              />
            ) : (
              <div style={{ padding: 12 }}>
                <Page width={'100%'} />
              </div>
            )}
          </div>
          <div
            style={{
              fontSize: 25,
              fontWeight: 700,
              fontFamily: 'Gmarket-Sans'
            }}
          >
            {pageInfo.title}
          </div>

          <div
            style={{
              fontSize: 20,
              fontWeight: 700,
              fontFamily: 'Gmarket-Sans'
            }}
          >
            {pageInfo.detail}
          </div>
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
            background: 'rgba(255,255,255,0.8)',
            zIndex: '1'
          }}
        >
          <img src={'./favicon.png'} width={40} />
          <div style={{ fontSize: 20 }}>{siteConfig.domain}</div>
          {pageInfo.publishedAt && (
            <div>{format(new Date(pageInfo.publishedAt), 'yy-MM-dd')}</div>
          )}
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
          style: 'normal',
          weight: 400
        },
        {
          name: 'Gmarket-Sans',
          data: RegularFont,
          style: 'normal',
          weight: 700
        }
      ]
    }
  )
}
