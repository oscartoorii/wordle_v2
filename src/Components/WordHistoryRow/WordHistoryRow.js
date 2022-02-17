import React from 'react'
import styled from 'styled-components'

export default class WordHistoryRow extends React.Component {
    // Props:
    //  indvWordHistory

    render() {
        return (
          <div>
            {<GridRow>{this.props.indvWordHistory.map((e, i) => {
                    return <LetterButton 
                        squareColour={e.colour} 
                        color={"white"}
                        >
                      {e.letter}
                    </LetterButton>
                })}
            </GridRow>}
          </div>
        )
    }
}

const GridRow = styled.div`
  padding: 1px;
  display: inline-block;
  &:after {
      clear: both;
      content: "";
      display: table;
  }
`

const LetterButton = styled.button`
    background: ${props => props.squareColour};
    color: ${props => props.color};
    border: 3px solid #999999;
    float: left;
    font-size: 26px;
    font-weight: bold;
    line-height: 34px;
    height: 42px;
    margin-right: -1px;
    margin-top: -1px;
    padding: 0;
    text-align: center;
    width: 42px;
    position: relative;
    pointer-events:none;
    user-select: none;
`;
