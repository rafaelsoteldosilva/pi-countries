import { storeInitialState } from '../store/storeInitialState'
import {
    TYPE_OF_LOAD,
    CREATE_ACTIVITY,
    FETCH_COUNTRIES_REQUEST,
    FETCH_COUNTRIES_SUCCESS,
    FETCH_COUNTRIES_FAILURE,
    FETCH_ACTIVITIES_REQUEST,
    FETCH_ACTIVITIES_SUCCESS,
    FETCH_ACTIVITIES_FAILURE,
    FETCH_COUNTRY_ACTIVITIES_REQUEST,
    FETCH_COUNTRY_ACTIVITIES_SUCCESS,
    FETCH_COUNTRY_ACTIVITIES_FAILURE,
    ORDER_COUNTRIES,
    SET_COUNTRIES_LOADED,
    FILTER_BY_CONTINENT,
    FILTER_BY_ACTIVITY,
    CLEAR_STORE,
} from "../actions/actionConsts"

// state:
// loadingCountries: false,
// loadingActivities: false,
// loadingCountryActivities: false,
// countries: [{alpha3Code, name, continent, subRegion, capital, area, flagUrl, population}, {...}, ...],
// activities: [{actId, name, typeId, season, difficulty, duration}, {...}, ...],
// country_activity: [{alpha3Code, actId}, {...}, ...], 
// icons: [{id, name, url}, {...}, ...]
// fetchCountriesError: '',
// fetchActivitiesError: '',
// fetchCountryActivitiesError: '',
// newActivityId: 1
// filterObj: { continent: 'ALL', ativity: 'ALL' },
// messageFromRedux: ''
// viisibility

// Fetch order: 
// Countries -> Activities -> Country-Activity

function compareValues(key, order = 'ASC') {
    return function innerSort(a, b) {
        if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
            // property doesn't exist on either object
            return 0;
        }

        const varA = (typeof a[key] === 'string') ?
            a[key].toUpperCase() : a[key];
        const varB = (typeof b[key] === 'string') ?
            b[key].toUpperCase() : b[key];

        let comparison = 0;
        if (varA > varB) {
            comparison = 1;
        } else if (varA < varB) {
            comparison = -1;
        }
        return (
            (order === 'DESC') ? (comparison * -1) : comparison
        );
    };
}

