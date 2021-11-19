import React, { useEffect, useState } from 'react';
import {Feed} from '../components/Feeds_Components/Feed';
import {NavBar} from '../components/NavBar';
import {Profile} from '../components/Feeds_Components/Profile';
import '../styles/feeds.css';
import { Redirect, useHistory } from 'react-router-dom';
import axios from 'axios';
import Loading from '../media/icons/loading.svg';
export const Feeds=()=>{
    let history = useHistory();
        if(!window.localStorage.getItem("username"))
        {
            history.push('/login')
            
        }
        
    var names=["Karthi","Mighil","Tanmaay","Rishi","Kirthi","Ashok","Vaibhav","Vishaal","Sanjheevi","Jayesh","Likith"]
    var [FeedList, setFeedList] = useState([{}]);
    var [currentUserDp,setcurrentUserDp]=useState({})
    // useEffect(() => {

    //     (async () => {
    //         try {
    //             const incoming_data = await axios.get('/api/tasks/');
    //             console.log(incoming_data.data.data.tasks)
    //             setFeedList(incoming_data.data.data.tasks);
    //             console.log(FeedList)
    //         } catch (error) {
    //             console.log(error)
    //         }
    //     })()
    // }, [])
    
    useEffect(async() => {
        try{
            let response=await axios.get('/get_dp');
            setcurrentUserDp(response.data);
            response=await axios.get('/feed');
            console.log(response)
            setFeedList(response.data);
            console.log(response.data);
        }
        catch(error){
            console.log(error)
        }
    }, [])

    return(
        <div className="FeedPage">
            <NavBar/>
            <div className="LeftPanel">
                <Profile currentUserDp={currentUserDp}/>
            </div>
            <div className="MainPanel">
                <div className="Feeds">
                    { FeedList.length>1 && FeedList.map(feed => {
                        let task={
                            user_name:names[Math.floor((Math.random() * (names.length-1)) + 1)],
                            task_thumbnail:feed.src,
                            body:feed.quote,
                            pats:Math.floor((Math.random() * 100) + 1),
                            streak:3
                        }
                         return(
                            task.body!="" &&
                            <Feed 
                                user_name={task.user_name}
                                task_thumbnail={task.task_thumbnail}
                                body={task.body}
                                pats={task.pats}
                                streak={task.streak}
                                key={task.tid}
                                tid={task.tid}
                                currentUserDp={currentUserDp}
                            />
                         )
                        })
                    }
                    {
                        FeedList&&
                        <img src={Loading} className="loading"></img>
                    }
                </div>
            </div>
            <div className="RightPanel">
                
            </div>
            
        </div>
    )
    
}


