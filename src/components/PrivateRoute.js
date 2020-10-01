import React, { useContext } from 'react'
import { Redirect, Route} from "react-router-dom"
import { Context } from "../context"


const PrivateRoute = ({ component: Component, ...rest }) => {
  const { user } = useContext(Context)
  return (
    <Route {...rest} render={
      props => (user? <Component {...rest} {...props} /> : <Redirect to="/" />)
    } />
  )
}

export default PrivateRoute
