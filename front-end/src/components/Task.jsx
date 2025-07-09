import Checkbox from "@mui/material/Checkbox";
import Category from "./Category";
import NewReleasesIcon from '@mui/icons-material/NewReleases';


function Task({ tarefa, onEditStatus }) {
  return (
    <li
      className="bg-black bg-opacity-10 relative p-4 flex justify-between items-center w-full h-[170px] m-auto shadow-md border border-transparent border-l-4 border-l-rotinize-100 md:w-3/4 xl:w-3/4 rounded-xl"
      style={{
        borderTopColor: "rgba(255, 255, 255, 0.3)",
        borderRightColor: "rgba(255, 255, 255, 0.3)",
        borderBottomColor: "rgba(255, 255, 255, 0.3)",
      }}
    >
      <div className="flex flex-col gap-3 pl-5">
        <div className="flex gap-5 leading-none items-end">
          <p className="opacity-70 text-lg">{tarefa.horario.slice(0, 5)}</p>
          <p className={`text-dark-200 text-lg dark:text-white`}>
            {tarefa.titulo.slice(0, 20)}
          </p>
            {tarefa.important===true &&
            <NewReleasesIcon sx={{color: '#1AA6AF'}}/>
            }
          
        </div>
        <p className="opacity-70">
          {tarefa.descricao.slice(0, 30)}
          {tarefa.descricao.length > 30 && "(...)"}
        </p>
        {/* <p className="text-light-200">{tarefa.categoria}</p> */}
        <Category categoria={tarefa.categoria} />
      </div>
      


      {/* <button className='flex' onClick={()=> onEditar(tarefa)}><DriveFileRenameOutlineIcon/></button>
                  <button className='flex' onClick={()=> onExcluir(tarefa.id)}><DeleteForeverIcon/></button> */}

      <div>
        <Checkbox
          checked={tarefa.feita}
          onChange={() => onEditStatus(tarefa)}
          sx={{ color: "gray", "&.Mui-checked": { color: "#19A6B0" } }}
        />
      </div>
    </li>
  );
}

export default Task;
