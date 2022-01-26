import React from 'react';
import GameGrid from './GameGrid';
import WordList from './WordList';
import { defaultGame } from './gameLayouts'
import WordCheck from './WordCheck';
import { gridHeight, gridWidth } from './GameGrid';

export default class Game extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      gameData: defaultGame,
      currentGridState: Array(gridHeight).fill(0).map(e => Array(gridWidth).fill(0).map(e2 => {
        return ({
          actualLetter: null,
          currentLetter: null,
          disabled: true,
          selected: false,
          squareColour: null,
          letterID: null,
        })
      }))
    }
  }

  componentDidMount() {
    document.title = "Wordle v2"
  }

  handleWordSelect(uniqueWordID) {
    this.setState({
      selectedWordID: uniqueWordID,
    })
  }

  // Checks the currently selected word
  handleWordCheck() {

  }
  
  render() {
    return (
    <div className="App">
      <h1>Crossword(le)</h1>
      <h2>Number of words: {defaultGame.length}</h2>
      <GameGrid gameData={this.state.gameData} selectedWordID={this.state.selectedWordID}></GameGrid>
      {this.state.selectedWordID!==undefined ? 
        <div>
          <h3>
            {"Selected Word: " + this.state.gameData[this.state.selectedWordID].ID+" "+this.state.gameData[this.state.selectedWordID].orientation}
          </h3>
          <WordCheck selectedWordID={this.state.selectedWordID} ></WordCheck>
        </div>
        : ""}
      <WordList gameData={this.state.gameData} handleWordSelect={(i) => this.handleWordSelect(i)}></WordList>
    </div>
    )
  }
}

//const randomWord = () => {
//  return wordList[Math.floor(Math.random()*wordList.length)];
//}
//
//const randomNumWords = () => {
//  return Math.floor(Math.random() * (maxWords - minWords + 1) + minWords)
//}