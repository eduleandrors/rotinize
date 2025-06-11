import React, { useState } from 'react'

function Task({tarefa, onExcluir, onEditar, onEditStatus}){


  return (
            <li>
                {tarefa.titulo}
                {tarefa.categoria}
                <input type="checkbox"
                checked={tarefa.feita}
                onChange={() => onEditStatus(tarefa)}
                />
                <button onClick={()=> onExcluir(tarefa.id)}>Excluir</button>
                <button onClick={()=> onEditar(tarefa)}>Editar</button>
            </li>
  )
}

export default Task;