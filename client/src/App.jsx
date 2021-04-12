
import "./App.css";
import { Route } from "react-router-dom";
import Countries from './components/Countries';
import Header from './components/Header';
import CreateActivity from './components/CreateActivity';
// import store from './redux/store/store';
import { useState, Component } from "react";
import ShowSplashWindow from "./components/ShowSplashWindow";
import Nav from "./components/Nav";

class App extends Component {
    // constructor() {
    //     super()
    //     this.state={

    //     }
    // }
    render() {
        return (
            <div className = "App">
                <Route path="/" render={() => <Header />} />  
                <Route exact path="/" render={() => <ShowSplashWindow />} />  
                {/* <Route path="/" render={() => <Nav />} />   */}
                <Route exact path="/countries" render={() => <Countries />} />  
                <Route exact path="/createactivity" render={() => <CreateActivity />} />
            </div>
        );
    }
}

export default App;
