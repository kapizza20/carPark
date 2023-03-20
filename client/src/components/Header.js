import React from "react";
import {Link} from 'react-router-dom';

const Header=()=>{
    return(
        <div className="ui secondary pointing menu">
            <div className="ui container">
                <Link className="item" to="/">Home</Link>
                <Link className="item" to="/marke/createMarke">Nova marka</Link>
            </div>
            <div className="right menu">
                <a className="ui item">
                Logout
                </a>
            </div>
        </div>
    )
}

export default Header;