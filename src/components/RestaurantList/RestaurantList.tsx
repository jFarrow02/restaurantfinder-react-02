import './RestaurantList.scss';
import RestaurantInterface from '../../interfaces/RestaurantInterface';
import RestaurantThumbnail from '../RestaurantThumbnail/RestaurantThumbnail';

interface RestaurantListInterface {
    restaurantList: RestaurantInterface[],
}
const RestaurantList = (props: RestaurantListInterface) => {
    const { restaurantList } = props;
    const restaurantThumbnails = restaurantList.map((restaurant, index) => {
        return <RestaurantThumbnail restaurant={restaurant} key={`restaurant-thumbnail-${index}`}/>
    });

    return(
       <div className='RestaurantList'>
          { restaurantThumbnails }
       </div>
    )
};

export default RestaurantList;