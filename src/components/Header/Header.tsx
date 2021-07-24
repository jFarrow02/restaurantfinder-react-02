import './Header.scss';
import { Link } from 'react-router-dom';
const Header = (props: any) => {

    return (
        <nav className="Header">
            <h2>{props.title}</h2>
            <ul>
              {/* <li><Link to='/restaurants/#restaurants-googlemap'>MAP</Link></li>
              <li><Link to='/restaurants/#pagination'>PAGINATION</Link></li>
              <li><Link to='/restaurants/#thumbnails'>THUMBNAILS</Link></li> */}
              <li><a href='/#restaurants-googlemap'>MAP</a></li>
              <li><a href='/#pagination'>PAGINATION</a></li>
              <li><a href='/#restaurant-thumbnails'>THUMBNAILS</a></li>
            </ul>
        </nav>
    )
};

export default Header;