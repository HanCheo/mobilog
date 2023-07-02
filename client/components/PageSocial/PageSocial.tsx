import styles from '@/styles/pageSocial.module.css'
import cs from 'classnames'
import { socialLinks } from './socialLinks'

export const PageSocial: React.FC = () => {
  return (
    <div className={cs(styles.pageSocial, 'mt-5')}>
      {socialLinks.map((action) => (
        <a
          className={cs(styles.action, styles[action.name])}
          href={action.href}
          key={action.name}
          title={action.title}
          target='_blank'
          rel='noopener noreferrer'
        >
          <div className={styles.actionBg}>
            <div className={styles.actionBgPane} />
          </div>

          <div className={styles.actionBg}>{action.icon}</div>
        </a>
      ))}
    </div>
  )
}
