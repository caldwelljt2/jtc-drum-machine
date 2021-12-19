// eslint-disable-next-line
import React, { useState, useEffect, useRef, useContext, createContext } from 'react';
import './App.scss';
// eslint-disable-next-line
import { bankOne, bankTwo } from './KeybankData'



const KeyBankContext = createContext(null)

function App() {

  const [currentBank, setCurrentBank] = useState(bankOne)

  let letterList = []
  for (let keyLetter in bankOne) {
    letterList.push(keyLetter)
  }
  const DrumPads = letterList.map((letter) => { return <DrumPad padLetter={letter} /> })
  return (
    <KeyBankContext.Provider value={{currentBank, setCurrentBank}}>
    <div className="App">
      <header className="drum-machine" id="drum-machine">
        <div id="display">
          <h1>Drum Kit on-line by JTC</h1>
          <p>hit buttons to play or hit keyboard keys if you have them</p>
        </div>
        <div id="drum-buttons">
          {DrumPads}
          <button onClick={() => setCurrentBank(bankOne)}>Bank1</button>
          <button onClick={() => setCurrentBank(bankTwo)}>Bank2</button>
        </div>
      </header>
    </div>
    </KeyBankContext.Provider>
  );
}

const DrumPad = (props) => {

  const {currentBank, setCurrentBank} = useContext(KeyBankContext)

  const handleSoundPlay = (event) => { 
    console.log(event, props.padLetter)
    console.log(currentBank[props.padLetter])
    const mySound = new Audio(currentBank[props.padLetter].url)
    mySound.play()
  }

  const handleKeyDown = (event) => {
    if (event.keyCode === currentBank[props.padLetter].keyCode) {
      console.log('you hit ' + props.padLetter)
      console.log('currentBank is currently ');
      console.log(currentBank)  // <--- ISSUE, this will not update if not included, why?
      handleSoundPlay(props.padLetter)
    } else {
      console.log('keypress ignored')
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- watching [] = run once
  }, [currentBank]) // must watch for changes to keybank and reload (is this correct?)

  return (
    <div className="drum-pad">
      <button onClick={handleSoundPlay} className="drum-button">{props.padLetter}</button>
      {/* I don't think this next line gets used right now, but FCC calls for it? */}
      <audio id={props.padLetter} className="clip" src={currentBank[props.padLetter].url}></audio> 
    </div>
  )
}

export default App;

/*
references
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries

*/