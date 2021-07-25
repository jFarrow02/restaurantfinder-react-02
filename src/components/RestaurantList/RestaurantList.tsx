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