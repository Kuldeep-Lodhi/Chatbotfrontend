"use client"
import { useState } from "react"
import { chatHistory } from "./SendText"

// [{"role":"user","content":"hi"},{"role":"bot","content":"Hello! How can I assist you today?"}]

type chatArray = {
    id: string,
    chatHistoryArray: chatHistory[]
}

export default function ChatHistory() {

    let [chatHistory, SetchatHistory] = useState<chatArray[]>([])




    return (
        <>
        </>
    )
}



// [{ "id": "1766061841823",
// "chatHistoryArray": [{ "role": "user", "content": "hi" },
//     { "role": "bot", "content": "Hello! How can I assist you today?" },
//     { "role": "user", "content": "can you give me all details" },
//     { "role": "bot", "content": "Of course! I'd be happy to help. Could you pind." }] }]