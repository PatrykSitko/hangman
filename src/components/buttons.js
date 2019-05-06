import React from 'react';
export function GameButtons({ guesses, wordToGuess, clickHandler }) {
    const letters = 'abcdefghijklmnopqrstuvwxyz'.split('');
    return <div className='buttons-container'>{letters.map(letter => {
        const disabled = guesses.includes(letter);
        const style = !disabled ? {} : { color: wordToGuess.includes(letter) ? 'green' : 'red' };
        return (
            <button
                key={letter}
                disabled={disabled}
                onClick={clickHandler.bind(this, letter)}
                style={style}>
                {letter}
            </button>)
    })}</div>;
}

export function NewGameButton({ resetGame }) {
    return <div key='new-game-button-container' className='new-game-button-container'><button key='new-game-button' onClick={resetGame}>New Game</button></div>;
}

export default { GameButtons, NewGameButton };