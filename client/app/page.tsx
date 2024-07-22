'use client'  
import {useEffect,useRef,useState} from 'react'
import { IoMdAttach } from "react-icons/io";
import { Input } from "@/components/ui/input"
import { VscSend } from "react-icons/vsc";
import axios from 'axios'

export default function Home({handleContent}:{handleContent:(prompt:string)=>void}) {
  const [prompt,setPrompt] = useState("");
  const[history,setHistory] = useState<string[]>([]);
  const [file, setFile] = useState<File | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const historyRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<{ type: 'prompt' | 'response', content: string }[]>([]);

function handleFile(e:React.ChangeEvent<HTMLInputElement>){
        const selectedFile = e.target.files?e.target.files[0]:null;
        setFile(selectedFile);
}
  function handleChange(e: React.ChangeEvent<HTMLInputElement>):void{
      const inputvalue = inputRef.current;
      if(inputvalue!==null){
      setPrompt(inputvalue.value);
    }
  }
  async function handleSubmit(){
    try{
     const response = await fetch('http://localhost:4000/api/analyze',{
       method : 'POST',
       headers:{
         'Content-Type': 'application/json',
       },
       body: JSON.stringify({prompt}),
     })
   const result = await response.json();
    const summary = result.summary;
    setMessages(prev => [
      ...prev,
      { type: 'prompt', content: prompt },
      { type: 'response', content: summary },
    ]);
    setPrompt("");
  if (inputRef.current) {
    inputRef.current.value = "";
  }
  
}catch(err){
    console.log("error here",err);
}
   setHistory((prev)=>[...prev,prompt]);
  }
  useEffect(() => {
    if (historyRef.current) {
      historyRef.current.scrollTop = historyRef.current.scrollHeight;
    }
  }, [messages]);
  return (
    <main className="align-center p-10 flex flex-col items-center w-full h-screen relative">
    {/* <div className='w-full flex flex-row items-center justify-end gap-10'>
     <a href='/'>Home</a>
     <a href='/login'>Login</a>
    </div> */}
  <h1 className='font-xl'>Summarize Texts And Documents Fast</h1>

  <div ref={historyRef} className="w-full h-full absolute bottom-0 left-0 flex flex-col justify-end">
  {messages.map((msg, index) => (
          <div
            key={index}
            className={`p-3 rounded-md mb-2 ${
              msg.type === 'prompt' ? 'bg-gray-200 text-right' : 'bg-blue-100'
            }`}
          >
           {msg.content} 
          </div>
        ))}
    <div className="bg-white p-5 rounded-t-xl shadow-md flex flex-row items-center gap-5">
      <div>
    
        <label htmlFor='file-input'>
      <IoMdAttach className='h-6 w-6 text-gray-600' />
      </label>
      <p>{file?.name}</p>
    <input id='file-input' className='hidden' type='file' accept='.pdf,.html' onChange={handleFile}></input>
    </div>
      <Input ref={inputRef} type='text' autoFocus placeholder='Enter prompt...' className='rounded-md' onChange={handleChange} value={inputRef.current?.value}></Input>
      <button className='h-6 w-6 text-gray-600' onClick={handleSubmit}>
      <VscSend/>
      </button>
      </div>
  </div>
</main>
  );
}
 