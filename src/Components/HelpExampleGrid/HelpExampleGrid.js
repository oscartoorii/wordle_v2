import React from 'react'
import styled from 'styled-components'

const gridHeight = 2;
const gridWidth = 5;

export default class HelpExampleGrid extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
          
        }
    }

    render() {
        return (
          <div>
            {Array(gridHeight).fill(0).map((e, i) => {
                return <GridRow>{Array(gridWidth).fill(0).map((e2, i2) => {
                    return <LetterButton squareColour="#FFFFFF">
                      <LetterInput color="black">
                      </LetterInput>
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
    border: 3px solid #999999
    float: left;
    font-size: 30px;
    font-weight: bold;
    line-height: 34px;
    height: 56px;
    margin-right: -1px;
    margin-top: -1px;
    padding: 0;
    text-align: center;
    width: 56px;
    position: relative;
`;

const LetterInput = styled.input`
    color: ${props => props.color ? props.color : "black"};
    background: transparent;
    border: none;
    font-size: 30px;
    font-weight: bold;
    width: 36px;
    text-align: center;
    text-transform: uppercase;
    &:focus {
        outline: none;
    }
`