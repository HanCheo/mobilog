import { useTheme } from '@/client/providers/ThemeProvider'
import Link from 'next/link'

export const GithubJandi = () => {
  const { isDarkMode } = useTheme()

  return (
    <div>
      <span className='font-bold text-xl'>Jandi</span>

      <div className='max-sm:flex-col flex text-sm gap-2'>
        <div className='flex flex-col gap-2'>
          <Link
            href={'https://github.com/moby-101'}
            className='notion-link font-bold w-fit'
            target='_blank'
          >
            Moby
          </Link>
          <img
            src={`https://github.com/moby-101/moby-101/raw/main/profile-3d-contrib/${
              isDarkMode ? 'profile-night-rainbow.svg' : 'profile-green.svg'
            }`}
            alt={'moby-jandi'}
            width={'100%'}
          />
        </div>

        <div className='flex flex-col gap-2'>
          <Link
            href={'https://github.com/hancheo'}
            className='notion-link font-bold w-fit'
            target='_blank'
          >
            Hancheo
          </Link>
          <img
            src={`https://github.com/HanCheo/HanCheo/raw/master/profile-3d-contrib/${
              isDarkMode ? 'profile-night-rainbow.svg' : 'profile-green.svg'
            }`}
            alt={'hancheo-jandi'}
            width={'100%'}
          />
        </div>
      </div>
    </div>
  )
}
