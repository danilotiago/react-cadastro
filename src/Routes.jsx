import React from 'react'
import {Route, Switch, Redirect} from "react-router"

import HomeComponent from './components/home/HomeComponent'
import UserComponent from './components/user/UserComponent'

export default props =>
    <Switch>
        <Route exact path='/' component={HomeComponent}/>
        <Route path='/users' component={UserComponent}/>
        <Redirect from='*' to='/'/>
    </Switch>