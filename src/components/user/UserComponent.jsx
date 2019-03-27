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

    // atualiza um unico campo
    updateField(event) {
        // como vamos modificar um usuario, faremos o clone deste
        const user = {...this.state.user}
        // pega o nome do atributo de acordo com o nome do input
        // pega o valor do input e atribui ao atributo que tem o nome do input
        user[event.target.name] = event.target.value
        // atualiza o estado
        this.setState({user})
    }

    // funcao que retorna o JSX do formulario
    renderForm() {
        return (
            <div className="form">
                <div className="row">
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Nome</label>
                            {/* neste input vamos usar a solucao da arrow ao inves do bind do this */}
                            <input
                                type="text"
                                className="form-control"
                                name="name"
                                value={this.state.user.name}
                                onChange={e => this.updateField(e)}
                                placeholder="Digite o nome..."
                            />
                        </div>
                    </div>

                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>E-mail</label>
                            {/* neste input vamos usar a solucao da arrow ao inves do bind do this */}
                            <input
                                type="text"
                                className="form-control"
                                name="email"
                                value={this.state.user.email}
                                onChange={e => this.updateField(e)}
                                placeholder="Digite o e-mail..."
                            />
                        </div>
                    </div>
                </div>

                <hr />
                <div className="row">
                    <div className="col-12 d-flex justify-content-end">
                        <button
                            className="btn btn-primary"
                            onClick={e => this.save(e)}
                        >Salvar</button>
                        <button
                            className="btn btn-secondary ml-2"
                            onClick={e => this.clear(e)}
                        >Cancelar</button>
                    </div>
                </div>
            </div>
        )
    }

    render() {
        return (
            <Main {...headerProps}>
                {this.renderForm()}
            </Main>
        )
    }
}