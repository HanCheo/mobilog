import Giscus from '@giscus/react'

import { useDarkMode } from '@/lib/use-dark-mode'

export const Comment = () => {
  const { isDarkMode } = useDarkMode()

  return (
    <div className='m-auto px-6 max-w-5xl w-full'>
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
