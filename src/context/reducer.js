import {
  setActivePage,
  showDialpad,
  setActiveCall,
  setDTMFSignal,
  setCallEntryTime,
  setAuthorized
} from './actions'

export default (state, { type, data }) => {
  switch (type) {
    case setActivePage:
      return {
        ...state,
        activePage: state.activePage === data ? 'home' : data, // return to home screen if user click on same control button
        dialpadActive: data === 'phone' ? !state.dialpadActive : state.dialpadActive // default show dialpad if user click on dialpad button
      }
    case showDialpad:
      return {
        ...state,
        dialpadActive: data
      }
    case setActiveCall:
      return {
        ...state,
        activeCall: data
      }
    case setCallEntryTime:
      return {
        ...state,
        activeCall: {
          ...state.activeCall,
          entryTime: data
        }
      }
    case setDTMFSignal:
      return {
        ...state,
        activeCall: {
          ...state.activeCall,
          number: data
        }
      }
    case setAuthorized:
      return {
        ...state,
        authorized: data
      }
    default:
      return state
  }
}
