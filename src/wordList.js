import React from 'react'
import WordSelect from './WordSelect'
import styled from 'styled-components'

export default class WordList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            gameData: props.gameData,
        }
    }

    render() {
        return (
            <ListWrapper>
                <ul>
                    {this.state.gameData.map((e,i) => <WordSelect keyID={i} wordData={e} handleWordSelect={(i) => this.props.handleWordSelect(i)}></WordSelect>)}
                </ul>
            </ListWrapper>
        )
    }
}

const ListWrapper = styled.div`
    max-width:300px;
`