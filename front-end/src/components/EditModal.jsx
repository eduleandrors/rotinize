

function EditModal({ novaTarefa, categoria, onChangeTitulo, onChangeCategoria, onConfirmar, onCancelar }) {
  return (
    <div className="edit__modal">
      <p>Modal de edição</p>
      <input value={novaTarefa} onChange={onChangeTitulo} />
      <select value={categoria} onChange={onChangeCategoria}>
        <option value="" disabled hidden>Categoria</option>
        <option value="Trabalho">Trabalho</option>
        <option value="Estudos">Estudos</option>
        <option value="Pessoal">Pessoal</option>
      </select>
      <button onClick={onConfirmar}>Confirmar</button>
      <button onClick={onCancelar}>Cancelar</button>
    </div>
  );
}

export default EditModal;