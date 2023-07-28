import Card from '../Card/Card'
import style from './CardsContainer.module.css'
import {useSelector} from 'react-redux'
import { Paginado } from '../Paginado/Paginado'

const CardsContainer = () => {
    const dogs = useSelector(state=>state.dogs)

    return(
        <div className={style.container}>
            {dogs.map(dog => {
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
        
    )
}

export default CardsContainer;
