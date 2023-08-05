import Card from '../Card/Card'
import style from './CardsContainer.module.css'
import {useDispatch, useSelector} from 'react-redux'
import { Paginado } from '../Paginado/Paginado'
import { Fragment, useEffect, useState } from 'react'
import { filterDogs, filterTemperaments, getTemperaments, orderDogs, orderbyWeight } from '../../redux/actions'



const CardsContainer = () => {
    
    const dispatch = useDispatch();
    
    let dogs = useSelector(state=>state.dogs)
    let allDogs = useSelector(state => state.allDogs)
    let temperaments = useSelector((state) => state.temperaments).sort(
        function (a, b) {
            if(a < b) return -1
            else return 1
        }
    );
    
    
    useEffect(() => {
        dispatch(getTemperaments())
    }, [dispatch])

    

    const [currentPage, setCurrentPage] = useState(1);
    const [dogsPerPage] = useState(8);
   
    const maxPageNumber = Math.ceil(dogs.length / dogsPerPage)
    
   

    const indexOfLastDog = currentPage * dogsPerPage;
    const indexOfFirstDog = indexOfLastDog - dogsPerPage;
    const dividir = dogs.slice(indexOfFirstDog, indexOfLastDog);
    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber)
    }


    const handleOrder = (event) => {
        //console.log(event.target.value);
        dispatch(orderDogs(event.target.value))
    }
    const handleFilter = (event) => {
        const value =event.target.value
        dispatch(filterDogs(value))
    }
    const handleTemperament = (event) => {
        const value =event.target.value
        dispatch(filterTemperaments(value))
    }
    const handleFilterWeight = (event) => {
        const value =event.target.value
        dispatch(orderbyWeight(value))
    }
        

        
    

    return(
        <Fragment>
        <div className={style.paginado}></div>
         <Paginado currentPage = {currentPage} maxPageNumber={maxPageNumber} dogsPerPage = {dogsPerPage} paginado = {paginado}/>
        <div className={style.container}>
        
        <div className={style.filterContainer}>

        <div>
        <label htmlFor="order">Order By: </label>
        <select id="order" onChange={handleOrder}>
        <option value="Ascendent">A - Z</option>
        <option value="Descendent">Z - A</option>
        
      </select>
    </div>
    <div>
        <label htmlFor="filterDogs">Filter By: </label>
        <select id="filterDogs" onChange={handleFilter}>
        <option value="All">All Dogs</option>
        <option value="false">Our Dogs</option>
        <option value="true">Your Dogs</option>
        
        
      </select>
    </div>
        
        
        
      
    <div>
      <label>Select one temperament: </label>
             <select id='temperament' onChange={handleTemperament}>
        {temperaments.map((temp) => (
            <option key={temp} value={temp}>
                {temp}
            </option>
        ))}
             </select>
    </div>
    <div>
        <label htmlFor="filterWeight">Filter By: </label>
        <select id="filterWeight" onChange={handleFilterWeight}>
        <option value="min">Lighter</option>
        <option value="max">Heavier</option>
      </select>
    </div>
        
        
        
    </div>
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
