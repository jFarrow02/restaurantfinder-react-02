import './Sidebar.scss';
import SearchIcon from '@material-ui/icons/Search';
import PinIcon from '@material-ui/icons/LocationOn';
import SortByAlpha from '@material-ui/icons/SortByAlpha';
import FilterList from '@material-ui/icons/FilterList';
import ListIcon from '@material-ui/icons/List';
import MapIcon from '@material-ui/icons/Map';

const Sidebar = (props: any) => {

    const origin = {
        x: 0,
        y: 0,
    };

    const iconStyle = {fontSize: 50};

    const getElementLocation = (selector: string) => {
        const location = document.querySelector(selector)?.getBoundingClientRect();
        if(location) {
            return location;
        }
        return false;
    }

    return (
        <section className='Sidebar'>
           <div className='Sidebar-nav'>
               <span className='Sidebar-icon'>
                   <SearchIcon style={iconStyle} onClick={() => {props.scrollToLocation(origin)}}/>
               </span>
               <span className='Sidebar-icon'>
                   <MapIcon style={iconStyle} onClick={() => {props.scrollToLocation(getElementLocation('#restaurants-googlemap'))}}/>
               </span>
               <span className='Sidebar-icon'>
                   <ListIcon style={iconStyle} onClick={() => {props.scrollToLocation(getElementLocation('#restaurant-thumbnails'))}}/>
               </span>
               <span className='Sidebar-icon'>
                   <PinIcon style={iconStyle} onClick={() => {props.sortByBorough()}}/>
               </span>
               <span className='Sidebar-icon'>
                   <SortByAlpha style={iconStyle} onClick={() => {props.sortByName()}}/>
               </span>
               <span className='Sidebar-icon'>
                   <FilterList style={iconStyle}/>
               </span>
           </div>
        </section>
    );
};

export default Sidebar;