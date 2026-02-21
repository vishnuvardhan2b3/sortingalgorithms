import { useEffect, useState } from "react";
export default function UseStateExample(){
    let [count,setCount]=useState(0);
    const [toggle,setToggle]=useState(false);
    useEffect(()=>{
        console.log("i am coming from useEffect");
    },[count,toggle])
    let incCount=()=>{
        setCount((count)=>(count+1));

    }
    return(
        <div>
        <h1 onClick={()=>{setToggle(!toggle)}}>{toggle?"open":"close"}</h1>
        <button onClick={incCount}>count {count}</button>
        </div>
    )

}
