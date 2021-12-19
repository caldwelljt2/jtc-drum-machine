// eslint-disable-next-line
import React, { useState, useEffect, useRef, useContext, createContext } from 'react';
import KeyBankContext from './KeyBankContext'


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

  
export default DrumPad;