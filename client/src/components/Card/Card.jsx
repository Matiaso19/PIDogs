import { Link } from 'react-router-dom';
import style from './Card.module.css'
const Card = (props) => {
    return(
        <div className={style.card}>
            <Link className={style.link} to={`/detail/${props.id}`}>

            <div className={style.imageArea}></div>
            <img className={style.dogImage} src={props.image} alt={props.name}/>
            </Link>
            <p>Name: {props.name}</p>
            <p>Temperament: {props.temperaments}</p>
            <p>Weight: {props.weight}</p>



        </div>
    )
}

export default Card;