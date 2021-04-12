import axios from 'axios';
import React, { Component } from 'react'
import { connect } from 'react-redux';
import { filterByContinentActn, filterByActivityActn, saveACountryDB, saveAnActivityDB, associateACountryWithAnActivityDB } from '../redux/actions/actionCreators';
import style from "./Toolbar.module.css";
// const axios = require('axios');

class Toolbar extends Component {
    constructor() {
        super()
        this.state = {
            orderType: 'ASC',
            orderBy: 'name',
            continent: 'ALL',
            activity: 'ALL'
        }
    }

    componentDidMount = () => {
        // console.log("ToolBar:: I'm mounting");
    }

    handleSelectChange = (e) => {
        this.setState({
            ...this.state,
            [e.target.name]: e.target.value,
        });
        let elementOrderType = document.getElementById('orderType');
        let elementOrderBy = document.getElementById('orderBy');
        let elementContinent = document.getElementById('continent');
        let elementActivity = document.getElementById('activity');

        let orderObj = {
            orderType: elementOrderType.value,
            orderBy: elementOrderBy.value
        };
        let filterObj = {
            continent: elementContinent.value,
            activityTypeId: elementActivity.value 
        }
        switch (e.target.name) {
            
            case 'orderType':
                orderObj.orderType = elementOrderType.value === 'ASC' ? 'ASC' : 'DESC';
                this.props.onOrder(orderObj)            
            break;
                
            case 'orderBy':
                orderObj.orderBy = elementOrderBy.value === 'name' ? 'name' : 'population';
                this.props.onOrder(orderObj)            
            break;

            case 'continent':
                this.props.filterByContinent(filterObj)
            break;
                    
            case 'activity':
                this.props.filterByContinent(filterObj)
            break;
        
            default:
            break;
        }
    }

    // countries: [{alpha3Code, name, continent, subRegion, capital, area, flagUrl, population}, {...}, ...],
    // activities: [{id, name, typeId, season, difficulty, duration}, {...}, ...],
    // country_activity: [{alpha3Code, id}, {...}, ...], 
    
    saveCountriesToDatabase = () => {

        // axios.post('http://localhost:3600/countries/addCountry', this.props.countries[0])

        // axios.post('http://localhost:3600/activities/addActivity', this.props.activities[0])

        // axios.put('http://localhost:3600/activities/setActivityCountry', this.props.country_activity[0])

        var countryPromisesArray = []
        let countryPromise = null
    //    console.log('saveCountriesToDatabase:: this.props.countries: ', this.props.countries);
        // console.log('saveToDatabase(73):: saving to database');
        this.props.countries.forEach(country => {
            // this.props.saveCountry(country)
            // console.log('saveCountriesToDatabase:: country: ', country);
            axios.post('http://localhost:3700/countries/addCountry', country)

            countryPromisesArray.push(countryPromise)
        })
        // console.log('saveToDatabase(89):: will save activities');

        Promise.all(countryPromisesArray).then(() => {
            // console.log('saveToDatabase(91):: saving activities');

            this.props.activities.forEach(activity => {
                // console.log('saveToDatabase(92):: activity: ', activity);

                axios.post('http://localhost:3700/activities/addActivity', activity)

                this.props.country_activity.forEach(pair => {
                    if (pair.actId === activity.actId) {
                        // console.log('saveToDatabase(93):: pair: ', pair);
                        axios.post('http://localhost:3700/activities/setActivityCountry', pair)
                    }
                })
            })
        });
    }

    render() {
        return (
            <div className={style.toolBar}>
                <select id="orderType" name="orderType" value={this.state.orderType} onChange={this.handleSelectChange} className={style.orderType} >
                    <option value="ASC">Ascending</option>
                    <option value="DESC">Descending</option>
                </select>
                <select id="orderBy" name="orderBy" value={this.state.orderBy} onChange={this.handleSelectChange} className={style.orderCriteria} >
                    <option value="name">Country Name</option>
                    <option value="population">Population</option>
                </select>
                <select id="continent" name="continent" value={this.state.continent} onChange={this.handleSelectChange} className={style.continents}>
                    <option key='-1' value="ALL">All</option>
                    {this.props.continents.map(continent => {
                        return (
                            <option key={continent} value={continent}>{continent}</option>
                        )
                    })}
                </select>
                <select id="activity" name="activity" value={this.state.activity} onChange={this.handleSelectChange} className={style.activitySelector}>
                    <option key='-1' value="ALL">All</option>
                    {this.props.icons.map(icon => {
                        return (
                            <option key={icon.id} value={icon.id}>{icon.name}</option>
                        )
                    })}
                </select>
                <button className={style.orderButton} onClick={() => this.saveCountriesToDatabase()}>Save countries to Database</button>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
       countries: state.countries,
       activities: state.activities,
       country_activity: state.country_activity,
       continents: state.continents,
       icons: state.icons
    }
 }

 function mapDispatchToProps(dispatch) {
    return {
       filterByContinent: (continent) => dispatch(filterByContinentActn(continent)),
       filterByActivity: (activityId) => dispatch(filterByActivityActn(activityId)),
       saveCountry: (country) => dispatch(saveACountryDB(country)),
       saveActivity: (activity) => dispatch(saveAnActivityDB(activity)),
       associateCountryActivity: (pair) => dispatch(associateACountryWithAnActivityDB(pair))
    }
}

export default connect (mapStateToProps, mapDispatchToProps)(Toolbar)