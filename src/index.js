import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter, Route } from 'react-router-dom'
import  { HomePage }  from './pages'


render (
    <BrowserRouter>
        <Route path='/' component={ HomePage }></Route>
    </BrowserRouter>,
    document.getElementById('app')
)