import React from 'react';
import './App.scss';
import LandingPage from './components/LandingPage/LandingPage';
// import RestaurantDetails from './components/RestaurantDetails/RestaurantDetails';
// import NotFound from './components/404NotFound/404NotFound';
// import {
//   BrowserRouter as Router,
//   Switch,
//   Route,
//   Link
// } from "react-router-dom";

class App extends React.Component<{}, {}> {

  render() {
    return (
      // <Router>
      //   <div className="App">
      //     <h1>NY RestaurantFinder</h1>
      //      <Switch>
      //      <Route exact path="/">
      //         <LandingPage/>
      //       </Route>
      //      <Route path="/restaurant/:id">
      //         <RestaurantDetails/>
      //       </Route>
      //      <Route path="/search">
      //         <LandingPage/>
      //       </Route>
      //       <Route path="*">
      //         <NotFound/>
      //       </Route>
      //     </Switch>
      //   </div>
      // </Router>
        <div className="App">
          <h1>NY RestaurantFinder</h1>
          <LandingPage/>
        </div>
    );
  }
  
}

export default App;
