import React from 'react'
import styled from 'styled-components'

export default class SettingsPopUp extends React.Component {
  
    render() {
        return (
          <PopUp>
            <PopUpTitleDiv>
              SETTINGS
              <PopUpClose onClick={() => this.props.setDisplaySettings(false)}>
                <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
                  <path fill="#999999" d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path>
                </svg>
              </PopUpClose>
            </PopUpTitleDiv>
            <h4>No settings currently available.</h4>
          </PopUp>
        )
    }
}

const PopUp = styled.div`
  margin: -8px;
  width: 328px;
  padding: 10px;
  border: 2px solid;
  border-color: #999999;
  border-radius: 16px;
  background-color: #FFFFFF;
  position: absolute;
  top: 110px;
  z-index: 3;
`

const PopUpTitleDiv = styled.div`
  font-size: 18px;
  font-weight: bold;
`

const PopUpClose = styled.div`
  float: right;
  cursor: pointer;
`
