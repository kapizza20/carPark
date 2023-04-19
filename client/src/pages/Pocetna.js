import React from "react";

const Pocetna=({user})=>{
    return(
        <div className="gifBackground">
        {user? <h1 className="backBlack">Налог потврђен, добродошли {user}</h1> : <h1 className="backBlack">Пријавите се за рад у апликацији</h1>

        }
            
        </div>
    )
}

export default Pocetna;