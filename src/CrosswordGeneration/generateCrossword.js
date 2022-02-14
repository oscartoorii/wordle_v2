import { wordList } from "./wordList";

const MIN_WORDS = 5;
const MAX_WORDS = 7;

// Game must have:
// - 1x 6-letter word
// - 1x or 2x 5-letter word
// - 1x or 2x 4-letter word
// - 1x or 2x 3-letter word
// - 0x or 1x 2-letter word
// Two extremes:
// 7 words, 1x 6-letter word, 2x 5-letter word, 2x 4-letter word, 2x 3-letter word, 
// 5 words, 1x 6-letter word, 1x 5-letter word, 1x 4-letter word, 1x 3-letter word, 1x 2-letter word,
export const generateCrossword = () => {
    // Choose number of words (between min and max)

    // Add spot for 6-letter word,

    // If number of words has not been satisfied, choose either 1 or 2 5-letter word spots

    // If number of words has not been satisfied, choose either 1 or 2 4-letter word spots

    // If number of words has not been satisfied, choose either 1 or 2 3-letter word spots

    // If number of words has not been satisfied, choose either 0 or 1 2-letter word spots

    // Now we are aware of the number of words, and which word length each word will be.

    // Randomly find and randomly place the first word-spot (6-letters) on a board.

    // Randomly find a word in the second word-spot and check there is a common letter. If there is, attempt to place for each common letter on the board until successful.
    // If unsuccessful, randomly find a word again and check if there is a common letter and repeat process until successful.

    // Repeat process for the rest of the word-spots.

    // Output final crossword

}