
import React from "react";
import Die from "./Die";
import { nanoid } from "nanoid"
import Confetti from 'react-confetti'


export default function App() {
  const [dice, setDice] = React.useState(allNewDice())
  const [tenzies, setTenzies] = React.useState(false)

  React.useEffect(() => {
    const diceIsHeld = dice.every(die => die.isHeld)
    const diceHasSameValue = dice.every(die => die.id)
    if (diceIsHeld && diceHasSameValue) {
      setTenzies(true)
      console.log("you won!")
    }
  }, [dice])

  function allNewDice() {
    // new array to hold me numbers
    // loop 10 times
    // push a random number from 1-6 to my array
    // return array 
    const newDice = []
    for (let i = 0; i < 10; i++) {
      newDice.push( //here is the place where the new array is generated
        {
          value: Math.ceil(Math.random() * 6),
          isHeld: false,
          id: nanoid()
        })
    }
    return newDice
  }

  function rollDice() {
    setDice(oldDice => oldDice.map(die => {
      return die.isHeld ? die : {
        value: Math.ceil(Math.random() * 6),
        isHeld: false,
        id: nanoid()
      }
    }))
  }

  function holdDice(id) {
    //flip the state of isHeld from true to false
    //to update the state of held dice i need to use the setDice function
    setDice(oldDice => oldDice.map(die => {
      return die.id === id ? { ...die, isHeld: !die.isHeld } : die
    }))
    //setDice looks to the oldDice array and map inside each die then figures out 
    //if this die.id is equal to the id that have been passed to the function as a param then
    //return all the array of object and flip isHeld if not return the die
  }
  const dieElement = dice.map(die => <Die value={die.value} key={die.id} isHeld={die.isHeld}
    holdDice={() => holdDice(die.id)} />)
  //i mapped in the dice array and returned a die element each one has a value of die
  //now dieElement is an array of Die components
  return (

    <main>
      {tenzies && <Confetti />}
      <h1 className="title">Tenzies</h1>
      <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      <div className="die--container">
        {dieElement}
        {/* another solution {dice.map(die => <Die value={die} />)} */}
      </div>
      {<button onClick={rollDice}>{tenzies ? "New Game" : "Roll"}</button>}
      <footer>
        <h6>Thanks for playing my Tenzies</h6>
        <em className="signature">Sarah Youssef</em>
      </footer>
    </main>

  );
}


