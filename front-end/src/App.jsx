import SideBar from './components/SideBar';
import { useEffect, useState } from "react";
import axios from 'axios'; 
import Task from './components/Task';
import EditModal from './components/EditModal';

function App() {
  const [tarefas, setTarefas] = useState([]);
  const [novaTarefa, setNovaTarefa] = useState('');
  const [categoria, setCategoria] = useState('');
  const [modalAberto, setModalAberto] = useState(false);
  const [tarefaEditando, setTarefaEditando] = useState(null);
  const [textMessageForm, setTextMessageError] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:3001/tarefas')
      .then(res => setTarefas(res.data));
  }, []);

  const adicionarTarefa = () => {
    if (!novaTarefa.trim() || !categoria){
      setTextMessageError(true);
      return;
    } 
      
    axios.post('http://localhost:3001/tarefas', {
      titulo: novaTarefa,
      categoria: categoria,
      feita: false
    }).then(res => {
      setTarefas([...tarefas, res.data]);
      setNovaTarefa('');
      setTextMessageError(null);
    });
  };

  const abrirModalEdicao = (tarefa) =>{
    setTarefaEditando(tarefa);
    setNovaTarefa(tarefa.titulo);
    setCategoria(tarefa.categoria);
    setModalAberto(true);
  };


  const fecharModal = () => {
    setModalAberto(false);
    setNovaTarefa('');
    setCategoria('');
    setTarefaEditando(null);
  };

  const editarTarefa = () =>{
    axios.put(`http://localhost:3001/tarefas/${tarefaEditando.id}`, {
      titulo: novaTarefa,
      categoria: categoria,
      feita: tarefaEditando.feita
    }).then(res => {
      const tarefasAtualizadas = tarefas.map(t=> t.id === tarefaEditando.id ? res.data : t);
      setTarefas(tarefasAtualizadas);
      fecharModal();
    })
  }

  const editStatus = (tarefa) => {
    const novaTarefa = { ...tarefa, feita: !tarefa.feita };

    axios.put(`http://localhost:3001/tarefas/${tarefa.id}`, novaTarefa)
      .then(res => {
        const tarefasAtualizadas = tarefas.map(t => t.id === tarefa.id ? res.data : t);
        setTarefas(tarefasAtualizadas);
      });
};

  const excluirTarefa = (id) =>{
    axios.delete(`http://localhost:3001/tarefas/${id}`)
      .then(()=>{
        setTarefas(tarefas.filter(t => t.id !== id)); // atualiza a lista filtrando todos (menos o id excluído)
      })
  }

  return (
    <div>
      <SideBar/>
      <div id="main">
        <h1>Minhas Tarefas</h1>
        <div className="inputs__task">
          <input
            value={novaTarefa}
            onChange={e => setNovaTarefa(e.target.value)}
            placeholder="Nova tarefa"
          />
          <select
            name="categoria"
            id="categoria"
            value={categoria}
            onChange={e => setCategoria(e.target.value)}
            >
            <option value="" disabled>Categoria</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Estudos">Estudos</option>
            <option value="Pessoal">Pessoal</option>
          </select>
          <button onClick={adicionarTarefa}>Adicionar</button>
          {textMessageForm && <p>Preencha todos os campos da tarefa para continuar</p>}
        </div>
        <ul>
          {tarefas.map((t, i) => (
            <Task key={i} tarefa={t} onExcluir={excluirTarefa} onEditar={abrirModalEdicao} onEditStatus={editStatus}/>
          ))}
        </ul>
        {modalAberto && (
        <EditModal
          tarefa={tarefaEditando}
          novaTarefa={novaTarefa}
          categoria={categoria}
          onChangeTitulo={e => setNovaTarefa(e.target.value)}
          onChangeCategoria={e => setCategoria(e.target.value)}
          onConfirmar={editarTarefa}
          onCancelar={fecharModal}
        />
      )}
        
      </div>
    </div>
  );
}

export default App;
 