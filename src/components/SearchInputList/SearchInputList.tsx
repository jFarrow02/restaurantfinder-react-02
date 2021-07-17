import React from 'react';
import './SearchInputList.scss';
import SearchInput from '../SearchInput/SearchInput';
import config from '../../config/constants/landing-page';
import CuisineTypeInterface from '../../interfaces/CuisineInterface';
import SearchInputListInputInterface from '../../interfaces/SearchInputListInputInterface';

interface SearchInputListPropsInterface {
    clickHandler: Function,
    inputs: SearchInputListInputInterface[],
    cuisineTypes: CuisineTypeInterface[],
}

interface SearchInputListStateInterface {
    showBoroughSelect: boolean,
    selectedSearchMethod: string | null,
    searchValue: string | null,
    
    //restaurantList: RestaurantInterface[],
};
export default class SearchInputList extends React.Component<SearchInputListPropsInterface, SearchInputListStateInterface> {

    constructor(props: SearchInputListPropsInterface) {
        super(props);

        this.state = {
            showBoroughSelect: false,
            selectedSearchMethod: null,
            searchValue: null,
            // restaurantList: [],
        };
    }

    setSearchMethod(method: string): void {
        this.setState({...this.state, selectedSearchMethod: method, searchValue: this.getDefaultSearchValues(method)});
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
                defaultValue = this.props.cuisineTypes[0].cuisine_type;
                break;
            default:
                defaultValue = null;    
        }
        return defaultValue; 
    }

    render() {
        const [ borough, name, avgRating, cuisineType ] = config.searchMethods;
        const inputElements = this.props.inputs.map((inputObj, index) => {
            const { children, description, labelText, name, onClick, value } = inputObj;
            return (
                <SearchInput
                    description={description}
                    inputClasses={''}
                    key={`search-input-${index}`}
                    labelText={labelText}
                    name={name}
                    onClick={() => {this.setSearchMethod(value)}}
                    value={value}
                >
                    {children}
                </SearchInput>
            )
        })
        return(
            <div className='SearchInputList'>
                <div className='SearchInput_search'>
                  {inputElements}
                </div>
                <div className="SearchInputList_search-controls">
                    <button
                        type="button"
                        onClick={() => { this.props.clickHandler(); }}
                    >
                        Find Restaurants!
                    </button>
                </div>
            </div>
        )
    }

}