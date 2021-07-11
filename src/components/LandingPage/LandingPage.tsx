import React from 'react';
import './LandingPage.scss';
import { LandingPageInterface } from './LandingPageInterface';
import config from '../../config/constants/landing-page';

export default class LandingPage extends React.Component<{}, LandingPageInterface> {
    constructor(props: any) {
        super(props);

        this.state = {
            showBoroughSelect: false,
        };
    }

    toggleBoroughs() {
        this.setState({ showBoroughSelect: !this.state.showBoroughSelect });
    }

    render() {
        const boroughList = config.boroughNames.map((borough)=> {
            return <option value={borough}>{borough}</option>
        });

        const boroughSelectClasses = 'LandingPage_select' + (this.state.showBoroughSelect ? ' show' : ' hide');
        return(
            <div className="LandingPage">
                <div className="LandingPage_findBy">
                    <label>
                        Find Restaurants by Borough:
                        <input type="radio" name="search-method" value="borough" onClick={() => {this.toggleBoroughs()}}/>
                    </label>
                    <div className={boroughSelectClasses}>
                        <label>
                            Select Borough:
                            <select name="select-borough">
                                {boroughList}
                            </select>
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