import React from 'react';
import './LandingPage.scss';
import { LandingPageInterface } from './LandingPageInterface';
import SearchInput from '../SearchInput/SearchInput';
import config from '../../config/constants/landing-page';

export default class LandingPage extends React.Component<{}, LandingPageInterface> {
    constructor(props: any) {
        super(props);

        this.state = {
            showBoroughSelect: false,
            selectedSearchMethod: null,
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

    render() {
        const boroughList = config.boroughNames.map((borough, index)=> {
            return <option value={borough} key={`borough-select-${index}`}>{borough}</option>
        });

        const boroughSelectClasses = 'LandingPage_select' + (this.state.selectedSearchMethod !== null && this.state.selectedSearchMethod === 'borough' ? ' show' : ' hide');
        const nameSelectClasses = 'LandingPage_select' + (this.state.selectedSearchMethod !== null && this.state.selectedSearchMethod === 'name' ? ' show' : ' hide');
        
        const boroughInputChildren = (
            <select
                disabled={this.state.selectedSearchMethod !== null && this.state.selectedSearchMethod !== 'borough'}
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

        return(
            <div className="LandingPage">
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
                
                <button>Find Restaurants!</button>
            </div>
        );
    }
}