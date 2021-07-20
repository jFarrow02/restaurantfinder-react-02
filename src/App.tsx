import React from 'react';
import './App.scss';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import RestaurantList from './components/RestaurantList/RestaurantList';
import LandingPage from './components/LandingPage/LandingPage';
import NotFound from './components/404NotFound/404NotFound';
import {
  BrowserRouter as Router,
  Switch,
  Redirect,
  Route,
  Link,
} from "react-router-dom";

class App extends React.Component<{}, {}> {

  render() {
    
    return ( 
        <div className='App'>
           <Router>
            <Header title={'HEADER'}/>
            <Switch>
              <Route exact path='/search'>
                <LandingPage/>
              </Route>
              <Route path='/search/restaurants/results'>
                <RestaurantList/>
              </Route>
              <Route path="/">
                <Redirect to={ {pathname: '/search'} }/>
              </Route>
              <Route path="*">
                  <NotFound/>
              </Route>
            </Switch>
          </Router>
          <Footer title={'FOOTER'}/>
        </div>
    );
  }
}

export default App;
