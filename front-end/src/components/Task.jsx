import React from 'react'

function Task({tarefa, onExcluir, onEditar}){
  return (
            <li>
                {tarefa.titulo}
                {tarefa.categoria}
                <button onClick={()=> onExcluir(tarefa.id)}>Excluir</button>
                <button onClick={()=> onEditar(tarefa)}>Editar</button>
            </li>
  )
}

export default Task;