import { useState, useEffect } from "react";
import axios from 'axios';
import Task from '../components/Task';
import Modal from '../components/Modal'
import HeaderForm from "../components/Header";
import SideMobileBar from "../components/SideMobileBar";
import Overlay from "../components/Overlay";
import Filters from "../components/Filters";
import AddIcon from '@mui/icons-material/Add';
import EmptyMessage from "../components/EmptyMessage";
import ViewTask from "../components/ViewTask";

export default function Home() {
  const [tarefas, setTarefas] = useState([]);
  const [novaTarefa, setNovaTarefa] = useState('');
  const [categoria, setCategoria] = useState('');
  const [horario, setHorario] = useState('');
  const [important, setImportant] = useState('');
  const [descricao, setDescricao] = useState('');
  const [tarefaEditando, setTarefaEditando] = useState(null);
  const [textMessageForm, setTextMessageForm] = useState(null);
  const [sideBarMobile, setSideBarMobile] = useState(false)
  const [openModalCreation, setOpenModalCreation] = useState(false);
  const [filterActive, setFilterActive] = useState('all')
  const [showViewModal, setShowViewModal] = useState(false);
  const [viewingTask, setViewingTask] = useState(null);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:3001/tarefas')
      .then(res => setTarefas(res.data));
  }, []);

  useEffect(() => {
    listAllTasks();
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
    if(tarefa.important===true){
    setImportant('Yes');
    }else{
      setImportant('No');
    }
    setImportant(tarefa.important);
    setDescricao(tarefa.descricao);
    setOpenModalCreation(true);
    setShowViewModal(false);
    setEditing(true);
  };

  const fecharModal = () => {
    setOpenModalCreation(false);
    setShowViewModal(false);
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

  const openViewModal = (tarefa) =>{
    setViewingTask(tarefa);
    setShowViewModal(true);
  }

  return (
    <div className='w-full relative text-dark-200 dark:text-gray-100'>
      
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
        <Modal
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
        editarTarefa={editarTarefa}
        editing={editing}
        />
      </Overlay>
      }
      
      <Filters listAllTasks={listAllTasks} listDoneTasks={listDoneTasks} listPendingTasks={listPendingTasks} filterActive={filterActive} setFilterActive={setFilterActive}/>
      

      {tarefas.length === 0 && (
      <EmptyMessage filterActive={filterActive} />
      )}


      <ul className="px-5 pb-8 flex flex-col gap-8">
        {tarefas.map((t, i) => (
          <Task key={i} tarefa={t} onEditStatus={editStatus} openViewModal={openViewModal}/>
        ))}
      </ul>
      
      {showViewModal && 
      <Overlay onClose={fecharModal}> 
        <ViewTask tarefa={viewingTask} onExcluir={excluirTarefa} onEditar={() => abrirModalEdicao(viewingTask)}/>
      </Overlay>
      }

      <button 
        className="z-50 flex justify-center items-center h-[70px] w-[70px] rounded-full fixed bottom-6 right-6 bg-rotinize-100 text-white"
        onClick={() => {setOpenModalCreation(true); setEditing(false)}}>
          <AddIcon sx={{ fontSize: 40 }} />
      </button>
    </div>
  );
}
