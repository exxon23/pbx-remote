import React, { useState, useContext } from 'react'
import axios from 'axios'

import { Context } from '../../context/context'
import './login.scss'

const Login = () => {
  const { setAuthorized } = useContext(Context)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      const {
        data: { access_token }
      } = await axios.post('https://restapi-devel.ipex.cz/v1/sso/login', {
        email,
        password
      })
      localStorage.setItem('anvilToken', access_token)
      if (localStorage.getItem('anvilToken')) {
        setAuthorized(true)
      }
    } catch (err) {
      console.error(err)
      alert(err)
    }
  }

  return (
    <form className="pbx-remote__login-form">
      <h1>PBX Remote</h1>
      <input
        className="pbx-remote__login-input"
        placeholder="E-mail"
        type="email"
        value={email}
        onChange={({ target }) => setEmail(target.value)}
      />
      <input
        className="pbx-remote__login-input"
        placeholder="Password"
        type="password"
        value={password}
        onChange={({ target }) => setPassword(target.value)}
      />
      <button className="pbx-remote__login-btn" onClick={e => handleSubmit(e)}>
        Log In
      </button>
    </form>
  )
}

export default Login
