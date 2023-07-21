import { UseCase, Post } from '@/server/types'
import { inject, singleton } from 'tsyringe'
import {
  type AnalyticsRepository,
  type NotionHqRepository,
  AnalyticsRepositoryToken,
  NotionHqRepositoryToken
} from '../../repository'

type Request = {
  limit: number
}

type Response = {
  post: Post
  viewCount: number
}[]

@singleton()
export class GetPopulerPosts implements UseCase<Request, Promise<Response>> {
  constructor(
    @inject(AnalyticsRepositoryToken)
    private analyticsRepository: AnalyticsRepository,
    @inject(NotionHqRepositoryToken)
    private notionHqRepositoy: NotionHqRepository
  ) {}

  public async execute({ limit }: Request): Promise<Response> {
    const polpulerPostIds = await this.analyticsRepository.getPopulerPost(limit)

    const posts = (await Promise.all(
      polpulerPostIds.map(({ postId }) =>
        this.notionHqRepositoy.pages.retrieve({
          page_id: postId
        })
      )
    )) as Post[]

    return posts.map((post) => ({
      post,
      viewCount:
        polpulerPostIds.find(
          ({ postId }) => postId === post.id.replace(/-/g, '')
        )?.viewCount ?? 0
    }))
  }
}
