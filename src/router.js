import React from "react"
import { BrowserRouter, Route, Switch } from "react-router-dom"
import Layout from "./components/Layout"
import Home from "./pages/Home"
import UserHome from "./pages/UserHome"


//const Home = () => <h1>Home</h1>
//const UserHome = () => <h1>User Home</h1>
const NewBook = () => <h1>New Book</h1>
const BookDetail = () => <h1>Book Detail</h1>
const ConfigProfile = () => <h1>Profile Cofiguration</h1>

const Router = () => {
  return(
    <BrowserRouter>
      <Switch>
        <Route component={Home} path="/" exact/>
        <Layout>
          <Route component={UserHome} path="/userhome" exact/>
          <Route component={NewBook} path="/newBook" exact/>
          <Route component={BookDetail} path="/bookdetail" exact/>
          <Route component={ConfigProfile} path="/configprofile" exact/>
        </Layout>
      </Switch>
    </BrowserRouter>
  )
}

export default Router