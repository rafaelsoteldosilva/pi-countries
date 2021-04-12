import { createStore } from 'redux'
import countriesReducer from '../reducers/countriesReducer'

// state:
// loadingCountries: false,
// loadingActivities: false,
// loadingCountryActivities: false,
// countries: [{alpha3Code, name, continent, subRegion, capital, area, flagUrl, population, visibility}, {...}, ...],
// activities: [{actId, name, type, season, difficulty, duration}, {...}, ...],
// country_activity: [{alpha3Code, id}, {...}, ...], 
// fetchCountriesError: '',
// fetchActivitiesError: '',
// fetchCountryActivitiesError: '',
// newActivityId: 1

export const store = createStore(countriesReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
export default store;