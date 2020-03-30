import React, { useState } from 'react';
import { FiLogIn } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';

import Logo from '../../assets/logo.svg'
import api from '../../services/api'
import BeTheHero from '../../assets/heroes.png'

import './style.css';

export default function Login() {
  const [id, setId] = useState('')
  const history = useHistory()

  const doLogin = async (e) => {
    e.preventDefault()

    try {
      const res = await api.post('/login', {
        id
      })

      sessionStorage.setItem('ongName', res.data.name)
      sessionStorage.setItem('ongId', id)

      history.push('/profile')
    } catch (error) {
      alert('Falha ao realizar login, tente novamente mais tarde!')
    }
  }

  return (
    <div className="logon-container">
      <section className="form">
        <img src={Logo} alt="Be The Heroe" />

        <form onSubmit={doLogin}>
          <h1>Faça seu login</h1>

          <input type="text" value={id} onChange={
            e => setId(e.target.value)
          } placeholder="Sua ID" />
          <button className="button" type="submit">Entrar</button>


          <Link className="back-icon" to="/register">
            <FiLogIn size={16} color="#E02041" />
            Não tenho cadastro
          </Link>
        </form>
      </section>

      <img src={BeTheHero} alt="Be The Heroe" />
    </div>
  )
}
