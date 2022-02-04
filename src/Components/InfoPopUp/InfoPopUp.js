import React from 'react'
import styled from 'styled-components'

export default class InfoPopUp extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
          infoText: props.infoText,
        }
    }

    render() {
        return (
          <InfoPopUpDiv>
            {this.state.infoText}
          </InfoPopUpDiv>
        )
    }
}

const InfoPopUpDiv = styled.button`
    padding: 10px;
    color: white;
    font-size: 14px;
    border-radius: 8px;
    border: 0px;
    background-color: #000000;
    margin: 8px;
    z-index: 1;
    pointer-events:none;
    user-select: none;
`