import React from 'react';
import { FiX } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import loadingImage from '../../assets/loading.svg'
import './styles.css';

function Modal({ message, display, loading, close }){
  
  return(
    <div className={`${ display ? 'modalShow' : 'modalHide' } modal`}>
      <div className="content">
       <div className="close">
         <Link to='#' onClick={() => close()}><FiX size={20} color="#E02041"/></Link>
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