import React from 'react'

import './Nav.css'

export default props =>
    <aside className="menu-area">
        <nav className="menu">
            {/* criar componente para os links de menu NavItem */}
            <a href="#/">
                <i className="fa fa-home"></i> Início
            </a>
            <a href="#/">
                <i className="fa fa-users"></i> Usuários
            </a>
        </nav>
    </aside>