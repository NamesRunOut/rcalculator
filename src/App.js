import React, {useState, useEffect} from 'react'
import logo from './logo.svg';
import './App.css';

import generateRk from "./functions/generateRk";

function App() {
  const [states, setStates] = useState([])
  const [names, setNames] = useState([])
  const [R, setR] = useState([])
  const [sth, setSth] = useState(0)

  useEffect(() => {
    let set = [1,2,3]
    let numR = [0,1,2,3]

    let tmpStates = generateRk(set)
    let statesArray = new Array(tmpStates.length)

    for (let i=0;i<statesArray.length;i++) {
      statesArray[i] = []
    }

    for (let i=0;i<tmpStates.length;i++) {
      for (let j=0;j<numR.length;j++) {
        statesArray[i][j] = ''//`${tmpStates[i]}${numR[j]}`
      }
    }

    setNames(tmpStates)
    setStates(statesArray)
    setR(numR)
  }, [])

  const handleChange = (i, j, value) => {
    let tmp = [...states]
    tmp[i][j] = value
    for (let i1=0;i1<names.length;i1++){
      for (let j1=j+1;j1<R.length;j1++){
        let var1 = 'o'
        let var2 = 'o'
        let var3 = 'o'

        for (let k=0;k<names.length;k++){
          /*console.log('Warunek 1: ',names[k].substring(0, 1), names[i1].substring(0, 1), names[k].substring(1, 2), j1, tmp[k][j1-1],
              'Warunek 2: ', names[k].substring(0, 1), j1.toString(), names[k].substring(1, 2), j1, tmp[k][j1-1],
              'Warunek 3: ', names[k].substring(0, 1), j1, names[k].substring(1, 2), names[i1].substring(1, 2), tmp[k][j1-1])*/
          if (names[k].substring(0, 1)===names[i1].substring(0, 1) && names[k].substring(1, 2)===j1.toString()) var1 = tmp[k][j1-1]
          if (names[k].substring(0, 1)===j1.toString() && names[k].substring(1, 2)===j1.toString()) var2 = tmp[k][j1-1]
          if (names[k].substring(0, 1)===j1.toString() && names[k].substring(1, 2)===names[i1].substring(1, 2)) var3 = tmp[k][j1-1]
        }

        tmp[i1][j1] = `${tmp[i1][j1-1]}+${var1}(${var2})*${var3}`
      }
    }
    setStates(tmp)
  }

  return (
    <div className="App">
      {R.map(i => {
        let counter=0;
        return <div key={`${i}${counter}`}>{names.map(name => {
          let num = counter++
          return <p key={`${i}${num}`}>R{i}/{name}: <span style={{background: 'rgba(0,0,0,0.25)'}}>{states[num][i]}</span></p>
        })}
        </div>
      })}
      <hr />
      {R.map(i => {
        let counter=0;
        return <div key={`${i}${counter}`}>{names.map(name => {
          let num = counter++
          return <p key={`${i}${num}`}>R{i}/{name}: <input value={states[num][i]} onChange={(e) => handleChange(num, i, e.target.value)} /></p>
        })}
        </div>
        })}
    </div>
  );
}

export default App;
