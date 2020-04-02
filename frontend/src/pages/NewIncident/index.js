import React, { useState } from 'react';
import './styles.css';
import logo from '../../assets/logo.svg';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import api from '../../services/api';
import Modal from '../../components/Modal';


export default function NewIncident(){

  const ongId = localStorage.getItem('ongId');
  const history = useHistory();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [value, setValue] = useState('');

  const [modal, setModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  function close(){
    setModal(false);
    setLoading(false);
    setMessage("");
  }

  async function handleNewIncident(e){
    e.preventDefault();
    const dataIncident = {
      title,
      description,
      value
    };

    try{
        setModal(true);
        const response = await api.post('/incidents', dataIncident, {
          headers: {
            Authorization: ongId
          }
        });
        console.log(response);
        setLoading(false);
        setMessage("Success, incident created. Wait, redirecting you...");
        setTimeout(() => { history.push('/profile') }, 10000);

    }catch(err){
      setLoading(false);
      console.log(err);
      if(err.response.data.message){
        setMessage(err.response.data.message);
      }else{
        setMessage("Erro ao cadastrar caso, tente novamente.");
      }
    }
  }
  
  return (
    <div className="new-incident-container">
      <Modal message={message} display={modal} loading={loading} close={() => close()}/>
      <div className="content">
        <section>
          <img src={logo} alt="Be The Hero" />
          <h1>Cadastrar novo caso</h1>
          <p>Descreva o caso detalhadamente para encontrar um herói para resolver isso.</p>
          <Link to="/profile" className="back-link"> <FiArrowLeft size={16} color="#E02041" /> Voltar para home</Link>
        </section>

        <form onSubmit={handleNewIncident}>
          <input 
            placeholder="Título do caso"
            value={title}
            onChange={e => setTitle(e.target.value)}
            />
          <textarea 
            placeholder="Descrição do caso"
            value={description}
            onChange={e => setDescription(e.target.value)}
            />
          <input 
            placeholder="Valor em reais"
            value={value}
            onChange={e => setValue(e.target.value)}
            />

           <button className="button" type="submit">Cadastrar</button>
        </form>

      </div>
    </div>
  );
}