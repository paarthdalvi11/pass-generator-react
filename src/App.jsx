import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useCallback } from 'react';
import { useEffect, useRef } from 'react';

function App() {
  const [length, setLength] = useState(8);
  const [numAllowed, setNumAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const [password, setPassword] = useState("");

  const genPassword = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqurstuvwxyz"
    let num = "0123456789"
    let char = "\!@#$%^&*~/";

    if(numAllowed) str+=num;
    if(charAllowed) str+=char;

    for (let i = 0; i < length; i++) {
      let index = Math.floor((Math.random() * str.length))
      pass += str.charAt(index)
    }
    setPassword(pass);

  }, [length, numAllowed, charAllowed])

  const passwordRef = useRef(null);

  useEffect(() => {
    genPassword()
  }, [length, numAllowed, charAllowed, setPassword])
  
  const copyToClipboard = () => {
    // passwordRef.current?.select();
    passwordRef.current?.select(0, 2);
    window.navigator.clipboard.writeText(password)
    // if(copyCheck){
    //   alert("Copied to Clipborad")
    // }
  }
  return (
    <>
      <div className="container">
        <h1>Password Generator</h1>
        <div className='container2'>
          <div className="first">
            <input type="text" 
            placeholder="Username"
            value={password}
            readOnly
            ref={passwordRef}/>
            <button
            onClick={copyToClipboard}>Copy</button>
          </div>

          <div className="rangeDiv">
            <input type="range" 
            min={0}
            max={50}
            id="rangeLen"
            value={length}
            onChange={(e) => {setLength(e.target.value)}}/>
            <label for="rangeLen">Length : {length}</label>
          </div>
          
          <div className="btns">
            <div>
              <input type="checkbox"
              defaultChecked={numAllowed}
              onChange={() => {setNumAllowed((prev) => !prev)}} 
              />
              <label className='x'>Numbers</label>
            </div>
            <div>
              <input type="checkbox" 
              defaultChecked={charAllowed}
              onChange={() => {setCharAllowed((prev) => !prev)}} 
              />
              <label className='x'>Characters</label>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
