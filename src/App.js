import './app.css';
import React from 'react';
import Hangman from './Hangman'
import * as wordTool from './words';
function generateAscii(start, stop) {
    const letters = [];
    for (let i = start; i <= stop; i++) {
        letters.push(String.fromCharCode(i));
    }
    return letters;
}

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            guesses: undefined,
            wordToGuess: '',
        }
    }

    render() {
        return (
            <div className="app">
                <Hangman progress={this.progress} done={this.done} />
                <div className='ui-container'>{this.state.guesses ? this.gameGUI : this.newGameButton}</div>
            </div>
        );
    }

    get gameGUI() {
        return (
            <div>
                {this.done ? "" : this.wordJSX}
                {
                    this.done ?
                        [
                            this.hasWon ? this.wordJSX : this.answerJSX
                            ,
                            this.newGameButton
                        ]
                        :
                        this.buttons
                }
            </div>
        );
    }

    get wordJSX() {
        const { guesses, wordToGuess } = this.state;
        return (<div className="word-to-guess-container">
            <span className="word-to-guess">{wordTool.renderWord(wordToGuess, guesses)}</span>
        </div>);
    }

    get answerJSX() {
        return (
            <div className='answer-container'>
                <span
                    key='answer-prefix'
                    className='answer-prefix'>
                    {'The word was: '}
                </span>
                <span
                    key='answer'
                    className='answer'>
                    {this.state.wordToGuess}
                </span>
            </div>);
    }

    get done() {
        const { guesses, wordToGuess } = this.state;
        return guesses ? wordTool.done(wordToGuess, guesses) : false;
    }

    get hasWon() {
        const { guesses, wordToGuess } = this.state;
        const word = wordTool.removeDoppelgangers(wordToGuess);
        const goodGuesses = wordTool.getGoodGuesses(word, guesses);
        return goodGuesses.length === word.length;
    }

    get progress() {
        const { guesses, wordToGuess } = this.state;
        return guesses ? wordTool.getWrongGuesses(wordToGuess, guesses).length : 0;
    }

    get newGameButton() {
        return <div className='new-game-button-container'><button key='new-game-button' onClick={this.resetGame.bind(this)}>New Game</button></div>;
    }
    get buttons() {
        const { guesses, wordToGuess } = this.state;
        const letters = generateAscii(97, 122);
        return <div className='buttons-container'>{letters.map(letter => {
            const disabled = guesses.includes(letter);
            const style = !disabled ? {} : { color: wordToGuess.includes(letter) ? 'green' : 'red' };
            return (
                <button
                    key={letter}
                    disabled={disabled}
                    onClick={this.clickHandler.bind(this, letter)}
                    style={style}>
                    {letter}
                </button>)
        })}</div>;
    }

    clickHandler(letter) {
        const guesses = [...this.state.guesses];
        if (!guesses.includes(letter)) {
            guesses.push(letter);
            this.setState({ guesses });
        }
    }

    resetGame() {
        const wordToGuess = wordTool.randomWord();
        console.log(wordToGuess);
        this.setState({ guesses: [], wordToGuess });
    }
}

export default App;
