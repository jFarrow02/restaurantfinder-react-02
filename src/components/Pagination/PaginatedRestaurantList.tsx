import { useState, useEffect } from 'react';
import RestaurantInterface from '../../interfaces/RestaurantInterface';
import RestaurantThumbnail from '../RestaurantThumbnail/RestaurantThumbnail';
import './PaginatedRestaurantList.scss'

const PaginatedRestaurantList = (props: any) => {

    const propertyNames = [ 'a', 'b', 'c', 'd', 'e', 'f', 'g',
        'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p',
        'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'special'
    ];

    const [ currentPage, setCurrentPage ] = useState(null);
    const [ totalPageCount, setTotalPageCount ] = useState(propertyNames.length);
    const [ paginatedResults, setPaginatedResults ] = useState<any>(null);


    useEffect(() => {
        const paginated = paginateRestaurants(props.restaurantList);
        setPaginatedResults(paginated);
    },[props.restaurantList]);

    const paginateRestaurants = (restaurants: RestaurantInterface[]): any => {
        const paginated: { [key: string]: RestaurantInterface[]} = {};
        propertyNames.forEach((name) => { paginated[name] = []; });
        const keys = Object.keys(paginated);
        restaurants.forEach((restaurant, idx) => {
            const { name } = restaurant;
            if(name.length > 0) { // Filter out restaurant with no 'name' attributed
                const initial = name.charAt(0).toLowerCase();
                const index = keys.indexOf(initial) !== -1 ? initial : 'special';
                paginated[index].push(restaurant);
            }
        });
        setPaginatedResults(paginated);
    };

    const pageLinks = propertyNames.map((key, idx) => {return (<li key={`restaurant-list-${idx}`}><a href={`/restaurants/list/${key}`}>{key.toUpperCase()}</a></li>)});
    return(
        <section className='Paginated'>
            <h2>PAGINATED RESTAURANTS LIST</h2>
            <nav className='Paginated-nav'>
                <ul className='Paginated-nav_list'>
                    {pageLinks}
                </ul>
            </nav>
        </section>
    )
};

export default PaginatedRestaurantList;
