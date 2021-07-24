import { useState } from 'react';
import './App.scss';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import LandingPage from './components/LandingPage/LandingPage';
import Sidebar from './components/Sidebar/Sidebar';
import RestaurantInterface from './interfaces/RestaurantInterface';

interface LocationObjectInterface {
  x: number,
  y: number,
};

const App = () => {
  const [ restaurantsList, setRestaurantsList ] = useState<RestaurantInterface[]>([]);
  const [ restaurantListLocation, setRestaurantListLocation ] = useState<{} | null>(null);
  
  const fetchRestaurantList = (restaurantsList: []) => {
    setRestaurantsList(restaurantsList);
  };

  const sortByName = () => {
    const sorted = restaurantsList.sort((a, b):number => {
      if(a.name < b.name) {
        return -1;
      }
      if(a.name > b.name) {
        return 1;
      }
      return 0;
    });
    setRestaurantsList(sorted);
  };

  const sortByBorough = () => {
    const sorted = restaurantsList.sort((a, b):number => {
      if(a.borough < b.borough) {
        return -1;
      }
      if(a.borough > b.borough) {
        return 1;
      }
      return 0;
    });
    setRestaurantsList(sorted);
  };

  const sortByCuisineType = () => {
    const sorted = restaurantsList.sort((a, b):number => {
      if(a.cuisine < b.cuisine) {
        return -1;
      }
      if(a.cuisine > b.cuisine) {
        return 1;
      }
      return 0;
    });
    setRestaurantsList(sorted);
  };

  const scrollToLocation = (location: LocationObjectInterface) => {
    console.log('in scrollToLocation');
    const { x, y } = location;
    window.scrollTo({ top: y, left: x, behavior: 'smooth'}); 
  };

  const setRestaurantLocation = (location: {}) => {
    console.log('location:', location);
    // setRestaurantListLocation(location);
  }
  return ( 
    <div className='App'>
        <Header title={'HEADER'}/>
        <Sidebar 
          scrollToLocation={scrollToLocation}
          sortByName={sortByName}
          sortByBorough={sortByBorough}
          sortByCuisineType={sortByCuisineType}
        />
        <LandingPage 
          scrollToLocation={scrollToLocation}
          fetchRestaurantList={fetchRestaurantList}
          restaurantsList={restaurantsList}
          setRestaurantListLocation={setRestaurantLocation}
        />
        <Footer title={'FOOTER'}/>
    </div>
  );
};

export default App;
