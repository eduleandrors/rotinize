import Checkbox from "@mui/material/Checkbox";
import Category from "./Category";
import NewReleasesIcon from '@mui/icons-material/NewReleases';


function Task({ tarefa, onEditStatus, openViewModal }) {
  return (
    <li
      className={`bg-light-300 relative p-4 flex justify-between items-center w-full h-[170px] m-auto shadow-md border border-transparent border-l-4 border-l-rotinize-100 md:w-3/4 xl:w-3/4 rounded-xl cursor-pointer
      dark:bg-dark-300  ${tarefa.feita === false ? 'bg-light-300 dark:bg-dark-300' : 'bg-light-400 dark:bg-dark-400'}`}
      style={{
        borderTopColor: "rgba(255, 255, 255, 0.3)",
        borderRightColor: "rgba(255, 255, 255, 0.3)",
        borderBottomColor: "rgba(255, 255, 255, 0.3)",
      }}
      onClick={()=>openViewModal(tarefa)}
    >
      <div className="flex flex-col gap-3 pl-5">
        <div className={`relative flex gap-5 leading-none items-end ${tarefa.feita === true ? 'opacity-30 ': ""}`}>
          <p className="opacity-70 text-lg">{tarefa.horario.slice(0, 5)}</p>
          
            <p className={` text-dark-200 text-lg dark:text-white`}>
              {tarefa.titulo.slice(0, 20)}
            </p>
          
            
          
          {tarefa.feita === true &&
            <div className="absolute w-[110%] h-[2px] top-1/2 left-1/2 -translate-x-1/2 bg-rotinize-100"></div>
            }
        </div>
        <p className={`opacity-70 ${tarefa.feita === true ? 'opacity-25' : ''}`}>
          {tarefa.descricao.slice(0, 30)}
          {tarefa.descricao.length > 30 && "(...)"}
        </p>
        <div className={`${tarefa.feita === true ? 'opacity-25' : ''} flex gap-3 items-center`}>
          <Category categoria={tarefa.categoria} />
          {tarefa.important===true &&
            <NewReleasesIcon sx={{color: '#1AA6AF'}}/>
          }
        </div>
      </div>
      
 

      {/* <button className='flex' onClick={()=> onEditar(tarefa)}><DriveFileRenameOutlineIcon/></button>
                  <button className='flex' onClick={()=> onExcluir(tarefa.id)}><DeleteForeverIcon/></button> */}

      <div>
        <Checkbox
          checked={tarefa.feita}
          onClick={(e) => e.stopPropagation()}
          onChange={(e) => {
            onEditStatus(tarefa);
          }}
          sx={{ color: "gray", "&.Mui-checked": { color: "#19A6B0" } }}
        />
      </div>
    </li>
  );
}

export default Task;
