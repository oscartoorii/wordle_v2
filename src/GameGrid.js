import React from 'react'
import LetterSegment from './LetterSegment'
import './GameGrid.css'

const gridWidth = 6;
const gridHeight = 6;

export default class GameGrid extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            gameData: props.gameData,
            gameLayout: generateLayout(props.gameData)
        }
    }

    getLetter(x, y) {
        return this.state.gameLayout[y][x]
    }

    // Method to get the letter ID for rendering the word startPos
    getLetterID(x, y) {
        for (let wordData of this.state.gameData) {
            if (wordData.startPos[0]===x && wordData.startPos[1]===y) {
                return wordData.ID;
            }
        }
        return 0;
    }

    // Method to return array of all coordinates of selected word
    getSelectedLetters() {
        const wordData = this.state.gameData[this.props.selectedWordID]
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
        return this.getSelectedLetters().some(coords => coords[0]===x && coords[1]===y)
    }

    render() {
        return (
            <div>
                {Array(gridHeight).fill(0).map((e, i) => {
                    return <div className="board-row">{Array(gridWidth).fill(0).map((e2, i2) => {
                        return <LetterSegment 
                                    actualLetter={this.getLetter(i2,i)} 
                                    letterID={this.getLetterID(i2,i)} 
                                    selected={this.props.selectedWordID!==undefined ? this.checkSelected(i2,i) : ""}
                                >
                                </LetterSegment>
                    })}</div>
                })}
            </div>
        )
    }
}

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
