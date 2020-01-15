import React from 'react';
import './master.css';

export default function DevItem({dev, onDelete}) {

  async function handleDelete(id) {
  
    await onDelete(id)
    
  }

  return(
    <li className="dev-item">
      <header>
        <img src={dev.avatar_url} alt={dev.name}/>
        <div className="user-info">
          <strong>{dev.name}</strong>
          <span>{dev.techs.join(', ')}</span>
        </div>
      </header>
      <p>{dev.bio}</p>
      <div className="button-group">
        <a href={`https://github.com/${dev.github_username}`}>Acessar perfil no GitHub</a>
        <button onClick={() => handleDelete(dev._id)}>Deletar</button>
      </div>
      
    </li>

  )
}