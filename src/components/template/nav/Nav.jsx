import React from 'react'
import { Link } from 'react-router-dom'

import './Nav.css'

export default props =>
    <aside className="menu-area">
        <nav className="menu">
            {/* criar componente para os links de menu NavItem */}
            <Link to="/">
                <i className="fa fa-home"></i> Início
            </Link>
            <Link to="/users">
                <i className="fa fa-users"></i> Usuários
            </Link>
        </nav>
    </aside>