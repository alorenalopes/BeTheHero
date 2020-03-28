import React, {useState} from 'react';
import './styles.css';
import {Link, useHistory} from 'react-router-dom';
import logoImg from '../../assets/logo.svg';
import {FiArrowLeft} from 'react-icons/fi'; 
import api from '../../services/api'
 

export default function Register(){

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [value, setValue] = useState('');
  const history = useHistory();
  const ongId = localStorage.getItem('ongId'); 

  async function handleRegister(e) {
    e.preventDefault();
    
    const data = {
      title,
      description,
      value,
    };

    try {
    const response = await api.post('incidents', data,{
      headers:{
        Authorization: ongId,
      }
    });
    history.push('/profile');
    }catch(err){
      alert('Erro no cadastro, tente novamente');
    }
  }


  return(
    <div className="newincident-container">
      <div className="content">
        <section>
        <img src={logoImg} alt="Be The Hero"/>
        <h1>Cadastro novo caso</h1>
        <p>Descreva o caso detalhadamente para encontrar um héroi para resolver isso.</p>
        <Link className="back-link" to="/profile">
          <FiArrowLeft size={16} color="#E02041"/>Voltar para Home
          </Link>

        </section>
        <form onSubmit={handleRegister}>
          <input 
            placeholder="Titulo do caso"
            value={title}
            onChange={e =>setTitle(e.target.value)}
            />

          <textarea 
            placeholder="Descrição"
            value={description}
            onChange={e =>setDescription(e.target.value)}
            />

          <input 
            placeholder="Valor em reais"
            value={value}
            onChange={e =>setValue(e.target.value)}
            />


          <button className="button" type="submit">Cadastrar</button>
        </form>
      </div>
    </div>
  );
}
