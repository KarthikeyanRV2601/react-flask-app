import React, { useRef, useState,useEffect } from 'react';
import ReactDOM from'react-dom';
import { Friend } from '../components/Friends_Components/Friend';
import { NavBar } from '../components/NavBar';
import {SearchBar} from '../components/SearchBar';
import {ResultUser} from '../components/Friends_Components/ResultUser';
import '../styles/friends.css';
import axios from 'axios';
import exit from '../media/icons/exit.svg';
import { Redirect, useHistory } from 'react-router-dom';

export const Friends=()=>{
    
    let history = useHistory();
    if(!window.localStorage.getItem("username"))
    {   
        history.push('/login')
        window.location.reload();
    }

    var [FriendsList,setList]=useState([])
    var [MyFriendsList,setMyFriendsList]=useState([]);
    var [SuggestionsList,setSuggestionsList]=useState([]);
    var [globalList,setGlobalList]=useState([]);
    var ResultUsersList;
    var myFriends=useRef(null);
    var Suggestions=useRef(null);
    var [toggleFlag,setFlag]=useState(true);
    var CurrentUser=window.localStorage.getItem("username")
    var [Suggestionsdata,setSuggestiondata]=useState({});
    var [currentUserDp,setcurrentUserDp]=useState({})
    var [isMyfriend,setisMyfriend]=useState(true)
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
            // console.log(Suggestionsdata)
            for (let item in Suggestionsdata) {
                if(item!=CurrentUser)
                tempGlobalList.push(item);
                if(Suggestionsdata[item]>2)
                tempList.push(item);
            }
            setSuggestionsList(tempList);
            setGlobalList(tempGlobalList);
        }
    },[Suggestionsdata])

    useEffect(async () => {
        (async () => {
            try {
                var MyFriendsList= await axios.get('/friends/' + CurrentUser);
                setMyFriendsList(MyFriendsList.data.friends);
                setList(MyFriendsList.data.friends)
                // console.log(CurrentUser);
                var suggestiondataTemp=await axios.post('/mutual',{
                    "name":CurrentUser,
                });

                setSuggestiondata(suggestiondataTemp.data);
                let response=await axios.get('/get_dp');
                setcurrentUserDp(response.data);
            }
            catch (error) {
                console.log(error)
            }
            })()
        }, [])
    var SearchBarChangeHandler=async(e)=>{
        let CurrentSearch=e.target.value;
        if(CurrentSearch)
        {
            let response=await axios.post('/autocomplete',{
                "name":CurrentUser,
                "searchstring":CurrentSearch
            });
            // console.log(response.data)

            setFlag(false)
            var list=[]
            let sorted_list=response.data.sort((a,b) => a.closeness - b.closeness);
            sorted_list.forEach((data)=>{
                list.push(data.user)
            })
            // console.log(list)
            setList(list)
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
            setisMyfriend(true)
            setList(MyFriendsList)
            
        }
        else{
            myFriends.current.className="choice"
            Suggestions.current.className="choice Activechoice"
            setisMyfriend(false)
            console.log({SuggestionsList})
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
                        return(<Friend  setList={setList} name={friend} path={Suggestionsdata[friend]} setpopup={setpopup} setPopupDetails={setPopupDetails} currentUserDp={currentUserDp} isMyfriend={isMyfriend}/>)
                    })}
                </div> 
            </div>
            {
                popup&&
                <div className="Path">
                    
                        <div className="wrap">
                            <h2>Mutual connections</h2>
                            <img className="closeButton" src={exit} onClick={e=>HidePopup()} />
                            {popupDetails.map(node=>{
                                if(node)
                                {
                                    return(
                                        <div className="Node">
                                            
                                            <img className='pic' src={currentUserDp[node]}/>
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