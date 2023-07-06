import { MouseEvent, ReactNode, useCallback, useState } from 'react'
import { Portal } from '../Portal/Portal'
import { motion } from 'framer-motion'

type ModalProps = {
  defaultOpen?: boolean
  modalOpener: ({
    open
  }: {
    open: (e?: MouseEvent<HTMLDivElement>) => void
  }) => ReactNode
  children: ({
    close
  }: {
    close: (e?: MouseEvent<HTMLDivElement>) => void
  }) => ReactNode
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
          <div className='fixed top-0 w-full h-full'>
            <div
              onClick={close}
              className='bg-zinc-900 bg-opacity-30 backdrop-blur-sm w-full h-full'
            />
            <div className='fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-w-xl max-md:max-w-4/5'>
              <motion.div
                animate={{
                  opacity: [0, 0.6, 1],
                  scale: [0.8, 1]
                }}
                transition={{ type: 'spring' }}
                className='drop-shadow-xl bg-bg-color-default rounded-md px-6 py-8'
              >
                {children({ close })}
              </motion.div>
            </div>
          </div>
        </Portal>
      )}
    </>
  )
}
