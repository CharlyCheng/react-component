import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import  { 
    HomePage,
    ButtonList
}  from './pages'
import  { 
    Tab
 }  from './components'

render (
    <BrowserRouter>
        <Switch>
            <Route path='/' exact component={ HomePage }></Route>
            <Route path='/Tab' component={ Tab }></Route>
            <Route path='/ButtonList' component={ ButtonList }></Route>
        </Switch> 
    </BrowserRouter>,
    document.getElementById('app')
)