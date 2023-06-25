import { FC, memo, useCallback, useEffect, useRef } from 'react'

import { FaEnvelopeOpenText } from '@react-icons/all-files/fa/FaEnvelopeOpenText'
import { FaGithub } from '@react-icons/all-files/fa/FaGithub'
import { FaLinkedin } from '@react-icons/all-files/fa/FaLinkedin'
import { FaYoutube } from '@react-icons/all-files/fa/FaYoutube'

import * as config from '@/config/config'
import styles from '@/styles/styles.module.css'

export const FooterImpl: FC = () => {
  const sentinelRef = useRef<HTMLDivElement>(undefined)
  const footerRef = useRef<HTMLDivElement>(undefined)

  const handler = useCallback(([entry]) => {
    if (footerRef.current) {
      footerRef.current?.classList.toggle(
        styles.showFooter,
        entry.isIntersecting
      )
    }
  }, [])
  useEffect(() => {
    const sentinelEl = sentinelRef.current
    const observer = new window.IntersectionObserver(handler, {
      rootMargin: '-30px'
    })
    observer.observe(sentinelEl)

    return () => {
      sentinelEl && observer.unobserve(sentinelEl)
    }
  }, [handler])

  return (
    <div>
      <div ref={sentinelRef} className='h-16' />

      <footer className={styles.footer} ref={footerRef}>
        <div className={styles.copyright}>Copyright 2023 {config.author}</div>

        <div className={styles.social}>
          {config.github && (
            <a
              className={styles.github}
              href={`https://github.com/${config.github}`}
              title={`GitHub @${config.github}`}
              target='_blank'
              rel='noopener noreferrer'
            >
              <FaGithub />
            </a>
          )}

          {config.linkedin && (
            <a
              className={styles.linkedin}
              href={`https://www.linkedin.com/in/${config.linkedin}`}
              title={`LinkedIn ${config.author}`}
              target='_blank'
              rel='noopener noreferrer'
            >
              <FaLinkedin />
            </a>
          )}

          {config.newsletter && (
            <a
              className={styles.newsletter}
              href={`${config.newsletter}`}
              title={`Newsletter ${config.author}`}
              target='_blank'
              rel='noopener noreferrer'
            >
              <FaEnvelopeOpenText />
            </a>
          )}

          {config.youtube && (
            <a
              className={styles.youtube}
              href={`https://www.youtube.com/${config.youtube}`}
              title={`YouTube ${config.author}`}
              target='_blank'
              rel='noopener noreferrer'
            >
              <FaYoutube />
            </a>
          )}
        </div>
      </footer>
    </div>
  )
}
export const Footer = memo(FooterImpl)
