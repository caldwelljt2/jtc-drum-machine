// eslint-disable-next-line
import React, { useState, useEffect } from 'react';
// import logo from './logo.svg';
import './App.scss';
// eslint-disable-next-line
import { bankOne, bankTwo } from './KeybankData'


function App() {
  let KeyDatabase = []
  for (let i in bankOne) {
    KeyDatabase.push(i)
  }
  // const displayThis = KeyDatabase.map((key) => {return <h1>{key}</h1>})
  const drumPads = KeyDatabase.map((key) => { return <DrumPad padName={key} /> })
  // const drumPads = bankOne.length
  // console.log(KeyDatabase)
  // .map((item) => {return <DrumPad padName={bankOne.A.keyTrigger} />})
  return (
    <div className="App">
      <header className="drum-machine" id="drum-machine">
        <div id="display">
          <h1>Drum Kit on-line by JTC</h1>
          <p>hit buttons to play or hit keyboard keys if you have them</p>
        </div>
        {/* <h1>{bankOne.A.id}</h1> */}
        <div id="drum-buttons">
          {drumPads}
        </div>
        {/* <DrumPad padName={bankOne.A.keyTrigger} /> */}
        {/* <DrumPad padName="Q" />
        <DrumPad padName="W" />
        <DrumPad padName="E" />
        <DrumPad padName="A" />
        <DrumPad padName="S" />
        <DrumPad padName="D" />
        <DrumPad padName="Z" />
        <DrumPad padName="X" />
        <DrumPad padName="C" /> */}
      </header>
    </div>
  );
}

const DrumPad = (props) => {
  // componentDidMount() {}
  // componentWillUnmount() {}

  const handleSoundPlay = (event) => {
    // console.log(bankOne[props.padName].url)
    // console.log(event)
    // console.log(props.padName)
    // console.log(this)
    const mySound = new Audio(bankOne[props.padName].url)
    mySound.play()
  }

  useEffect(() => {
    // console.log('redraw')
    // console.log(window.document)
    // console.log(document)
    document.addEventListener('keydown', function clickIt(event) {
      // console.log(event.keyCode, props.padName, bankOne[props.padName].keyCode)
      if (event.keyCode === bankOne[props.padName].keyCode) {
        console.log('you hit ' + props.padName)
        handleSoundPlay()
      }
    })
    // const mySound = new Audio("https://assets.coderrocketfuel.com/pomodoro-times-up.mp3")
    // mySound.play()

    // event listener high (i.e. window.addEventListener('resize', handleResize))

    // return () => {
    //   console.log('attempting to unmount hooks')
    //   document.addEventListener("keydown", function clickIt() {
    //     document.removeEventListener("keydown", clickIt, false);
    // }, false);

    // return document.removeEventListener('keydown', clickIt())
    // remove listeners here

    // }
  }, [])

  return (
    <div className="drum-pad">
      <button onClick={handleSoundPlay} className="drum-button">{props.padName}</button>
      {/* this next line is useless, but required for the FCC test? */}
      <audio id={props.padName} className="clip"><source src={bankOne[props.padName].url}></source></audio>
    </div>
  )
}

export default App;
