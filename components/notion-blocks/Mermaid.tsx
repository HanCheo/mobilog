import { useEffect, useRef, useState } from 'react'

import mermaid from 'mermaid'
import { getTextContent } from 'notion-utils'

import { BlockMap } from '@/lib/types'
import { useDarkMode } from '@/lib/use-dark-mode'

type MermaidProps = {
  block: BlockMap & {
    properties: BlockMap['properties'] & {
      title?: any
    }
  }
}

export default function Mermaid({ block }: MermaidProps) {
  const { isDarkMode } = useDarkMode()

  useEffect(() => {
    mermaid.initialize({ theme: isDarkMode ? 'dark' : 'neutral' })
  }, [isDarkMode])

  const source = getTextContent(block.properties.title)
  const container = useRef(null)
  const [svg, setSVG] = useState('')

  useEffect(() => {
    mermaid
      .render(`mermaid-${block.id}`, source, container.current)
      .then(({ svg }) => setSVG(svg))
  }, [block, source])

  return (
    <div
      ref={container}
      className='w-full leading-normal flex justify-center'
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  )
}
