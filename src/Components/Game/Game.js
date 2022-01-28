import React from 'react';
import GameGrid from '../GameGrid/GameGrid';
import WordList from '../WordList/WordList';
import { defaultGame } from '../../gameLayouts'
import WordCheck from '../WordCheck.js/WordCheck';
import { gridHeight, gridWidth } from '../GameGrid/GameGrid';

const selectedGameData = defaultGame 

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
          squareColour: "#000000",
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
      e2.squareColour = this.getLetter(i2, i)!=="." ? "#FFFFFF" : "#000000"
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

  handleLetterChange(value, pos) {
    // Ensures input is only letters - no numbers or symbols
    if (/^([a-zA-Z]|^$)$/.test(value)) {
        let newGridState = this.state.currentGridState.slice() // Copy array
        newGridState[pos[1]][pos[0]].currentLetter = value.toUpperCase();
        this.setState({
            currentGridState: newGridState
        })
    }
  }

  // Checks the currently selected word
  handleWordCheck() {
    this.getWordCoords(this.state.selectedWordID).forEach((e, i) => console.log(this.state.gameData[this.state.selectedWordID].word[i]))
  }
  
  render() {
    return (
    <div className="App">
      <h1>Crossword(le)</h1>
      <h2>Number of words: {this.state.gameData.length}</h2>
      <GameGrid currentGridState={this.state.currentGridState} handleLetterChange={(value, pos) => this.handleLetterChange(value, pos)}></GameGrid>
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