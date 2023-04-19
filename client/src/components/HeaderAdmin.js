import React from "react";
import {Link} from 'react-router-dom';
import useAuth from "../hooks/useAuth";
import { useNavigate,useLocation} from "react-router-dom";

const HeaderAdmin=({dozvola})=>{
    const location = useLocation();
    const navigate=useNavigate();
    const { auth,setAuth } = useAuth();
    console.log("DOZVOLA",dozvola,auth)
    
    return(
        <div className="ui secondary pointing menu">
            <div className="ui container">
                <Link className="item" to="/">Почетна</Link>
                {(auth?.IDPrivilegije==2 || auth?.IDPrivilegije==1) ? (
                <div className="ui secondary  menu">
                    <Link className="item" to='/evidencije'>Евиденција</Link>
                </div>) : (
                    <div></div>
                )
                }

                {auth?.IDPrivilegije==1 ? (
                <div className="ui secondary  menu">
                    <Link className="item" to="/marke">Марке</Link>
                    <Link className="item" to="/tipovi">Типови</Link>
                    <Link className="item" to='/statusi'>Статуси</Link>
                    <Link className="item" to='/vozila'>Возила</Link>
                    <Link className="item" to='/cinovi'>Чинови</Link>
                    <Link className="item" to='/vozaci'>Возачи</Link>
                    <Link className="item" to='/register'>Регистрација</Link>
                </div>):(
                    <div></div>
                )
                }
                
            </div>
            <div className="right menu">
                <button onClick={()=> {
                    setAuth({});
                    navigate("/login");
                }} className="ui button" >
                {auth.Username ? "Одјави се":"Пријави се"}
                </button>
            </div>
        </div>
    )
}

export default HeaderAdmin;