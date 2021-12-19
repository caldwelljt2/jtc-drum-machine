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

export default App;

/*
references
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries

*/