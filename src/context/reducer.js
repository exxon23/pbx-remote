import { setActivePage, showDialpad, setActiveCall } from './actions'

export default (state, { type, data }) => {
  switch (type) {
    case setActivePage:
      return {
        ...state,
        activePage: state.activePage === data ? 'home' : data, // return to home screen if user click on same control button
        showDialpad: data === 'phone' ? !state.showDialpad : state.showDialpad // default show dialpad if user click on dialpad button
      }
    case showDialpad:
      return {
        ...state,
        showDialpad: data
      }
    case setActiveCall:
      return {
        ...state,
        activeCall: data
      }
    default:
      return state
  }
}
