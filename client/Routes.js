import React from 'react';
import {Route, Switch} from 'react-router-dom'
import Home from './core/Home'
import Users from './user/Users'
import Signup from './user/Signup'
import Signin from './auth/Signin'
import EditProfile from './user/EditProfile'
import Profile from './user/Profile'
import PrivateRoute from './auth/PrivateRoute'
import Menu from './core/Menu'
import RouteNames from './RouteNames';


const Routes = (props) => (
    <div>
      <Menu/>
      <Switch>
        <Route exact path={RouteNames.root} component={Home}/>
        <Route path={RouteNames.users} component={Users}/>
        <Route path={RouteNames.signup} component={Signup}/>
        <Route path={RouteNames.signin} component={Signin}/>
        <PrivateRoute path={RouteNames.Editprofile} component={EditProfile}/>
        <Route path={RouteNames.user} component={Profile}/>
      </Switch>
    </div>
);
export default Routes;