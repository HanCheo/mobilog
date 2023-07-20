import Skeleton from 'react-loading-skeleton'
import { Page } from '../icons'
import { list } from 'radash'

export const PostItemSkeleton = ({ count }: { count?: number }) =>
  list(count ? count - 1 : 0).map((_, index) => (
    <div
      key={index}
      className='notion-collection-card !hover:bg-inherit cursor-wait notion-collection-card-size-small'
    >
      <div className='notion-collection-card-cover leading-none'>
        <Skeleton containerClassName='flex-1' />
      </div>
      <div className='notion-collection-card-body'>
        <div className='notion-collection-card-property'>
          <span className='notion-property notion-property-title'>
            <span className='notion-page-link'>
              <span className='notion-page-title w-full'>
                <div className='notion-page-icon-inline notion-page-icon-image'>
                  <Page />
                </div>
                <span className='notion-page-title-text'>
                  <Skeleton />
                </span>
              </span>
            </span>
          </span>
        </div>
        <div className='notion-collection-card-property'>
          <span className='notion-property notion-property-date'>
            <Skeleton width={'30%'} />
          </span>
        </div>
        <div className='notion-collection-card-property'>
          <span className='notion-property notion-property-text'>
            <Skeleton />
          </span>
        </div>
        <div className='notion-collection-card-property'>
          <span className='notion-property notion-property-multi_select w-full'>
            <Skeleton width={40} />
          </span>
        </div>
      </div>
    </div>
  ))
