import './RestaurantDetails.scss';
import RestaurantInterface from '../../interfaces/RestaurantInterface';

interface RestaurantDetailsInterface {
    restaurant: RestaurantInterface,
}
const RestaurantDetails = (props: RestaurantDetailsInterface) => {
    return (
        <div className="RestaurantDetails">
            
        </div>
    );
};

export default RestaurantDetails;