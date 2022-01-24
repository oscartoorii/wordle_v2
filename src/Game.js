import React from 'react';
import WordSegment from './WordSegment';
import GameGrid from './GameGrid';
import WordList from './WordList';
import { defaultGame } from './gameLayouts'

//const minWords = 5;
//const maxWords = 10;
export default class Game extends React.Component {
  constructor(props) {
    super(props)
    //const noWords = randomNumWords()
    this.state = {
      gameData: defaultGame,
      //numberOfWords: noWords,
      //words: Array(noWords).fill(0).map(e => {
      //  return {
      //    word: randomWord(),
      //    answered: false,
      //  }
      //})
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
  
  render() {
    return (
    <div className="App">
      <h1>Crossword(le)</h1>
      <h2>Number of words: {defaultGame.length}</h2>
      {/*this.state.words.map(e => <WordSegment word={e.word}></WordSegment>)*/}
      <GameGrid gameData={this.state.gameData} selectedWordID={this.state.selectedWordID}></GameGrid>
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