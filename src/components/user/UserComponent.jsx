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

    componentDidMount() {
        axios(baseUrl)
            .then(resp => {
                this.setState({list: resp.data})
            })
    }

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

    getUpdatedList(user, add = true) {
        // removemos o user recebido da lista pelo ID
        const list = this.state.list.filter(u => u.id !== user.id)
        // adiciona o usuario atualizado na primeira posicao caso for acao de adicao
        if (add) list.unshift(user)
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

    load(user) {
        this.setState({user})
    }

    remove(user) {
        axios.delete(`${baseUrl}/${user.id}`)
            .then( resp =>{
                // passa um usuario nulo para a funcao remover este usuario
                const list = this.getUpdatedList(user, false)
                this.setState({list})
            })
    }

    renderTable() {
        return (
            <table className="table mt-4">
                <thead>
                    <th>Nome</th>
                    <th>E-mail</th>
                    <th>Ações</th>
                </thead>
                <tbody>
                    {this.renderRows()}
                </tbody>
            </table>
        )
    }

    renderRows() {
        return this.state.list.map(user => {
            return (
                <tr key={user.id}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>
                        <button
                            className="btn btn-warning"
                            onClick={() => this.load(user)}
                        >
                            <i className="fa fa-pencil"></i>
                        </button>
                        <button
                            className="btn btn-danger ml-2"
                            onClick={() => this.remove(user)}
                        >
                            <i className="fa fa-trash"></i>
                        </button>
                    </td>
                </tr>
            )
        })
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
                {this.renderTable()}
            </Main>
        )
    }
}