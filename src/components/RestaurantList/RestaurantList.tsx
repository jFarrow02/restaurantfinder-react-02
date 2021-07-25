import './RestaurantList.scss';
import RestaurantListInterface from '../../interfaces/RestaurantListInterface';
import RestaurantInterface from '../../interfaces/RestaurantInterface';
import RestaurantThumbnail from '../RestaurantThumbnail/RestaurantThumbnail';

interface PaginatedRestaurantsInterface {
    // a: RestaurantInterface[],
    // b: RestaurantInterface[],
    // c: RestaurantInterface[],
    // d: RestaurantInterface[],
    // e: RestaurantInterface[],
    // f: RestaurantInterface[],
    // g: RestaurantInterface[],
    // h: RestaurantInterface[],
    // i: RestaurantInterface[],
    // j: RestaurantInterface[],
    // k: RestaurantInterface[], 
    // l: RestaurantInterface[],
    // m: RestaurantInterface[],
    // n: RestaurantInterface[],
    // o: RestaurantInterface[],
    // p: RestaurantInterface[],
    // q: RestaurantInterface[],
    // r: RestaurantInterface[],
    // s: RestaurantInterface[],
    // t: RestaurantInterface[],
    // u: RestaurantInterface[],
    // v: RestaurantInterface[],
    // w: RestaurantInterface[],
    // x: RestaurantInterface[],
    // y: RestaurantInterface[],
    // z: RestaurantInterface[],
    // special: RestaurantInterface[],
}
const RestaurantList = (props: RestaurantListInterface) => {

    const paginateRestaurants = (restaurants: RestaurantInterface[]): any => {
        const propertyNames = [ 'a', 'b', 'c', 'd', 'e', 'f', 'g',
            'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p',
            'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'special'
        ];
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
        })
        return paginated;
    };
    const restaurantThumbnails = props.restaurantList.map((restaurant, index) => {
        return <RestaurantThumbnail restaurant={restaurant} key={`restaurant-thumbnail-${index}`}/>
    });

    
    const restaurants = restaurantThumbnails.length > 0 ? restaurantThumbnails : <div>No restaurants found</div>
    return(
       <section className='RestaurantList'>
           <div className="RestaurantList_map" id='restaurants-googlemap'>
               <h2>MAP</h2>
           </div>
           <nav className="RestaurantsList_pagination" id='pagination'>
            <h2>PAGINATION</h2>
           </nav>
           <section className='RestaurantList_thumbnails' id='restaurant-thumbnails'>
             { restaurants }
           </section>
       </section>
    )
};

export default RestaurantList;