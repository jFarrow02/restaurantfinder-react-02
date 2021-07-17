import React from 'react';
import './LandingPage.scss';
import { LandingPageInterface } from '../../interfaces/LandingPageInterface';
import SearchInputList from '../SearchInputList/SearchInputList';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import RestaurantDetails from '../RestaurantDetails/RestaurantDetails';
import NotFound  from '../404NotFound/404NotFound';
import CuisineService from '../../services/cuisine-types-service';
import RestaurantService from '../../services/restaurant-service';
import config from '../../config/constants/landing-page';

export default class LandingPage extends React.Component<{}, LandingPageInterface> {
    constructor(props: any) {
        super(props);

        this.state = {
            showBoroughSelect: false,
            selectedSearchTerms: '',
            cuisineTypes: [],
            restaurantList: [],
            restaurantResultsLoading: false,
        };
    }

    setSelectedSearchTerms(searchValue: string): void {
        this.setState({ ...this.state, selectedSearchTerms: searchValue });
    }

    async findRestaurantsBySearchMethodAndTerms(searchMethod: string) {
        const [ borough, name, avg_rating, cuisine_type ] = config.searchMethods;
        
        switch(searchMethod) {
            case borough:
                this.setState( { ...this.state, restaurantList: await RestaurantService.getRestaurantsByBorough(this.state.selectedSearchTerms) });
                break;
            case name:
                this.setState({ ...this.state, restaurantList: await RestaurantService.getRestaurantsByName(this.state.selectedSearchTerms) });
                break;
            case cuisine_type:
                this.setState({ ...this.state, restaurantList: await RestaurantService.getRestaurantsByCuisineType(this.state.selectedSearchTerms) });
                break;
            default:
                throw new Error('unknown search method');

        }
    }
    // async findRestaurantsBySearchMethodAndTerms(searchMethod: string, searchValue: string) {
    //     this.setState({ ...this.state, restaurantResultsLoading: true });
    //     const [ borough, name, avg_rating, cuisine_type ] = config.searchMethods;

    //     switch(searchMethod) {
           
    //         case borough:
    //             RestaurantService.getRestaurantsByBorough(searchValue)
    //                 .then(data => {
    //                     this.setState({ ...this.state, restaurantList: data, restaurantResultsLoading: false });
    //                 }).catch(err => {
    //                     throw err;
    //                 })
    //             this.setState( { ...this.state,  restaurantList: await RestaurantService.getRestaurantsByBorough(searchValue)});
    //             break;
    //         case name:
    //             this.setState({ ...this.state, restaurantList: await RestaurantService.getRestaurantsByName(searchValue) });
    //             break;
    //         case cuisine_type:
    //             this.setState({ ...this.state, restaurantList: await RestaurantService.getRestaurantsByCuisineType(searchValue) });
    //             break;
    //         default:
    //             throw new Error('unknown search method');

    //     }
    // }

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
        const boroughList = config.boroughNames.map((borough, index)=> { return <option value={borough} key={`borough-select-${index}`}>{borough}</option>});
        
        const gradesList = config.avgGrades.map((grade, index) => { return <option value={grade} key={`grade-select-${index}`}>{grade}</option>});

        const cuisineTypeList = this.state.cuisineTypes.map((type, index) => {
            const { cuisine_type } = type;
            return <option value={cuisine_type} key={`cuisine-select-${index}`}>{cuisine_type}</option>
        });

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
                { gradesList}
            </select>
        );

        const cuisineInputChildren = (
            <select
                name="select-cuisine-type"
                onChange={(e) => {this.setSelectedSearchTerms(e.target.value)}}
            >
                { cuisineTypeList }
            </select>
        );
        const [ borough, name, avgRating, cuisineType ] = config.searchMethods;
        const searchInputConfig = [
            { name: 'search-method', value: borough, labelText: 'Borough', description: 'Find Restaurants by Borough:', children: boroughInputChildren },
            { name: 'search-method', value: name, labelText: 'Name', description: 'Find Restaurant by Name:', children: nameInputChildren },
            { name: 'search-method', value: avgRating, labelText: 'Average Rating', description: 'Find Restaurants by Average Rating:', children: gradeInputChildren },
            { name: 'search-method', value: cuisineType, labelText: 'Cuisine Type', description: 'Find Restaurants by Cuisine Type:', children: cuisineInputChildren },
        ];

        const searchContent = this.state.restaurantResultsLoading ? <div>Loading...</div> : (
            <SearchInputList
                clickHandler={this.findRestaurantsBySearchMethodAndTerms.bind(this)}
                cuisineTypes={this.state.cuisineTypes}
                inputs={searchInputConfig}
                searchTerms={this.state.selectedSearchTerms}
            />
        );

        return(
            <BrowserRouter>
                <Switch>
                    <Route exact path="/search">{searchContent}</Route>
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