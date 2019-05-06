import './app.css';
import React from 'react';
import Hangman from './Hangman'
import Game from './components/game';
import { NewGameButton } from './components/buttons';
import * as wordTool from './words';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            guesses: undefined,
            wordToGuess: '',
        }
    }

    render() {
        const { guesses, wordToGuess } = this.state;
        return (
            <div className="app">
                <Hangman progress={this.progress()} done={this.done()} />
                <div className='ui-container'>{
                    this.state.guesses ? (
                        <Game guesses={guesses} wordToGuess={wordToGuess} clickHandler={this.clickHandler} resetGame={this.resetGame} />
                    ) : (
                            <NewGameButton resetGame={this.resetGame} />
                        )
                }</div>
            </div>
        );
    }

    done = () => {
        const { guesses, wordToGuess } = this.state;
        return guesses ? wordTool.done(wordToGuess, guesses) : false;
    }

    progress = () => {
        const { guesses, wordToGuess } = this.state;
        return guesses ? wordTool.getWrongGuesses(wordToGuess, guesses).length : 0;
    }

    clickHandler = (letter) => {
        const guesses = [...this.state.guesses];
        if (!guesses.includes(letter)) {
            guesses.push(letter);
            this.setState({ guesses });
        }
    }

    resetGame = () => {
        const wordToGuess = wordTool.randomWord();
        console.log(wordToGuess);
        this.setState({ guesses: [], wordToGuess });
    }
}

export default App;
