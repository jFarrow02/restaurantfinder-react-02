import { useState } from 'react';
import './App.scss';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import LandingPage from './components/LandingPage/LandingPage';
import NotFound from './components/404NotFound/404NotFound';
import store, { searchSetActionCreator } from './redux/store';

const App = () => {
    const [ showSearch, setShowSearch ] = useState<Boolean>(true);

    const displaySearch = (displayFlag: boolean) => {
      console.log('in displaySearch:', displayFlag);
      store.dispatch(searchSetActionCreator(displayFlag));
      setShowSearch(store.getState().showSearch);
    };

    return ( 
      <div className='App'>
          <Header title={'HEADER'}/>
          <div className='App_sidebar'>
            <span className='App_sidebar-nav'>
              <button type='button'
                onClick={() => {displaySearch(true)}}
              >
                SEARCH
                </button>
            </span>
          </div>
          <LandingPage hideSearchHandler={displaySearch} showSearch={showSearch}/>
          <Footer title={'FOOTER'}/>
      </div>
        // <div className='App'>
        //    <Router>
        //     <Header title={'HEADER'}/>
        //     <div className='App_sidebar'>
        //       <span className='App_sidebar-nav'><a href='/restaurants/#restaurant-search'>Back to Search</a></span>
        //     </div>
        //     <Switch>
        //       <Route exact path='/restaurants'>
        //         <LandingPage/>
        //       </Route>
        //       <Route path="/">
        //         <Redirect to={ {pathname: '/restaurants'} }/>
        //       </Route>
        //       <Route path="*">
        //           <NotFound/>
        //       </Route>
        //     </Switch>
        //   </Router>
        //   <Footer title={'FOOTER'}/>
        // </div>
    );
  };

export default App;
