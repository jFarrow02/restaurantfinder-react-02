import './Header.scss';
import { Link } from 'react-router-dom';
const Header = (props: any) => {

    return (
        <nav className="Header">
            <h2>{props.title}</h2>
            <ul>
              <li><Link to="/search">Home</Link></li>
              <li><Link to='/search/restaurants/results'>Restaurants</Link></li>
            </ul>
        </nav>
    )
};

export default Header;