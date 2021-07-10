import './Restaurant.scss';
import RestaurantInterface from './RestaurantInterface';
import Address from '../Address/Address';
import Grade from '../Grade/Grade';

const Restaurant = (props: RestaurantInterface) => {
    const {
        address: {
            building,
            coordinates,
            street,
            zipcode,
        },
        grades,
    } = props;

    const gradesList = grades.map((grade) => {
        <Grade grade={grade.grade} score={grade.score} date={grade.date}/>
    })
   return(
       <div className="Restaurant">
           <h2>{props.name}</h2>
           <Address 
            building={building}
            coordinates={coordinates}
            street={street}
            zipcode={zipcode}
            />
            {gradesList}
       </div>
   )
};

export default Restaurant;