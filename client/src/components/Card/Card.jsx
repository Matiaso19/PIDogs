
import style from './Card.module.css'
const Card = (props) => {
    return(
        <div className={style.card}>
            <p>{props.image}</p>
            <p>Name:{props.name}</p>
            <p>Temperamentos:{props.temperaments}</p>
            <p>Peso:{props.weight}</p>



        </div>
    )
}

export default Card;