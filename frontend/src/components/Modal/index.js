import React from 'react';
import { FiX } from 'react-icons/fi';
import loadingImage from '../../assets/loading.svg'
import './styles.css';

function Modal({ message, display, loading, close }){
  
  return(
    <div className="modal" style={{ display: display ? 'flex' : 'none' }}>
      <div className="content">
       <div className="close">
         <a href="#" onClick={() => close()}><FiX size={20} color="#E02041"/></a>
       </div>
       <div className="wrapper">
          <img className="loading" src={loadingImage} alt="Loading" style={{ display: loading ? 'block' : 'none' }}/>
          <div className="message">{message}</div>
       </div>
      </div>
    </div>
  );
}

export default Modal;