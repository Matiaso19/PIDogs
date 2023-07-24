import CardsContainer from '../../components/CardsContainer/CardsContainer'
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getDogs } from '../../redux/actions';

const Home = () => {
    
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(getDogs())
    }, [])
    return (
        <>
        <h1>Este es la vista de HOME</h1>
        <CardsContainer/>
        </>
    )
}

export default Home;