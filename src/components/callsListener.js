import React, { useContext, useEffect } from 'react'
import { useSubscription } from 'react-apollo-hooks'
import { Context } from '../context/context'
import { Error } from '../components'
import gql from 'graphql-tag'

const SUBSCRIPTION_CALL = gql`
  subscription {
    callEvents {
      type
      parameters {
        number
        entryTime
      }
    }
  }
`
const CallsListener = () => {
  const { setActiveCall, setActivePage, setCallEntryTime } = useContext(Context)
  let { data = { callEvents: {} }, error } = useSubscription(SUBSCRIPTION_CALL)

  useEffect(() => {
    const { type, parameters } = data.callEvents
    switch (type) {
      case 'incoming':
        setActiveCall(parameters)
        setActivePage('ringing')
        break
      case 'outgoing':
        setActiveCall(parameters)
        setActivePage('inCall')
        break
      case 'rejectedIncoming':
        setActiveCall(null)
        setActivePage('home')
        break
      case 'acceptedIncoming':
        setCallEntryTime(parameters.entryTime)
        setActivePage('inCall')
        break
      case 'ended':
        setActiveCall(null)
        setActivePage('home')
        break
      default:
        console.log('Unsupported type ', type)
        break
    }
  }, [data.callEvents])

  if (error) {
    console.error('[SUBSCRIPTION]', error)
    return <Error reason={error.message} />
  }

  return null
}

export default CallsListener
