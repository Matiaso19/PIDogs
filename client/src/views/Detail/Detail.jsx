import { useEffect} from 'react';
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { deleteDetails, getDogDetail } from '../../redux/actions';
import {useDispatch, useSelector} from 'react-redux';
import style from './Detail.module.css'





const Detail = () => {


    const {idRaza} = useParams();
    
     
    
    const myDog = useSelector((state)=>state.details)
    const dispatch = useDispatch();
    const goBack = useHistory();
    const handleBack = () => {
        goBack.push('/home')
    }
    
    useEffect(() => {
        dispatch(getDogDetail(idRaza));
        return () => dispatch(deleteDetails())
    }, [dispatch,idRaza])
    
    
        
        return (
            <>
            
            {myDog.map(dog =>{
                return (
                    <div className={style.card} key={dog.id}>

                    <div key= {dog.id} className={style.imageArea}>
    
                    <img src= {dog.image} alt={dog.name} className={style.dogImage} />
                    <h3>Name: {dog.name}</h3>
                    <h3>Id: {dog.id}</h3>
                    
                    <h3>Height: {`${dog.heightMin} cm - ${dog.heightMax} cm`}</h3>
                    <h3>Weight: {`${dog.weightMin} kg - ${dog.weightMax} kg`}</h3>
                    <h3>Temperament: {dog.created
                    ? dog.temperament.map((elem)=>elem.name).join(', ')
                    : dog.temperament
                }</h3>
                    <h3>Life_Span: {dog.life_span}</h3>
                    </div>
                    <button onClick={handleBack}>GO BACK HOME</button>
                    </div>
                )
            })}
            
                
            
            </>
        )
    
    
  
}

export default Detail;