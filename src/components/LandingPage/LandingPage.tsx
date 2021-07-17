import React from 'react';
import './LandingPage.scss';
import { LandingPageInterface } from '../../interfaces/LandingPageInterface';
import SearchInputList from '../SearchInputList/SearchInputList';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import RestaurantDetails from '../RestaurantDetails/RestaurantDetails';
import NotFound  from '../404NotFound/404NotFound';
import config from '../../config/constants/landing-page';

export default class LandingPage extends React.Component<{}, LandingPageInterface> {
    constructor(props: any) {
        super(props);

        this.state = {
            showBoroughSelect: false,
            selectedSearchMethod: null,
            searchValue: null,
            cuisineTypes: [],
            restaurantList: [],
        };
    }

    testClickHandler() {
        console.log('clicked');
    }

    setSearchMethod() {
        console.log('setSearchMethod');
    }

    render() {
        const [ borough, name, avgRating, cuisineType ] = config.searchMethods;
        const searchInputConfig = [
            { name: 'search-method', value: borough, labelText: 'Borough', description: 'Find Restaurants by Borough:', onClick: () => {}, children: '' },
            { name: 'search-method', value: name, labelText: 'Name', description: 'Find Restaurant by Name:', onClick: () => {}, children: '' },
            { name: 'search-method', value: avgRating, labelText: 'Average Rating', description: 'Find Restaurants by Average Rating:', onClick: () => {}, children: '' },
            { name: 'search-method', value: cuisineType, labelText: 'Cuisine Type', description: 'Find Restaurants by Cuisine Type:', onClick: () => {}, children: '' },
        ]
        return(
            <BrowserRouter>
                <Switch>
                    <Route exact path="/search">
                        <SearchInputList
                            clickHandler={() => {this.testClickHandler()}}
                            setSearchMethod={() => {this.setSearchMethod()}}
                            inputs={searchInputConfig}
                        />
                    </Route>
                    <Route path="/restaurant/details/:id">
                        <RestaurantDetails/>
                    </Route>
                    <Route path="/">
                        <Redirect to={ {pathname: '/search'} }/>
                    </Route>
                    <Route path="*">
                        <NotFound/>
                    </Route>
                </Switch>
            </BrowserRouter>
            
        );
    }
}