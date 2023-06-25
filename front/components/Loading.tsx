import styles from '@/styles/styles.module.css'
import * as Icon from './icons'
import { FC } from 'react'

export const Loading: FC = () => (
  <div className={styles.container}>
    <Icon.Loading />
  </div>
)
