"use client"

import { useState } from "react"

type props ={
    onselect : () => void,
    historytoggleBtn:()=>void
}

export default function Header({onselect,historytoggleBtn}:props) {

    
    return (

        <div>
           
            <header className=" bg-black  text-sm  h-10   fixed top-0 w-full mb-0.5  ">
                <ul className=" text-s ml-2 cursor-pointer">
                    <li><button  onClick={historytoggleBtn}  >New chat</button></li>
                    <li> <button onClick={onselect}  >Side Bar</button></li>
                </ul>
            </header>

        </div>

    )

}



