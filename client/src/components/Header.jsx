import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import style from "./Header.module.css";

export default class Header extends Component {
    render() {
        return (
            <div>
                <div className={style.header}>
                    Adventures and Countries App
                </div>
            </div>
        )
    }
} 
