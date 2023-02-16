import { faMusic } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";


const Nav= ({libraryStatus , SetLibraryStatus})=>{
    return(
        <nav>
            <h1>waves</h1>
            <button onClick={()=>SetLibraryStatus(!libraryStatus)}>
                Libary
                <FontAwesomeIcon icon={faMusic}/>
            </button>
        </nav>
    );
}
export default Nav ;