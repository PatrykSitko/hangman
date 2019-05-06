import React from 'react';
import { done, removeDoppelgangers, getGoodGuesses, renderWord } from '../words';
import { GameButtons, NewGameButton } from './buttons';
export default function Game({ guesses, wordToGuess, clickHandler, resetGame }) {
    return (
        <div>
            {done(wordToGuess, guesses) ? "" : <Word guesses={guesses} wordToGuess={wordToGuess} />}
            {
                done(wordToGuess, guesses) ?
                    [
                        hasWon(wordToGuess, guesses) ? <Word key='Word' guesses={guesses} wordToGuess={wordToGuess} /> : <Answer key='Answer' wordToGuess={wordToGuess} />
                        ,
                        <NewGameButton key='NewGameButton' resetGame={resetGame} />
                    ]
                    :
                    <GameButtons guesses={guesses} wordToGuess={wordToGuess} clickHandler={clickHandler} />
            }
        </div>
    );
}

function Word({ guesses, wordToGuess }) {
    return (<div key="word-to-guess-container" className="word-to-guess-container">
        <span className="word-to-guess">{renderWord(wordToGuess, guesses)}</span>
    </div>);
}

function Answer({ wordToGuess }) {
    return (
        <div key='answer-container' className='answer-container'>
            <span
                key='answer-prefix'
                className='answer-prefix'>
                {'The word was: '}
            </span>
            <span
                key='answer'
                className='answer'>
                {wordToGuess}
            </span>
        </div>);
}

function hasWon(wordToGuess, guesses) {
    const word = removeDoppelgangers(wordToGuess);
    const goodGuesses = getGoodGuesses(word, guesses);
    return goodGuesses.length === word.length;
}