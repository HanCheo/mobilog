import { FC, memo } from 'react'

import { FaEnvelopeOpenText } from '@react-icons/all-files/fa/FaEnvelopeOpenText'
import { FaGithub } from '@react-icons/all-files/fa/FaGithub'
import { FaLinkedin } from '@react-icons/all-files/fa/FaLinkedin'
import { FaYoutube } from '@react-icons/all-files/fa/FaYoutube'

import * as config from 'back/lib/config'
import styles from '@/styles/styles.module.css'

export const FooterImpl: FC = () => (
  <footer className={styles.footer}>
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
)

export const Footer = memo(FooterImpl)
