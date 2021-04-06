import React, { useRef, useState,useEffect } from 'react';
import ReactDOM from'react-dom';
import { Friend } from '../components/Friends_Components/Friend';
import { NavBar } from '../components/NavBar';
import {SearchBar} from '../components/SearchBar';
import {ResultUser} from '../components/Friends_Components/ResultUser';
import '../styles/friends.css';
import axios from 'axios';
import exit from '../media/icons/exit.svg';
export const Friends=()=>{

    var [FriendsList,setList]=useState([])
    var [MyFriendsList,setMyFriendsList]=useState([]);
    var [SuggestionsList,setSuggestionsList]=useState([]);
    var [globalList,setGlobalList]=useState([]);
    var ResultUsersList;
    var myFriends=useRef(null);
    var Suggestions=useRef(null);
    var [toggleFlag,setFlag]=useState(true);
    var CurrentUser="Mighil"
    var [Suggestionsdata,setSuggestiondata]=useState({});
    var filterSearch=(List,searchKey)=>{
        
        var newList=[...List];
        newList=newList.filter((name)=>name.toUpperCase().startsWith(searchKey.toUpperCase())||name.toLowerCase().startsWith(searchKey.toLowerCase()));

        return newList;
    }
    useEffect(()=>{       
        if(Suggestionsdata) 
        {    
            let tempList=[]
            let tempGlobalList=[]
            console.log(Suggestionsdata)
            for (let item in Suggestionsdata) {
                if(item!=CurrentUser)
                tempGlobalList.push(item);
                if(Suggestionsdata[item].length>2)
                tempList.push(item);
            }
            setSuggestionsList(tempList);
            setGlobalList(tempGlobalList);
        }
    },[Suggestionsdata])
    // filterSearch(['hell',"hello","yela"],"he");
    useEffect(async () => {
        (async () => {
            try {
                var MyFriendsList= await axios.get('/friends/' + CurrentUser);
                setMyFriendsList(MyFriendsList.data.friends);
                setList(MyFriendsList.data.friends)
                var suggestiondataTemp=await axios.post('/mutual',{
                    "src":CurrentUser,
                });
                setSuggestiondata(suggestiondataTemp.data);

            }
            catch (error) {
                console.log(error)
            }
            })()
        }, [])
    var SearchBarChangeHandler=(e)=>{
        let CurrentSearch=e.target.value;
        if(CurrentSearch)
        {
            setFlag(false)
            let newList=filterSearch(globalList,CurrentSearch);
            setList(newList)
            return
        }
        else{
            setList(MyFriendsList)
        }
        setFlag(true)
    }
    var ToggleSwitch=async (e)=>{
        if(e.target.id=="Myfriends")
        {
            myFriends.current.className="choice Activechoice";
            Suggestions.current.className="choice";
            setList(MyFriendsList)
        }
        else{
            myFriends.current.className="choice"
            Suggestions.current.className="choice Activechoice"
            
            setList(SuggestionsList);   
        }
    }
    var [popup,setpopup]=useState(false);
    var [popupDetails,setPopupDetails]=useState([])
    var HidePopup=()=>{
        setpopup(false);
    }
    return(
        <>
        {FriendsList&&
        <div className="FriendsPage">
            <NavBar/>
            <div className="Options">
                <SearchBar SearchBarChangeHandler={SearchBarChangeHandler}/>
                {toggleFlag&&<div className="ToggleChoice">
                    <div className="choice Activechoice" onClick={e=>ToggleSwitch(e)} id="Myfriends" ref={myFriends}>
                        My friends
                    </div>
                    <div className="choice" onClick={e=>ToggleSwitch(e)} id="Suggestions" ref={Suggestions}>
                        Suggestions
                    </div>
                </div>}
            </div>
            
            <div className="LeftPanel">
               <div className="Friends">
                {FriendsList.map(friend=>{
                        return(<Friend name={friend} degree={null} path={Suggestionsdata[friend]} setpopup={setpopup} setPopupDetails={setPopupDetails}/>)
                    })}
                </div> 
            </div>
            {
                popup&&
                <div className="Path">
                    
                        <div className="wrap">
                            <h2>mutual friends</h2>
                            <img className="closeButton" src={exit} onClick={e=>HidePopup()} />
                            {popupDetails.map(node=>{
                                if(node)
                                {
                                    return(
                                        <div className="Node">
                                            
                                            <img className='pic' src={`https://randomuser.me/api/portraits/men/${Math.floor((Math.random() * 50) + 1)+45}.jpg`}/>
                                            <div className="text">
                                                {node}
                                            </div>
                                        </div>
                                    )
                                }
                            })}
                        </div>
            
            
                </div>
    }
               
        </div>}
        </>
    )
    
}


            // <div className="Feeds">
            // {UserFeeds.map(Feeditem =>(
            //         <Feed Feeditem={Feeditem}/>
            //         ))}
            // </div> 