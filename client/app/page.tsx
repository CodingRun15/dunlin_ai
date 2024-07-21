'use client'  
import {useEffect,useRef,useState} from 'react'
import { IoMdAttach } from "react-icons/io";
import { Input } from "@/components/ui/input"
import { VscSend } from "react-icons/vsc";
export default function Home({handleContent}:{handleContent:(prompt:string,file:File)=>void}) {
  const [prompt,setPrompt] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
 async function handleFile(e:React.ChangeEvent<HTMLInputElement>){
        const selectedFile = e.target.files?e.target.files[0]:null;
        setFile(selectedFile);
}
  function handleChange(e: React.ChangeEvent<HTMLInputElement>):void{
      const inputvalue = inputRef.current;
      if(inputvalue!==null){
      setPrompt(inputvalue.value);
    }
  }
  const formData = new FormData();
  formData.append('prompt', prompt);
  if(file){
    formData.append('file', file);
  }
  console.log(formData);
  async function handleSubmit(){
    try{
      const response = await fetch('http://localhost:4000/api/analyze',{
        method : 'POST',
        body:formData,
  });
  const result = await response.json();
  console.log(result);
}catch(err){
    console.log(err);
}
  }
  return (
    <main className="align-center p-10 flex flex-col items-center w-full h-screen relative">
    <div className='w-full flex flex-row items-center justify-end gap-10'>
     <a href='/'>Home</a>
     <a href='/login'>Login</a>
    </div>
  <h1 className='font-xl'>Summarize Texts And Documents Fast</h1>

  <div className="w-full h-full absolute bottom-0 left-0 flex flex-col justify-end">
    <div className="bg-white p-5 rounded-t-xl shadow-md flex flex-row items-center gap-5">
      <div>
    
        <label htmlFor='file-input'>
      <IoMdAttach className='h-6 w-6 text-gray-600' />
      </label>
      <p>{file?.name}</p>
    <input id='file-input' className='hidden' type='file' accept='.pdf,.html' onChange={handleFile}></input>
    </div>
      <Input ref={inputRef} type='text' autoFocus placeholder='Enter prompt...' className='rounded-md' onChange={handleChange}></Input>
      <button className='h-6 w-6 text-gray-600' onClick={handleSubmit}>
      <VscSend/>
      </button>
      </div>
  </div>
</main>
  );
}
 