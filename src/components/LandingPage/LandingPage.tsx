import React from 'react';
import './LandingPage.scss';
import { LandingPageInterface } from '../../interfaces/LandingPageInterface';
import SearchInputList from '../SearchInputList/SearchInputList';
import { BrowserRouter, Switch, Route, Redirect, useRouteMatch } from 'react-router-dom';
import RestaurantList from '../RestaurantList/RestaurantList';
import NotFound  from '../404NotFound/404NotFound';
import CuisineService from '../../services/cuisine-types-service';
import RestaurantService from '../../services/restaurant-service';
import config from '../../config/constants/landing-page';

export default class LandingPage extends React.Component<{}, LandingPageInterface> {
    constructor(props: any) {
        super(props);

        this.state = {
            showBoroughSelect: false,
            selectedSearchValue: null,
            selectedSearchMethod: null,
            cuisineTypes: [],
            restaurantList: [],
            restaurantResultsLoading: false,
        };
    }

    setSelectedSearchValue(searchValue: string): void {
        this.setState({ ...this.state, selectedSearchValue: searchValue });
    }

    setSelectedSearchMethod(searchMethod: string): void {
        this.setState({...this.state, selectedSearchMethod: searchMethod, selectedSearchValue: this.getDefaultSearchValuesForMethod(searchMethod) });
    }

    getDefaultSearchValuesForMethod(searchMethod: string) {
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

    async findRestaurantsBySearchMethodAndTerms(searchMethod: string) {
        const [ borough, name, avg_rating, cuisine_type ] = config.searchMethods;
        
        switch(searchMethod) {
            case borough:
                this.setState( { ...this.state, restaurantList: await RestaurantService.getRestaurantsByBorough(this.state.selectedSearchValue) });
                break;
            case name:
                this.setState({ ...this.state, restaurantList: await RestaurantService.getRestaurantsByName(this.state.selectedSearchValue) });
                break;
            case cuisine_type:
                this.setState({ ...this.state, restaurantList: await RestaurantService.getRestaurantsByCuisineType(this.state.selectedSearchValue) });
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
        const [ borough, name, avgRating, cuisineType ] = config.searchMethods;

        const boroughList = config.boroughNames.map((borough, index)=> { return <option value={borough} selected={this.state.selectedSearchValue === borough} key={`borough-select-${index}`}>{borough}</option>});
        
        const gradesList = config.avgGrades.map((grade, index) => { return <option value={grade} key={`grade-select-${index}`}>{grade}</option>});

        const cuisineTypeList = this.state.cuisineTypes.map((type, index) => {
            const { cuisine_type } = type;
            return <option value={cuisine_type} selected={this.state.selectedSearchValue === cuisine_type} key={`cuisine-select-${index}`}>{cuisine_type}</option>
        });

        const boroughInputChildren = (
            <select
                name="select-borough"
                onChange={(e) => {this.setSelectedSearchValue(e.target.value)}}
                
            >
               {boroughList}
            </select>
        );

        const nameInputChildren = (
            <input 
                type="text"
                onChange={(e) => {this.setSelectedSearchValue(e.target.value)}}
            />
        );

        const gradeInputChildren = (
            <select 
                name="select-avg-grade"
                onChange={(e) => {this.setSelectedSearchValue(e.target.value)}}
            >
                { gradesList}
            </select>
        );

        const cuisineInputChildren = (
            <select
                name="select-cuisine-type"
                onChange={(e) => {this.setSelectedSearchValue(e.target.value)}}
            >
                { cuisineTypeList }
            </select>
        );

        const searchInputConfig = [
            { name: 'search-method', value: borough, labelText: 'Borough', description: 'Find Restaurants by Borough:', children: boroughInputChildren },
            { name: 'search-method', value: name, labelText: 'Name', description: 'Find Restaurant by Name:', children: nameInputChildren },
            { name: 'search-method', value: avgRating, labelText: 'Average Rating', description: 'Find Restaurants by Average Rating:', children: gradeInputChildren },
            { name: 'search-method', value: cuisineType, labelText: 'Cuisine Type', description: 'Find Restaurants by Cuisine Type:', children: cuisineInputChildren },
        ];

        const searchContent = this.state.restaurantList.length < 1 ? (
            <SearchInputList
                clickHandler={this.findRestaurantsBySearchMethodAndTerms.bind(this)}
                cuisineTypes={this.state.cuisineTypes}
                inputs={searchInputConfig}
                searchTerms={this.state.selectedSearchValue}
                searchMethod={this.state.selectedSearchMethod}
                onSearchMethodSelect={this.setSelectedSearchMethod.bind(this)}
            />
        ) : <RestaurantList restaurantList={this.state.restaurantList}/>;

        return (
            <div className='LandingPage'>
                { searchContent }
            </div>
        );
    }
}