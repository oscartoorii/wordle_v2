import React from 'react';
import GameGrid from '../GameGrid/GameGrid';
import WordList from '../WordList/WordList';
import { game2 } from '../../gameLayouts'
import WordCheck from '../WordCheck.js/WordCheck';
import { gridHeight, gridWidth } from '../GameGrid/GameGrid';

const selectedGameData = game2

export default class Game extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      gameData: selectedGameData,
      gameLayout: generateLayout(selectedGameData),
      currentGridState: Array(gridHeight).fill(0).map((e, i) => Array(gridWidth).fill(0).map((e2, i2) => {
        return ({
          letterPos: [i2, i],
          actualLetter: null,
          currentLetter: "",
          startLetterID: null,
          disabled: true,
          selected: false,
          squareColour: "#333333",
          textColour: "#000000",
          focusRef: null,
        })
      })),
      selectedWordID: undefined,
    }
    this.initCurrentGridState()
  }

  componentDidMount() {
    document.title = "Wordle v2" // Webpage title
  }

  // Initialise current grid state based off game data
  initCurrentGridState () {
    this.state.currentGridState.forEach((e, i) => e.forEach((e2, i2) => {
      e2.actualLetter = this.getLetter(i2,i)
      e2.startLetterID = this.getStartLetterID(i2,i)
      e2.disabled = this.getLetter(i2, i)==="."
      e2.squareColour = this.getLetter(i2, i)!=="." ? "#FFFFFF" : "#333333"
    }))
  }

  // Method to get the letter ID for rendering the word startPos
  getStartLetterID(x, y) {
    for (let wordData of this.state.gameData) {
        if (wordData.startPos[0]===x && wordData.startPos[1]===y) {
            return wordData.ID;
        }
    }
    return 0;
  }

  getLetter(x, y) {
    return this.state.gameLayout[y][x]
  }

  // Method to return array of all coordinates of a given word
  getWordCoords(wordID) {
    const wordData = this.state.gameData[wordID]
    let letterCoords = []
    wordData.word.split("").forEach((e, i) => {
        if (wordData.orientation==="HORIZONTAL") {
            letterCoords.push([wordData.startPos[0]+i, wordData.startPos[1]])
        } else if (wordData.orientation==="VERTICAL") {
            letterCoords.push([wordData.startPos[0], wordData.startPos[1]+i])
        }
    })
    return letterCoords
  }

  // Method to check if letter is currently part of selected word
  checkSelected(x, y) {
    return this.getWordCoords(this.state.selectedWordID).some(coords => coords[0]===x && coords[1]===y)
  }

  // Assigns references in currentGameState for each letter cell for auto-focusing
  handleRef(value, pos) {
    let newGridState = this.state.currentGridState.slice() // Copy array
    newGridState[pos[1]][pos[0]].focusRef = value;
    this.setState({
        currentGridState: newGridState
    })
  }

  // Changes currently selected word
  async handleWordSelect(uniqueWordID) {
    await this.setState({
      selectedWordID: uniqueWordID,
    })
    let newGridState = this.state.currentGridState.slice() // Copy array
    newGridState.forEach((e, i) => e.forEach((e2, i2) => e2.selected = this.checkSelected(i2,i))) // Update "selected" fields
    this.setState({
      currentGridState: newGridState,
    })
  }

  // Called every time a letter value is changed
  handleLetterChange(value, pos) {
    // Ensures input is only letters - no numbers or symbols
    if (/^([a-zA-Z]|^$)$/.test(value)) {
        let newGridState = this.state.currentGridState.slice() // Copy array
        newGridState[pos[1]][pos[0]].currentLetter = value.toUpperCase();
        this.setState({
            currentGridState: newGridState
        })
        // Move to next letter in word
        this.moveLetterFocus("FORWARD", value, pos)
    }
  }

  // Moves the letter forward or backward
  moveLetterFocus(dir, value, pos) {
    const currentWordCoords = this.getWordCoords(this.state.selectedWordID)
    const currentLetterIndex = currentWordCoords.findIndex(e => JSON.stringify(e)===JSON.stringify(pos))
    if (dir==="FORWARD") {
      if (value!=="") { // Only move to next letter if letter is not backspaced nor deleted
        if (currentLetterIndex !== currentWordCoords.length-1) { // Only move to next letter if not the last letter
          const nextLetterIndex = parseInt(currentLetterIndex) + 1
          this.state.currentGridState[currentWordCoords[nextLetterIndex][1]][currentWordCoords[nextLetterIndex][0]].focusRef.focus()
        }
      }
    } else if (dir==="BACKWARD") {
      if (currentLetterIndex !== 0) { // Only move to previous letter if not the first letter
        console.log(value, pos)
        const nextLetterIndex = parseInt(currentLetterIndex) - 1
        console.log(nextLetterIndex)
        this.state.currentGridState[currentWordCoords[nextLetterIndex][1]][currentWordCoords[nextLetterIndex][0]].focusRef.focus()
      }
    }
  }

  // Checks the currently selected word
  handleWordCheck() {
    if (this.getWordCoords(this.state.selectedWordID).some(e => this.state.currentGridState[e[1]][e[0]].currentLetter==="")) {
      console.log("ERROR: Incomplete Word")
      return;
    }
    ////////// TO DO: Add dictionary check ("Word is not in dictionary")
    let newGridState = this.state.currentGridState.slice() // Copy array
    this.getWordCoords(this.state.selectedWordID).forEach(e => {
      if (this.state.currentGridState[e[1]][e[0]].currentLetter===this.state.gameLayout[e[1]][e[0]]) {
        // Correct spot - Green tile
        newGridState[e[1]][e[0]].squareColour = "#6AAA64"
      } else if (this.getWordCoords(this.state.selectedWordID).some(e2 => this.state.currentGridState[e[1]][e[0]].currentLetter===this.state.gameLayout[e2[1]][e2[0]])) {
        // In one or both of the words but wrong spot - Yellow tile 
        /////////////// TO DO: Add the case where it checks both words
        newGridState[e[1]][e[0]].squareColour = "#C9B458"
      } else {
        // Not in word - Gray tile
        newGridState[e[1]][e[0]].squareColour = "#787C7E"
      }
      newGridState[e[1]][e[0]].textColour = "#FFFFFF"
    })
    this.setState({
        currentGridState: newGridState
    })
  }
  
  render() {
    return (
    <div className="App">
      <h1>Crossword(le)</h1>
      <h2>Number of words: {this.state.gameData.length}</h2>
      <GameGrid 
        currentGridState={this.state.currentGridState} 
        handleRef={(value, pos) => this.handleRef(value, pos)} 
        handleLetterChange={(value, pos) => this.handleLetterChange(value, pos)}
        moveLetterFocus={(dir, value, pos) => this.moveLetterFocus(dir, value, pos)}
      >
      </GameGrid>
      {this.state.selectedWordID!==undefined ? 
        <div>
          <h3>
            {"Selected Word: " + this.state.gameData[this.state.selectedWordID].ID+" "+this.state.gameData[this.state.selectedWordID].orientation}
          </h3>
          <WordCheck handleWordCheck={i => this.handleWordCheck(i)} ></WordCheck>
        </div>
        : ""}
      <WordList gameData={this.state.gameData} handleWordSelect={i => this.handleWordSelect(i)}></WordList>
    </div>
    )
  }
}

// Generates a 2D array representing the crossword and each position's actual letter
const generateLayout = (gameData) => {
  let layout = Array(gridHeight).fill(".").map(e => Array(gridWidth).fill("."))
  gameData.map(e => e.word.split("").forEach((e2, wordPos) => {
      if (e.orientation==="HORIZONTAL") {
          layout[e.startPos[1]][e.startPos[0]+wordPos] = e2;
      } else if (e.orientation==="VERTICAL") {
          layout[e.startPos[1]+wordPos][e.startPos[0]] = e2;
      }
  }))
  return layout;
}