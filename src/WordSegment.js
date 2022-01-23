import React from 'react'
import LetterSegment from './LetterSegment'

export default class WordSegment extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            word: props.word,
            highlighted: false,
            answered: props.answered,
        }
    }

    render() {
        const wordAsLetters = this.state.word.split("").map(e => e.toUpperCase())
        return (
            <div>
                {wordAsLetters.map(e => <LetterSegment letterChar={e}></LetterSegment>)}
            </div>
        )
    }
}