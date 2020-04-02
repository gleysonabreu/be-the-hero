import React, { useEffect, useState } from 'react';
import './styles.css';
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi';
import logo from '../../assets/logo.svg';
import api from '../../services/api';
import Modal from '../../components/Modal';

export default function Profile(){
  
  const ongId = localStorage.getItem('ongId');
  const ongName = localStorage.getItem("ongName");
  const [incidents, setIncidents] = useState([]);
  const [modal, setModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const history = useHistory();

  useEffect(() => {
    api.get('/profile', {
      headers: {
        Authorization: ongId
      }
    }).then(response => {
      setIncidents(response.data);
    })
  }, [ongId]);

  function close(){
    setModal(false);
    setLoading(false);
    setMessage('');
  }

  async function handleDeleteIncident(id){

    try{
      setModal(true);
      await api.delete(`incidents/${id}`, {
        headers: {
          Authorization: ongId
        }
      });
      setIncidents(incidents.filter(incident => incident.id !== id));
      setLoading(false);
      setMessage("Success, incident deleted.");

    }catch(err){
      setLoading(false);
      if(err.response.data.message){
        setMessage(err.response.data.message);
      }else if( err.response.data.error ){
        setMessage(err.response.data.error);
      }else{
        setMessage("Erro ao deletar caso, tente novamente.");
      }
    }
  }


  function handleLogout(){
    localStorage.clear();

    history.push('/');
  }

  return (
    <div className="profile-container">
      <Modal message={message} display={modal} loading={loading} close={() => close()}/>
      <header>
        <img src={logo} alt="Logo" />
        <span>Bem-vindo, {ongName}.</span>

        <Link className="button" to="/incidents/new">Cadastrar novo caso</Link>   
        <button onClick={handleLogout} type="button">
          <FiPower size={18} color="#E02041" />
        </button>
      </header>

      <h1>Casos cadastrados</h1>

      <ul>
        {incidents.map(incident => (
        <li key={incident.id}>
          <strong>CASO:</strong>
          <p>{incident.title}</p>

          <strong>Descrição</strong>
          <p>{incident.description}</p>

          <strong>Valor</strong>
          <p>{Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(incident.value)}</p>

          <button onClick={ () => handleDeleteIncident(incident.id)} type="button">
            <FiTrash2 size={20} color="#A8A8B3"/>
          </button>
        </li>
        ))}
      </ul>

    </div>
  );
}