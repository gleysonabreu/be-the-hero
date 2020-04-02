import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import './styles.css';
import logo from '../../assets/logo.svg';
import api from '../../services/api';
import Modal from '../../components/Modal';

export default function Register(){

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [city, setCity] = useState('');
  const [uf, setUf] = useState('');
  const [modal, setModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const history = useHistory();

  function close(){
    setModal(false);
    setLoading(false);
    setMessage('');
  }

  async function handleRegister(event){
    event.preventDefault();

    const data = {
      name,
      email,
      whatsapp,
      city,
      uf
    };

    try{
        setModal(true);
        const response = await api.post('ongs', data);
        setLoading(false);
        setMessage(`Seu ID de acesso: ${response.data.id}, em segundos você será redirecionado para o login, aguarde..`);
        setTimeout(() => { history.push('/') }, 10000);
    }catch(err){
      setLoading(false);
      if(err.response.data.message){
        setMessage(err.response.data.message);
      }else{
        setMessage(err.response.data.error);
      }
    }

  }

  return(
    <div className="register-container">
      <Modal message={message} display={modal} loading={loading} close={() => close()} />
      <div className="content">
        <section>
          <img src={logo} alt="Be The Hero" />
          <h1>Cadastro</h1>
          <p>Faça seu cadastro, entre na plataforma e ajude pessoas a encontrarem os casos da sua ONG.</p>
          <Link to="/" className="back-link"> <FiArrowLeft size={16} color="#E02041" /> Não tenho cadastro</Link>
        </section>

        <form onSubmit={handleRegister}>
          <input 
            placeholder="Nome da ONG"
            value={name}
            onChange={e => setName(e.target.value)}
          />

          <input 
            type="email" 
            placeholder="Email" 
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <input placeholder="Whatsapp"
            value={whatsapp}
            onChange={e => setWhatsapp(e.target.value)}
          />
           
           <div className="input-group">
             <input 
              placeholder="Cidade"
              value={city}
              onChange={e => setCity(e.target.value)}
            />

             <input
              placeholder="UF" style={{ width: 80 }}
              value={uf}
              onChange={e => setUf(e.target.value)}
            />
           </div>

           <button className="button" type="submit">Cadastrar</button>
        </form>

      </div>
    </div>
  );
}