import Select from "react-select";
import { useEffect, useState } from "react";
import NewReleasesIcon from '@mui/icons-material/NewReleases';


const Modal = ({
    editing,
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
    textMessageForm,
    editarTarefa
}) => {



const [theme, setTheme] = useState('light');
useEffect(() => {
    const isDark = document.documentElement.classList.contains('dark');
    setTheme(isDark ? 'dark' : 'light');

    const observer = new MutationObserver(() => {
      const updatedDark = document.documentElement.classList.contains('dark');
      setTheme(updatedDark ? 'dark' : 'light');
    });

    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

const categoryOptions = [
  {value: "Work", label: "Work"},
  {value: "Studies", label: "Studies"},
  {value: "Home", label: "Home"},
  {value: "Personal", label: "Personal"},
  {value: "Food", label: "Food"},
  {value: "Health", label: "Health"}
]

const importantOptions = [
  {value: "true", label: "Yes"},
  {value: "false", label: "No"}
]


const getSelectStyles = (themeMode) =>  ({
  control: (provided) =>({
    ...provided,
    width: "120px",
    borderColor: "#9B9FA3",
    backgroundColor: themeMode === 'dark' ? "transparent" : "white", 
  }),
   menu: (provided) => ({
    ...provided,
    backgroundColor: themeMode === 'dark' ? "#101A23" : "white",
    border: "none",
    boxShadow: "none",
    marginTop: 0,
  }),
  menuList: (provided) => ({
    ...provided,
    backgroundColor: themeMode === 'dark' ? "#101A23" : "white",
    padding: 0,

  }),
  option: (provided, state) => ({
  ...provided,
  backgroundColor: state.isSelected
    ? (themeMode === 'dark' ? '#1DA5B2' : '#1DA5B2')
    : state.isFocused
      ? (themeMode === 'dark' ? '#1E293B' : '#F0F0F0')
      : (themeMode === 'dark' ? '#101A23' : 'white'),
  color: themeMode === 'dark' ? '#fff' : '#000',
}),
  singleValue: (provided) => ({
  ...provided,
  color: themeMode === 'dark' ? '#ffffff' : '#000000',
  opacity: 1, 
}),
});



  return (
    <div className="w-[100%] py-5 m-auto border-gray border-2 rounded-xl bg-white dark:bg-dark-400 border-none flex flex-col justify-center shadow-xl">
      <h2 className="text-dark-200 p-3 mb-3 font-semibold text-center text-xl dark:text-white">{editing ? 'Edit' : 'Create'} Task</h2>
      
      <div className="w-max m-auto flex flex-col gap-3">
        <div className="flex w-[300px] justify-between m-auto">
          <div className="flex flex-col">
            <label htmlFor="titulo" className="text-xs">Task Title</label>
            <input
            className="w-[180px] p-1 bg-transparent border-opacity-50 rounded-[5px] border-[#4B4D4E] border-[1px] dark:border-[#9B9FA3]"
            id="titulo"
            type="text"
            maxLength={30}
            value={novaTarefa}
            onChange={e => setNovaTarefa(e.target.value)}
            placeholder="Task Title..."
            />
          </div>
        
          <div className="flex flex-col">
            <label htmlFor="horario" className="text-xs">Time</label>
            <input
            className="p-1 w-[80px] bg-transparent border-opacity-50 rounded-[5px] border-[#4B4D4E] border-[1px] dark:border-[#9B9FA3]"
            type="time"
            name="horario"
            id="horario"
            value={horario}
            onChange={e => setHorario(e.target.value)}
            />
          </div>
        </div>
        
        <div className="flex w-[300px] justify-between m-auto gap-5">
          <div>
            <label htmlFor="category" className="text-xs">Category</label>
            <Select
            inputId="category"
            options={categoryOptions}
            placeholder="Category"
            styles={getSelectStyles(theme)}
            onChange={(selectedOption)=>setCategoria(selectedOption?.value)}
            value={categoryOptions.find(option => option.value === categoria)}
            />
          </div>
          <div>
            <label htmlFor="important" className="text-xs">Priority
            <NewReleasesIcon sx={{color: '#1AA6AF', fontSize: 15, marginLeft: "3px"}}/>
            </label>
            <Select
            inputId="important"
            options={importantOptions}
            placeholder="Priority"
            styles={getSelectStyles(theme)}
            onChange={(selectedOption)=>setImportant(selectedOption?.value)}
            value={importantOptions.find(option => option.value === String(important))}
            />
          </div>
        </div>
        <div className="flex flex-col w-[300px] m-auto">
          <label htmlFor="descricao" className="text-xs">Descrição</label>
          <textarea
          className="p-1 bg-transparent border-opacity-50 rounded-[5px] border-[#4B4D4E] border-[1px] dark:border-[#9B9FA3]"
          name="descricao"
          id="descricao" maxLength={200}
          value={descricao}
          placeholder="Describe task..."
          onChange={e=> setDescricao(e.target.value)}>
          </textarea>
          <p className="text-xs text-end text-dark-200 dark:text-light-400">{descricao.length}/200</p>
        </div>
        
          {textMessageForm && <p className="text-center text-xs text-red-700 dark:text-red-500">*Preencha todos os campos da tarefa para continuar</p>}
        <div className=" w-[300px] m-auto">
          <div className="p-3 flex justify-around">
            <button
              className="border border-[#4B4D4E]/50 px-6 py-2 bg-transparent rounded-xl duration-200 
             hover:bg-red-400 hover:text-white dark:text-white dark:hover:bg-red-900"
              onClick={onCancelar}
            >
              Cancel
            </button>

            <button className="py-2 px-6 bg-rotinize-100 text-white rounded-xl duration-200 hover:bg-rotinize-50 dark:hover:bg-rotinize-200" onClick={() => (editing ? editarTarefa() : adicionarTarefa())}>{editing ? 'Confirm' : 'Add'}</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
