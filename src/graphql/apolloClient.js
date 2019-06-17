import { getMainDefinition } from 'apollo-utilities'
import { WebSocketLink } from 'apollo-link-ws'
import { HttpLink } from 'apollo-link-http'
import { setContext } from 'apollo-link-context'
import { split } from 'apollo-link'
import ApolloClient from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'

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
          Authorization: `Bearer ${localStorage.getItem('anvilToken')}`
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
    cache: new InMemoryCache(),
    connectToDevTools: true
  })

export default getClient
