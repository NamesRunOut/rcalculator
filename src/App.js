import React, {useState, useEffect} from 'react'
import logo from './logo.svg';
import './App.css';

import generateRk from "./functions/generateRk";
import Navbar from "./components/Navbar";

function App() {
  const [states, setStates] = useState([])
  const [names, setNames] = useState([])
  const [R, setR] = useState([])
  const [noStates, setNoStates] = useState(3)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (noStates==='') return
    let set = []
    let numR = []

    for (let i=0;i<=noStates;i++){
      if (i!==0) set[i-1]=i
      numR[i]=i
    }
    setR(numR)

    let tmpStates = generateRk(set)
    setNames(tmpStates)

    let statesArray = new Array(tmpStates.length)

    for (let i=0;i<statesArray.length;i++) {
      statesArray[i] = []
    }

    for (let i=0;i<tmpStates.length;i++) {
      for (let j=0;j<numR.length;j++) {
        statesArray[i][j] = ''//`${tmpStates[i]}${numR[j]}`
      }
    }
    setStates(statesArray)
  }, [noStates])

  const handleChange = async (i, j, value) => {
    await setLoading(true)
    let tmp = [...states]
    tmp[i][j] = value
    for (let i1=0;i1<names.length;i1++){
      for (let j1=j+1;j1<R.length;j1++){
        let var1 = null
        let var2 = null
        let var3 = null

        for (let k=0;k<names.length;k++){
          /*console.log('Warunek 1: ',names[k].substring(0, 1), names[i1].substring(0, 1), names[k].substring(1, 2), j1, tmp[k][j1-1],
              'Warunek 2: ', names[k].substring(0, 1), j1.toString(), names[k].substring(1, 2), j1, tmp[k][j1-1],
              'Warunek 3: ', names[k].substring(0, 1), j1, names[k].substring(1, 2), names[i1].substring(1, 2), tmp[k][j1-1])*/
          if (names[k].substring(0, 1)===names[i1].substring(0, 1) && names[k].substring(1, 2)===j1.toString()) var1 = tmp[k][j1-1]
          if (names[k].substring(0, 1)===j1.toString() && names[k].substring(1, 2)===j1.toString()) var2 = tmp[k][j1-1]
          if (names[k].substring(0, 1)===j1.toString() && names[k].substring(1, 2)===names[i1].substring(1, 2)) var3 = tmp[k][j1-1]
        }

        tmp[i1][j1] = `${tmp[i1][j1-1]}+${var1}(${var2})*${var3}`
        /*if (tmp[i1][j1-1]!=='') tmp[i1][j1] += `${tmp[i1][j1 - 1]}`
        if (tmp[i1][j1-1]!=='' && var1!==null) tmp[i1][j1] += `+${var1}`
        else if (tmp[i1][j1-1]==='' && var1!==null) tmp[i1][j1] += `${var1}`
        if (var2!==null && var2!=='') tmp[i1][j1] += `(${var2})*`
        if (var3!==null) tmp[i1][j1] += `${var3}`*/
      }
    }
    await setStates(tmp)
    await setLoading(false)
  }

  return (
      <>
      <Navbar noStates={noStates} setNoStates={setNoStates} />
    <div className="container is-fluid">
      <div className='table-container'>
        <div className='table is-bordered is-striped is-narrow is-fullwidth'>
          <tbody>
            {R.map(i => {
              let counter=0;
              return <td key={`${i}${counter}`}>{names.map(name => {
                let num = counter++
                return <tr key={`${i}${num}`} style={{display: 'flex'}}>R{i}/{name}: <span style={{background: 'rgba(0,0,0,0.25)', marginLeft: '0.25em'}}>{states[num][i]}</span></tr>
              })}
              </td>
          })}
          </tbody>
        </div>
      </div>
      <hr />
      <div className='table-container'>
        <div className='table is-bordered is-striped is-narrow is-fullwidth'>
          <tbody>
          {R.map(i => {
            let counter=0;
            return <td key={`${i}${counter}`}>{names.map(name => {
              let num = counter++
              return <tr key={`${i}${num}`} style={{display: 'flex'}}>R{i}/{name}: <input className={`input is-small`} type='text' value={states[num][i]} onChange={(e) => handleChange(num, i, e.target.value)} /></tr>
            })}
            </td>
            })}
          </tbody>
        </div>
      </div>
    </div>
    </>
  );
}

export default App;
