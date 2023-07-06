import React from 'react'
import ReactDOM from 'react-dom'

type Props = {
  children: React.ReactNode
}

export const Portal = React.memo<Props>(({ children }) => {
  return ReactDOM.createPortal(children, document.getElementById('modal-root'))
})
