import React from 'react';
import ReactDOM from'react-dom';
import addFriend from '../../media/icons/addFriend.svg';
import axios from 'axios';
export const Friend=({name,path,setpopup,setPopupDetails,currentUserDp,isMyfriend})=>{
    if(path)
    {
        // console.log(isMyfriend)
        let degree=path
        switch(degree)
        {
            case 1:degree="1st"
            break
            case 2:degree="2nd"
            break
            case 3:degree="3rd"
            break
            default:degree=`${degree}th`
        }
        // path.forEach(node=>{
        //     console.log(node)
        // })
        var showPopup=(e)=>{
            if(e.target.className!="addFriend")
            {   setpopup(true)
                setPopupDetails(path)
            }
        }
        var handleAddFriend=async()=>{
            console.log(name);
            let body=
            {
                "u":name,
                "v":window.localStorage.getItem("username")
            }
            try{
                let res=await axios.post('/add',body);
                window.location.reload()
            }
            catch(error)
            {
                console.log(error)
            }
        }
        return(
        <div className="Friend" onClick={e=>showPopup(e)}>
            <img className="dp" src={currentUserDp[name]}/>
            <div className="FriendUname">{name}</div>
            <div className="degree">{degree}</div>
            {!isMyfriend&&<img className="addFriend" src={addFriend} onClick={()=>handleAddFriend()}/>}
        </div>
        )
        }
        return(
            <>
            </>
        )
}