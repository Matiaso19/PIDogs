
import style from './Card.module.css'
const Card = (props) => {
    return(
        <div className={style.card}>
            <img className={style.image} src={props.image} alt={props.name}/>
            <p>Name:{props.name}</p>
            <p>Temperament:{props.temperaments}</p>
            <p>Peso:{props.weight}</p>



        </div>
    )
}

export default Card;