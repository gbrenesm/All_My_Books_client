import React from "react"
import { BrowserRouter, Route, Switch } from "react-router-dom"
import Layout from "./components/Layout"
import Home from "./pages/Home"
import UserHome from "./pages/UserHome"
import BookDetail from "./pages/BookDetail"
import NewBook from "./pages/NewBook"


//const Home = () => <h1>Home</h1>
//const UserHome = () => <h1>User Home</h1>
//const NewBook = () => <h1>New Book</h1>
//const BookDetail = () => <h1>Book Detail</h1>
const ConfigProfile = () => <h1>Profile Cofiguration</h1>
//const EditBook = () => <h1>Update Book</h1>

const Router = () => {
  return(
    <BrowserRouter>
      <Switch>
        <Route component={Home} path="/" exact/>
        <Layout>
          <Route component={UserHome} path="/userhome/:page" exact/>
          <Route component={NewBook} path="/newbook" exact/>
          <Route component={BookDetail} path="/detialbook/:bookId" exact/>
          <Route component={ConfigProfile} path="/configprofile" exact/>
        </Layout>
      </Switch>
    </BrowserRouter>
  )
}

export default Router