import React, { Component } from 'react'
import { connect } from 'react-redux';
import { associateACountryWithAnActivityDB, saveAnActivityDB, createActivityActn } from '../redux/actions/actionCreators';
import style from "./CreateActivity.module.css";
import { loadCountriesFromApi } from '../redux/actions/actionCreators';
import Nav from './Nav';
import axios from 'axios';

class CreateActivity extends Component {
    constructor() {
        super()
        this.state = {
            name: '',
            typeId: 0,
            difficulty: 1,
            duration: 1,
            season: '',
            iconUrl: '',
            countriesAlpha3Code: '',
            nameError: 'name is required',
            countriesAlpha3CodeError: 'missing countries'
        }
    }

    componentDidMount = () => {
        // alert('CreateActivity.jsx (26):: componentDidMount')
        this.props.loadCountries(this.props.dontLoadCountries)
        // this.initialValidateAll()
    }

    validate = (inputStr) => {
        var error = '';
        if (!inputStr) 
            error =  'name is required'
        else {
            const activity = this.props.activities.find(activity => activity.name === inputStr)
            if (activity !== undefined)
                error = "That name is being used by other activity"
        }
        return error
    }

    createTheActivity = (e) => {
        e.preventDefault()

        let newActivityBundle = {}
        newActivityBundle.actId = this.props.newActivityId
        newActivityBundle.name = this.state.name
        newActivityBundle.typeId = this.state.typeId 
        const element = document.getElementById('seasonSelector');
        newActivityBundle.season = element.value
        newActivityBundle.difficulty = this.state.difficulty
        newActivityBundle.duration = this.state.duration
        // console.log('createTheActivity:: newActivityBundle: ', newActivityBundle);
        axios.post('http://localhost:3600/activities/addActivity', newActivityBundle)
        // this.props.createActivityDB(newActivityBundle)

        let arr = this.state.countriesAlpha3Code.split('*')
        let rsltArr = []
        arr.forEach(element => {
          if (element !== '') {
            rsltArr.push(element.split(':')[0])
          }
        })
        rsltArr = [...new Set(rsltArr)]
        newActivityBundle.countriesAlpha3Code = rsltArr

        // console.log('createTheActivity:: rsltArr: ', rsltArr);

        rsltArr.forEach(alpha3Code => {
            let pair = {
                alpha3Code,
                actId: newActivityBundle.actId
            }
            axios.post('http://localhost:3600/activities/setActivityCountry', pair)
        })
        
        this.setState({
            name: '',
            typeId: 0,
            difficulty: 1,
            duration: 1,
            season: '',
            iconUrl: '',
            countriesAlpha3Code: '',
            nameError: 'name is required',
            countriesAlpha3CodeError: 'missing countries'
        })
        
        // console.log('CreateActivity (64):: newActivity ', newActivityBundle);
        this.props.createActivity(newActivityBundle)
        // this.initialValidateAll()
    }

    handleInputChange = (e) => {
        let nameErr = this.validate(e.target.value)
        let countriesError = (this.state.countriesAlpha3Code.length === 0)
        this.setState({
            ...this.state,
            [e.target.name]: e.target.value,
            countriesAlpha3CodeError: countriesError ? 'missing countries' : '',
            nameError: nameErr
        });
    }

    handleUpClick = (e) => {
        e.preventDefault()
        if ((e.target.name === 'difficulty') && (this.state[e.target.name] + 1 > 5)) {
            alert ("5 is the maximum value")
            return
        }
        this.setState({
            ...this.state, 
            [e.target.name]: this.state[e.target.name] + 1
        })
    }

    handleDownClick = (e) => {
        e.preventDefault()
        if (this.state[e.target.name] - 1 > 0)
            this.setState({
                ...this.state, 
                [e.target.name]: this.state[e.target.name] - 1
            })
        else
            alert("1 is the minimum value")
    }

    handleAddACountryClick = (e) => {
        e.preventDefault()
        const element = document.getElementById('countrySelector');
        this.setState({
            ...this.state, 
            countriesAlpha3CodeError: '',
            countriesAlpha3Code: (this.state.countriesAlpha3Code === '') ? 
                            `*${element.value}` : 
                            this.state.countriesAlpha3Code + `\n*${element.value}`
        })
    }

    handleIconUrlClick = (e) => {
        e.preventDefault()
        const element = document.getElementById('iconUrlSelector');
        this.setState({
            ...this.state, 
            iconUrl: this.props.icons[element.value].url,
            typeId: this.props.icons[element.value].id
        })
    }

