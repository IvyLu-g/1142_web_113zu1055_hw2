"use client"
import { useState, useEffect } from "react";

export default function TestApi() {

  const [id, setId] = useState({name:"", age:0, city:""});

  useEffect(() =>{
    fetch("http://localhost:3003/person?id=1")
    .then( response => response.json() )
    .then( data => {
      console.log(data);
      setId(data);
      })
  }, []);

  return (
    <>
      test api
      {id}
      <div>
        <div>name: {id.name} </div>
        <div>age: {id.age} </div>
        <div>city: {id.city} </div>
      </div>
    </>
  )
}