export default function countriesReducer(prevState = storeInitialState, action) {
    switch (action.type) {
        case CLEAR_STORE:
            {
                return {
                    ...storeInitialState
                }
            }

        case TYPE_OF_LOAD:
            {
                return {
                    ...prevState,
                    typeOfLoad: action.typeOfLoad,
                    messageFromRedux: `set typeOfLoad: ${action.typeOfLoad}`
                }
            }

        case CREATE_ACTIVITY:
            {
                const newActivity = {
                    actId: action.activityBundle.actId,
                    name: action.activityBundle.name,
                    typeId: action.activityBundle.typeId,
                    season: action.activityBundle.season,
                    difficulty: action.activityBundle.difficulty,
                    duration: action.activityBundle.duration,
                }
                var activities = [...prevState.activities, newActivity]
                const newCountriesActivity = action.activityBundle.countriesAlpha3Code.map(alpha3Code => {
                    return {
                        alpha3Code,
                        actId: action.activityBundle.actId
                    }
                })
                var country_activity = [...prevState.country_activity]
                country_activity = country_activity.concat(newCountriesActivity)

                const newActivityId = prevState.newActivityId + 1

                return {
                    ...prevState,
                    activities,
                    country_activity,
                    newActivityId
                }
            }

        case FETCH_COUNTRIES_REQUEST:
            return {
                ...prevState,
                loadingCountries: true,
                countries: [],
                activities: [],
                continents: [],
                country_activity: [],
                fetchCountriesError: '',
                filterVisibility: null
            }

        case FETCH_COUNTRIES_SUCCESS:
            {
                var countries = [...action.countries]

                let continents = countries.map(country => { return (country.continent) })
                let continentsNoDuplicates = [...new Set(continents)]
                continentsNoDuplicates = continentsNoDuplicates.filter(elem => elem !== '')

                return {
                    ...prevState,
                    countries,
                    continents: continentsNoDuplicates,
                    loadingCountries: false,
                    dontLoadCountries: true,
                    fetchCountriesError: false,
                    newActivityId: 1 // fetchActivitiesSuccess have to update it to: 'last activity's id + 1'
                }
            }

        case FETCH_COUNTRIES_FAILURE:
            return {
                ...prevState,
                loadingCountries: false,
                fetchCountriesError: action.error
            }

        case FETCH_ACTIVITIES_REQUEST:
            return {
                ...prevState,
                activities: [],
                country_activity: [],
                loadingActivities: true,
                fetchActivitiesError: '',
            }

        case FETCH_ACTIVITIES_SUCCESS:
            {
                // all the properties of the fetched activity are needed here
                const activities = [...action.activities]
                const maxId = Math.max.apply(Math, activities.map(function(activity) { return activity.actId; }))

                return {
                    ...prevState,
                    activities,
                    country_activity: [],
                    loadingActivities: false,
                    fetchActivitiesError: '',
                    newActivityId: maxId + 1
                }
            }

        case FETCH_ACTIVITIES_FAILURE:
            return {
                ...prevState,
                loadingActivities: false,
                fetchActivitiesError: action.error
            }

        case FETCH_COUNTRY_ACTIVITIES_REQUEST:
            return {
                ...prevState,
                country_activity: [],
                loadingCountryActivities: true,
                fetchCountryActivitiesError: '',
            }

        case FETCH_COUNTRY_ACTIVITIES_SUCCESS:
            {
                // in the db, country_activity also has an id, which is not needed here
                // const country_activity = action.country_activity.map(pair => {
                //     return {
                //         alpha3Code: pair.alpha3Code,
                //         actId: pair.actId
                //     }
                // })
                return {
                    ...prevState,
                    country_activity: action.country_activity,
                    loadingCountryActivities: false,
                    fetchCountryActivitiesError: ''
                }
            }

        case FETCH_COUNTRY_ACTIVITIES_FAILURE:
            return {
                ...prevState,
                loadingCountryActivities: false,
                fetchCountryActivitiesError: action.error
            }

        case ORDER_COUNTRIES:
            {
                // action: orderType: 'asc', arderType: 'desc', orderBy: 'name', orderBy: 'population'
                // sortArray(key, order = 'asc')
                let orderedCountries = [...prevState.countries]
                orderedCountries = orderedCountries.sort(compareValues(action.orderObj.orderBy, action.orderObj.orderType));
                return {
                    ...prevState,
                    countries: [...orderedCountries]
                }
            }

        case SET_COUNTRIES_LOADED:
            {
                return {
                    ...prevState,
                    dontLoadCountries: action.dontLoadCountries
                }
            }

        case FILTER_BY_CONTINENT:
        case FILTER_BY_ACTIVITY:
            { // action.filterObj
                let country_activity = [...prevState.country_activity]
                let newCountries = [...prevState.countries].map(country => {
                    let visibilityRslt = false
                    if (action.filterObj.continent !== 'ALL') {
                        visibilityRslt = country.continent === action.filterObj.continent

                        if ((action.filterObj.activityTypeId !== 'ALL') && (visibilityRslt)) {
                            let hasAnActivityOfTheType = false
                            if (country_activity.length !== 0) {
                                for (let i = 0; i < prevState.country_activity.length; i++) {
                                    if (prevState.country_activity[i].alpha3Code === country.alpha3Code) {

                                        let activity = prevState.activities.find(activity => activity.actId === prevState.country_activity[i].actId)
                                        if (activity !== undefined) {
                                            if (activity.typeId.toString() === action.filterObj.activityTypeId) {
                                                hasAnActivityOfTheType = true
                                            }
                                        }
                                    }
                                }
                            }
                            visibilityRslt = hasAnActivityOfTheType
                        }
                    } else {
                        if (action.filterObj.activityTypeId !== 'ALL') {
                            let hasAnActivityOfTheType = false
                            if (country_activity.length !== 0) {
                                for (let i = 0; i < prevState.country_activity.length; i++) {
                                    if (prevState.country_activity[i].alpha3Code === country.alpha3Code) {

                                        let activity = prevState.activities.find(activity => activity.actId === prevState.country_activity[i].actId)
                                        if (activity !== undefined) {

                                            if (activity.typeId.toString() === action.filterObj.activityTypeId) {
                                                hasAnActivityOfTheType = true
                                            }
                                        }
                                    }
                                }
                            }
                            visibilityRslt = hasAnActivityOfTheType
                        } else
                            visibilityRslt = true
                    }
                    return {
                        ...country,
                        visibility: visibilityRslt
                    }
                })

                return {
                    ...prevState,
                    countries: [...newCountries],
                }
            }

        default:
            return prevState
    }
}