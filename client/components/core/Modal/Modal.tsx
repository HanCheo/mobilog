import { MouseEvent, ReactNode, useCallback, useState } from 'react'
import { Portal } from '../Portal'
import { motion } from 'framer-motion'
import { VscChromeClose } from '@react-icons/all-files/vsc/VscChromeClose'

type ModalProps = {
  defaultOpen?: boolean
  modalOpener: ({
    open
  }: {
    open: (e?: MouseEvent<Element>) => void
  }) => ReactNode
  children:
    | (({ close }: { close: (e?: MouseEvent<Element>) => void }) => ReactNode)
    | ReactNode
}

export const Modal = ({ defaultOpen, modalOpener, children }: ModalProps) => {
  const [isModalOpen, setIsModalOpen] = useState(defaultOpen ?? false)

  const open = useCallback((e?: MouseEvent<HTMLDivElement>) => {
    e?.preventDefault()
    setIsModalOpen(true)
  }, [])

  const close = useCallback((e?: MouseEvent<HTMLDivElement>) => {
    e?.preventDefault()
    setIsModalOpen(false)
  }, [])

  return (
    <>
      {modalOpener({ open })}
      {isModalOpen && (
        <Portal>
          <div className='fixed top-0 w-full h-full' style={{ zIndex: 1000 }}>
            <div
              onClick={close}
              className='bg-zinc-900 bg-opacity-30 backdrop-blur-sm w-full h-full'
            />
            <div className='fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
              <motion.div
                animate={{
                  opacity: [1],
                  scale: [0.8, 1]
                }}
                transition={{ type: 'spring' }}
                className='drop-shadow-xl bg-bg-color-default rounded-md px-6 py-8'
              >
                <div
                  className='absolute top-3 right-3 cursor-pointer'
                  onClick={close}
                >
                  <VscChromeClose className='w-5 h-5' />
                </div>
                {typeof children === 'function'
                  ? children({ close })
                  : children}
              </motion.div>
            </div>
          </div>
        </Portal>
      )}
    </>
  )
}
