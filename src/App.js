import React from 'react'
import { ApolloProvider } from 'react-apollo-hooks'

import getClient from './graphql/apolloClient'
import Content from './containers/content'
import ControlPanel from './containers/controlPanel'
import { ContextProvider } from './context/context'
import initialState from './context/initialState'

import './App.scss'

const App = () => (
  <ApolloProvider client={getClient('ipbxapi-devel.voipex.io')}>
    <ContextProvider initialState={initialState}>
      <div className="App">
        <Content />
        <ControlPanel />
      </div>
    </ContextProvider>
  </ApolloProvider>
)

export default App
