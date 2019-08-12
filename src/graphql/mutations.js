import gql from 'graphql-tag'

const MUTATION_ENDCALL = gql`
  mutation endCall {
    sendRemoteCommand(command: hangupCall, parameters: {})
  }
`

const MUTATION_DTMFSIGNAL = gql`
  mutation dtmfSignal($signal: String!) {
    sendRemoteCommand(command: dtmf, parameters: { dtmfSignal: $signal })
  }
`

const MUTATION_MAKECALL = gql`
  mutation makeCall($number: String!) {
    sendRemoteCommand(command: makeCall, parameters: { number: $number })
  }
`

const MUTATION_REJECTCALL = gql`
  mutation answerCall {
    sendRemoteCommand(command: rejectCall, parameters: {})
  }
`

const MUTATION_ANSWERCALL = gql`
  mutation answerCall {
    sendRemoteCommand(command: answerCall, parameters: {})
  }
`

const MUTATION_TRANSFERCALL = gql`
  mutation transferCall($number: String!, $type: XferType) {
    sendRemoteCommand(command: transferCall, parameters: { number: $number, type: $type })
  }
`

const MUTATION_TOGGLEHOLDONCALL = gql`
  mutation toggleHoldOnCall {
    sendRemoteCommand(command: toggleHold, parameters: {})
  }
`

export {
  MUTATION_ENDCALL,
  MUTATION_DTMFSIGNAL,
  MUTATION_MAKECALL,
  MUTATION_REJECTCALL,
  MUTATION_ANSWERCALL,
  MUTATION_TRANSFERCALL,
  MUTATION_TOGGLEHOLDONCALL
}
