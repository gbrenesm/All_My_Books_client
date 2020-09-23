import React from "react"
import { BrowserRouter, Route, Switch } from "react-router-dom"
import Home from "./pages/Home"


//const Home = () => <h1>Home</h1>
const Login = () => <h1>Login</h1>
const Signup = () => <h1>Signup</h1>
const UserHome = () => <h1>User Home</h1>
const NewBook = () => <h1>New Book</h1>
const BookDetail = () => <h1>Book Detail</h1>

const Router = () => {
  return(
    <BrowserRouter>
      <Switch>
        <Route component={Home} path="/" exact/>
        <Route component={Login} path="/login" exact/>
        <Route component={Signup} path="/signup" exact/>
        <Route component={UserHome} path="/userhome" exact/>
        <Route component={NewBook} path="/newBook" exact/>
        <Route component={BookDetail} path="/bookdetail" exact/>
      </Switch>
    </BrowserRouter>
  )
}

export default Router