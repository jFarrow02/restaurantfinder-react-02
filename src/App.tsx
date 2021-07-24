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
  // const [ restaurantListLocation, setRestaurantListLocation ] = useState<{} | null>(null);
  const [ foo, setFoo ] = useState('');
  
  const fetchRestaurantList = (restaurantsList: []) => {
    setRestaurantsList(restaurantsList);
  };

  const sortByName = () => {
    // console.log('sortByName', list);
    const sorted = restaurantsList.sort((a, b):number => {
      if(a.name < b.name) {
        return -1;
      }
      if(a.name > b.name) {
        return 1;
      }
      return 0;
    });
    setRestaurantsList([...sorted]);
    // return sorted;
  };

  const setIt = (name: string) => {
    setFoo(name);
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
    // console.log('sorted: ', sorted); OK
    setRestaurantsList(sorted);
    // return sorted;
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
    // return sorted;
  };

  const scrollToLocation = (location: LocationObjectInterface) => {
    console.log('in scrollToLocation');
    const { x, y } = location;
    window.scrollTo({ top: y, left: x, behavior: 'smooth'}); 
  };

  return ( 
    <div className='App'>
        <Header title={'HEADER'}/>
        <Sidebar 
          scrollToLocation={scrollToLocation}
          // sortByName={sortByName}
          setIt={setIt}
          sortByName={sortByName}
          sortByBorough={sortByBorough}
          sortByCuisineType={sortByCuisineType}
          fetchRestaurantList={fetchRestaurantList}
          restaurantList={restaurantsList}
        />
        <LandingPage 
          scrollToLocation={scrollToLocation}
          fetchRestaurantList={fetchRestaurantList}
          restaurantsList={restaurantsList}
          foo={foo}
        />
        <Footer title={'FOOTER'}/>
    </div>
  );
};

export default App;
