"use client"

import SendText from "./SendText"
import Header from "./Header"
import SideBar from "./SideBar"

import { useState } from "react"

function HomeChat(){
let [toggleSideBar,SettoggleSideBar] = useState<boolean>(true)
let [historyChatToggele,sethistoryChatToggele] = useState<boolean>(false)
 

function handleToggleSideBar(){
    SettoggleSideBar(!toggleSideBar)
}


function handleHistoryToggle (){
sethistoryChatToggele(true)    

}

  

    return(
        <div className="flex">
            
            <SideBar istoggled={toggleSideBar}  />
            

            <div className="bg-gray-800  w-full h-screen ">
              <Header onselect={handleToggleSideBar} historytoggleBtn={handleHistoryToggle}/>
               
    
                   <div className=" h-full" >
                    <SendText />
                   </div>


            </div>
        
        </div>
    )

}

export default HomeChat