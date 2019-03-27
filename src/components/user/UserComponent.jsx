import React, { Component } from 'react'
import axios from 'axios'

import Main from '../template/main/Main'

const headerProps = {
    icon: 'users',
    title: 'Usuários',
    subtitle: 'Gerenciamento de usuários'
}

{/* refatorar para um arquivo de constantes e object freeze */}
const baseUrl = 'http://localhost:3001/users'
const initialState = {
    user: {name: '', email: ''},
    list: []
}

export default class UserComponent extends Component {
    state = {...initialState}

    clear() {
        this.setState({
            user: initialState.user
        })
    }

    save() {
        const user = this.state.user
        // estrategia para tratar atualizacao e criacao
        const method = user.id ? 'put' : 'post'
        // estrategia para tratar a URL final caso atualizacao ou criacao
        const url = user.id ? `${baseUrl}/${user.id}` : baseUrl

        axios[method](url, user)
            .then(resp => {
                const list = this.getUpdatedList(resp.data)
                this.setState({user: initialState.user, list})
            })
    }

    getUpdatedList(user) {
        // removemos o user recebido da lista pelo ID
        const list = this.state.list.filter(u => u.id !== user.id)
        // adiciona o usuario atualizado na primeira posicao
        list.unshift(user)
        return list
    }

    render() {
        return (
            <Main {...headerProps}>
                Cadastro de usuário
            </Main>
        )
    }
}