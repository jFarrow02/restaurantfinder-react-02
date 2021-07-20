import './RestaurantList.scss';
import RestaurantInterface from '../../interfaces/RestaurantInterface';
import RestaurantThumbnail from '../RestaurantThumbnail/RestaurantThumbnail';
import store from '../../redux/store';

interface RestaurantListInterface {
    restaurantList: RestaurantInterface[],
}
const RestaurantList = () => {
    const restaurantThumbnails = store.getState().restaurantsList.map((restaurant, index) => {
        return <RestaurantThumbnail restaurant={restaurant} key={`restaurant-thumbnail-${index}`}/>
    });

    const restaurants = restaurantThumbnails.length > 0 ? restaurantThumbnails : <div>No restaurants found</div>
    return(
       <section className='RestaurantList'>
           <div className="RestaurantList_map">
               <h2>MAP</h2>
           </div>
           <nav className="RestaurantsList_pagination">
               <h2>PAGINATION</h2>
           </nav>
           <section className='RestaurantList_thumbnails'>
             { restaurants }
           </section>
       </section>
    )
};

export default RestaurantList;