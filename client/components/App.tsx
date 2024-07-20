import React from "react";
import FileUpload from './FileUpload'
export const App : React.FC =()=>{
    const handleFileContent = async (content:string)=>{
        try{
            const response = await fetch('/api/prompt',{
                method : 'POST',
                headers:{
                    'Content-Type':'application/json',
                },
                body: JSON.stringify({content}),
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