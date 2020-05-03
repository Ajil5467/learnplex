import Head from 'next/head'
import React from 'react'
import { Layout } from 'antd'
import { createClient } from '@urql/core'
import urljoin from 'url-join'
import { Provider } from 'urql'

import { Header } from './layout'
import { getServerEndPoint } from '../utils/getServerEndPoint'

export default function App({ Component }: { Component: any }) {
  const client = createClient({
    url: urljoin(getServerEndPoint(), 'graphql'),
    requestPolicy: 'network-only',
    fetchOptions: () => {
      return {
        credentials: 'include',
      }
    },
  })
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <link rel="preconnect" href={getServerEndPoint()} />
      </Head>
      <Layout className={'mh-100vh bg-initial'}>
        <Layout.Header className={'bg-initial'}>
          {/* TODO: Without Provider, useEffect is not running in useUser hook, figure out why */}
          <Provider value={client}>
            <Header />
          </Provider>
        </Layout.Header>
        <Layout.Content className={'p-5 h-100p'}>{Component}</Layout.Content>
      </Layout>
    </>
  )
}
