import React from 'react'
import LetterSegment from '../LetterSegment/LetterSegment'
import styled from 'styled-components';

export const gridWidth = 6;
export const gridHeight = 6;

export default class GameGrid extends React.Component {
    // Props:
    //  currentGridState
    //  gameComplete

    render() {
        return (
            <div>
                {Array(gridHeight).fill(0).map((e, i) => {
                    return <GridRow>{Array(gridWidth).fill(0).map((e2, i2) => {
                        return <LetterSegment
                                    currentLetterState={this.props.currentGridState[i][i2]} 
                                    gameComplete={this.props.gameComplete}
                                    handleRef={(value, pos) => this.props.handleRef(value, pos)}
                                    handleLetterChange={(value, pos) => this.props.handleLetterChange(value, pos)}
                                    handleWordCheck={i => this.props.handleWordCheck(i)}
                                    moveLetterFocus={(dir, value, pos) => this.props.moveLetterFocus(dir, value, pos)}
                                    toggleSelectedWord={(i, i2) => this.props.toggleSelectedWord(i, i2)}
                                >
                                </LetterSegment>
                    })}</GridRow>
                })}
            </div>
        )
    }
}

const GridRow = styled.div`
&:after {
    clear: both;
    content: "";
    display: table;
}
`