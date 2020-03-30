import React, { useEffect, useState } from 'react';

import api from '../../services/api'
import Logo from '../../assets/logo.svg'
import './style.css'
import { FiTrash2, FiPower } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';

export default function Profile() {
  const ongName = sessionStorage.getItem('ongName')
  const ongId = sessionStorage.getItem('ongId')
  const [incidents, setIncidents] = useState([])
  const history = useHistory()

  useEffect(() => {
    const fetchData = async () => {
      const res = await api.get('profile', {
        headers: {
          Authorization: ongId
        }
      })
      setIncidents(res.data)
    }

    fetchData()
  }, [ongId])

  const deleteIncident = async (id) => {
    try {
      await api.delete(`incidents/${id}`, {
        headers: {
          Authorization: ongId
        }
      })

      setIncidents(incidents.filter(incident => incident.id !== id))
    } catch (error) {
      alert('Erro ao deletar!')
    }
  }

  const logout = () => {
    sessionStorage.clear()
    history.push('/')
  }

  return (
    <div className="profile-container">
      <header>
        <img src={Logo} alt="Be The Heroe" />
        <span>
          Bem vinda, {ongName}!
            </span>

        <Link className="button" to="/incident/new">Cadastrar novo caso</Link>

        <button onClick={logout} type="button">
          <FiPower size={18} color="#E02041" />
        </button>
      </header>

      <h1>Casos cadastrados</h1>

      <ul>
        {
          incidents.map(incident => (
            <li key={incident.id}>
              <strong>CASO: </strong>
              <p>{incident.title}</p>

              <strong>DESCRIÇÃO: </strong>
              <p>{incident.description}</p>

              <strong>VALOR: </strong>
              <p>{Intl.NumberFormat('pt-BT', { style : 'currency', currency: 'BRL' }).format(incident.value)}</p>

              <button onClick={() => deleteIncident(incident.id)} type="button">
                <FiTrash2 size={20} color="#A8A8B3" />
              </button>
            </li>
          ))
        }
      </ul>
    </div>
  );
}
