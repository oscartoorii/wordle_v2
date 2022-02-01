import React from 'react'
import styled from 'styled-components'

export default class LetterSegment extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            currentLetterState: props.currentLetterState,
        }
    }

    render() {
        return (
        <LetterButton squareColour={this.state.currentLetterState.squareColour} selected={this.state.currentLetterState.selected}>
            {this.state.currentLetterState.startLetterID===0 ? "" : <IDButton>{this.state.currentLetterState.startLetterID}</IDButton>}
            {this.state.currentLetterState.disabled ? "" : 
            <LetterInput 
                type="text" 
                maxLength={1} 
                ref={input => this.state.currentLetterState.focusRef===null ? this.props.handleRef(input, this.state.currentLetterState.letterPos) : ""}
                value={this.state.currentLetterState.currentLetter}
                color={this.state.currentLetterState.textColour}
                onInput={event => {
                    this.props.handleLetterChange(event.target.value, this.state.currentLetterState.letterPos)
                }}
                onKeyDown={event => 
                    ((event.key==="Backspace"||event.key==="Delete") && this.state.currentLetterState.currentLetter==="") ? 
                    this.props.moveLetterFocus("BACKWARD", event.target.value ,this.state.currentLetterState.letterPos) : ""
                }
            />}
        </LetterButton>
        )
    }
}

const LetterButton = styled.button`
    background: ${props => props.squareColour};
    border: 3px solid ${props => props.selected ? "#477FD3" : "#999999"};
    float: left;
    font-size: 36px;
    font-weight: bold;
    line-height: 34px;
    height: 69px;
    margin-right: -1px;
    margin-top: -1px;
    padding: 0;
    text-align: center;
    width: 69px;
    position: relative;
`;

const IDButton = styled.div`
    position: absolute;
    color: #333333;
    top: -11px;
    left: -2px;
    font-size: 18px;
    padding: 5px;
`;

const LetterInput = styled.input`
    color: ${props => props.color ? props.color : "black"};
    background: transparent;
    border: none;
    font-size: 36px;
    font-weight: bold;
    width: 36px;
    text-align: center;
    text-transform: uppercase;
    &:focus {
        outline: none;
    }
`