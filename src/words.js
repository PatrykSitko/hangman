import words from './longwords.json';

export const randomWord = () => {
    return words[Math.floor(Math.random() * words.length)].toLowerCase();
}

export const renderWord = (word, guesses) => {
    return check(word).map(letter => guesses.includes(letter) ? letter : '_ ').join('');
}

export const done = (wordToGuess, guesses) => {
    const word = removeDoppelgangers(wordToGuess);
    const wrongGuesses = getWrongGuesses(wordToGuess, guesses);
    const goodGuesses = getGoodGuesses(wordToGuess, guesses);
    return goodGuesses.length === word.length || wrongGuesses.length >= 6;
}
export const getWrongGuesses = (wordToGuess, guesses) => {
    const word = check(wordToGuess);
    return guesses ? guesses.filter(guess => !word.includes(guess)) : [];
}

export const getGoodGuesses = (wordToGuess, guesses) => {
    const word = check(wordToGuess);
    return guesses ? guesses.filter(guess => word.includes(guess)) : [];
}

export const removeDoppelgangers = (wordToGuess) => {
    const word = check(wordToGuess);
    return word.filter((letter, index) => word.indexOf(letter) === index);
}

function check(wordToGuess) {
    switch (typeof wordToGuess) {
        case 'string':
            return wordToGuess.split('');
        case 'object':
            return isArray(wordToGuess) ? wordToGuess : Object.keys(wordToGuess);
        default:
            throw new Error(`Error: word to guess if of type:${typeof wordToGuess}, allowed: string | object`);
    }
}

function isArray(subject) {
    return typeof subject.filter === 'function';
}