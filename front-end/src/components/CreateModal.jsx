import React from "react";

const CreateModal = ({
    novaTarefa, 
    setNovaTarefa, 
    horario, 
    setHorario,
    categoria,
    setCategoria,
    important,
    setImportant,
    descricao,
    setDescricao,
    adicionarTarefa,
    onCancelar,
    textMessageForm
}) => {
  return (
    <div>
      <p>Modal de Criação</p>
      <label htmlFor="titulo"></label>
      <input
      id="titulo" 
      type="text"
      maxLength={30}
      value={novaTarefa} 
      onChange={e => setNovaTarefa(e.target.value)}
      placeholder="Nova Tarefa" 
      />
      
      <label htmlFor="descricao">Descrição</label>
      <textarea name="descricao" id="descricao" maxLength={200}
      value={descricao}
      onChange={e=> setDescricao(e.target.value)}>
      </textarea>
      <p className="text-white">{descricao.length}/200</p>

      <input type="time" name="horario" id="horario" 
      value={horario}
      onChange={e => setHorario(e.target.value)}
      />
      <select
      name="categoria"
      id="categoria"
      value={categoria}
      onChange={e=>setCategoria(e.target.value)}
      required
      >
        <option value="" disabled hidden>
          Category
        </option>
        <option value="Work">Work</option>
        <option value="Studies">Study</option>
        <option value="Home">Home</option>
        <option value="Personal">Personal</option>
        <option value="Food">Food</option>
        <option value="Health">Health</option>
      </select>
      <label htmlFor="important">Important</label>
      <select name="important" id="important"
      value={important}h
      onChange={e=>setImportant(e.target.value)}
      >
        <option value="" disabled>Selecione</option>
        <option value="true">Sim</option>
        <option value="false">Não</option>
      </select>

      {textMessageForm && <p>Preencha todos os campos da tarefa para continuar</p>}
      <button onClick={adicionarTarefa}>Confirmar</button>
      <button onClick={onCancelar}>Cancelar</button>
    </div>
  );
};

export default CreateModal;
