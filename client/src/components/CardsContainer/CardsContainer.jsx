import Card from '../Card/Card'
import style from './CardsContainer.module.css'
import {useSelector} from 'react-redux'
import { Paginado } from '../Paginado/Paginado'
import { Fragment, useState } from 'react'


const CardsContainer = () => {
    
    let dogs = useSelector(state=>state.dogs)
    const [currentPage, setCurrentPage] = useState(1);
    const [dogsPerPage] = useState(8);
   
    const maxPageNumber = Math.ceil(dogs.length / dogsPerPage)
    
   

    const indexOfLastDog = currentPage * dogsPerPage;
    const indexOfFirstDog = indexOfLastDog - dogsPerPage;
    const dividir = dogs.slice(indexOfFirstDog, indexOfLastDog);
    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber)
    }
    

    return(
        <Fragment>
        <div className={style.paginado}></div>
         <Paginado currentPage = {currentPage} maxPageNumber={maxPageNumber} dogsPerPage = {dogsPerPage} paginado = {paginado}/>
        <div className={style.container}>

        
            {dividir.map(dog => {
                return <Card
                key = {dog.id}
                image = {dog.image}
                id= {dog.id}
                name = {dog.name}
		        height = {`${dog.heightMin} cm - ${dog.heightMax} cm`}
		        weight = {`${dog.weightMin} kg - ${dog.weightMax} kg`}
                
                temperaments =  {dog.temperament}
		        life_span = {dog.life_span}               
                
                />
            })}
        </div>
    </Fragment>
        
    )
}

export default CardsContainer;
