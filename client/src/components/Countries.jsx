import React, { Component } from 'react'
import CountryCard from './CountryCard';
import style from "./Countries.module.css";
import Toolbar from './Toolbar';
import Country from './Country';
import { connect } from 'react-redux';
// import { orderCountriesActn, filterByActivityActn, loadCountriesFromDB, loadCountriesFromApi } from '../redux/actions/actionCreators';
import { orderCountriesActn, filterByActivityActn, loadCountriesFromApi, loadCountriesFromDB } from '../redux/actions/actionCreators';
import Nav from "./Nav";

class Countries extends Component {
    constructor() {
        super()
        this.state={
            showCountry: false,
            activityId: 'ALL',
            country: {},
            countries: []
        }
    }

    componentDidMount = () => {
        // this.props.loadCountriesFromApi(this.props.dontLoadCountries)
        switch (this.props.typeOfLoad) {
            case 'fromAPI':
                this.props.loadCountriesFromApi(this.props.dontLoadCountries)
                break;
            case 'fromDB':
                this.props.loadCountriesFromDB(this.props.dontLoadCountries)
                break;
            default:
                alert(this.props.typeOfLoad)
                break;
        }
    }

    componentDidUpdate = () => {
        
    }

    handleSorting = (orderObj) => {
        this.props.orderCountries(orderObj)
    }

    handleCountryClick = (country) => {
        this.setState({
            showCountry: true, 
            country
        })
    }

    handleBackClick = (e) => {
        this.setState({
            showCountry: false
        })
    }
   
    handleActivityClick = (activityType) => {
        this.props.filterByActivity(activityType)
        this.setState({activityId: activityType})
    }

    showAlert = () => {
        // alert('loading countries')
    }

    render() {

        if (this.props.loadingCountries)
            return (
                <div>
                        <p>Loading Countries...</p>
                </div>
            )   
        else if (this.props.fetchCountriesError)
            return (
                <div>
                        <p>{this.props.fetchCountriesError}... Fetch canceled!!</p>
                </div>
            ) 
        return (
            <div className={style.countries}>
                <Nav/>
                {!this.state.showCountry && (
                    <div>
                        <Toolbar className={style.toolBar} 
                            newFilterActivityValue={this.state.activityId} 
                            activityId={this.state.activityId} 
                            onOrder={(orderObj) => this.handleSorting(orderObj)}/>
                        <div className={style.countryCardsAndActivities}>
                            <div className={style.countryCards}>
                                {this.props.countries.map(country => {
                                    if (country.visibility) {
                                        return (
                                            <CountryCard 
                                                key={country.alpha3Code}
                                                country={country}
                                                onCountryClick={this.handleCountryClick} /> 
                                            )
                                    } else return null
                                })}
                            </div>
                            <div className={style.activityTypesSideBar}>
                                {this.props.icons.map((icon) => {
                                    return (
                                        <div key={icon.id} className={style.eachActivity}>
                                            {/* <ul id={icon.url} onClick={() => this.handleActivityClick(icon.id)}> */}
                                            <ul id={icon.url} >
                                                <li>
                                                    <img src={icon.url} alt=""></img>
                                                    <p>{icon.name}</p>
                                                </li>
                                            </ul>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>

                )}
                {this.state.showCountry && (
                    <div className={style.oneCountry}>
                        <Country country={this.state.country} />
                        <button onClick={this.handleBackClick}>Back to Countries</button>
                    </div>
                )}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
       countries: state.countries,
       icons: state.icons,
       loadingCountries: state.loadingCountries,
       dontLoadCountries: state.dontLoadCountries,
       typeOfLoad: state.typeOfLoad,
       fetchCountriesError: state.fetchCountriesError
    }
 }
 
const mapDispatchToProps = (dispatch) => {
    return {
        loadCountriesFromApi: (aBool) => (loadCountriesFromApi(aBool, dispatch)),
        loadCountriesFromDB: (aBool) => (loadCountriesFromDB(aBool, dispatch)),
        orderCountries: orderObj => dispatch(orderCountriesActn(orderObj)),
        filterByActivity: (activityId) => dispatch(filterByActivityActn(activityId)),
  }};

export default connect (mapStateToProps, mapDispatchToProps)(Countries)
