import React from 'react'
import { ApolloProvider } from 'react-apollo-hooks'
import getClient from './graphql/apolloClient'
import Content from './containers/content'
import ControlPanel from './containers/controlPanel'
import { ContextProvider } from './context/context'
import { CallsListener } from './components'
import initialState from './context/initialState'

import './App.scss'

const App = () => (
  <ApolloProvider client={getClient('ipbxapi-dev.voipex.io')}>
    <ContextProvider initialState={initialState}>
      <div className="App">
        <CallsListener />
        <Content />
        <ControlPanel />
      </div>
    </ContextProvider>
  </ApolloProvider>
)

export default App
