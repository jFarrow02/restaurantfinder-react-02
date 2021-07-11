import React from 'react';
import './App.scss';
import LandingPage from './components/LandingPage/LandingPage';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

class App extends React.Component<{}, {}> {

  render() {
    return (
      <Router>
        <div className="App">
          <h1>NY RestaurantFinder</h1>
           <Switch>
            <Route path="/">
              <LandingPage/>
            </Route>
            <Route path="/search">
              <LandingPage/>
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
  
}

export default App;
