import { host } from '@/config/config'
import { useQuery } from '@tanstack/react-query'
import { FC } from 'react'
import * as Icon from '../icons'
import { AnimatedNumber } from '../AnimatedNumber'

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
      {isLoading && (
        <div className='flex items-center justify-center'>
          <Icon.Loading />
        </div>
      )}
      {!isLoading && (
        <div className='font-bold text-green-500 dark:text-green-400 '>
          <AnimatedNumber
            num={visitorCountInfo.totalVisitor}
            fontStyle={{ fontSize: 20 }}
          />
        </div>
      )}
    </div>
  )
}
