import { useEffect, useRef, useState } from 'react'

import { useTheme } from 'client/providers/ThemeProvider'
import mermaid from 'mermaid'
import { getTextContent } from 'notion-utils'

import { BlockMap } from 'back/lib/types'

type MermaidProps = {
  block: BlockMap & {
    properties: BlockMap['properties'] & {
      title?: any
    }
  }
}

export const Mermaid = ({ block }: MermaidProps) => {
  const { isDarkMode } = useTheme()

  useEffect(() => {
    mermaid.initialize({ theme: isDarkMode ? 'dark' : 'neutral' })
  }, [isDarkMode])

  const source = getTextContent(block.properties.title ?? '')
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
