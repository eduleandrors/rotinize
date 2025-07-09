import { useState, useEffect } from "react";
import axios from 'axios';
import Task from '../components/Task';
import EditModal from '../components/EditModal';
import HeaderForm from "../components/Header";
import SideMobileBar from "../components/SideMobileBar";
import CreateModal from "../components/CreateModal";
import Overlay from "../components/Overlay";
import Filters from "../components/Filters";
import AddIcon from '@mui/icons-material/Add';
export default function Home() {
  const [tarefas, setTarefas] = useState([]);
  const [novaTarefa, setNovaTarefa] = useState('');
  const [categoria, setCategoria] = useState('');
  const [horario, setHorario] = useState('');
  const [important, setImportant] = useState('');
  const [descricao, setDescricao] = useState('');
  const [modalAberto, setModalAberto] = useState(false);
  const [tarefaEditando, setTarefaEditando] = useState(null);
  const [textMessageForm, setTextMessageForm] = useState(null);
  const [sideBarMobile, setSideBarMobile] = useState(false)
  const [openModalCreation, setOpenModalCreation] = useState(false);


  useEffect(() => {
    axios.get('http://localhost:3001/tarefas')
      .then(res => setTarefas(res.data));
  }, []);

  const listAllTasks = () => {
    axios.get('http://localhost:3001/tarefas')
      .then(res => setTarefas(res.data))
      .catch(err => console.error(err));
  }

  const listDoneTasks = () => {
    axios.get('http://localhost:3001/tarefas/done')
      .then(res => setTarefas(res.data))
      .catch(err => console.error(err));
};

  const listPendingTasks = () => {
    axios.get('http://localhost:3001/tarefas/pending')
    .then(res => setTarefas(res.data))
    .catch(err => console.error(err));
  }
  const adicionarTarefa = () => {
    if (!novaTarefa.trim() || !categoria || !horario){
      setTextMessageForm(true);
      return;
    }
    
    axios.post('http://localhost:3001/tarefas', {
      titulo: novaTarefa,
      categoria: categoria,
      horario: horario,
      important: important === "true",
      descricao: descricao,
      feita: false
      
    }).then(res => {
      console.log({
      titulo: novaTarefa,
      categoria,
      horario,
      important: important === "true",
      descricao,
      feita: false
    });
      axios.get('http://localhost:3001/tarefas')
      .then(res=> setTarefas(res.data));
      setNovaTarefa('');
      setTextMessageForm(null);
    });
    fecharModal();
  };

  const abrirModalEdicao = (tarefa) =>{
    setTarefaEditando(tarefa);
    setNovaTarefa(tarefa.titulo);
    setHorario(tarefa.horario)
    setCategoria(tarefa.categoria);
    setImportant(tarefa.important);
    setDescricao(tarefa.descricao);
    setModalAberto(true);
  };

  const fecharModal = () => {
    setModalAberto(false);
    setOpenModalCreation(false);
    setNovaTarefa('');
    setCategoria('');
    setHorario('');
    setImportant('');
    setDescricao('');
    setTarefaEditando(null);
  };

  const editarTarefa = () =>{
    axios.put(`http://localhost:3001/tarefas/${tarefaEditando.id}`, {
      titulo: novaTarefa,
      horario: horario,
      categoria: categoria,
      important: important,
      descricao: descricao,
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

  const toggleSideBarMobile = () =>{
    setSideBarMobile(!sideBarMobile);
  }

  return (
    <div className='w-full relative text-dark-200 dark:text-gray-100'>
      
      {tarefas.length === 0 && 
        <div className="w-[100%] absolute flex flex-col flex-wrap items-center top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-rotinize-200 dark:text-rotinize-100"
        >
          <h2 className="text-3xl">You don't have any tasks yet!</h2>
          <h3>Add one by clicking the button "+" below</h3>
        </div>
      }
      
      <SideMobileBar aberto={sideBarMobile} onOpenSideBarMobile={toggleSideBarMobile}/>
      {sideBarMobile && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={toggleSideBarMobile}>
        </div>
      )}
      <HeaderForm 
        onOpenSideBarMobile={toggleSideBarMobile} 
        novaTarefa={novaTarefa}
        horario={horario}
        important={important}
        categoria={categoria}
        setNovaTarefa={setNovaTarefa}
        setCategoria={setCategoria}
        setHorario={setHorario}
        setImportant={setImportant}
        adicionarTarefa={adicionarTarefa}
        textMessageForm={textMessageForm}
        setOpenModalCreation={setOpenModalCreation}
        
      />
      {openModalCreation &&
      <Overlay onClose={fecharModal}>
      <CreateModal
      novaTarefa={novaTarefa}
      setNovaTarefa={setNovaTarefa}
      horario={horario}
      setHorario={setHorario}
      categoria={categoria}
      setCategoria={setCategoria}
      important={important}
      setImportant={setImportant}
      descricao={descricao}
      setDescricao={setDescricao}
      textMessageForm={textMessageForm}
      adicionarTarefa={adicionarTarefa}
      onCancelar={fecharModal}
      />
      </Overlay>
      }

      {tarefas.length > 0 &&
        <Filters listAllTasks={listAllTasks} listDoneTasks={listDoneTasks} listPendingTasks={listPendingTasks}/>
      }

      <ul className="px-5 pb-8 flex flex-col gap-8">
        {tarefas.map((t, i) => (
          <Task key={i} tarefa={t} onEditStatus={editStatus}/>
        ))}
      </ul>
      
      {modalAberto && (
        <Overlay onClose={fecharModal}>
        <EditModal
          tarefa={tarefaEditando}
          novaTarefa={novaTarefa}
          categoria={categoria}
          onChangeTitulo={e => setNovaTarefa(e.target.value)}
          onChangeCategoria={e => setCategoria(e.target.value)}
          onConfirmar={editarTarefa}
          onCancelar={fecharModal}
        />
        </Overlay>
      )}

      <button 
        className="flex justify-center items-center h-[70px] w-[70px] rounded-full fixed bottom-6 right-6 bg-[#017680] text-white"
        onClick={() => setOpenModalCreation(true)}>
          <AddIcon sx={{ fontSize: 40 }} />
      </button>
    </div>
  );
}
