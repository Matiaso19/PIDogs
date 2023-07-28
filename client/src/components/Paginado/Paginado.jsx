import React from 'react'
import style from './Paginado.module.css'



export const Paginado = ({currentPage,dogsPerPage, maxPageNumber, paginado}) => {
  const pageNumber = [];

  for (let x = 1; x <= maxPageNumber; x++) {
    pageNumber.push(x)
    
  }

  
  return (
    <nav className={style.nav}>
    <ul className={style.paginadoContainer}>

    {
      pageNumber && 
      pageNumber.map(number => (
        <li className={style.number} key={number}>
          <div className={currentPage === number ? style.paginado__active : style.paginado} onClick={()=>paginado(number)}>{number}</div>
        </li>
      ))
    }

    
    
    </ul>
    </nav>
  )
}
