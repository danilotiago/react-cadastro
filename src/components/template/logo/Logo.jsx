import React from 'react'

import './Logo.css'
import logo from '../../../assets/images/react.png'

export default props =>
    <aside className="logo">
        <a href="/" className="logo">
            <img src={logo} alt="Logo React"/>
        </a>
    </aside>