'use client'
import FileUpload from "@/components/FileUpload";
import React from "react";
const Home : React.FC =()=>{
    const handleFileContent = async (content:string,prompt:string)=>{
        try{
            const response = await fetch('http:localhost:4000/api/analyze',{
                method : 'POST',
                headers:{
                    'Content-Type':'application/json',
                },
                body: JSON.stringify({content,prompt}),
            });
            const result = await response.json();
            console.log(result);
        }
        catch(error){
            console.error('Error uploading',error);
        }
    }
    return(
        <>
            <FileUpload handleContent={handleFileContent} />
        </>
    )
}
export default Home
 