import { AnalyticsRepository } from '@/server/services/repository/AnalyticsRepository'
import { BetaAnalyticsDataClient } from '@google-analytics/data'
import { singleton } from 'tsyringe'

export class GoogleAnalitycsConfig {
  constructor(
    public projectId: string,
    public clientEmail: string,
    public privateKey: string,
    public propertyId: string
  ) {}
}

@singleton()
export class GoogleAnalytics
  extends BetaAnalyticsDataClient
  implements AnalyticsRepository
{
  private _propertyId: string

  constructor(private googleAnalitycsConfig: GoogleAnalitycsConfig) {
    super({
      projectId: googleAnalitycsConfig.projectId,
      credentials: {
        client_email: googleAnalitycsConfig.clientEmail,
        private_key: googleAnalitycsConfig.privateKey
      }
    })
    this._propertyId = googleAnalitycsConfig.propertyId
  }

  public async getPopulerPost(limit?: number): Promise<
    {
      postId: string
      viewCount: number
    }[]
  > {
    const [response] = await super.runReport({
      property: `properties/${this._propertyId}`,
      dimensions: [{ name: 'pagePath' }],
      metrics: [{ name: 'screenPageViews' }],
      dateRanges: [{ startDate: '2023-05-28', endDate: 'today' }],
      dimensionFilter: {
        filter: {
          fieldName: 'pagePath',
          stringFilter: {
            matchType: 'BEGINS_WITH',
            value: '/posts',
            caseSensitive: false
          }
        }
      },
      limit: limit ?? 5,
      orderBys: [{ metric: { metricName: 'screenPageViews' }, desc: true }]
    })

    return response.rows.map(({ dimensionValues, metricValues }) => ({
      postId: dimensionValues[0].value.split('/').at(-1),
      viewCount: Number(metricValues[0].value) ?? 0
    }))
  }

  public async totalVisitor(): Promise<number> {
    const [response] = await super.runReport({
      property: `properties/${this._propertyId}`,
      metrics: [{ name: 'sessions' }],
      dateRanges: [{ startDate: '2023-05-28', endDate: 'today' }]
    })

    return Number(response.rows[0].metricValues[0].value) ?? 0
  }
}
