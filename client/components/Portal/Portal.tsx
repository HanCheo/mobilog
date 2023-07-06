import React from 'react'
import ReactDOM from 'react-dom'

type Props = {
  children: React.ReactNode
}

export const Portal = React.memo<Props>(({ children }) => {
  const element =
    typeof window !== 'undefined' && document.getElementById('portal-root')

  return element && children ? ReactDOM.createPortal(children, element) : null
})
