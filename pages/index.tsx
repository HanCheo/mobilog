import { TextTypeAnimator } from '@/client/components'
import { domain } from '@/config/config'
import { resolveNotionPage } from '@/server/services/resolveNotionPage'
import { DotLottiePlayer } from '@dotlottie/react-player'
import '@dotlottie/react-player/dist/index.css'
import { NotionPage } from 'client/layouts'

export const getStaticProps = async () => {
  try {
    const props = await resolveNotionPage()

    return { props, revalidate: 10 }
  } catch (err) {
    console.error('page error', domain, err)

    // we don't want to publish the error version of this page, so
    // let next.js know explicitly that incremental SSG failed
    throw err
  }
}

export default function NotionDomainPage(props) {
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
      <NotionPage {...props} />
      <div className='h-6' />
    </div>
  )
}
