
import style from './Card.module.css'
const Card = (props) => {
    return(
        <div className={style.card}>
            <div className={style.imageArea}></div>
            <img className={style.dogImage} src={props.image} alt={props.name}/>
            <p>Name: {props.name}</p>
            <p>Temperament: {props.temperaments}</p>
            <p>Weight: {props.weight}</p>



        </div>
    )
}

export default Card;