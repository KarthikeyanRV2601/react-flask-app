
import React, { useState ,useRef,useEffect} from 'react';
import ReactDOM from'react-dom';
import {CommentSection} from './CommentSection';
import StreakIcon from '../../media/icons/streak.svg';
import PatIcon from '../../media/icons/patIcon.svg';

export const Feed=(props)=>{



    const [ pat, setPat ] = useState(true)
    const [ numberPats, setNumberPats] = useState(props.pats)
    const [ commentToggle, setCommentToggle ] = useState(false)
    var dpUrl=props.user_name in props.currentUserDp?props.currentUserDp[props.user_name]:`https://randomuser.me/api/portraits/men/${Math.floor((Math.random() * 50) + 1)+45}.jpg`;

    const patPost = async () =>
    {

        let upvote = pat ? true : false
        console.log(pat)
        const body = [{"upvote": upvote}]

        try {
            
        } catch (error) {
            console.log(error)
        }
        setPat(!pat)
        
        upvote ? setNumberPats(parseInt(numberPats) + 1):setNumberPats(parseInt(numberPats) - 1);
    }
    const [heightState,setheightState]=useState("height:600px");
    // useEffect(()=>{
        
    //     if(commentToggle)
    //     setheightState("height:800px")
    //     else
    //     setheightState("height:600px")

    // },[commentToggle])

    return(
        <div className="Feed" id="feed" key={props.key} >
            <div className="User">
                <img className="dp" src={dpUrl}/>
                <p>{props.user_name}</p>
            </div>
            <h2>{props.task_name}</h2>
            <div className="ThumbnailWrapper">
                <img className="Thumbnail" src={props.task_thumbnail} />
            </div>
            <p className="Description">
                {props.body}
            </p>
            <div className="Actions">
                <div className="Pats">
                    <img src={PatIcon} onClick={e => patPost()}/>
                    <div className="Label">
                        {numberPats} Pats
                    </div>
                </div>
                <div className="ActionSet">
                    <div className="CommentButton" onClick={e=>setCommentToggle(!commentToggle)}>
                        0 Comments
                    </div>
                    
                        
{/*                     
                    <a href={"/calendar/" + props.tid} className="DailyUploads">
                        Updates
                    </a> */}
                </div>
                    

            </div>
            <CommentSection commentToggle={commentToggle}/> 
        </div>
    )
}
