import {
  TextTypeAnimator,
  VisitorCounter,
  BuyMeACoffee,
  GithubJandi,
  RecentPostList
} from '@/client/components'
import { DotLottiePlayer } from '@dotlottie/react-player'
import '@dotlottie/react-player/dist/index.css'

export default function NotionDomainPage() {
  return (
    <div>
      <div className='max-w-1200 mx-auto pt-20 pb-10 px-6 flex max-md:pt-20 max-md:pb-10 justify-between relative items-center overflow-hidden'>
        <div className='font-extrabold max-sm:text-2xl text-3xl z-10'>
          <div>Hello!</div>
          <div className='flex'>
            I&apos;m&nbsp;
            <TextTypeAnimator
              className='block text-green-500 backdrop-blur-sm dark:text-green-400 whitespace-nowrap'
              sequence={['Software Engineer', 2000, 'Problem Solver', 2000]}
            />
          </div>
        </div>
        <div className='[&_path]:stroke-black w-80 absolute -right-8'>
          <DotLottiePlayer
            src='/lotties/core.lottie'
            autoplay
            speed={0.5}
            loop
          />
        </div>
      </div>
      <div className='flex max-sm:flex-col max-sm:items-center gap-2 max-w-1200 mx-auto px-6 mt-3 justify-between'>
        <div className='self-start'>
          <VisitorCounter />
        </div>
        <div>
          <BuyMeACoffee />
        </div>
      </div>
      <div className='max-w-1200 mx-auto px-6 mt-3 grid gap-2'>
        <RecentPostList />
        <GithubJandi />
      </div>
      <div className='h-6' />
    </div>
  )
}
