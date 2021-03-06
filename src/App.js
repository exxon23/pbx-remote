import React from 'react'
import { ApolloProvider } from '@apollo/react-hooks'
import getClient from './graphql/apolloClient'

import { IPBXAPI } from './env.json'
import { ContextProvider } from './context/context'
import Phone from './containers/phone'
import initialState from './context/initialState'
import './App.scss'

const App = () => (
  <ApolloProvider client={getClient(IPBXAPI)}>
    <ContextProvider initialState={initialState}>
      <div className="App">
        <Phone />
      </div>
    </ContextProvider>
  </ApolloProvider>
)

export default App
