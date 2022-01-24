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

    getLetterID(x, y) {
        for (let wordData of this.state.gameData) {
            if (wordData.startPos[0]===x && wordData.startPos[1]===y) {
                return wordData.ID;
            }
        }
        return 0;
    }

    render() {
        return (
            <div>
                {this.props.selectedWordID!==undefined ? <h3>{"Selected Word: " + this.state.gameData[this.props.selectedWordID].ID+" "+this.state.gameData[this.props.selectedWordID].orientation}</h3> : ""}
                {Array(gridHeight).fill(0).map((e, i) => {
                    return <div className="board-row">{Array(gridWidth).fill(0).map((e2, i2) => {
                        return <LetterSegment letterChar={this.getLetter(i2,i)} letterID={this.getLetterID(i2,i)}></LetterSegment>
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
