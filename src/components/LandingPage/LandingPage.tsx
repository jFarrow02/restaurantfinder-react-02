import React from 'react';
import './LandingPage.scss';
import { LandingPageInterface } from '../../interfaces/LandingPageInterface';
import SearchInput from '../SearchInput/SearchInput';
import config from '../../config/constants/landing-page';
import CuisineService from '../../services/cuisine-types-service';
import RestaurantService from '../../services/restaurant-service';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import RestaurantDetails from '../RestaurantDetails/RestaurantDetails';
import NotFound  from '../404NotFound/404NotFound';

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

    toggleBoroughs(): void {
        this.setState(
            {
                ...this.state,
                showBoroughSelect: !this.state.showBoroughSelect,
            });
    }

    getDefaultSearchValues(searchMethod: string) {
        let defaultValue;
        const [borough, name, avgRating, cuisineType] = config.searchMethods;
        switch(searchMethod) {
            case borough:
                defaultValue = config.boroughNames[0];
                break;
            case name:
                defaultValue = '';
                break;
            case avgRating:
                defaultValue = config.avgGrades[0];
                break;
            case cuisineType:
                defaultValue = this.state.cuisineTypes[0].cuisine_type;
                break;
            default:
                defaultValue = null;    
        }
        return defaultValue; 
    }

    setSearchMethod(method: string): void {
        this.setState({...this.state, selectedSearchMethod: method, searchValue: this.getDefaultSearchValues(method)});
    }

    setSelectedSearchTerms(searchValue: string): void {
        this.setState({ ...this.state, searchValue });
    }

    setDisplayClassName(searchMethod: string): string {
        const classNames = this.state.selectedSearchMethod !== null && this.state.selectedSearchMethod === searchMethod ? 'show' : 'hide';
        return classNames;
    }

    async findRestaurantsBySearchMethodAndTerms() {
        const { selectedSearchMethod, searchValue } = this.state;
        const [ borough, name, avg_rating, cuisine_type ] = config.searchMethods;
        
        switch(selectedSearchMethod) {
            case borough:
                this.setState( { ...this.state, restaurantList: await RestaurantService.getRestaurantsByBorough(searchValue) });
                break;
            case name:
                this.setState({ ...this.state, restaurantList: await RestaurantService.getRestaurantsByName(searchValue) });
                break;
            case cuisine_type:
                this.setState({ ...this.state, restaurantList: await RestaurantService.getRestaurantsByCuisineType(searchValue) });
                break;
            default:
                throw new Error('unknown search method');

        }
    }

    async componentDidMount(): Promise<void> {
        const cuisineTypes = await CuisineService.getAllCuisineTypes();
        const sorted = [...cuisineTypes].sort((a, b) => {
            if(a.cuisine_type < b.cuisine_type){
                return -1;
            }
            if(a.cuisine_type > b.cuisine_type){
                return 1;
            }
            return 0;
        });

        this.setState({
            ...this.state,
            cuisineTypes: sorted,
        });
    }

    render() {

        const boroughList = config.boroughNames.map((borough, index)=> {
            return <option value={borough} key={`borough-select-${index}`}>{borough}</option>
        });

        const gradesList = config.avgGrades.map((grade, index) => {
            return <option value={grade} key={`grade-select-${index}`}>{grade}</option>
        });

        const cuisineTypeList = this.state.cuisineTypes.map((type, index) => {
            const { cuisine_type } = type;
            return <option value={cuisine_type} key={`cuisine-select-${index}`}>{cuisine_type}</option>
        });

        const [borough, name, avgRating, cuisineType] = config.searchMethods;

        const boroughSelectClasses = this.setDisplayClassName('borough');
        const nameSelectClasses = this.setDisplayClassName('name');
        const ratingSelectClasses = this.setDisplayClassName('avg_rating');
        const cuisineSelectClasses = this.setDisplayClassName('cuisine_type');
        
        const boroughInputChildren = (
            <select
                name="select-borough"
                onChange={(e) => {this.setSelectedSearchTerms(e.target.value)}}
            >
                {boroughList}
            </select>
        );

        const nameInputChildren = (
            <input 
                type="text"
                onChange={(e) => {this.setSelectedSearchTerms(e.target.value)}}
            />
        );

        const gradeInputChildren = (
            <select 
                name="select-avg-grade"
                onChange={(e) => {this.setSelectedSearchTerms(e.target.value)}}
            >
                {gradesList}
            </select>
        );

        const cuisineInputChildren = (
            <select
                name="select-cuisine-type"
                onChange={(e) => {
                    console.log(e.target.value);
                    this.setSelectedSearchTerms(e.target.value)
                }}
            >
                    {cuisineTypeList}
                </select>
        )
        return(
            <BrowserRouter>
                <Switch>
                    <Route exact path="/search">
                        <div className="LandingPage">
                            <div className="LandingPage_search">
                                <SearchInput
                                    name="search-method"
                                    value="borough"
                                    onClick={() => {this.setSearchMethod(borough)}}
                                    inputClasses={boroughSelectClasses}
                                    children={boroughInputChildren}
                                    labelText="Borough"
                                    description="Find Restaurants by Borough:"
                                />

                                <SearchInput
                                    name="search-method"
                                    value="name"
                                    onClick={() => {this.setSearchMethod(name)}}
                                    inputClasses={nameSelectClasses}
                                    children={nameInputChildren}
                                    labelText="Name"
                                    description="Find Restaurants by Name:"
                                />

                                <SearchInput
                                    name="search-method"
                                    value="avg_rating"
                                    onClick={() => {this.setSearchMethod(avgRating)}}
                                    inputClasses={ratingSelectClasses}
                                    children={gradeInputChildren}
                                    labelText="Average Rating"
                                    description="Find Restaurants by Average Rating:"
                                />

                                <SearchInput
                                    name="search-method"
                                    value="cuisine_type"
                                    onClick={() => {this.setSearchMethod(cuisineType)}}
                                    inputClasses={cuisineSelectClasses}
                                    children={cuisineInputChildren}
                                    labelText="Cuisine Type"
                                    description="Find Restaurants by Cuisine Type:"
                                />
                            </div>
                            <div className="LandingPage_search-controls">
                                <button 
                                    type="button"
                                    disabled={!this.state.selectedSearchMethod}
                                    onClick={() => this.findRestaurantsBySearchMethodAndTerms()}
                                >
                                    Find Restaurants!
                                </button>
                            </div>
                        </div>
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