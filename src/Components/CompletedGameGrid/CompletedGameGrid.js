import React from 'react'
import styled from 'styled-components'
import { gridHeight, gridWidth } from '../GameGrid/GameGrid';

export default class CompletedGridDiv extends React.Component {
    // Props:
    //  currentGridState

    render() {
        return (
          <GameGrid>
            {Array(gridHeight).fill(0).map((e, i) => {
                    return <GridRow>{Array(gridWidth).fill(0).map((e2, i2) => {
                        return <LetterButton tabIndex={-1} squareColour={this.props.currentGridState[i][i2].disabled ? "#333333" : "#6AAA64"}>
                          {this.props.currentGridState[i][i2].startLetterID===0 ? "" : <IDButton tabIndex={-1}>{this.props.currentGridState[i][i2].startLetterID}</IDButton>}
                          {this.props.currentGridState[i][i2].disabled ? "" : this.props.currentGridState[i][i2].actualLetter}
                      </LetterButton>
                    })}</GridRow>
                })}
          </GameGrid>
        )
    }
}

const GameGrid = styled.div`
  display: inline-block;
`

const GridRow = styled.div`
  &:after {
      clear: both;
      content: "";
      display: table;
  }
`

const LetterButton = styled.button`
    background: ${props => props.squareColour};
    color: #FFFFFF;
    border: 3px solid #999999;
    float: left;
    font-size: 26px;
    font-weight: bold;
    line-height: 34px;
    height: 48px;
    margin-right: -1px;
    margin-top: -1px;
    padding: 0;
    text-align: center;
    width: 48px;
    position: relative;
    pointer-events:none;
    user-select: none;
`;

const IDButton = styled.div`
    position: absolute;
    color: #333333;
    top: -14px;
    left: -4px;
    font-size: 14px;
    padding: 5px;
`;