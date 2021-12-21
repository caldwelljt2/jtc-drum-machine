// eslint-disable-next-line
import React, { useState, useEffect, useRef, useContext, createContext } from 'react';
import './App.scss';
import DrumPad from './DrumPad'
import KeyBankContext from './KeyBankContext'
// eslint-disable-next-line
import { bankOne, bankTwo } from './KeybankData'



// const KeyBankContext = createContext(null)

function App() {

  const [currentBank, setCurrentBank] = useState(bankOne)

  let letterList = []
  for (let keyLetter in bankOne) {
    letterList.push(keyLetter)
  }

  const handleSoundPlayParent = (event, padLetter) => { 
    console.log(event, padLetter)
    console.log(currentBank[padLetter])
    const mySound = new Audio(currentBank[padLetter].url)
    mySound.play()
  }

  const handleKeyDownParent = (event, padLetter) => {
    console.log('moo')
    console.log(event, padLetter)
    for (const key in currentBank) {
      if (event.keyCode === currentBank[key].keyCode) {
        console.log('you hit ' + padLetter)
        console.log('currentBank is currently ');
        console.log(currentBank)  // <--- ISSUE, this will not update if not included, why?
        // handleSoundPlay(padLetter)
        handleSoundPlayParent(event, currentBank[key].keyTrigger)
      } else {
        console.log('keypress ignored')
      }
    }
  }
  useEffect(() => {
    document.addEventListener('keydown', handleKeyDownParent);
    return () => {
      document.removeEventListener('keydown', handleKeyDownParent)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- watching [] = run once
  }, [currentBank])

  const DrumPads = letterList.map((letter) => { return <DrumPad padLetter={letter} playSound={handleSoundPlayParent} handleKeyDown={handleKeyDownParent} /> })
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

export default App;

/*
references
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries

*/