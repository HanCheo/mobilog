import { useTheme } from 'front/providers/ThemeProvider'
import Giscus from '@giscus/react'
import { FC } from 'react'

export const Comment: FC = () => {
  const { isDarkMode } = useTheme()

  return (
    <div className='m-auto px-6 max-w-1200 w-full pb-5'>
      <Giscus
        repo='HanCheo/mobilog'
        repoId='R_kgDOJo538Q'
        category='Announcements'
        categoryId='DIC_kwDOJo538c4CXAhg'
        mapping='pathname'
        strict='0'
        reactions-enabled='1'
        emit-metadata='0'
        input-position='top'
        theme={isDarkMode ? 'dark_dimmed' : 'light'}
        lang='en'
        loading='lazy'
      />
    </div>
  )
}
