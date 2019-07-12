export const setActivePage = dispatch => data => {
  dispatch({ type: setActivePage, data })
}

export const showDialpad = dispatch => data => {
  dispatch({ type: showDialpad, data })
}

export const setActiveCall = dispatch => data => {
  dispatch({ type: setActiveCall, data })
}

export const setDTMFSignal = dispatch => data => {
  dispatch({ type: setDTMFSignal, data })
}

export const setCallEntryTime = dispatch => data => {
  dispatch({ type: setCallEntryTime, data })
}

export const setAuthorized = dispatch => data => {
  dispatch({ type: setAuthorized, data })
}
