import './RestaurantList.scss';
import RestaurantInterface from '../../interfaces/RestaurantInterface';
import RestaurantThumbnail from '../RestaurantThumbnail/RestaurantThumbnail';

interface RestaurantListInterface {
    restaurantList: RestaurantInterface[],
}
const RestaurantList = (props: RestaurantListInterface) => {
    const { restaurantList } = props;

    return(
       <div className='RestaurantList'>
          { () => { return restaurantList.map((restaurant, index) => {
              <RestaurantThumbnail restaurant={restaurant} key={`restaurant-thumbnail-${index}`}/>
          })}}
       </div>
    )
};

export default RestaurantList;