import React from 'react';
import ReactDOM from'react-dom';

export const Profile=({currentUserDp})=>{

    var Levels=[

        "Unrepentant slacker",
        "Persistent slacker",
        "Recovering slacker",
        "Depressed drone",
        "Demoralized drone",
        "Dead-eyed drone",
        "Bored attendant",
        "Resigned attendant",
        "Obedient attendant",
        "Competent operative",
        "Engaged operative",
        "Committed operative",
        "Valuable asset",
        "Strategic asset",
        "Critical asset",
        "Habitual workaholic",
        "Determined workaholic",
        "Die-hard workaholic",
        "GOD"
    ]
    
    
    var coins=1801;
    var level=Levels[parseInt(coins/100)];
    
    var CurrentUser=window.localStorage.getItem("username")

    return(
        <div className="Profile">
            <div className="ProfilePic">
                <p>{CurrentUser}</p>
                <img className="Avatar" src={currentUserDp[CurrentUser]}/>
                
            </div>
            <div className="Assets">
                <div className="Coins">
                    <p>1928 coins</p>
                </div>
                <div className="Level">
                    <p>Slacker</p>
                </div>
            </div>
            <div className="TasksAndReq uests">
                
               
            </div>
        </div>
    )
}
