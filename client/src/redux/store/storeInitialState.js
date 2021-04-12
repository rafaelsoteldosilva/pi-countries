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

export const storeInitialState = {
    typeOfLoad: 'fromAPI',
    loadingCountries: false,
    loadingActivities: false,
    loadingCountryActivities: false,
    dontLoadCountries: false,
    countries: [],
    activities: [],
    continents: [],
    country_activity: [], // [{'PAK', 1}, {'USA', 3}, {'USA', 1}, ...}] <----> {alpha3Code, id}
    icons: [{
            id: 0,
            name: 'not specified',
            url: 'https://img.icons8.com/color/48/000000/door-hanger.png'
        },
        {
            id: 1,
            name: 'bungee',
            url: 'https://img.icons8.com/color/48/000000/bungee-jumping.png'
        },
        {
            id: 2,
            name: 'canooing',
            url: 'https://img.icons8.com/color/48/000000/canoe-sprint.png'
        },
        {
            id: 3,
            name: 'canyoneering',
            url: 'https://img.icons8.com/color/48/000000/grand-canyon.png'
        },
        {
            id: 4,
            name: 'caving',
            url: 'https://img.icons8.com/color/48/000000/cave.png'
        },
        {
            id: 5,
            name: 'climbing',
            url: 'https://img.icons8.com/color/48/000000/climbing.png'
        },
        {
            id: 6,
            name: 'cycling',
            url: 'https://img.icons8.com/color/48/000000/cycling-road--v1.png'
        },
        {
            id: 7,
            name: 'diving',
            url: 'https://img.icons8.com/color/48/000000/diving.png'
        },
        {
            id: 8,
            name: 'hiking',
            url: 'https://img.icons8.com/color/48/000000/national-park.png'
        },
        {
            id: 9,
            name: 'hot-air ballon',
            url: 'https://img.icons8.com/color/48/000000/hot-air-balloon.png'
        },
        {
            id: 10,
            name: 'jumping',
            url: 'https://img.icons8.com/color/48/000000/base-jumping.png'
        },
        {
            id: 11,
            name: 'kayaaking',
            url: 'https://img.icons8.com/color/48/000000/canoe-slalom--v1.png'
        },
        {
            id: 12,
            name: 'mauntain byking',
            url: 'https://img.icons8.com/color/48/000000/cycling-mountain-bike--v1.png'
        },
        {
            id: 13,
            name: 'mountaneering',
            url: 'https://img.icons8.com/color/48/000000/landscape.png'
        },
        {
            id: 14,
            name: 'parachuting',
            url: 'https://img.icons8.com/color/48/000000/parachute.png'
        },
        {
            id: 15,
            name: 'rafting',
            url: 'https://img.icons8.com/color/48/000000/rafting.png'
        },
        {
            id: 16,
            name: 'sailing',
            url: 'https://img.icons8.com/color/48/000000/sailing.png'
        },
        {
            id: 17,
            name: 'scuba diving',
            url: 'https://img.icons8.com/color/48/000000/scuba-mask.png'
        },
        {
            id: 18,
            name: 'sky diving',
            url: 'https://img.icons8.com/color/48/000000/skydiving.png'
        },
        {
            id: 19,
            name: 'star gazing',
            url: 'https://img.icons8.com/color/48/000000/stargaze.png'
        },
        {
            id: 20,
            name: 'skiing',
            url: 'https://img.icons8.com/color/48/000000/nordic-combined.png'
        },
        {
            id: 21,
            name: 'surfing',
            url: 'https://img.icons8.com/office/16/000000/skimboarding.png'
        },
        {
            id: 22,
            name: 'trekking',
            url: 'https://img.icons8.com/color/48/000000/trekking.png'
        },
        {
            id: 23,
            name: 'ziplining',
            url: 'https://img.icons8.com/color/48/000000/zipline.png'
        },
    ],
    fetchCountriesError: '',
    fetchActivitiesError: '',
    fetchCountryActivitiesError: '',
    newActivityId: 1,
    messageFromRedux: ''
}