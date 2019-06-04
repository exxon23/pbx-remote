import ApolloClient from 'apollo-client'
import { WebSocketLink } from 'apollo-link-ws'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { split } from 'apollo-link'
import { HttpLink } from 'apollo-link-http'
import { getMainDefinition } from 'apollo-utilities'
import shortid from 'shortid'
import { setContext } from 'apollo-link-context'

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('anvilToken')
  return {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : ''
    }
  }
})

const createNetworkInterface = url =>
  split(
    ({ query }) => {
      const definition = getMainDefinition(query)
      return definition.kind === 'OperationDefinition' && definition.operation === 'subscription'
    },
    new WebSocketLink({
      timeout: 5000,
      uri: `wss://${url}`,
      options: {
        reconnect: true,
        connectionParams: () => ({
          Authorization: `Bearer ${localStorage.getItem('anvilToken')}`,
          correlationId: shortid.generate()
        })
      }
    }),
    authLink.concat(
      new HttpLink({
        uri: `https://${url}/graphql`
      })
    )
  )

const getClient = url =>
  new ApolloClient({
    link: createNetworkInterface(url),
    cache: new InMemoryCache({
      // dataIdFromObject: o => o.id || o.key || o.agentId || o.anvilId
    }),
    connectToDevTools: true
  })

export default getClient
