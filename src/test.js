const myObj = {
'Q': {
    keyCode: 81,
    keyTrigger: 'Q',
    id: 'Heater-1',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3'
},

'W': {
    keyCode: 87,
    keyTrigger: 'W',
    id: 'Heater-2',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3'
},
}
const keyCode = "81"

// console.log("looking for url for " + keyCode + " in " + myObj)

for (const property in myObj) {
    console.log(property)
    if (myObj[property].keyCode == keyCode) {
        console.log(myObj[property].url)
    }
}
// const answer = findObjectByKey(myObj, "keyCode", 87)


// console.log(answer)