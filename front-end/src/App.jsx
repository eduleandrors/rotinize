import SideBar from './components/SideBar';
import { useEffect, useState } from "react";
import axios from 'axios'; 
import Task from './components/Task';

function App() {
  const [tarefas, setTarefas] = useState([]);
  const [novaTarefa, setNovaTarefa] = useState('');
  const [categoria, setCategoria] = useState('');
  const [modalAberto, setModalAberto] = useState(false);
  const [tarefaEditando, setTarefaEditando] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:3001/tarefas')
      .then(res => setTarefas(res.data));
  }, []);

  const adicionarTarefa = () => {
    axios.post('http://localhost:3001/tarefas', {
      titulo: novaTarefa,
      categoria: categoria,
      feita: false
    }).then(res => {
      setTarefas([...tarefas, res.data]);
      setNovaTarefa('');
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
            <option value="Trabalho">Trabalho</option>
            <option value="" disabled hidden>Categoria</option>
            <option value="Estudos">Estudos</option>
            <option value="Pessoal">Pessoal</option>
          </select>
          <button onClick={adicionarTarefa}>Adicionar</button>
        </div>
        <ul>
          {tarefas.map((t, i) => (
            <Task key={i} tarefa={t} onExcluir={excluirTarefa} onEditar={abrirModalEdicao}/>
          ))}
        </ul>
        {modalAberto &&(
          <div className= "edit__modal">
          <p>Modal de edição</p>
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
            <option value="Trabalho">Trabalho</option>
            <option value="" disabled hidden>Categoria</option>
            <option value="Estudos">Estudos</option>
            <option value="Pessoal">Pessoal</option>
          </select>
          <button onClick={editarTarefa}>Confirmar</button>
          <button onClick={fecharModal}>Cancelar</button>
        </div>
        )}
        
      </div>
    </div>
  );
}

export default App;
 