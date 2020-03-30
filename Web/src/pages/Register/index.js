import React, { useState } from 'react'
import Logo from '../../assets/logo.svg'
import api from '../../services/api'
import './style.css'
import { FiArrowLeft } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';

export default function Register() {

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [whatsapp, setWhatsApp] = useState('')
  const [city, setCity] = useState('')
  const [uf, setUf] = useState('')
  const history = useHistory()

  const submitForm = async (e) => {
    e.preventDefault()

    const data = {
      name,
      email,
      whatsapp,
      city,
      uf,
    }

    try {
      const res = await api.post('/ongs', data)
      alert(`Seu ID é ${res.data.id}`)

      history.push('/')
    } catch (error) {
      alert(`Erro ao cadastrar ONG.`)
    }



  }

  return (
    <div className="register-container">
      <div className="content">
        <section>
          <img src={Logo} alt="Be The Heroe" />
          <h1>Cadastro</h1>

          <p>Faça seu cadastro, entre na plataforma e ajude pessoas a encontrarem os casos da sua ONG.</p>

          <Link className="back-icon" to="/">
            <FiArrowLeft size={16} color="#E02041" />
            Fazer login
          </Link>

        </section>
        <form onSubmit={submitForm}>
          <input type="text"
            value={name}
            onChange={
              e => setName(e.target.value)
            }
            placeholder="Nome da ONG"
          />
          <input value={email}
            onChange={
              e => setEmail(e.target.value)
            } type="email" placeholder="E-mail" />
          <input value={whatsapp}
            onChange={
              e => setWhatsApp(e.target.value)
            } type="text" placeholder="WhatsApp" />
          <div className="input-group">
            <input type="text" value={city}
              onChange={
                e => setCity(e.target.value)
              } placeholder="Cidade" />
            <input type="text" value={uf}
              onChange={
                e => setUf(e.target.value)
              } placeholder="UF" style={{ width: 80 }} />
          </div>

          <button type="submit" className="button">Cadastrar</button>
        </form>
      </div>
    </div>
  );
}
