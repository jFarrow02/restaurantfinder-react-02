import { useState } from 'react';
import './Sidebar.scss';
import SearchIcon from '@material-ui/icons/Search';
import PinIcon from '@material-ui/icons/LocationOn';
import SortByAlpha from '@material-ui/icons/SortByAlpha';
import FilterList from '@material-ui/icons/FilterList';
import ListIcon from '@material-ui/icons/List';
import MapIcon from '@material-ui/icons/Map';
import Tooltip from '../Tooltip/Tooltip';

const Sidebar = (props: any) => {

    const [showSearchTooltip, setShowSearchTooltip] = useState(false);
    const [showMapTooltip, setShowMapTooltip] = useState(false);
    const [showListTooltip, setShowListTooltip] = useState(false);
    const [showLocationFilterTooltip, setShowLocationFilterTooltip] = useState(false);
    const [showSortTooltip, setShowSortTooltip] = useState(false);
    const [showFilterListByTooltip, setShowFilterListByTooltip] = useState(false);

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
            <div 
                className='Sidebar-icon'
                onMouseEnter={() => {setShowSearchTooltip(true)}}
                onMouseLeave={() => {setShowSearchTooltip(false)}}
            >
                <SearchIcon style={iconStyle} onClick={() => {props.scrollToLocation(origin)}}/>
                <Tooltip position="left" show={showSearchTooltip} text='Back to Search' selector='.Sidebar-icon'/>
            </div>
            <div 
                className='Sidebar-icon'
                onMouseEnter={() => {setShowMapTooltip(true)}}
                onMouseLeave={() => {setShowMapTooltip(false)}}
            >
                <MapIcon style={iconStyle} onClick={() => {props.scrollToLocation(getElementLocation('#restaurants-googlemap'))} }/>
                <Tooltip position="left" show={showMapTooltip} text='Back to Restaurant Map' selector='.Sidebar-icon'/>
            </div>
            <div className='Sidebar-icon'
                onMouseEnter={() => {setShowListTooltip(true)}}
                onMouseLeave={() => {setShowListTooltip(false)}}
            >
                <ListIcon style={iconStyle} onClick={() => {props.scrollToLocation(getElementLocation('#restaurant-thumbnails'))}}/>
                <Tooltip position="left" show={showListTooltip} text='Back to Restaurants List' selector='.Sidebar-icon'/>
            </div>
            <div className='Sidebar-icon'
                onMouseEnter={() => {setShowLocationFilterTooltip(true)}}
                onMouseLeave={() => {setShowLocationFilterTooltip(false)}}
            >
                <PinIcon style={iconStyle} onClick={() => {props.sortByBorough()}}/>
                <Tooltip position="left" show={showLocationFilterTooltip} text='Filter by Borough' selector='.Sidebar-icon'/>
            </div>
            <div className='Sidebar-icon'
                onMouseEnter={() => {setShowSortTooltip(true)}}
                onMouseLeave={() => {setShowSortTooltip(false)}}
            >
                <SortByAlpha style={iconStyle} onClick={() => {props.sortByName()}}/>
                <Tooltip position="left" show={showSortTooltip} text='Sort Alphabetically by Name' selector='.Sidebar-icon'/>
            </div>
            <div className='Sidebar-icon'
                onMouseEnter={() => {setShowFilterListByTooltip(true)}}
                onMouseLeave={() => {setShowFilterListByTooltip(false)}}
            >
                <FilterList style={iconStyle}/>
                <Tooltip position="left" show={showFilterListByTooltip} text='Filter by...' selector='.Sidebar-icon'/>
            </div>
           </div>
        </section>
    );
};

export default Sidebar;