
"use client"

type props ={
    istoggled:boolean
}

import { useEffect, useState } from "react"

type arrayofHistory={
    id:string,
}

export default function SideBar({istoggled}:props) {
 let [allChatHistory,setAllHistory] =  useState<arrayofHistory[]>([])

 useEffect(()=>{
   let allHistoryData = localStorage.getItem("all_chat_history")
   if(allHistoryData){
     setAllHistory(JSON.parse(allHistoryData))
    }
   

 },[])


 function handleAllPreviousChat(){

 }
 

    return (
        <div className={` ${istoggled?"bg-gray-900 h-screen w-30  ": "bg-black h-screen w-50  border-r border-r-amber-100 "} `} >
            <h1> this is side bar </h1>

            <div className="mt-4">
                {allChatHistory.map((item)=>(
                    <ul key={item.id} className="bg-amber-400 cursor-pointer text-xs "  >
                        <li onClick={handleAllPreviousChat}>{item.id}</li>
                    </ul>
                ))}

            </div>
        </div>
    )

}


// [{ "id": "1766061841823",
// "chatHistoryArray": [{ "role": "user", "content": "hi" },
// { "role": "bot", "content": "Hello! How can I assist you today?" },
// { "role": "user", "content": "can you give me all details" },
// { "role": "bot", "content": "Of course! I'd be happy to help. Could you pind." }] }]


