import React, { useEffect, useState } from 'react';
import {Feed} from '../components/Feeds_Components/Feed';
import {NavBar} from '../components/NavBar';
import {Profile} from '../components/Feeds_Components/Profile';
import '../styles/feeds.css';


export const Feeds=({})=>{
    var quotes = [
        ["You only live once, but if you do it right, once is enough.","Mae West"],
        ["I am so clever that sometimes I don't understand a single word of what I am saying.","Oscar Wilde"],
        ["Two things are infinite: the universe and human stupidity; and I'm not sure about the universe.","Albert Einstein"],
        ["The most beautiful experience we can have is the mysterious. It is the fundamental emotion that stands at the cradle of true art and true science.","Albert Einstein"]
        ["It is our choices, Harry, that show what we truly are, far more than our abilities.","J.K. Rowling, Harry Potter and the Chamber of Secrets"],
        ["All men who have turned out worth anything have had the chief hand in their own education.","Walter Scott"],
        ["Trust yourself. You know more than you think you do.","Benjamin Spock"],
        ["No one can make you feel inferior without your consent.","Eleanor Roosevelt, This is My Story"],
        ["To be yourself in a world that is constantly trying to make you something else is the greatest accomplishment.","Ralph Waldo Emerson"],
        ["Twenty years from now you will be more disappointed by the things that you didn't do than by the ones you did do. So throw off the bowlines. Sail away from the safe harbor. Catch the trade winds in your sails. Explore. Dream. Discover.","H. Jackson Brown Jr., P.S. I Love You"]
        ];
    var [FeedList, setFeedList] = useState([
        {
            user_name:"Karthi",
            task_thumbnail:"",
            body:quotes[Math.floor((Math.random() * 10) + 1)],
            pats:2,
            streak:3,
            tid:4
        },{
            user_name:"Mighil",
            task_thumbnail:"",
            body:quotes[Math.floor((Math.random() * 10) + 1)],
            pats:2,
            streak:3,
            tid:4
        },{
            user_name:"Kirthi",
            task_thumbnail:"",
            body:quotes[Math.floor((Math.random() * 10) + 1)],
            pats:2,
            streak:3,
            tid:4
        },
        {
            user_name:"Likith",
            task_thumbnail:"",
            body:quotes[Math.floor((Math.random() * 10) + 1)],
            pats:2,
            streak:3,
            tid:4
        },
    ]);
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


    return(
        <div className="FeedPage">
            <NavBar/>
            <div className="LeftPanel">
                <Profile/>
            </div>
            <div className="MainPanel">
                <div className="Feeds">
                    { FeedList && FeedList.map(task => {
                         return(
                            <Feed 
                                user_name={task.user_name}
                                task_thumbnail={task.task_thumbnail}
                                body={task.body}
                                pats={task.pats}
                                streak={task.streak}
                                key={task.tid}
                                tid={task.tid}
                            />
                         )
                        })
                    }
                </div>
            </div>
            <div className="RightPanel">
                
            </div>
            
        </div>
    )
}


