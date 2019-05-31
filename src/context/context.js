import React, { createContext, useReducer, useMemo } from 'react'
import PropTypes from 'prop-types'

import * as actions from './actions'
import reducer from './reducer'

const Context = createContext()

const generateActions = (actions, dispatch) =>
  Object.keys(actions).reduce((acc, cur) => {
    acc[cur] = actions[cur](dispatch)
    return acc
  }, {})

const ContextProvider = ({ initialState, children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const generatedActions = useMemo(() => generateActions(actions, dispatch), [])
  return <Context.Provider value={{ ...state, ...generatedActions }}>{children}</Context.Provider>
}

ContextProvider.propTypes = {
  children: PropTypes.element,
  initialState: PropTypes.object
}

export { Context, ContextProvider }
