import { useState } from 'react'
import './App.css'




function App() {
  
const [num1,setnum1]=useState("");
const [num2,setnum2]=useState("");
const [res,setres] = useState("");


function cal(op){
  const a = Number(num1);
  const b = Number(num2);
  if(op=="+"){
    setres(a+b);
  }
  else if(op=="-"){
    setres(a-b);
  }
  else if(op=="*"){
    setres(a*b);
  }
}

  return (
    <>
    <input type="number"
    placeholder='Enter the first number '

    value={num1}
    onChange={(e)=>setnum1(e.target.value)}
    />
    <br /><br />
    <input type="number"
    placeholder='Enter the sec number '

    value={num2}
    onChange={(e)=>setnum2(e.target.value)}
    />
    <br /><br />
    <button onClick={()=>cal("+")}>+</button>
    <button onClick={()=>cal("-")}>-</button>
    <button onClick={()=>cal("*")}>*</button>
    <input type="text"
      value={res}
      readOnly
   
    />
    
    </>
    
    
  )
}

export default App
