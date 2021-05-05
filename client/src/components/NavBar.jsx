import {React,useRef} from 'react';
import ReactDOM from'react-dom';
import AddIcon from "../media/icons/add.svg";
import NotificationIcon from "../media/icons/notification.svg";
import ProfileIcon from "../media/icons/profile.svg";

export const NavBar=()=>{
    const animateRef=useRef(null);
    var Show_Hide_menu=(e)=>{
        
        if(animateRef.current.classList.contains("AnimateMenu"))
            animateRef.current.classList.remove("AnimateMenu")
        else
            animateRef.current.classList.add("AnimateMenu")  
    }
    var signout=(e)=>{
        localStorage.removeItem("username");
        animateRef.current.classList.remove("AnimateMenu");
        window.location.reload();
    }
    return(
        <header>
            <ul className="Links">
            <a href="/feeds" className="Link">
                Feeds
            </a>
            <a href="/friends" className="Link">
                Friends
            </a>
            
        </ul>
            <div className="ProfileLinks">
                <div className="WrapperDiv">
                <a onClick={e=>Show_Hide_menu(e)}><img className="ProfileIcon" src={ProfileIcon}/></a>
                <div className="Menu" ref={animateRef}>
                    <div className="Option" id="Signout" onClick={e=>signout(e)}>Sign out</div>
                </div>
            </div>
            </div>
        </header>
    )
}