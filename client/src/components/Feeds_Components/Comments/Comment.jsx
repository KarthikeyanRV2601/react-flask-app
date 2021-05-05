import React from 'react';
import ReactDOM from'react-dom';


var names=["Karthi","Mighil","Tanmaay","Rishi","Kirthi","Ashok","Vaibhav","Vishaal","Sanjheevi","Jayesh","Likith"]
var comments=["Great job mate!","Beautiful ❤","Why don't you invite me 😞","Great spot!","Beautiful place to camp 🏕️"]   

export const Comment=()=>{
    return(
        <div className="Comment">
            <div className="UserName">{names[Math.floor((Math.random() * (names.length-1)) + 1)]}</div>
            <div className="CommentContent">{comments[Math.floor((Math.random() * (comments.length)) + 1)]}</div>
        </div>
    )
}