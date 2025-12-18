"use client";




import { useState, useRef, useEffect } from "react"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"


export type chatHistory = {
    role: "user" | "bot",
    content: string

}
type chatArray = {
    id: string,
    chatHistoryArray: chatHistory[]
}



function SendText() {
    let [inputmsg, Setinputmsg] = useState<string>("")
    let [toggleTyped, SettoggleTyped] = useState<boolean>(false)
    let [history, setHistory] = useState<chatHistory[]>([])
    let [isStream, setisStream] = useState<boolean>(false)
    let abortRef = useRef<AbortController | null>(null)
    let [allChatHistory, SetallChatHistory] = useState<chatArray[]>([])



    function handleAllChatsHistory(){
        if(history.length === 0) return

        const newSession:chatArray ={

            id:Date.now().toString(),
            chatHistoryArray:[...history]

        }

        SetallChatHistory((prev)=>{
            const updated = [newSession,...prev]
            return updated
        })
    }

    useEffect(()=>{
      if(allChatHistory.length>0){
        localStorage.setItem("all_chat_history",JSON.stringify(allChatHistory))

    //    console.log("all data ", localStorage.getItem("all_chat_history"))

      }

    },[allChatHistory])
 



    function handleClearHistory() {
        setHistory([])
        localStorage.removeItem("Chat-history")
        SettoggleTyped(false)
    }

    useEffect(() => {
        if (history.length > 0) {
            localStorage.setItem("Chat-history", JSON.stringify(history))
        }

    }, [history])



    useEffect(() => {
        const storedHistory = localStorage.getItem("Chat-history")
        if (storedHistory) {
            setHistory(JSON.parse(storedHistory))
            SettoggleTyped(true)
        }

    }, [])




    function handleInputvalue(e: React.ChangeEvent<HTMLTextAreaElement>) {

        let inputTxt = e.target.value
        Setinputmsg(inputTxt)


    }


    function handleAbort() {

        abortRef.current?.abort()
        setisStream(false)

    }


    async function handleApiCall() {

        try {
            if (!inputmsg.trim()) {
                console.log("pls write someText")
                return;

            }


            abortRef.current = new AbortController()



            const userMessage: chatHistory = { role: "user", content: inputmsg }
            setHistory((prev) => [...prev, userMessage])


            SettoggleTyped(true)



            let sendingInput = await fetch("http://localhost:4000/chat", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    message: inputmsg,

                }),
                signal: abortRef.current.signal
            })



            const reader = sendingInput.body?.getReader()
            if (!reader) return;
            const decoder = new TextDecoder();

            let botText = "";

            console.log(reader)

            const botMessage: chatHistory = { role: "bot", content: "" }
            setHistory((prev) => [...prev, botMessage])


            Setinputmsg("")


            try {
                while (true) {

                    const { done, value } = await reader!.read();
                    if (done) break;

                    botText += decoder.decode(value);


                    setHistory(prev => {
                        const updated = [...prev];
                        updated[updated.length - 1].content = botText;
                        return updated;
                    });
                    setisStream(true)
                }
                setisStream(false)


            } catch (error: any) {

                if (error.name === "AbortError") { alert("stream aborted") }
                else {
                    alert(error)
                }
            }


        } catch (error: any) {

            console.log(error)
        }

        

    }




    return (
        <div className={` h-[90%] flex   flex-col text-sm    `}>
            {!toggleTyped && (<p className="font-semibold text-sm pt-20 pl-7  md:text-xl mt-[20%] md:ml-[35%] m-4   ">This is ChatBot for your Assistance </p>
            )}


            <div className={` ${toggleTyped ? "fixed bottom-[40%] ml-5 md:bottom-4 md:ml-46  w-[68%]  " : " w-[70%]  ml-8  md:ml-42  "}`}>
                <div className={`bg-black rounded-xl flex   `}>
                    <div className="flex m-3">
                        <button>+</button>
                    </div>
                    <textarea placeholder="write something ..." value={inputmsg} onChange={handleInputvalue} className="w-[90%]  outline-none items-start p-3 field-sizing-content">

                    </textarea>
                    <div className="flex">
                        {isStream ? <button className="cursor-pointer" onClick={handleAbort}>🚫</button> : <button onClick={handleApiCall} className="cursor-pointer">🚀</button>}

                        <button onClick={handleClearHistory}>⌚</button>
                        <button onClick={handleAllChatsHistory}>click</button>
                    </div>
                </div>
            </div>




            <div className="  mt-15 h-110 md:h-150     w-[80%]  ml-[12%] overflow-y-auto hide-scrollbar    ">

                {history.map((msg, i) => (
                    <div key={i} >
                        {msg.role == "user" ?
                            (<div className="bg-gray-600 rounded-2xl flex items-center justify-end mb-3  p-2 font-semibold ">
                                <div><ReactMarkdown   remarkPlugins={[remarkGfm]} >
                                    {msg.content}
                                </ReactMarkdown></div>
                                <button className="bg-red-500  rounded-xl  text-xs p-1 m-2">copy</button>

                            </div>
                            ) :
                            (<div className="bg-black rounded-2xl  mb-3  p-3 font-semibold   ">
                               <div ><ReactMarkdown   remarkPlugins={[remarkGfm]}  >
                                    {msg.content}
                                </ReactMarkdown></div>
                                <button className="bg-gray-600  rounded-xl   text-xs p-1 m-2">📃 copy</button></div>)

                        }
                    </div>
                ))}
            </div>
        </div>
    )
}

export default SendText