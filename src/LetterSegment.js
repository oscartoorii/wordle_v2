import React from 'react'
import styled from 'styled-components'

export default class LetterSegment extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            actualLetter: props.actualLetter,
            letterID: props.letterID,
            hidden: true,
            letterPos: props.letterPos,
            letter: ""
        }
    }

    onInputChange(value) {
        // Ensures input is only letters - no numbers or symbols
        if (/^([a-zA-Z]|^$)$/.test(value)) {
            this.setState({
                letter: value
            })
        }
    }

    render() {
        return (
        <LetterButton blank={this.state.actualLetter==="."} selected={this.props.selected}>
            {this.state.letterID===0 ? "" : <IDButton>{this.state.letterID}</IDButton>}
            {this.state.actualLetter==="." ? "" : <LetterInput type="text" maxLength={1} value={this.state.letter} onInput={event => this.onInputChange(event.target.value)} onChange={event => console.log(this.state.letterPos, event.target.value)}/>}
        </LetterButton>
        )
    }
}

const LetterButton = styled.button`
    background: ${props => props.blank ? "#000000" : "#FFFFFF"};
    border: 3px solid ${props => props.selected ? "#3563FF" : "#999999"};
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
    color: #A4A4A4;
    top: -11px;
    left: -2px;
    font-size: 20px;
    padding: 5px;
`;

const LetterInput = styled.input`
    border: none;
    font-size: 36px;
    width: 36px;
    text-align: center;
    text-transform: uppercase;
    &:focus {
        outline: none;
    }
`