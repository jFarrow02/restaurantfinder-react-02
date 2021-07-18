import './RestaurantThumbnail.scss';
import RestaurantInterface from '../../interfaces/RestaurantInterface';

interface RestaurantThumbnailInterface {
    restaurant: RestaurantInterface,
}

const RestaurantThumbnail = (props: RestaurantThumbnailInterface) => {
    const {
        restaurant: {
            address,
            borough,
            cuisine,
            grades,
            name,
        }
    } = props;
    return (
        <div className='RestaurantThumbnail'>
            <h4>{name}</h4>
            <p>{cuisine}</p>
            <p>{borough}</p>
        </div>
    );
};

export default RestaurantThumbnail;