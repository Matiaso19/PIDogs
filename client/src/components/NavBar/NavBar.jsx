import {Link} from 'react-router-dom';
import style from './NavBar.module.css';
import { SearchBar } from '../SearchBar/SearchBar';


const NavBar = () => {
    return (
        <div className={style.mainContainer}>
            <div className={style.navLinks}>
            <Link to='/' >Welcome Page</Link>
            <Link to='/home'>Home</Link>
            <Link to='/form'>Create Breed</Link>
        </div>
        <div className={style.navfilters}>
            <div>
                <SearchBar/>
            </div>
            
        </div>
        </div>
    )
}


export default NavBar;