import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import './styles.css';
import { FiLogIn } from 'react-icons/fi';
import herosImg from '../../assets/heroes.png';
import logo from "../../assets/logo.svg";
import api from '../../services/api';

import Modal from '../../components/Modal';

export default function Logon(){

  const [id, setId] = useState('');
  const [modal, setModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const history = useHistory();

  function close(){
    setModal(false);
    setLoading(false);
    setMessage('');
  }

  async function handleLogin(e){
    e.preventDefault();    
    try{
      setModal(true);
      const response = await api.post('sessions', { id });
      localStorage.setItem('ongId', id);
      localStorage.setItem('ongName', response.data.name);
      setLoading(false);
      history.push('/profile');

    }catch (err){
      setLoading(false);
      if(err.response.data.message){
        setMessage(err.response.data.message);
      }else{
        setMessage(err.response.data.error);
      }
    }

  }

  return (
    <div className="logon-container">
      <Modal message={message} display={modal} loading={loading} close={() => close()}/>
      <section className="form">
        <img src={logo} alt="Logo Be The Hero" />

        <form onSubmit={handleLogin}>
          <h1>Faça seu logon</h1>

          <input
            placeholder="Sua ID"
            value={id}
            onChange={e => setId(e.target.value)}
          />
          <button className="button" type="submit">Entrar</button>

          <Link to="/register" className="back-link"> <FiLogIn size={16} color="#E02041" /> Não tenho cadastro</Link>
        </form>

      </section>

      <img src={herosImg} alt="Heroes" />
    </div>
  );
}