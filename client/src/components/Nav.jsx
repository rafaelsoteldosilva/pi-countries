import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import style from "./Nav.module.css";

export default class Nav extends Component {
    render() {
        return (
            <div>
                <nav className={style.nav}>
                    <Link to="/" className={style.subNav}>
                        <p>Init</p>
                    </Link>
                    <Link to="/countries" className={style.subNav}>
                        <p>Countries</p>
                    </Link>
                    <Link to="/createactivity" className={style.subNav}>
                        <p>Create Activities</p>
                    </Link>
                </nav>
            </div>
        )
    }
}
