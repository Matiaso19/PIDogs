import {Link} from 'react-router-dom';
import style from './NavBar.module.css';



const NavBar = () => {
    return (
        <div className={style.mainContainer}>
            <div className={style.navLinks}>
            <Link to='/home' className={style.link}>Home</Link>
            <Link to='/form' className={style.link}>Create Your Dog!</Link>
            <Link to='/' className={style.link}>Welcome</Link>
        </div>
        
        </div>
    )
}


export default NavBar;