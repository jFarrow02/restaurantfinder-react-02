import React from 'react';
import './LandingPage.scss';
import { LandingPageInterface } from '../../interfaces/LandingPageInterface';
import SearchInput from '../SearchInput/SearchInput';
import config from '../../config/constants/landing-page';
import CuisineService from '../../services/cuisine-types-service';

export default class LandingPage extends React.Component<{}, LandingPageInterface> {
    constructor(props: any) {
        super(props);

        this.state = {
            showBoroughSelect: false,
            selectedSearchMethod: null,
            cuisineTypes: [],
        };
    }

    toggleBoroughs() {
        this.setState(
            {
                ...this.state,
                showBoroughSelect: !this.state.showBoroughSelect,
            });
    }

    setSelectedSearchMethod(method: string) {
        this.setState({ ...this.state, selectedSearchMethod: method});
    }

    setDisplayClassName(searchMethod: string): string {
        const classNames = this.state.selectedSearchMethod !== null && this.state.selectedSearchMethod === searchMethod ? 'show' : 'hide';
        return classNames;
    }

    async componentDidMount() {
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
        })

        const boroughSelectClasses = this.setDisplayClassName('borough');
        const nameSelectClasses = this.setDisplayClassName('name');
        const ratingSelectClasses = this.setDisplayClassName('avg_rating');
        const cuisineSelectClasses = this.setDisplayClassName('cuisine_type');
        
        const boroughInputChildren = (
            <select
                name="select-borough"
                onChange={(e) => {console.log(e.target.value)}}
            >
                {boroughList}
            </select>
        );

        const nameInputChildren = (
            <input 
                type="text"
                onChange={(e) => {console.log(e.target.value)}}
            />
        );

        const gradeInputChildren = (
            <select 
                name="select-avg-grade"
                onChange={(e) => {console.log(e.target.value)}}
            >
                {gradesList}
            </select>
        );

        const cuisineInputChildren = (
            <select
                name="select-cuisine-type"
                onChange={(e) => {console.log(e.target.value)}}
            >
                    {cuisineTypeList}
                </select>
        )
        return(
            <div className="LandingPage">
                <div className="LandingPage_search">
                    <SearchInput
                        name="search-method"
                        value="borough"
                        onClick={() => {this.setSelectedSearchMethod('borough')}}
                        inputClasses={boroughSelectClasses}
                        children={boroughInputChildren}
                        labelText="Borough"
                        description="Find Restaurants by Borough:"
                    />

                    <SearchInput
                        name="search-method"
                        value="name"
                        onClick={() => {this.setSelectedSearchMethod('name')}}
                        inputClasses={nameSelectClasses}
                        children={nameInputChildren}
                        labelText="Name"
                        description="Find Restaurants by Name:"
                    />

                    <SearchInput
                        name="search-method"
                        value="avg_rating"
                        onClick={() => {this.setSelectedSearchMethod('avg_rating')}}
                        inputClasses={ratingSelectClasses}
                        children={gradeInputChildren}
                        labelText="Average Rating"
                        description="Find Restaurants by Average Rating:"
                    />

                    <SearchInput
                        name="search-method"
                        value="cuisine_type"
                        onClick={() => {this.setSelectedSearchMethod('cuisine_type')}}
                        inputClasses={cuisineSelectClasses}
                        children={cuisineInputChildren}
                        labelText="Cuisine Type"
                        description="Find Restaurants by Cuisine Type:"
                    />
                </div>
                <div className="LandingPage_search-controls">
                    <button type="button">Find Restaurants!</button>
                </div>
                
                
                {/* <button>Find Restaurants!</button> */}
            </div>
        );
    }
}