    showSubmit = () => {
        if (this.state.nameError || this.state.countriesAlpha3CodeError)
            return <input className={style.submit} type="submit" name="" value="Submit" disabled/>
        else
            return <input className={style.submit} type="submit" name="" value="Submit" />
    }

    render() {
        
        return (
            <div>
                <Nav/>
                <form className={style.createActivity} onSubmit={(e) => this.createTheActivity(e)}>
                    <label className={style.labelName + ' ' + style.formItem}>Activity Name</label>
                    <div className={style.inputName + ' ' + style.formItem}>
                        <input className={this.state.nameError && style.danger} 
                            type="text" 
                            name="name" 
                            autoFocus
                            value={this.state.name} 
                            onChange={this.handleInputChange.bind(this)} 
                            />
                    </div>
                    {this.state.nameError && <p className={style.redText}>{this.state.nameError}</p>}
                    <label className={style.labelIconUrl + ' ' + style.formItem}>Type of activity</label>
                    <div className={style.optionIconUrl + ' ' + style.formItem}>
                        <img className={style.iconImage} src={this.state.iconUrl} alt="" />
                        <button className={style.iconAddButton} onClick={this.handleIconUrlClick}>&#x2190;</button>
                        <select id="iconUrlSelector">
                            {this.props.icons.map(icon => 
                                <option key={icon.name} value={icon.id}>
                                    {icon.name}
                                </option>
                            )}
                        </select>
                    </div>
                    <label className={style.labelDifficulty + ' ' + style.formItem}>Difficulty (from 1 to 5)</label>
                    <div className={style.inputDifficulty + ' ' + style.formItem}>
                        <input
                            type="text" 
                            name="difficulty" 
                            value={this.state.difficulty} 
                            readOnly
                            />
                        <button name="difficulty" onClick={this.handleUpClick}>&#x2191;</button>
                        <button name="difficulty" onClick={this.handleDownClick}>&#x2193;</button>
                    </div>
                    <label className={style.labelDuration + ' ' + style.formItem}>Duration (# of days)</label>
                    <div className={style.inputDuration + ' ' + style.formItem}>
                        <input
                            type="text" 
                            name="duration" 
                            value={this.state.duration} 
                            readOnly
                            />
                        <button name="duration" onClick={this.handleUpClick}>&#x2191;</button>
                        <button name="duration" onClick={this.handleDownClick}>&#x2193;</button>
                    </div>
                    <label className={style.labelSeason + ' ' + style.formItem}>Season</label>
                    <div>
                        <select id="seasonSelector">
                            <option value='Winter'>Winter</option>
                            <option value='Spring'>Spring</option>
                            <option value='Summer'>Summer</option>
                            <option value='Fall'>Fall</option>
                        </select>
                    </div>
                    <div className={style.optionCountries + ' ' + style.formItem}>
                        <textarea  className={this.state.countriesAlpha3CodeError && style.danger} 
                            name="countries"
                            value={this.state.countriesAlpha3Code} 
                            rows="5" 
                            cols="40"
                            readOnly
                        >
                        </textarea>
                        <button onClick={this.handleAddACountryClick}>&#x2190;</button>
                        <select id="countrySelector">
                            {this.props.countries.map(country => 
                                <option key={country.alpha3Code} value={country.alpha3Code + ': ' + country.name}>
                                    {country.alpha3Code + ': ' + country.name}
                                </option>
                            )}
                        </select>
                    </div>
                        {this.state.countriesAlpha3CodeError && <p className={style.redText}>{this.state.countriesAlpha3CodeError}</p>}

                    {this.showSubmit()}
                </form>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
       countries: state.countries,
       activities: state.activities,
       icons: state.icons,
       newActivityId: state.newActivityId,
       dontLoadCountries: state.dontLoadCountries,
    }
 }
 
function mapDispatchToProps(dispatch) {
    return {
       createActivity: (activityBundle) => dispatch(createActivityActn(activityBundle)),
       createActivityDB: (activity) => dispatch(saveAnActivityDB(activity)),
       relateCountryActivity: (pair) => dispatch(associateACountryWithAnActivityDB(pair)),
       loadCountries: (aBool) => (loadCountriesFromApi(aBool, dispatch)),
    }
}

export default connect (mapStateToProps, mapDispatchToProps)(CreateActivity)