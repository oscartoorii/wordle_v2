import React from 'react'
import styled from 'styled-components'
import HelpExampleGrid from '../HelpExampleGrid/HelpExampleGrid'

export default class HelpPopUp extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
          
        }
    }

    render() {
        return (
          <PopUp>
            <PopUpTitleDiv>
              HOW TO PLAY
              <PopUpClose onClick={() => this.props.setDisplayHelp(false)}>
                <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
                  <path fill="#999999" d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path>
                </svg>
              </PopUpClose>
            </PopUpTitleDiv>
            <HelpTextDiv>
              Guess the <b>WORDLE</b> in 6 tries for each word in the crossword.<br/>
              <br/>
              Each guess must be a valid word, and must use all letter spaces. Hit the enter button to submit.<br/>
              <br/>
              After each guess, the color of the tiles will change to show how close your guess was to the word.<br/>
              <hr/>
              <b>Examples</b><br/>
              <br/>
              <HelpExampleGrid gridData={[["B","O","A","R","D"], ["","R","","",""]]} color={"#6AAA64"} colorPos={[1, 0]} /><br/>
              The letter <b>O</b> is in the correct spot for both words.<br/>
              <br/>
              <HelpExampleGrid gridData={[["I","","","",""], ["C","A","C","T","S"]]} color={"#C9B458"} colorPos={[0, 1]} /><br/>
              The letter <b>C</b> is in one or both of the words, but in the wrong spot.<br/>
              <br/>
              <HelpExampleGrid gridData={[["S","O","U","X","D"], ["","","","O",""]]} color={"#787C7E"} colorPos={[3, 0]} /><br/>
              The letter <b>X</b> is not in either of the words.<br/>
              <hr/>
              <b>A new CROSSWORDLE will be available each day!</b>
            </HelpTextDiv>
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
  top: 69px;
  z-index: 2;
`

const PopUpTitleDiv = styled.div`
  font-size: 18px;
  font-weight: bold;
`

const PopUpClose = styled.div`
  float: right;
  cursor: pointer;
`

const HelpTextDiv = styled.div`
  font-size: 15px;
  text-align: left;
  padding: 15px;
`