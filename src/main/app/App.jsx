import React from 'react'

import Logo from '../../components/template/logo/Logo'
import Nav from '../../components/template/nav/Nav'
import Main from '../../components/template/main/Main'
import Footer from '../../components/template/footer/Footer'
import './App.css'

export default props =>
    <div className="app">
        <Logo />
        <Nav />
        <Main />
        <Footer />
    </div>

