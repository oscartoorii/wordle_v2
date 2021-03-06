import React from 'react'
import styled from 'styled-components'

export default class InfoPopUp extends React.Component {
    // Props:
    //  infoText

    render() {
        return (
          <InfoPopUpDiv>
            {this.props.infoText}
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
  z-index: 2;
  position: relative;
  pointer-events:none;
  user-select: none;
`