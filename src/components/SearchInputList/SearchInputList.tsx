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
    searchTerms: string | null,
    onSearchMethodSelect: Function,
    searchMethod: string | null,
}

export default class SearchInputList extends React.Component<SearchInputListPropsInterface, {}> {

    constructor(props: SearchInputListPropsInterface) {
        super(props);
    }

    setDisplayClassName(searchMethod: string): string {
        const classNames = this.props.searchMethod !== null && this.props.searchMethod === searchMethod ? 'show' : 'hide';
        return classNames;
    }

    render() {
        const inputElements = this.props.inputs.map((inputObj, index) => {
            const { children, description, labelText, name, value } = inputObj;
            return (
                <SearchInput
                    description={description}
                    inputClasses={this.props.searchMethod !== null && this.props.searchMethod === value ? 'show' : 'hide'}
                    key={`search-input-${index}`}
                    labelText={labelText}
                    name={name}
                    onClick={() => {
                            this.props.onSearchMethodSelect(value);
                            this.setDisplayClassName(value)
                        }
                    }
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
                        //onClick={() => { this.props.clickHandler(this.props.searchMethod, this.props.searchTerms); }}
                        onClick={() => { this.props.clickHandler()}}
                        type="button"
                    >
                        Find Restaurants!
                    </button>
                </div>
            </div>
        )
    }

}