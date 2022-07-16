import {createContext, useContext, useEffect, useReducer, useRef, useState} from 'react'
import './App.css'

const moods = {
  happy: 'happy',
  sad: 'not sad',
  angry: 'angry'
}

const MoodContext = createContext(moods)

function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return state + 1
    case 'decrement':
      return state - 1
    default:
      throw new Error()
  }
}

function App() {
  // create a count variable in the state with a default value of zero.
  const [count, setCount] = useState(0)

  // other way of doing the same thing using the Redux pattern
  const [count2, dispatch] = useReducer(reducer, 0)

  const myBtn = useRef(null)

  return (
    <div className="App">
      <h1 className="App-title">Welcome to React</h1>

      <p> The current count is {count} </p>

      <MoodContext.Provider value={moods.sad}>
        <MoodBox />
      </MoodContext.Provider>

      <button ref={myBtn} onClick={() => {
          setCount(count+2)
          moods.sad = 'not sad at all'
        }
      }>
        Increase Count!
      </button>

      <button onClick={() => myBtn.current.click()}>This clicks the other button</button>
      <button onClick={() => dispatch({type: 'increment'})}>{count2}</button>
    </div>
  )
}

function MoodBox() {
  const mood = useContext(MoodContext)
  
  return (
    <p> The mood is currently {mood}.</p>
  )
}

export default App;
