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
    searchTerms: string,
}

interface SearchInputListStateInterface {
    showBoroughSelect: boolean,
    selectedSearchMethod: string | null,
    searchValue: string | null,
};
export default class SearchInputList extends React.Component<SearchInputListPropsInterface, SearchInputListStateInterface> {

    constructor(props: SearchInputListPropsInterface) {
        super(props);

        this.state = {
            showBoroughSelect: false,
            selectedSearchMethod: null,
            searchValue: null,
        };
    }

    setDisplayClassName(searchMethod: string): string {
        const classNames = this.state.selectedSearchMethod !== null && this.state.selectedSearchMethod === searchMethod ? 'show' : 'hide';
        return classNames;
    }

    setSearchMethod(method: string): void {
        this.setState({...this.state, selectedSearchMethod: method });
    }

    render() {
        const inputElements = this.props.inputs.map((inputObj, index) => {
            const { children, description, labelText, name, value } = inputObj;
            return (
                <SearchInput
                    description={description}
                    inputClasses={this.state.selectedSearchMethod !== null && this.state.selectedSearchMethod === value ? 'show' : 'hide'}
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
                        // disabled={!this.state.selectedSearchMethod}
                        onClick={() => { this.props.clickHandler(this.state.selectedSearchMethod, this.props.searchTerms); }}
                        type="button"
                    >
                        Find Restaurants!
                    </button>
                </div>
            </div>
        )
    }

}