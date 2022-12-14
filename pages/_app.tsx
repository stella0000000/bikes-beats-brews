import type { AppProps } from 'next/app'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react'
import '@styles/globals.css'
import { BurgerMenu } from '@components/burgerMenu'
import { Modal } from '@components/modal'
import { BrewContext } from '@utils/context'
import { getBrew } from '@utils/getBrew'

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter()
  const [modalOpen, setModalOpen] = useState<boolean>(false)
  const brew = useRef<string>()

  useEffect(() => {
    const date = new Date()
    const hour = date.getHours()
    document.documentElement.dataset.theme = getBrew(hour)
  }, [])

  if (!brew.current) {
    const date = new Date()
    const hour = date.getHours()
    brew.current = getBrew(hour)
  }

  return (
    <>
      <Head>
        <title>bikes, beats, and brews</title>
        <meta name="description" content="bike to brews while listening to beats" />
        <link rel="icon" href="/images/favicon.ico" />
      </Head>
      {brew.current && 
        (<BrewContext.Provider value={brew.current}>
          {router.pathname !== "/" ?
            (
              <>
                <BurgerMenu modalOpen={modalOpen} setModalOpen={setModalOpen} />
                <Modal modalOpen={modalOpen} setModalOpen={setModalOpen} />
              </>
            )
            : null
          }
          
          <Component {...pageProps} modalOpen={modalOpen} setModalOpen={setModalOpen} />
        </BrewContext.Provider>)
      }
    </>
  )
}

export default MyApp
