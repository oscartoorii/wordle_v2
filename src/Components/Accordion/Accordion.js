import React from 'react';
import styled from 'styled-components';

export default class Accordion extends React.Component {
    // Props:
    //  wordID
    //  active
    //  title
    //  subtitle
    //  content

    render() {
        return (
            <AccordionDiv>
                <AccordionTitleDiv onClick={() => this.props.setAccordionActive(this.props.wordID, !this.props.active)}>
                    <div>{this.props.title}<SubtitleDiv>{this.props.subtitle}</SubtitleDiv></div>
                    <div>{this.props.active ? '-' : '+'}</div>
                </AccordionTitleDiv>
                {this.props.active && <AccordionContentDiv>{this.props.content}</AccordionContentDiv>}
            </AccordionDiv>
        )
    }
}

const AccordionDiv = styled.div`
    min-width: 280px;
    max-width: 280px;
    user-select: none;
    margin-bottom: 5px;
`
const AccordionTitleDiv = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    cursor: pointer;
    background: #FFFFFF;
    padding: 8px;
    padding-left: 15px;
    border-radius: 10px 10px 0px 0px;
    border: solid 1px #B2B2B2;
    border-bottom: solid 2px #B2B2B2;
    font-weight: bold;
    font-size: 16px;
    color: #333333;
    &:hover {
        background-color: #F5F5F5;
    }
`

const SubtitleDiv = styled.div`
    font-size: 11px;
    margin: -4px;
    padding-bottom: 1px;
`

const AccordionContentDiv = styled.div`
    padding: 10px;
    border-radius: 0px 0px 10px 10px;
    border: solid 1px #B2B2B2;
    border-top: 0px;
    border-bottom: solid 3px #999999;
    background-color: #FFFFFF;
`
