import {React} from 'react';
import SearchIcon from '../media/icons/search.svg'

export const SearchBar=({SearchBarChangeHandler})=>{
    return(
        <div className="SearchBar">
                <input type="Text" className="FriendSearch" placeholder="search people here" onChange={e=>SearchBarChangeHandler(e)}/>
                <img className="SearchIcon" src={SearchIcon}/>
        </div>
    )
}