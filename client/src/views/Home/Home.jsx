import CardsContainer from '../../components/CardsContainer/CardsContainer'
import { useEffect} from 'react';
import { useDispatch } from 'react-redux';
import { getDogs } from '../../redux/actions';
import style from './home.module.css'




const Home = () => {
    
    
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(getDogs())
    }, [dispatch])
    return (
        <div className={style.homeContainer}>
            
        <div className={style.overlayImage}></div>

            <CardsContainer/>
        
        </div>
        


    )
}

export default Home;