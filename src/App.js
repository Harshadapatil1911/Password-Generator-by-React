import { useState } from 'react';
import './App.css';
import {toast , ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import{numbers , UpperCaseLetters ,LowerCaseLetters , specialCharacters } from './character.js';
import {COPY_SUCCESS} from './message.js';
function App() {
  const [password, setPassword] = useState('')
  const [passwordLength, setPasswordLength] = useState(8)
  const [IncludeUpperCase, setIncludeUpperCase] = useState(false)
  const [IncludeLowerCase, setIncludeLowerCase] = useState(false)
  const [IncludeNumbers, setIncludeNumbers] = useState(false)
  const [IncludeSymbols, setIncludeSymbols] = useState(false)

  const handleGeneratePassword = (e) =>{
    if(!IncludeLowerCase && !IncludeNumbers && !IncludeSymbols && !IncludeUpperCase)
    {
      notify('You must have to select atleast one option',true)
    }
    let characterlist = '';

    if(IncludeLowerCase){
      characterlist = characterlist + LowerCaseLetters
    }

    if(IncludeUpperCase){
      characterlist = characterlist + UpperCaseLetters
    }
    
    if(IncludeNumbers){
      characterlist = characterlist + numbers
    }
    
    if(IncludeSymbols){
      characterlist = characterlist + specialCharacters
    }

    setPassword(createPassword(characterlist))
  }
   const createPassword = (characterlist) =>{
    let password = ''
    const characterListLength =  characterlist.length
    for( let i =0;i<passwordLength; i++){
      const characterIndex = Math.round(Math.random() * characterListLength)
      password = password + characterlist.charAt(characterIndex)
    }
    return password
   }
   const copyToClipboard = () =>{
   const newTextArea = document.createElement('textarea')
   newTextArea.innerHTML = password
   document.body.appendChild(newTextArea)
   newTextArea.select()
   document.execCommand('copy')
   newTextArea.remove()
   }
   const handleCopyPassword = (e) =>{
    if(password === ''){
      notify('Nothing to copy',true)
    }
    else{
      copyToClipboard()
    notify(COPY_SUCCESS)
    }
    
   }
   const notify = (message, hasError = false)=>{
    if(hasError){
      toast.error(message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
       
        });

    }
    else{
    toast.success(COPY_SUCCESS, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      });
   }
  }

  return (
    <div className="App">
    <div className='container'>
      <div className='generator'>
        <h1 className='generator_Password'>Password Generator</h1>
        <div className='generator_copy'>
          <h3 className='space'>{password}</h3>
          <button onClick ={handleCopyPassword} className='copy_btn' >
          <i className='far fa-clipboard'></i>
          </button>
          </div>

          <div className='form_group'>
            <label htmlFor='password_strength' className='space'  >Select Password length<b>(**8-50 characters**)</b></label>
            <input type='number'
            defaultValue={passwordLength}
            onChange={(e)=>{setPasswordLength(e.target.value)}}
             id='password_strength' 
             name='password_strength'
              min='8'
               max= '50'>
               </input>
          </div>
          <div className='form_group'><input type='checkbox'

            checked={IncludeUpperCase}
            onChange={(e) =>{setIncludeUpperCase(e.target.checked)}}
             id='UpperCase_Letters' 
             name='UpperCase_Letters'>
               </input>

            <label htmlFor='UpperCase_Letters' className='space'>Include UpperCase Letters </label>
            
          </div>
          <div className='form_group'><input type='checkbox'
          checked={IncludeLowerCase}
          onChange={(e) =>{setIncludeLowerCase(e.target.checked)}}

             id='LowerCase_Letters' 
             name='LowerCase_Letters'>
               </input>

            <label htmlFor='LowerCase_Letters' className='space'>Include LowerCase Letters </label>
            
          </div>
          <div className='form_group'><input type='checkbox'
          checked={IncludeNumbers}
          onChange={(e) =>{setIncludeNumbers(e.target.checked)}}

             id='Include_Numbers' 
             name='Include_Numbers'>
               </input>

            <label htmlFor='Include_Numbers' className='space'>Include Numbers </label>
            
          </div>
          <div className='form_group'><input type='checkbox'
          checked={IncludeSymbols}
          onChange={(e) =>{setIncludeSymbols(e.target.checked)}}
             id='Include_Symbols' 
             name='Include_Symbols'>
               </input>

            <label htmlFor='Include_Symbols' className='space'>Include Symbols </label>
            
          </div>
          <button onClick={handleGeneratePassword} className='btn-hover color-10 generator_btn '>
            Generate Password
            </button>
            <ToastContainer
           position="top-center"
           autoClose={5000}
           hideProgressBar={false}
           newestOnTop={false}
           closeOnClick
           rtl={false}
           pauseOnFocusLoss
           draggable
           pauseOnHover
           theme="colored"
            />
      </div>
    </div>
    </div>
  );
}

export default App;
