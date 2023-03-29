import React from "react";
import {Link} from 'react-router-dom';

const Header=()=>{
    return(
        <div className="ui secondary pointing menu">
            <div className="ui container">
                <Link className="item" to="/">Почетна</Link>
                <Link className="item" to="/marke">Марке</Link>
                <Link className="item" to="/tipovi">Типови</Link>
                <Link className="item" to='/statusi'>Статуси</Link>
                <Link className="item" to='/vozila'>Возила</Link>
            </div>
            <div className="right menu">
                <a className="ui item">
                Одјави се
                </a>
            </div>
        </div>
    )
}

export default Header;