import React from 'react';
import './LandingPage.scss';
import { LandingPageInterface } from './LandingPageInterface';
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
        return(
            <div className="LandingPage">
                <div className="LandingPage_findBy">
                    <label>
                        Find Restaurants by Borough:
                        <input
                            
                            type="radio"
                            name="search-method"
                            value="borough"
                            onClick={() => {this.setSelectedSearchMethod('borough')}}
                        />
                    </label>
                    <div className={boroughSelectClasses}>
                        <label>
                            Select Borough:
                            <select
                                disabled={this.state.selectedSearchMethod !== null && this.state.selectedSearchMethod !== 'borough'}
                                name="select-borough"
                            >
                                {boroughList}
                            </select>
                        </label>
                    </div>
                </div>

                <div className="LandingPage_findBy">
                    <label>
                        Find Restaurants by Name:
                        <input
                            
                            type="radio"
                            name="search-method"
                            value="name"
                            onClick={() => {this.setSelectedSearchMethod('name')}}
                        />
                    </label>
                    <div className={nameSelectClasses}>
                        <label>
                            Enter Restaurant Name:
                            <input type="text" value="name"></input>
                        </label>
                    </div>
                </div>
               
                {/* <div className="LandingPage_findBy">
                    <label>
                        Cuisine Type:
                        <input type="radio"/>
                    </label>
                </div>
                <div className="LandingPage_findBy">
                    <label>
                        Name:
                        <input type="radio"/>
                    </label>
                </div>
                <div className="LandingPage_findBy">
                    <label>
                        Average Rating:
                        <input type="radio"/>
                    </label>
                </div> */}
                <button>Find Restaurants!</button>
            </div>
        );
    }
}