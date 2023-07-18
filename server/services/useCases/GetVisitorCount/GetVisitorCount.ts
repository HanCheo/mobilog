import { UseCase } from '@/server/types/UseCase'
import { inject, singleton } from 'tsyringe'
import {
  type AnalyticsRepository,
  AnalyticsRepositoryToken
} from '../../repository'

type Response = {
  totalVisitor: number
}

@singleton()
export class GetVisitorCount implements UseCase<void, Promise<Response>> {
  constructor(
    @inject(AnalyticsRepositoryToken)
    private analyticsRepository: AnalyticsRepository
  ) {}

  public async execute(): Promise<Response> {
    const totalVisitor = await this.analyticsRepository.totalVisitor()

    return {
      totalVisitor
    }
  }
}
