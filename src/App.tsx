import React from 'react';
import './App.scss';
import LandingPage from './components/LandingPage/LandingPage';
import NotFound from './components/404NotFound/404NotFound';
import {
  BrowserRouter as Router,
  Switch,
  Redirect,
  Route,
} from "react-router-dom";

class App extends React.Component<{}, {}> {

  render() {
    return ( 
        <div className="App">
          <h1>NY RestaurantFinder</h1>
           <Router>
            <Switch>
              <Route path='/search'>
                <LandingPage/>
              </Route>
              <Route path="/">
                <Redirect to={ {pathname: '/search'} }/>
              </Route>
              <Route path="*">
                  <NotFound/>
              </Route>
            </Switch>
          </Router>
        </div>
    );
  }
  
}

export default App;
