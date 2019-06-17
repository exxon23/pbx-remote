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
    {/* <ApolloProvider client={getClient('ipbx-api.localhost')}> */}
    <ContextProvider initialState={initialState}>
      <div className="App">
        <div className="pbx-remote__wrapper">
          <CallsListener />
          <Content />
          <ControlPanel />
        </div>
      </div>
    </ContextProvider>
  </ApolloProvider>
)

export default App
