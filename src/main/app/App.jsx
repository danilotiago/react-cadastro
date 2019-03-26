import React from 'react'

import 'bootstrap/dist/css/bootstrap-grid.min.css'
import 'font-awesome/css/font-awesome.min.css'
import './App.css'

import Logo from '../../components/template/logo/Logo'
import Nav from '../../components/template/nav/Nav'
import Main from '../../components/template/main/Main'
import Footer from '../../components/template/footer/Footer'

export default props =>
    <div className="app">
        <Logo />
        <Nav />
        <Main
            icon="home"
            title="Início"
            subtitle="Projeto de cadastro com React."
        />
        <Footer />
    </div>

