import './RestaurantThumbnail.scss';
import RestaurantInterface from '../../interfaces/RestaurantInterface';
import MoreIcon from '@material-ui/icons/MoreHoriz';

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
            <p>Cuisine Type: {cuisine}</p>
            <p>Borough: {borough}</p>
            <span className='RestaurantThumbnail-more'>
                <MoreIcon/>
            </span>
        </div>
    );
};

export default RestaurantThumbnail;