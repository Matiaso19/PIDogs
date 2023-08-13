import { Fragment, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { deleteDetails, getDogDetail } from '../../redux/actions';
import {useDispatch, useSelector} from 'react-redux';
import style from './Detail.module.css'


const Detail = () => {


    const {idRaza} = useParams();
    
     
    
    const myDog = useSelector((state)=>state.details)
    const dispatch = useDispatch();
    const history = useHistory();
    const handleBack = () => {
        history.push('/home')
    }
    
    useEffect(() => {
        dispatch(getDogDetail(idRaza));
        return () => dispatch(deleteDetails())
    }, [dispatch,idRaza])
    
    
        
        return (
            <Fragment>

            
            {myDog.map(dog =>{
                return (
                    <div className={style.container} key={dog.id}>
                        <div className={style.overlayImage}></div>
                    <div className={style.card} key= {dog.id}>

    
                    <img src= {dog.image} alt={dog.name} className={style.dogImage} />
                    <div className={style.info}>

                    <h3><span className={style.title}>Name:</span> {dog.name}</h3>
                    <h3><span className={style.title}>Id:</span> {dog.id}</h3>
                    
                    <h3><span className={style.title}>Height:</span> {`${dog.heightMin} cm - ${dog.heightMax} cm`}</h3>
                    <h3><span className={style.title}>Weight:</span> {`${dog.weightMin} kg - ${dog.weightMax} kg`}</h3>
                    <h3><span className={style.title}>Temperament:</span> {dog.created
                    ? dog.temperament.map((elem)=>elem.name).join(', ')
                    : dog.temperament
                }</h3>
                    <h3><span className={style.title}>Life Span:</span> {dog.life_span}</h3>
            

                    <button className={style.button} onClick={handleBack}>HOME</button>
                    </div>
            
                    </div>
                
                    </div>
                    
            

                
                )
                
            })}
            </Fragment>
            
                
            
            
        )
    
    
  
}

export default Detail;