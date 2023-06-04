import styles from '@/styles/styles.module.css'

import { LoadingIcon } from './LoadingIcon'

export const Loading: React.FC = () => (
  <div className={styles.container}>
    <LoadingIcon />
  </div>
)
