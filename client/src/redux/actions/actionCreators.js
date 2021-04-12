// npm install axios
import axios from 'axios'

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
    FILTER_BY_CONTINENT,
    FILTER_BY_ACTIVITY,
    CLEAR_STORE,
} from "./actionConsts"

export function createActivityActn(activityBundle) {
    return {
        type: CREATE_ACTIVITY, // Check
        activityBundle
    }
}

export function fetchCountriesRequestActn() {
    return {
        type: FETCH_COUNTRIES_REQUEST,
    }
}

export function fetchCountriesSuccessActn(countries) {
    return {
        type: FETCH_COUNTRIES_SUCCESS,
        countries
    }
}

export function fetchCountriesFailureActn(error) {
    return {
        type: FETCH_COUNTRIES_FAILURE,
        error
    }
}

export function fetchActivitiesRequestActn() {
    return {
        type: FETCH_ACTIVITIES_REQUEST,
    }
}

export function fetchActivitiesSuccessActn(activities) {
    return {
        type: FETCH_ACTIVITIES_SUCCESS,
        activities
    }
}

export function fetchActivitiesFailureActn(error) {
    return {
        type: FETCH_ACTIVITIES_FAILURE,
        error
    }
}

export function fetchCountryActivitiesRequestActn() {
    return {
        type: FETCH_COUNTRY_ACTIVITIES_REQUEST,
    }
}

export function fetchCountryActivitiesSuccessActn(country_activities) {
    // console.log('fetchCountryActivitiesSuccessActn:: country_activities', country_activities)
    return {
        type: FETCH_COUNTRY_ACTIVITIES_SUCCESS,
        country_activities
    }
}

export function fetchCountryActivitiesFailureActn(error) {
    return {
        type: FETCH_COUNTRY_ACTIVITIES_FAILURE,
        error
    }
}

export function orderCountriesActn(orderObj) {
    return {
        type: ORDER_COUNTRIES, // order.type.asc, arder.type.desc, order.by.name, order.by.population
        orderObj
    }
}

export function filterByContinentActn(filterObj) {
    return {
        type: FILTER_BY_CONTINENT, // order.type.asc, arder.type.desc, order.by.name, order.by.population
        filterObj
    }
}
export function filterByActivityActn(filterObj) {
    return {
        type: FILTER_BY_ACTIVITY, // order.type.asc, arder.type.desc, order.by.name, order.by.population
        filterObj
    }
}
export function clearStoreActn() {
    return {
        type: CLEAR_STORE, // order.type.asc, arder.type.desc, order.by.name, order.by.population
    }
}
export function setTypeOfLoadActn(typeOfLoad) {
    // alert(typeOfLoad)
    return {
        type: TYPE_OF_LOAD, // Check
        typeOfLoad
    }
}

// export function setLoadCountriesAction(dontLoadCountries) {
//     return {
//         type: SET_COUNTRIES_LOADED, // order.type.asc, arder.type.desc, order.by.name, order.by.population
//         dontLoadCountries
//     }
// }

// ------------------------------------------------------------------------------------------
// countries: [{alpha3Code, name, continent, subRegion, capital, area, flagUrl, population}, {...}, ...],

export function loadCountriesFromApi(aBool, dispatch) { // Have to import axios
    if (!aBool) {
        dispatch(fetchCountriesRequestActn())
        axios.get('https://restcountries.eu/rest/v2/all')
            .then(response => {
                let countries = response.data.map(country => {
                        return {
                            alpha3Code: country.alpha3Code,
                            name: country.name,
                            continent: country.region,
                            subRegion: country.subregion,
                            capital: country.capital,
                            area: country.area,
                            flagUrl: country.flag,
                            population: country.population,
                            visibility: true
                        }
                    })
                    // countries = countries.slice(0, 2)
                dispatch(fetchCountriesSuccessActn(countries))
            })
            .catch(error => {
                dispatch(fetchCountriesFailureActn(error.message))
            })
    }
}

export function loadCountriesFromDB(aBool, dispatch) { // Have to import axios
    if (!aBool) {
        dispatch(fetchCountriesRequestActn())
        axios.get('http://localhost:3600/countries/getAllCountries')
            .then(response => {
                let resultingCountries = response.data.map(country => {
                        return {
                            alpha3Code: country.alpha3Code,
                            name: country.name,
                            continent: country.continent,
                            subRegion: country.subRegion,
                            capital: country.capital,
                            area: country.area,
                            flagUrl: country.flagUrl,
                            population: country.population,
                            activities: country.activities,
                            visibility: true
                        }
                    })
                    // console.log('loadCountriesFromDB(180):: resultingCountries: ', resultingCountries)
                let countries = resultingCountries.map(country => {
                        return {
                            alpha3Code: country.alpha3Code,
                            name: country.name,
                            continent: country.continent,
                            subRegion: country.subRegion,
                            capital: country.capital,
                            area: country.area,
                            flagUrl: country.flagUrl,
                            population: country.population,
                            visibility: true
                        }
                    })
                    // countries: [{alpha3Code, name, continent, subRegion, capital, area, flagUrl, population, visibility}, {...}, ...],
                    // activities: [{actId, name, type, season, difficulty, duration}, {...}, ...],

                dispatch(fetchCountriesSuccessActn(countries))


                let rawActivities = []
                let country_activities = []
                resultingCountries.forEach(country =>
                        country.activities.forEach(activity => {
                            rawActivities.push(activity)
                            country_activities.push({
                                alpha3Code: country.alpha3Code,
                                actId: activity.actId
                            })
                        }))
                    // console.log('loadCountriesFromDB(210):: rawActivities: ', rawActivities)

                let activities = rawActivities.map(activity => {
                        return {
                            actId: activity.actId,
                            name: activity.name,
                            type: activity.type,
                            season: activity.season,
                            difficulty: activity.difficulty,
                            duration: activity.duration
                        }
                    })
                    // console.log('loadCountriesFromDB(222):: before fetchActivitiesRequestActn')

                dispatch(fetchActivitiesRequestActn())

                // console.log('loadCountriesFromDB(226):: before fetchActivitiesSuccessActn')

                dispatch(fetchActivitiesSuccessActn(activities))

                // console.log('loadCountriesFromDB(230):: country_activities: ', country_activities)

                dispatch(fetchCountryActivitiesRequestActn())

                // console.log('loadCountriesFromDB(234):: before fetchCountryActivitiesSuccessActn')

                dispatch(fetchCountryActivitiesSuccessActn(country_activities))

                // console.log('loadCountriesFromDB(238):: done: ')

            })
            .catch(error => {
                alert(error.message)
                dispatch(fetchCountriesFailureActn(error.message))
            })
    }
}

export function saveACountryDB(country) {
    // console.log('saveACountry:: saving country')
    axios.post(`http://localhost:3600/countries/addCountry${country}`)
        // const result = fetch(`http://localhost:3600/countries/addCountry${country}`)
        // console.log(result)
}

export function saveAnActivityDB(activity) {
    // const res = fetch(`http://localhost:3600/activities/addActivity${activity}`);
    axios.post(`http://localhost:3600/activities/addActivity${activity}`)
        // console.log(res)
}

export function associateACountryWithAnActivityDB(pair) {
    // const res = fetch(`http://localhost:3600/activities/addActivity${pair}`);
    axios.post('http://localhost:3600/activities/addActivity', pair)
        // console.log(res)
}