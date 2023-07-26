import Card from '../Card/Card'
import style from './CardsContainer.module.css'
import {useSelector} from 'react-redux'

const CardsContainer = () => {
    const dogs = useSelector(state=>state.dogs)
console.log(dogs);
    return(
        <div className={style.container}>
            {dogs.map(dog => {
                return <Card
                key = {dog.id}
                image = {dog.image}
                id= {dog.id}
                name = {dog.name}
		        heigth = {dog.heigth}
		        weight = {dog.weight}
                temperaments = {dog.temperament}
		        life_span = {dog.life_span}               

                />
            })}
        </div>
    )
}

export default CardsContainer;
