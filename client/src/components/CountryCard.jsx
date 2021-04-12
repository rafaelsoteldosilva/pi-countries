import React, { Component } from 'react'
import { connect } from 'react-redux';

import style from "./CountryCard.module.css";

class CountryCard extends Component {
    constructor() {
        super()
        
        this.state = {
            currentCountry: null
        }
        // this.componentDidMount.bind(this)
    }

    componentDidMount () {
        this.setState({
            currentCountry: this.props.country
        })
    }

    showActivitiesIcon = (country, activities, country_activity) => {
        // [{'PAK', 1}, {'USA', 3}, {'USA', 1}, ...}] <----> {alpha3Code, id}

        var activityIconsUrlArr = []
        country_activity.forEach((pair) => {
            // pair is an array of 1 object, the corresponding pair {alpha3Code, id}, then why [0]? ??????
            if (pair.alpha3Code === country.alpha3Code) {
                const activity = activities.find((activity) => (activity.actId === pair.actId))

                activityIconsUrlArr = activityIconsUrlArr.concat({
                    type: this.props.icons[activity.typeId].id, 
                    url: this.props.icons[activity.typeId].url,
                    name: activity.name
                })
            }
        })
        return (
            <div className={style.activityIcons} >
                            {activityIconsUrlArr.map(elem => 
                                    <img key={elem.name} className={style.activityIconUrl} src={elem.url} alt=""/>  )}
            </div>
        ) 
    }

    render() {
        let country = this.props.country
        // if (!country.visibility) return null
        return (
            <div className={style.countryCard} key={country.id} 
                onClick={() => this.props.onCountryClick(country)}>
                <div className={style.images}>
                    <img className={style.flagImage} 
                            src={country.flagUrl} 
                            alt={`${country.name} flag`} />
                    {this.showActivitiesIcon.bind(this)(country, this.props.activities, this.props.country_activity)}

                </div>
                <div className={style.associatedText}>
                    <p className={style.countryName}>{country.name}</p>
                    <p className={style.countryContinent}>{country.continent}</p>
                    <p className={style.subRegion}>{country.subRegion}</p>
                    <p className={style.countryPopulation}>Population {country.population}</p>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        activities: state.activities,
        country_activity: state.country_activity,
        icons: state.icons
    }
 }
 

export default connect (mapStateToProps)(CountryCard)