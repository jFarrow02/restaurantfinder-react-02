import './App.scss';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import LandingPage from './components/LandingPage/LandingPage';
import Sidebar from './components/Sidebar/Sidebar';

interface LocationObjectInterface {
  x: number,
  y: number,
};

const App = () => {
    const scrollToLocation = (location: LocationObjectInterface) => {
      console.log('in scrollToLocation');
      const { x, y } = location;
      window.scrollTo({ top: y, left: x, behavior: 'smooth'}); 
    };

    return ( 
      <div className='App'>
          <Header title={'HEADER'}/>
          <Sidebar scrollToLocation={scrollToLocation}/>
          <LandingPage scrollToLocation={scrollToLocation}/>
          <Footer title={'FOOTER'}/>
      </div>
    );
  };

export default App;
