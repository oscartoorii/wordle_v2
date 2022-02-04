import React from 'react';
import styled from 'styled-components';
import GameGrid from '../GameGrid/GameGrid';
import Header from '../Header/Header';
import { game2 } from '../../gameLayouts'
import HelpPopUp from '../HelpPopUp/HelpPopUp';
import { gridHeight, gridWidth } from '../GameGrid/GameGrid';
import InfoPopUp from '../InfoPopUp/InfoPopUp';
//import WordList from '../WordList/WordList';
//import WordCheck from '../WordCheck.js/WordCheck';

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
          associatedWords: [],
          focusRef: null,
        })
      })),
      selectedWordID: undefined,
      currentClickedWordPos: undefined,
      showingHelp: false,
      showingStatistics: false,
      showingSettings: false,
      infoPopUpText: "",
    }
    this.initCurrentGridState()
  }

  componentDidMount() {
    document.title = "CrossWordle" // Webpage title
    document.description = "Wordle X Crossword"
  }

  // Initialise current grid state based off game data
  initCurrentGridState () {
    const associatedWords = getAssociatedWords(this.state.gameData)
    this.state.currentGridState.forEach((e, i) => e.forEach((e2, i2) => {
      e2.actualLetter = this.getLetter(i2,i)
      e2.startLetterID = this.getStartLetterID(i2,i)
      e2.disabled = this.getLetter(i2, i)==="."
      e2.squareColour = this.getLetter(i2, i)!=="." ? "#FFFFFF" : "#333333"
      e2.associatedWords = associatedWords[i][i2]
    }))
  }

  // Display help pop up
  setDisplayHelp(val) {
    this.setState({
      showingHelp: val,
    })
  }

  // Display statistics pop up
  setDisplayStatistics(val) {
    this.setState({
      showingStatistics: val,
    })
  }

  // Display settings pop up
  setDisplaySettings(val) {
    this.setState({
      showingSettings: val,
    })
  }

  // Display info pop up with text
  displayInfoPopUp(infoText) {
    if (this.state.infoPopUpText==="") {
      this.setState({
        infoPopUpText: infoText,
      })
      setTimeout(() => this.setState({
        infoPopUpText: "",
      }), 4000)
    }
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

  // Toggles the currently selected word based on the words associated with a clicked letter segment
  toggleSelectedWord(letterPos, associatedWords) {
    // Cycle through associated words if same letter is clicked multiple times
    if (this.state.currentClickedWordPos===letterPos) {
      const currentWordIndex = associatedWords.indexOf(this.state.selectedWordID)
      if (currentWordIndex===associatedWords.length-1) {
        this.handleWordSelect(associatedWords[0])
      } else {
        this.handleWordSelect(associatedWords[currentWordIndex+1])
      }
    } else {
      if (!associatedWords.includes(this.state.selectedWordID)) {
        this.handleWordSelect(associatedWords[0])
      }
      this.setState({
        currentClickedWordPos: letterPos,
      })
    }
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
        const nextLetterIndex = parseInt(currentLetterIndex) - 1
        this.state.currentGridState[currentWordCoords[nextLetterIndex][1]][currentWordCoords[nextLetterIndex][0]].focusRef.focus()
      }
    }
  }

  // Checks the currently selected word
  handleWordCheck() {
    if (this.getWordCoords(this.state.selectedWordID).some(e => this.state.currentGridState[e[1]][e[0]].currentLetter==="")) {
      this.displayInfoPopUp("Not enough letters")
      return;
    }
    ////////// TO DO: Add dictionary check ("Not in word list")
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
    <GameDiv>
      {this.state.showingHelp ? <PopUpBackground/> : ""}
      <GameInnerDiv>  
        {this.state.showingHelp ? <HelpPopUp setDisplayHelp={(val) => this.setDisplayHelp(val)}/> : ""}
        <Header setDisplayHelp={(val) => this.setDisplayHelp(val)} setDisplayStatistics={(val) => this.setDisplayStatistics(val)} setDisplaySettings={(val) => this.setDisplaySettings(val)}/>
        <NoWordsText>Number of words: {this.state.gameData.length}</NoWordsText>
        <InfoPopUpDiv>{this.state.infoPopUpText!=="" ? <InfoPopUp infoText={this.state.infoPopUpText}/> : ""}</InfoPopUpDiv>
        <GameGrid 
          currentGridState={this.state.currentGridState} 
          handleRef={(value, pos) => this.handleRef(value, pos)} 
          handleLetterChange={(value, pos) => this.handleLetterChange(value, pos)}
          handleWordCheck={i => this.handleWordCheck(i)}
          moveLetterFocus={(dir, value, pos) => this.moveLetterFocus(dir, value, pos)}
          toggleSelectedWord={(i, i2) => this.toggleSelectedWord(i, i2)}
        >
        </GameGrid>
        {this.state.selectedWordID!==undefined ? 
          <div>
            <h3>
              {"Selected Word: " + this.state.gameData[this.state.selectedWordID].ID+" "+this.state.gameData[this.state.selectedWordID].orientation}
            </h3>
            {/*<WordCheck handleWordCheck={i => this.handleWordCheck(i)} ></WordCheck>*/}
          </div>
          : ""}
        {/*<WordList gameData={this.state.gameData} handleWordSelect={i => this.handleWordSelect(i)}></WordList>*/}
      </GameInnerDiv>
    </GameDiv>
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

// Returns all associated word IDs for all letter segments
const getAssociatedWords = (gameData) => {
  let layout = Array(gridHeight).fill(0).map(e => Array(gridWidth).fill(0).map(e2 => []))
  gameData.map((e, i) => e.word.split("").forEach((e2, wordPos) => {
    if (e.orientation==="HORIZONTAL") {
      if (!layout[e.startPos[1]][e.startPos[0]+wordPos].includes(i)) {
        layout[e.startPos[1]][e.startPos[0]+wordPos].push(i)
      }
    } else if (e.orientation==="VERTICAL") {
      if (!layout[e.startPos[1]+wordPos][e.startPos[0]].includes(i)) {
        layout[e.startPos[1]+wordPos][e.startPos[0]].push(i)
      }
    }
  }))
  return layout;
}

const GameInnerDiv = styled.div`
  display: inline-block;
  margin: 0 auto;
  padding: 10px;
  min-width: 336px;
  border-width: 2px;
  border-style: solid;
  border-image: 
    linear-gradient(
      to bottom, 
      grey, 
      rgba(0, 0, 0, 0)
    ) 1 100%;
`

const GameDiv = styled.div`
  width: 100%;
  height: 100%;
  text-align: center;
`

const NoWordsText = styled.div`
  user-select: none;
  padding: 10px;
  font-size: 20px;
`

const PopUpBackground = styled.div`
  position: fixed;
  background-color: #000000;
  height: 100%;
  width: 100%;
  z-index: 2;
  opacity: 0.4;
`

const InfoPopUpDiv = styled.div`
  height: 50px;
`