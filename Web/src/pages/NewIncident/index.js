import React, { useState } from 'react'
import Logo from '../../assets/logo.svg'
import api from '../../services/api'
import './style.css'
import { FiArrowLeft } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';

export default function NewIncident() {

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [value, setValue] = useState('')
    const ongId = sessionStorage.getItem('ongId')
    const history = useHistory()

    const data = {
      title, description, value
    }

    const saveIncident = (e) => {
      e.preventDefault()

      try {
        api.post('/incidents', data, {
          headers: {
            Authorization: ongId
          }
        })

        history.push('/profile')
      } catch (error) {
        alert('Erro ao cadastrar novo caso')
      }
    }

    return (
        <div className="new-incident-container">
          <div className="content">
            <section>
              <img src={Logo} alt="Be The Heroe" />
              <h1>Cadastrar o novo caso</h1>
    
              <p>Descreva o caso detalhadamente para encontrar um herói para resolver isso.</p>
    
              <Link className="back-icon" to="/profile">
                <FiArrowLeft size={16} color="#E02041" />
                Voltar para home
              </Link>
    
            </section>
            <form onSubmit={saveIncident}>
              <input type="text" value={title} onChange={
                e => setTitle(e.target.value)
              } placeholder="Título do caso"/>
             <textarea value={description} onChange={
                e => setDescription(e.target.value)
              } placeholder="Descrição"></textarea>
              <input value={value} onChange={
                e => setValue(e.target.value)
              } type="text" placeholder="Valor em reais"/>
    
              <button type="submit" className="button">Cadastrar</button>
            </form>
          </div>
        </div>
      );
}
