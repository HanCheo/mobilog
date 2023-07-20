import Skeleton from 'react-loading-skeleton'
import { list } from 'radash'

export const TagSkeleton = ({ count }: { count?: number }) => (
  <>
    {list(count ? count - 1 : 0).map((_, index) => (
      <Skeleton
        key={index}
        className='!w-20 h-8 !rounded-3xl'
        containerClassName='flex'
      />
    ))}
  </>
)
