import React, { Component } from 'react'

import Main from '../template/main/Main'

const headerProps = {
    icon: 'users',
    title: 'Usuários',
    subtitle: 'Gerenciamento de usuários'
}

export default class UserComponent extends Component {
    state = {...headerProps}

    render() {
        return (
            <Main {...headerProps}>
                Cadastro de usuário
            </Main>
        )
    }
}