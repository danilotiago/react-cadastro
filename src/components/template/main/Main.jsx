import React from 'react'

import Header from '../header/Header'
import './Main.css'


export default props =>
    <React.Fragment>
        <Header/>
        <main className="content">
            Conteúdo
        </main>
    </React.Fragment>