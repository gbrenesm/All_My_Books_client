import React from "react"
import { BrowserRouter, Route, Switch } from "react-router-dom"
import Layout from "./components/Layout"
import Home from "./pages/Home"
import UserHome from "./pages/UserHome"
import BookDetail from "./pages/BookDetail"
import NewBook from "./pages/NewBook"
import UserConfig from "./pages/UserConfig"
import PrivateRoute from "./components/PrivateRoute"

const Router = () => {
  return(
    <BrowserRouter>
      <Switch>
        <Route component={Home} path="/" exact/>
        <Layout>
          <Route component={UserHome} path="/userhome" exact/>
          <Route component={NewBook} path="/newbook" exact/>
          <Route component={BookDetail} path="/detailbook/:bookId" exact/>
          <Route component={UserConfig} path="/userconfig" exact/>
        </Layout>
      </Switch>
    </BrowserRouter>
  )
}

export default Router