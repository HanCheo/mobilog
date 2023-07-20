import { host } from '@/config/config'
import { useQuery } from '@tanstack/react-query'
import { FC } from 'react'
import { AnimatedNumber } from '../AnimatedNumber'
import Skeleton from 'react-loading-skeleton'

type GetVisitorResponse = {
  totalVisitor: number
}

const getVisitor = (): Promise<GetVisitorResponse> => {
  return fetch(`${host}/api/blog/visitor`).then((response) => {
    return response.json() as unknown as GetVisitorResponse
  })
}

export const VisitorCounter: FC = () => {
  const { data: visitorCountInfo, isLoading } = useQuery({
    queryKey: ['/api/blog/visitor'],
    queryFn: getVisitor
  })

  return (
    <div className='w-full flex flex-col'>
      <span>Total Visitor</span>

      <div className='font-bold text-green-500 dark:text-green-400 h-7'>
        {isLoading ? (
          <Skeleton width={70} height={30} />
        ) : (
          <AnimatedNumber
            num={visitorCountInfo.totalVisitor}
            fontStyle={{ fontSize: 22 }}
          />
        )}
      </div>
    </div>
  )
}
