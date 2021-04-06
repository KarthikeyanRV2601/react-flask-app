import React from 'react';
import ReactDOM from'react-dom';

export const Friend=({name,degree,path,setpopup,setPopupDetails})=>{
    if(path)
    {
    path=path.slice(1,path.length)
    // path.forEach(node=>{
    //     console.log(node)
    // })
    var showPopup=()=>{
        setpopup(true)
        setPopupDetails(path)
    }
    return(
     <div className="Friend" onClick={e=>showPopup()}>
        <img className="dp" src={`https://randomuser.me/api/portraits/men/${Math.floor((Math.random() * 50) + 1)+45}.jpg`}/>
        <div className="FriendUname">{name}</div>
        <div className="degree">{degree}</div>
    </div>
    )
    }
    return(
        <>
        </>
    )
}