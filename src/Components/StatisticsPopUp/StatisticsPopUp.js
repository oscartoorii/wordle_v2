import React from 'react'
import styled from 'styled-components'
import moment from 'moment'
import CompletedGameGrid from '../CompletedGameGrid/CompletedGameGrid'

export default class StatisticsPopUp extends React.Component {
    // Props:
    //  gameComplete
    //  currentGridState
    //  score
    constructor(props) {
      super(props)
      this.state = {
        time: this.timeTilMidnight(),
      }
    }

    componentDidMount() {
      setInterval(() => {
        this.setState({
          time: this.timeTilMidnight(),
        })
      }, 1000); // Slight inaccuracies in time occur but not a big deal
    }

    timeTilMidnight() {
      const now = moment().format("HH:mm:ss");
      const midnight = "00:00:00";
      return moment.utc(moment(midnight,"HH:mm:ss").diff(moment(now,"HH:mm:ss"))).format("HH:mm:ss")
    }

    getShareText() {
      return `CrossWordle #1\n\nScore: ${this.props.score}`
    }
    
    render() {
        return (
          <PopUp>
            <PopUpTitleDiv>
              STATISTICS
              <PopUpClose onClick={() => this.props.setDisplayStatistics(false)}>
                <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
                  <path fill="#999999" d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path>
                </svg>
              </PopUpClose>
            </PopUpTitleDiv>
            <StatisticsDiv>
              <h4>No statistics currently available.</h4>
            </StatisticsDiv>
            {this.props.gameComplete && 
              <EndgameDiv>
                <hr/>
                <ScoreDiv>
                  Score: {this.props.score}
                </ScoreDiv>
                <ShareButtonDiv>
                  <ShareButton onClick={() => {
                    navigator.clipboard.writeText(this.getShareText())
                    this.props.displayInfoPopUp("Copied results to clipboard")
                  }}>
                    <ShareTextDiv>
                      SHARE
                    </ShareTextDiv>
                    <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 20" width="24">
                      <path fill="white" d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92c0-1.61-1.31-2.92-2.92-2.92zM18 4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zM6 13c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm12 7.02c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z"></path>
                    </svg>
                  </ShareButton>
                </ShareButtonDiv>
                <CompletedGridDiv>
                <CompletedGameGrid currentGridState={this.props.currentGridState}/>
                </CompletedGridDiv>
                <hr/>
                <NextGameTimerDiv>
                NEXT CROSSWORDLE<br/>
                <NextGameTimerTimeDiv>{this.state.time}</NextGameTimerTimeDiv>
                </NextGameTimerDiv>
              </EndgameDiv>
            }
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

const StatisticsDiv = styled.div`

`

const EndgameDiv = styled.div`
`

const CompletedGridDiv = styled.div`
  padding: 10px;
`

const ScoreDiv = styled.div`
  float: left;
  width: 50%;
  padding: 6px 0px 6px 0px;
  font-weight: bold;
  font-size: 20px;
  height: 42px;
`

const ShareButtonDiv = styled.div`
  float: left;
  width: 50%;
  padding: 2px 0px 6px 0px;
  height: 42px;
`

const ShareButton = styled.button`
  font-size: 18px;
  font-weight: bold;
  color: white;
  border-radius: 4px;
  border: 0px;
  width: 130px;
  padding: 6px;
  cursor: pointer;
  background-color: #6AAA64;
  display: flex;
  &:hover {
    background-color: #79B374;
  }
`

const ShareTextDiv = styled.div`
  padding: 4px;
  margin-left: 10px;
`

const NextGameTimerDiv = styled.div`
  font-weight: bold;
  font-size: 18px;
  padding: 5px;
`

const NextGameTimerTimeDiv = styled.div`
  font-size: 26px;
  font-weight: normal;
`