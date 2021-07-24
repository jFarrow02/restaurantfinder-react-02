import './RestaurantList.scss';
import RestaurantListInterface from '../../interfaces/RestaurantListInterface';
import RestaurantThumbnail from '../RestaurantThumbnail/RestaurantThumbnail';


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