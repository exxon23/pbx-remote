import React, { useContext, useEffect } from 'react'
import { useSubscription } from 'react-apollo-hooks'
import { Context } from '../context/context'
import { Error } from '../components'
import gql from 'graphql-tag'

const SUBSCRIPTION_CALL = gql`
  subscription {
    calls {
      type
      value {
        agentId
        callerId
        callerIdentity
        direction
        entryTime
      }
    }
  }
`
const CallsListener = () => {
  const { setActiveCall } = useContext(Context)
  let { data = { calls: {} }, error } = useSubscription(SUBSCRIPTION_CALL)

  useEffect(() => {
    const { type, value: call } = data.calls
    switch (type) {
      case 'add':
      case 'change':
        setActiveCall(call)
        break
      case 'remove':
        setActiveCall(null)
        break
    }
  }, [data.calls.type])

  if (error) {
    console.error('[SUBSCRIPTION]', error)
    return <Error reason={error.message} />
  }

  return null
}

export default CallsListener
