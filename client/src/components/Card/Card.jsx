import { Link } from 'react-router-dom';
import style from './Card.module.css'
const Card = (props) => {
    return(
        <div className={style.card}>
            <Link className={style.link} to={`/detail/${props.id}`}>

            <div></div>
            <img className={style.dogImage} src={props.image} alt={props.name}/>
            </Link>
             <div className={style.props}>

            <p> <span className={style.title}>Breed:</span> {props.name}</p>
            <p> <span className={style.title}>Temperament:</span> {props.temperaments}</p>
            <p> <span className={style.title}>Weight:</span> {props.weight}</p>
             </div>



        </div>
    )
}

export default Card;