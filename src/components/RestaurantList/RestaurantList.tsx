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
       <div className='RestaurantList'>
          { restaurants }
       </div>
    )
};

export default RestaurantList;