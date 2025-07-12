import React from 'react'
import Category from './Category'
import NewReleasesIcon from '@mui/icons-material/NewReleases';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
const ViewTask = ({tarefa, onExcluir, onEditar}) => {
  return (
    <div className='w-[100%] py-5 flex flex-col gap-3 bg-white rounded-xl dark:bg-dark-200'>
    
    <h2 className='text-dark-200 mb-3 font-semibold text-center text-md dark:text-white'>Task Details</h2>
    
    <div className='w-[80%] gap-3 flex m-auto'>
        <span className='text-lg'>{tarefa.horario.slice(0, 5)}</span>
        <span className='text-lg max-w-[80%] break-words'>{tarefa.titulo}</span>
    </div>
    
    
    <p className='w-[80%] m-auto break-words'>{tarefa.descricao}</p>
    

    <div className='w-[80%] m-auto flex gap-5 items-center'>
        <Category categoria={tarefa.categoria}/>
        {tarefa.important === true && 
        <NewReleasesIcon sx={{color: '#1AA6AF'}}/>
        }
    </div>
    
    <div className='w-[90%] mt-6 flex justify-end gap-5'>
        <button className='flex border p-2 border-[#9B9FA3] rounded-lg' onClick={()=> onEditar()
        }><DriveFileRenameOutlineIcon sx={{color: "#5A5E62"}}/></button>
        <button className='flex border p-2 border-[#9B9FA3] rounded-lg' onClick={()=>{ 
          onExcluir(tarefa.id)}}><DeleteForeverIcon sx={{color: "#5A5E62"}}/></button>
    </div>
    
    
    </div>
  )
}

export default ViewTask