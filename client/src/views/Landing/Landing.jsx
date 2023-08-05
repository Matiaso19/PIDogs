import { useHistory } from 'react-router-dom';
import style from './Landing.module.css'

const Landing = () => {
    const history = useHistory();

    const handleEnterHome = () => {
        history.push('/home')
    }
    
    return (
        <div className={style.landing}>
        <h1 className={style.title}> A DOG'S PAGE</h1>
        
        <button className={style.buttonLanding} onClick={handleEnterHome}>ENTER</button>
        
        </div>    
        
    )
}

export default Landing;