import React from 'react'
import styled from 'styled-components'
import Accordion from '../Accordion/Accordion'
import WordHistoryRow from '../WordHistoryRow/WordHistoryRow'

export default class WordHistoryList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            wordHistory: props.wordHistory,
            selectedWordID: props.selectedWordID,
        }
    }

    render() {
        return (
            <ListWrapper>
                {this.props.selectedWordID!==undefined && <Accordion 
                    title={this.state.wordHistory[this.props.selectedWordID].title} 
                    subtitle={`[${6-this.state.wordHistory[this.props.selectedWordID].data.length} attempts left]`}
                    content={this.state.wordHistory[this.props.selectedWordID].data.length===0 ? <NoAttemptsDiv>No attempts have been made</NoAttemptsDiv> :
                        this.state.wordHistory[this.props.selectedWordID].data.map(e => <WordHistoryRow indvWordHistory={e}></WordHistoryRow>)} 
                    active={this.state.wordHistory[this.props.selectedWordID].active}
                    setAccordionActive={(wordID, activeState) => this.props.setAccordionActive(wordID, activeState)}
                    wordID={this.props.selectedWordID}
                />}
                {this.state.wordHistory.map((e, i) => {
                    if (i !== this.props.selectedWordID) {
                        return <Accordion 
                            title={e.title} 
                            subtitle={`[${6-e.data.length} attempts left]`}
                            content={e.data.length===0 ? <NoAttemptsDiv>No attempts have been made</NoAttemptsDiv> :
                                e.data.map(e2 => <WordHistoryRow indvWordHistory={e2}></WordHistoryRow>)}
                            active={e.active}
                            setAccordionActive={(wordID, activeState) => this.props.setAccordionActive(wordID, activeState)}
                            wordID={i}
                        />
                    }
                    return true;
                }
                )}
            </ListWrapper>
        )
    }
}

const ListWrapper = styled.div`
    display: inline-block;
    max-width: 280px;
`

const NoAttemptsDiv = styled.div`
    font-size: 16px;
`