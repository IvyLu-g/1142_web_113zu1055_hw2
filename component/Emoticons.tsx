"use client";
import {useEffect, useState} from "react";

export default function Emoticons({children}:{children: React.ReactNode}) {

    const emoticons = ["ฅ^•ﻌ•^ฅ", "( ˊ̱˂˃ˋ̱ )", "Ꮚ･ꈊ･Ꮚ"];
    const [currentEmo, setCurrentEmo] = useState(0);

    const face = ["o_o", "-_-"];
    const [currentFace, setCurrentFace] = useState(0); 
    const [counter, setCounter] = useState(0);

    useEffect(() => {
        setTimeout(() => {
            console.log("10s");
        }, 10000);

        setInterval(() => {
            if(currentFace % 5 ==0){
                setCurrentFace(1);
            }else{
                setCurrentFace(0);
            }
            console.log(counter);
            setCounter(counter + 1);
        }, 1000);
    }, []);

    return (
        <>
        {children}
        {emoticons[0]}
        {emoticons[1]}
        {emoticons[2]}
        </>
    )
}
