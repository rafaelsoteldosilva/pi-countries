import React, { Component } from 'react'
import style from "./ShowSplashWindow.module.css";
import splashImage from "../images/adventures.jpg";
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { clearStoreActn, loadCountriesFromApi, loadCountriesFromDB, setTypeOfLoadActn } from '../redux/actions/actionCreators';


class ShowSplashWindow extends Component {
    constructor() {
        super()
        this.state = {
            typeOfLoad: 'fromAPI'
        }
    }
    
    handleOptionChange = (e) => {
        this.setState({typeOfLoad: e.target.value})
        this.props.setTypeOfLoad(e.target.value)
        // console.log(this.state.typeOfLoad, this.props.typeOfLoad)
    }
 
    loadData = () => {
        this.props.loadCountriesFromApi(this.props.dontLoadCountries)

        // this.props.clearStore()
        // switch (this.state.typeOfLoad) {
        //     case 'fromAPI':
        //         this.props.loadCountriesFromApi(this.props.dontLoadCountries)
        //         break;
        //     case 'fromDB':
        //         this.props.loadCountriesFromDB(this.props.dontLoadCountries)
        //         break;
        //     default:
        //         alert(this.props.typeOfLoad)
        //         break;
        // }
    }

    render() {
        return (
            <div>
                <img className={style.splashImage} src={splashImage} alt="initial splash"/>
                <p></p>
                {/* <select value={this.state.typeOfLoad} onChange={this.handleOptionChange}>
                    <option value="fromAPI">From API</option>
                    <option value="fromDB">From DB</option>
                </select> */}
                <button onClick={this.loadData}>Load Data</button>
                <Link to="/countries" className={style.subNav}>
                        <p>Countries</p>
                </Link>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        typeOfLoad: state.typeOfLoad
    }
 }
 
function mapDispatchToProps(dispatch) {
    return {
       setTypeOfLoad: (typeOfLoad) => dispatch(setTypeOfLoadActn(typeOfLoad)),
       clearStore: () => dispatch(clearStoreActn()),
       loadCountriesFromApi: (aBool) => (loadCountriesFromApi(aBool, dispatch)),
       loadCountriesFromDB: (aBool) => (loadCountriesFromDB(aBool, dispatch)),
    }
}

export default connect (mapStateToProps, mapDispatchToProps)(ShowSplashWindow)