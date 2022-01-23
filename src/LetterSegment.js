import React from 'react'

export default class LetterSegment extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            letterChar: props.letterChar,
            hidden: true,
        }
    }

    render() {
        return (
        <button className="square">
            {this.state.letterChar}
        </button>
        )
    }
}