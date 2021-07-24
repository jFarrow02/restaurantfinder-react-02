import { useState, useEffect, useRef, DOMElement } from 'react';
import './LandingPage.scss';
import CuisineTypeInterface from '../../interfaces/CuisineInterface';
import SearchInputList from '../SearchInputList/SearchInputList';
import CuisineService from '../../services/cuisine-types-service';
import RestaurantService from '../../services/restaurant-service';
import config from '../../config/constants/landing-page';
import store, { restaurantListFetchActionCreator, cuisineTypesFetchActionCreator, searchSetActionCreator} from '../../redux/store';
import RestaurantInterface from '../../interfaces/RestaurantInterface';
import RestaurantList from '../RestaurantList/RestaurantList';
import BoroughSearchButton from '../BoroughSearchButton/BoroughSearchButton';

const LandingPage = (props: any) => {
    const [ selectedSearchValue, setSelectedSearchValue ] = useState<string | null >(null);
    const [ selectedSearchMethod, setSelectedSearchMethod ] = useState<string | null >(null);
    const [ cuisineTypes, setCuisineTypes ] = useState<CuisineTypeInterface[]>([]);
    const [ restaurantsList, setRestaurantsList ] = useState<RestaurantInterface[] | null>(null);

    const restaurantResultsRef: any = useRef(null);

    const [ borough, name, avgRating, cuisineType ] = config.searchMethods;

        const boroughList = config.boroughNames.map((borough, index)=> { return <option value={borough.full} selected={selectedSearchValue === borough.full} key={`borough-select-${index}`}>{borough.full}</option>});
        
        const gradesList = config.avgGrades.map((grade, index) => { return <option value={grade} key={`grade-select-${index}`}>{grade}</option>});

        const cuisineTypeList = cuisineTypes.map((type, index) => {
            const { cuisine_type } = type;
            return <option value={cuisine_type} selected={selectedSearchValue === cuisine_type} key={`cuisine-select-${index}`}>{cuisine_type}</option>
        });

        const getDefaultSearchValuesForMethod = (searchMethod: string) => {
            let defaultValue;
            const [borough, name, avgRating, cuisineType] = config.searchMethods;
            switch(searchMethod) {
                case borough:
                    defaultValue = config.boroughNames[0].full;
                    break;
                case name:
                    defaultValue = '';
                    break;
                case avgRating:
                    defaultValue = config.avgGrades[0];
                    break;
                case cuisineType:
                    defaultValue = cuisineTypes[0].cuisine_type;
                    break;
                default:
                    defaultValue = null;    
            }
            return defaultValue;
        };

        const setSelectedSearchMethodAndDefaultValue = (searchMethod: string) => {
            let defaultValue = getDefaultSearchValuesForMethod(searchMethod);
            setSelectedSearchValue(defaultValue);
            setSelectedSearchMethod(searchMethod);
        };


        useEffect(() => {
            const fetchCuisineTypes = async () => {
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
                setCuisineTypes(sorted);
                store.dispatch(cuisineTypesFetchActionCreator(sorted));
            };
            fetchCuisineTypes();
            
        }, []);

        const findRestaurants = async () => {
            const [ borough, name, avg_rating, cuisine_type ] = config.searchMethods;
            let restaurants = [];
            switch(selectedSearchMethod) {
                case borough:
                    restaurants = await RestaurantService.getRestaurantsByBorough(selectedSearchValue)
                    store.dispatch(restaurantListFetchActionCreator(restaurants));
                    break;
                case name:
                    restaurants = await RestaurantService.getRestaurantsByName(selectedSearchValue);
                    store.dispatch(restaurantListFetchActionCreator(restaurants));
                    break;
                case cuisine_type:
                    restaurants = await RestaurantService.getRestaurantsByCuisineType(selectedSearchValue);
                    store.dispatch(restaurantListFetchActionCreator(restaurants));
                    break;
                default:
                    throw new Error('unknown search method');
            }
            setRestaurantsList(restaurants);
            props.scrollToLocation(restaurantResultsRef.current.getBoundingClientRect());
        };

        const findRestaurantsByBorough = async (boroughName: string) => {
            const restaurants = await RestaurantService.getRestaurantsByBorough(boroughName);
            setRestaurantsList(restaurants);
            props.scrollToLocation(restaurantResultsRef.current.getBoundingClientRect());
        };

        const boroughInputChildren = (
            <select
                name="select-borough"
                onChange={(e) => {setSelectedSearchValue(e.target.value)}}
                
            >
               {boroughList}
            </select>
        );

        const nameInputChildren = (
            <input 
                type="text"
                onChange={(e) => {setSelectedSearchValue(e.target.value)}}
            />
        );

        const gradeInputChildren = (
            <select 
                name="select-avg-grade"
                onChange={(e) => {setSelectedSearchValue(e.target.value)}}
            >
                { gradesList}
            </select>
        );

        const cuisineInputChildren = (
            <select
                name="select-cuisine-type"
                onChange={(e) => {setSelectedSearchValue(e.target.value)}}
            >
                { cuisineTypeList }
            </select>
        );

        const searchInputConfig = [
            { name: 'search-method', value: name, labelText: 'Name', description: 'Find Restaurant by Name:', children: nameInputChildren },
            { name: 'search-method', value: avgRating, labelText: 'Average Rating', description: 'Find Restaurants by Average Rating:', children: gradeInputChildren },
            { name: 'search-method', value: cuisineType, labelText: 'Cuisine Type', description: 'Find Restaurants by Cuisine Type:', children: cuisineInputChildren },
        ];

        const content = restaurantsList ? <RestaurantList restaurantList={restaurantsList} /> : <></>
        
        const boroughSearchButtons = config.boroughNames.map((borough, index) => {
            return (
                <BoroughSearchButton key={`borough-select-${index}`} searchValue={borough.full} text={borough.abbr} clickHandler={findRestaurantsByBorough}/>
            );
        });
        return (
            <div className='LandingPage'>
                <h2 className="LandingPage_searchby">SEARCH BY BOROUGH:</h2>
                <section className='LandingPage_map' id='restaurant-search'>
                  {boroughSearchButtons}
                </section>
                <h2 className='LandingPage_or'>OR:</h2>
                <section className='LandingPage_search-input'>
                    <SearchInputList
                        clickHandler={findRestaurants}
                        cuisineTypes={cuisineTypes}
                        inputs={searchInputConfig}
                        searchEnabled={selectedSearchMethod!== null}
                        searchTerms={selectedSearchValue}
                        searchMethod={selectedSearchMethod}
                        onSearchMethodSelect={setSelectedSearchMethodAndDefaultValue}
                    />
                </section>
                <section className="LandingPage_search-results" ref={restaurantResultsRef}>
                    {content}   
                </section>
            </div>
        );
};

export default LandingPage;