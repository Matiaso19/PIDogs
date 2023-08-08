import {Link} from 'react-router-dom';
import style from './NavBar.module.css';



const NavBar = () => {
    return (
        <div className={style.mainContainer}>
            <div className={style.navLinks}>
            <Link to='/' >Welcome Page</Link>
            <Link to='/home'>Home</Link>
            <Link to='/form'>Create Breed</Link>
        </div>
        
        </div>
    )
}


export default NavBar;