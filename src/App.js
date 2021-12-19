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
          {/* <DrumPad padLetter="A" /> */}
          <button onClick={() => setCurrentBank(bankOne)}>Bank1</button>
          <button onClick={() => setCurrentBank(bankTwo)}>Bank2</button>
        </div>
      </header>
    </div>
    </KeyBankContext.Provider>
  );
}

const DrumPad = (props) => {

  //  const [test, testUp] = useState(0)

  //  let testUp = testUp + 1
  const {currentBank, setCurrentBank} = useContext(KeyBankContext)

  const handleSoundPlay = (event) => { // removed padLetter here temp
    console.log(event, props.padLetter)
    console.log(currentBank[props.padLetter])
    const mySound = new Audio(currentBank[props.padLetter].url)
    mySound.play()
  }

  const handleKeyDown = (event) => {
    if (event.keyCode === currentBank[props.padLetter].keyCode) {
      console.log('you hit ' + props.padLetter)
      console.log('currentBank is currently ');
      console.log(currentBank)  // STOPPED HERE, this is not updating
      handleSoundPlay(props.padLetter)
    } else {
      console.log('keypress ignored')
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown
      // function clickIt(event) {
      //   if (event.keyCode === bankOne[props.padLetter].keyCode) {
      //     console.log('you hit ' + props.padLetter)
      //     handleSoundPlay(props.padLetter)
      //   }
      // }
    );
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- watching [] = run once
  }, [])

  return (
    <div className="drum-pad">
      <button onClick={handleSoundPlay} className="drum-button">{props.padLetter}</button>
      <audio id={props.padLetter} className="clip"><source src={bankOne[props.padLetter].url}></source></audio>
    </div>
  )
}

export default App;

/*
references
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries

*/