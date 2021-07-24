import './Sidebar.scss';
import SearchIcon from '@material-ui/icons/Search';
import PinIcon from '@material-ui/icons/LocationOn';
import SortByAlpha from '@material-ui/icons/SortByAlpha';
import FilterList from '@material-ui/icons/FilterList';

const Sidebar = (props: any) => {

    const origin = {
        x: 0,
        y: 0,
    };

    const iconStyle = {fontSize: 50};

    return (
        <section className='Sidebar'>
            <div className='Sidebar-nav'>
              <button type='button'
                onClick={() => {props.scrollToLocation(origin)}}
              >
                    <span className='Sidebar-icon'>
                        <SearchIcon style={iconStyle}/>
                    </span>
                    <span className='Sidebar-icon'>
                        <PinIcon style={iconStyle}/>
                    </span>
                    <span className='Sidebar-icon'>
                        <SortByAlpha style={iconStyle}/>
                    </span>
                    <span className='Sidebar-icon'>
                        <FilterList style={iconStyle}/>
                    </span>
                </button>
            </div>
          </section>
    );
};

export default Sidebar;