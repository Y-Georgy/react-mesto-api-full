import React from 'react'
import { Route, Redirect } from 'react-router-dom'

const ProtectedRoute = ({ component: Component, loading: Loading, ...props }) => {
  return (
    <Route>
      {() => {
        if (!props.loggedIn) {
          return <Redirect to="./sign-in" />
        } else if (props.isLoading) {
          return <Loading />
        } else {
          return <Component {...props} />
        }
      }}
    </Route>
  )
}

export default ProtectedRoute
