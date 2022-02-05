import React from 'react'
import styled from 'styled-components'

export default class WordHistoryList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            wordHistory: props.wordHistory,
        }
    }

    render() {
        return (
            <ListWrapper>
                <ul>
                    {this.state.wordHistory.map((e,i) => {
                        if (e.data.length===0) {
                            return <h4>No attempts have been made</h4>
                        } else {
                            return <h4>{e.completed}</h4>
                        }
                    })}
                </ul>
            </ListWrapper>
        )
    }
}

const ListWrapper = styled.div`
    max-width:300px;
`