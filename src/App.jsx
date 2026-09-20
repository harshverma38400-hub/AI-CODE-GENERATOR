
import { useCallback, useState } from 'react'
import './App.css'
import { codegenerator } from './helper/api'

const  App =()=>  {

  const [info,setinfo]=useState({
    userQuery:"",
    error:"",
    codegenerator:null,
    loading:false
  })


   const handlecheck =useCallback((e)=>{
      setinfo((prev)=>({...prev,userQuery:e.target.value,error:''}))     
   },[])

   //console.log(info);

   const handlegenerate = useCallback(()=>{
      
        if(!info?.userQuery.length){

           return setinfo((prev)=>({...prev,error:"enter ur prompt"}))
          
        }
            // before api call its show loading
         setinfo((prev)=>({...prev,loading:true,error:''}))
        //apicall

        codegenerator()

   }
  ,[info?.userQuery])

   
   

 // console.log(import.meta.env.VITE_GOOGLE_API_KEY) 
  return (
   <div className='codegenratorparent-conatiner'>
    
    <div className='input-container'>
    <textarea
  className="content-writesection"
  placeholder="write what ever you want to  make bitch"
  value={info.userQuery}
  onChange={handlecheck}
/>
<button className='generate-anything' onClick={handlegenerate}>Generate</button>
    </div>
   
    <div className='preview-container'>

      {info.error && <div className='error-message'>{info?.error} </div>}

    { info.codegenerator? ( info.codegenerator ):(
      <div className='empty-message'>

       {info.loading?(<div className='loading-continer'> 
        <div className='loading-spinner'>
            </div >
            <span>Generate </span>
        </div>):(

        <p>
        Cookin’ your project…
        </p> )}
        
      </div>
      )}        
    </div>
   </div>
  )
}

export default App
