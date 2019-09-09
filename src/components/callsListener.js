import React, { useContext, useEffect } from 'react'
import { useSubscription } from '@apollo/react-hooks'
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
        value
        type
      }
    }
  }
`
const CallsListener = () => {
  const {
    authorized,
    setAuthorized,
    setActiveCall,
    setActivePage,
    setCallEntryTime,
    setCallHold
  } = useContext(Context)
  let { data = { callEvents: {} }, error } = useSubscription(SUBSCRIPTION_CALL)
  useEffect(() => {
    const { type, parameters } = data.callEvents
    if (!error && !authorized) setAuthorized(true)

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
      case 'hold':
        setCallHold(parameters.value)
        break
      default:
        console.log('Unsupported type ', type)
        break
    }
  }, [data.callEvents, error])

  if (error) {
    console.error('[SUBSCRIPTION]', error)
    if (authorized) {
      setAuthorized(false)
      localStorage.removeItem('anvilToken')
    }
    return <Error reason={error.message} />
  }

  return null
}

export default CallsListener
