import React from 'react';
import WordSegment from './WordSegment';
import { wordList } from './wordList'

const minWords = 5;
const maxWords = 10;

export default class Game extends React.Component {
  constructor(props) {
    super(props)
    const noWords = randomNumWords()
    this.state = {
      numberOfWords: noWords,
      words: Array(noWords).fill(0).map(e => {
        return {
          word: randomWord(),
          answered: false,
        }
      })
    }
  }

  componentDidMount(){
    document.title = "Wordle v2"
  }
  
  render() {
    return (
    <div className="App">
      <h1>Crossword(le)</h1>
      <h2>Number of words: {this.state.numberOfWords}</h2>
      {this.state.words.map(e => <WordSegment word={e.word}></WordSegment>)}
    </div>
    )
  }
}

const randomWord = () => {
  return wordList[Math.floor(Math.random()*wordList.length)];
}

const randomNumWords = () => {
  return Math.floor(Math.random() * (maxWords - minWords + 1) + minWords)
}