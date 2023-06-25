import { Head } from 'client/components'

import * as types from 'back/lib/types'
import styles from '@/styles/styles.module.css'

export const NotFoundPage: React.FC<types.PageProps> = ({
  site,
  pageId,
  error
}) => {
  const title = site?.name || 'Notion Page Not Found'

  return (
    <>
      <Head site={site} title={title} />

      <div className={styles.container}>
        <main className={styles.main}>
          <h1>Notion Page Not Found</h1>

          {error ? (
            <p>{error.message}</p>
          ) : (
            pageId && (
              <p>
                Make sure that Notion page &quot;{pageId}&quot; is publicly
                accessible.
              </p>
            )
          )}

          <img
            src='/404.png'
            alt='404 Not Found'
            className={styles.errorImage}
          />
        </main>
      </div>
    </>
  )
}
