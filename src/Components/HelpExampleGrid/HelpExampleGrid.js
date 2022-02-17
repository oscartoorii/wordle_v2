import React from 'react'
import styled from 'styled-components'

const gridHeight = 2;
const gridWidth = 5;

export default class HelpExampleGrid extends React.Component {
    // Props: 
    //  gridData
    //  color
    //  colorPos

    render() {
        return (
          <div>
            {Array(gridHeight).fill(0).map((e, i) => {
                return <GridRow>{Array(gridWidth).fill(0).map((e2, i2) => {
                    return <LetterButton 
                        squareColour={i===this.props.colorPos[1] && i2===this.props.colorPos[0] ? this.props.color : (this.props.gridData[i][i2]==="" ? "#333333" : "#FFFFFF")} 
                        color={i===this.props.colorPos[1] && i2===this.props.colorPos[0] ? "white" : "black"}
                        >
                      {this.props.gridData[i][i2]}
                    </LetterButton>
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
