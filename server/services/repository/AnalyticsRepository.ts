export interface AnalyticsRepository {
  totalVisitor: () => Promise<number>
  getPopulerPost: (limit?: number) => Promise<
    {
      postId: string
      viewCount: number
    }[]
  >
}

export const AnalyticsRepositoryToken = Symbol.for('analytics-repository')
