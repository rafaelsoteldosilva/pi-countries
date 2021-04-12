import React, { Component } from 'react'
import { connect } from 'react-redux';
import style from "./Country.module.css";

class Country extends Component {
    render() {
        let country = this.props.country
        return (
            <div className={style.country}>
                <div className={style.countryHeader}>
                    <img className={style.flagImage} 
                            src={country.flagUrl} 
                            alt={`${country.name} flag`} />
                    <div className={style.associatedText}>
                        <p className={style.text}>Country Name: {country.name}</p>
                        <p className={style.text}>Country Code: {country.alpha3Code}</p>
                        <p className={style.text}>Continent: {country.continent}</p>
                        <p className={style.text}>Sub Region: {country.subRegion}</p>
                        <p className={style.text}>Population {country.population}</p>
                        <p className={style.text}>Capital {country.capital}</p>
                        <p className={style.text}>Area {country.area}</p>
                        {/* <p className={style.text}>Visibility {country.visibility ? 'true' : 'false'}</p> */}
                    </div>
                </div>
                <div className={style.countryActivities}>
                   {this.props.country_activity.map(pair => 
                        { if (pair.alpha3Code === country.alpha3Code) {
                            let activity = this.props.activities.find(activity => activity.actId === pair.actId)
                            return (
// activities: [{id, name, typeId, season, difficulty, duration}, {...}, ...],

                                <div key={activity.actId} className={style.activity}>
                                    <img className={style.activityIconUrl} src={this.props.icons[activity.typeId].url} alt=""/>  
                                    <p className={style.activityName}> Name: {activity.name}</p>
                                    <p className={style.activityName}> Type: {this.props.icons[activity.typeId].name}</p>
                                    <p className={style.season}>Season: {activity.season}</p>
                                    <p className={style.difficulty}>Difficulty: {activity.difficulty} (from 1 to 5)</p>
                                    <p className={style.duration}>Duraction: {activity.duration} days</p>
                                </div>)
                            } else return null
                        }
                    )}
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
       icons: state.icons,
       activities: state.activities,
       country_activity: state.country_activity
    }
 }
 
export default connect (mapStateToProps)(Country)
