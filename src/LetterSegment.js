import React from 'react'
import styled from 'styled-components'

export default class LetterSegment extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            letterChar: props.letterChar,
            letterID: props.letterID,
            hidden: true,
        }
    }

    render() {
        return (
        <LetterButton blank={this.state.letterChar==="."}>
            {this.state.letterID===0 ? "" : <IDButton>{this.state.letterID}</IDButton>}
            {this.state.letterChar}
        </LetterButton>
        )
    }
}

const LetterButton = styled.button`
    background: ${props => props.blank ? "#000000" : "#FFFFFF"};
    border: 1px solid #999;
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