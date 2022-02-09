import React from 'react'
import styled from 'styled-components'

export default class LetterSegment extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            currentLetterState: props.currentLetterState,
            gameComplete: props.gameComplete,
        }
    }

    render() {
        return (
        <LetterButton tabIndex={-1} squareColour={this.state.currentLetterState.squareColour} selected={this.state.currentLetterState.selected}>
            {this.state.currentLetterState.startLetterID===0 ? "" : <IDButton>{this.state.currentLetterState.startLetterID}</IDButton>}
            {this.state.currentLetterState.disabled ? "" : 
            <LetterInput 
                type="text" 
                maxLength={1} 
                tabIndex={-1}
                gameComplete={this.props.gameComplete}
                ref={input => this.state.currentLetterState.focusRef===null ? this.props.handleRef(input, this.state.currentLetterState.letterPos) : ""}
                value={this.state.currentLetterState.currentLetter}
                color={this.state.currentLetterState.textColour}
                onInput={event => {
                    this.props.handleLetterChange(event.target.value, this.state.currentLetterState.letterPos)
                }}
                onKeyDown={event => {
                    if ((event.key==="Backspace"||event.key==="Delete") && this.state.currentLetterState.currentLetter==="") {
                        this.props.moveLetterFocus("BACKWARD", event.target.value ,this.state.currentLetterState.letterPos)
                    } else if (event.key==="Enter") {
                        this.props.handleWordCheck()
                    } else if (this.state.currentLetterState.currentLetter!=="" && !(event.key==="Backspace"||event.key==="Delete")) {
                        this.props.moveLetterFocus("FORWARD", event.target.value ,this.state.currentLetterState.letterPos)
                    } 
                    // ADD KEYBOARD USABILITY - Currently doesn't work - maybe check for orientation for checking up/down or
                    //else if (event.key==="ArrowLeft") {
                    //    this.props.moveLetterFocus("BACKWARD", event.target.value ,this.state.currentLetterState.letterPos)
                    //} else if (event.key==="ArrowRight") {
                    //    this.props.moveLetterFocus("FORWARD", event.target.value ,this.state.currentLetterState.letterPos)
                    //} else if (event.key==="ArrowUp") {
                    //    this.props.moveLetterFocus("BACKWARD", event.target.value ,this.state.currentLetterState.letterPos)
                    //} else if (event.key==="ArrowDown") {
                    //    this.props.moveLetterFocus("FORWARD", event.target.value ,this.state.currentLetterState.letterPos)
                    //} else if (event.code==="Space") { // Space bar
                    //    // FIX - only works when focused letter is blank
                    //    this.props.toggleSelectedWord(this.state.currentLetterState.letterPos, this.state.currentLetterState.associatedWords)
                    //}
                }}
                onClick={() => this.props.toggleSelectedWord(this.state.currentLetterState.letterPos, this.state.currentLetterState.associatedWords)}
            />}
        </LetterButton>
        )
    }
}

const LetterButton = styled.button`
    background: ${props => props.squareColour};
    border: 3px solid ${props => props.selected ? "#477FD3" : "#999999"};
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

const IDButton = styled.div`
    position: absolute;
    color: #333333;
    top: -11px;
    left: -2px;
    font-size: 16px;
    padding: 5px;
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
    user-select: ${props => props.gameComplete ? "none" : "auto"};
    pointer-events: ${props => props.gameComplete ? "none" : "auto"};
    &:focus {
        outline: none;
    }
`