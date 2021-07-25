import { useState, useEffect } from 'react';
import RestaurantInterface from '../../interfaces/RestaurantInterface';
import RestaurantThumbnail from '../RestaurantThumbnail/RestaurantThumbnail';
import './PaginatedRestaurantList.scss'

interface PaginatedRestaurantsInterface {
    a: RestaurantInterface[],
    b: RestaurantInterface[],
    c: RestaurantInterface[],
    d: RestaurantInterface[],
    e: RestaurantInterface[],
    f: RestaurantInterface[],
    g: RestaurantInterface[],
    h: RestaurantInterface[],
    i: RestaurantInterface[],
    j: RestaurantInterface[],
    k: RestaurantInterface[], 
    l: RestaurantInterface[],
    m: RestaurantInterface[],
    n: RestaurantInterface[],
    o: RestaurantInterface[],
    p: RestaurantInterface[],
    q: RestaurantInterface[],
    r: RestaurantInterface[],
    s: RestaurantInterface[],
    t: RestaurantInterface[],
    u: RestaurantInterface[],
    v: RestaurantInterface[],
    w: RestaurantInterface[],
    x: RestaurantInterface[],
    y: RestaurantInterface[],
    z: RestaurantInterface[],
    special: RestaurantInterface[],
}
const PaginatedRestaurantList = (props: any) => {

    const propertyNames = [ 'a', 'b', 'c', 'd', 'e', 'f', 'g',
        'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p',
        'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'special'
    ];

    const [ currentPage, setCurrentPage ] = useState<string | null>(null);
    const [ totalPageCount, setTotalPageCount ] = useState(propertyNames.length);
    const [ paginatedResults, setPaginatedResults ] = useState<any>(null);


    useEffect(() => {
        const paginated = paginateRestaurants(props.restaurantList);
        setPaginatedResults(paginated);
        if(currentPage === null) {
            setCurrentPage(propertyNames[0]);
        }
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
        return paginated;
    };

    const pageLinks = propertyNames.map((key, idx) => {
        return (
        <li key={`restaurant-list-${idx}`}>
            {/* <a href={`/restaurants/list/${key}`}>
                {key.toUpperCase()}
            </a> */}
            <button 
                key={`restaurant-list-${idx}`}
                onClick={() => {setCurrentPage(key)}}
            >
                {key.toUpperCase()}
            </button>
        </li>)});
    return(
        <section className='Paginated'>
            <h2>PAGINATED RESTAURANTS LIST</h2>
            <nav className='Paginated-nav'>
                <ul className='Paginated-nav_list'>
                    {pageLinks}
                </ul>
            </nav>
            <section className='Paginated-restaurant_results'>

            </section>
        </section>
    )
};

export default PaginatedRestaurantList;
