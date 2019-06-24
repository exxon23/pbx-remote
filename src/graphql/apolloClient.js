import { getMainDefinition } from 'apollo-utilities'
import { WebSocketLink } from 'apollo-link-ws'
import { HttpLink } from 'apollo-link-http'
import { setContext } from 'apollo-link-context'
import { split } from 'apollo-link'
import ApolloClient from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'

const createNetworkInterface = url => {
  const wsLink = new WebSocketLink({
    timeout: 5000,
    uri: `wss://${url}`,
    options: {
      reconnect: true,
      connectionParams: () => ({
        Authorization: `Bearer ${localStorage.getItem('anvilToken')}`
      })
    }
  })

  const httpLink = new HttpLink({
    uri: `https://${url}/graphql`
  })

  const authLink = setContext((request, previousContext) => {
    const token = localStorage.getItem('anvilToken')
    return {
      headers: {
        ...previousContext.headers,
        Authorization: token ? `Bearer ${token}` : ''
      }
    }
  })

  const authHttpLink = authLink.concat(httpLink)

  return split(
    ({ query }) => {
      const { kind, operation } = getMainDefinition(query)
      return kind === 'OperationDefinition' && operation === 'subscription'
    },
    wsLink,
    authHttpLink
  )
}

const getClient = url =>
  new ApolloClient({
    link: createNetworkInterface(url),
    cache: new InMemoryCache(),
    connectToDevTools: true
  })

export default getClient
