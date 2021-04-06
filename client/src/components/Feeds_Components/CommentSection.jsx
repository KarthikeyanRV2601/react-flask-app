import React from 'react';
import ReactDOM from'react-dom';
import {Comment} from './Comments/Comment';
import {CommentBox} from './Comments/CommentBox';

export const CommentSection=({commentToggle})=>{
    return(
        commentToggle   &&
        <div className="CommentsSection">
            <div className="Comments">
                <Comment/>
                <Comment/>
            </div>
            <CommentBox/>
                    
        </div>
    )
}