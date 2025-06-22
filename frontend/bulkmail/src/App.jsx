import { useState } from 'react'
import axios from 'axios'
import * as XLSX from 'xlsx';
import './App.css'

function App() {
  const [msg,setmsg]=useState("")
  const[status,setstatus]=useState(false)
  const[emailList,setEmailList]=useState([])

  function handlemsg(evt){
    setmsg(evt.target.value)
  }
  function handlefile(event){

    const file=event.target.files[0]

    const reader=new FileReader()//creating the object for file reading purpose

    reader.onload=function(event){
        const data=event.target.result
        const workbook = XLSX.read(data, {type: 'binary' })
        const sheetName=workbook.SheetNames[0]
        const worksheet=workbook.Sheets[sheetName]
        const emailList=XLSX.utils.sheet_to_json(worksheet,{header:'A'})
        const totalemail=emailList.map(function(item){return item.A})
        console.log(totalemail)
        setEmailList(totalemail)
    }
    reader.readAsBinaryString(file)//by default excel can read in binary format only 

  }

  function send()
  {
    setstatus(true)
    axios.post("https://bulkmail-2-8fhm.onrender.com/sendemail",{msg:msg,emailList:emailList})
    .then(function(data)
    {
      if(data.data === true)
      {
        alert("Email Sent Successfully")
        setstatus(false)
      }
      else{
        alert("Failed")
      }

    })
  }
  return (
  
    <div className="w-screen min-h-screen max-w-5xl mx-auto px-6">
      <div className=' w-full bg-gradient-to-r from-purple-400 to-green-200 p-5 rounded-t-2xl shadow-md text-center'>
        <h1 className='text-2xl font-medium px-5 py-3'>📬 Bulk Mail</h1>

      </div>

      <div className='bg-teal-100 text-teal-800 w-full text-center'>
        <h1 className='font-medium px-5 py-3 '>Send multiple emails smartly & effortlessly 💡</h1>
      </div>

      <div className='bg-cyan-300 text-cyan-800 text-center'>
        <h1 className='font-medium px-5 py-3'>📁 Drag and Drop</h1>
      </div>

      <div className='bg-white text-gray-800 flex flex-col items-center hover:text-black px-5 py-3'>
        <textarea onChange={handlemsg} value={msg} className='w-[60%] h-32 py-2 outline-none px-2 border border-black rounded-md ' placeholder='✍️ Write your email content here...'></textarea>
      

      <div>
        <input type="file" onChange={handlefile} className='border-4 border-cyan-300 hover:border-cyan-500 border-dashed py-4 px-4 mt-5 mb-5 '/>
       </div>

        <p>📧Total Emails in the file: {emailList.length}</p>

        
      
      
        <button onClick={send} className='mt-2 bg-green-500 hover:bg-green-600 py-2 px-2 text-white font-medium rounded-md w-fit'>{status?"Sending...":"🚀Send"}</button>
      </div>

      <div className='bg-gray-300 text-gray-700  text-center p-8'>
        © 2025 BulkMail App – Crafted with 💌 for productivity.
      </div>

     
      
    </div>
    
  )
}

export default App
