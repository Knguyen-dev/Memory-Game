import "../styles/App.css"
import NavList from "./NavList"
import GameCard from "./GameCard"

import PropTypes from "prop-types"
import { useState } from "react"
import { v4 as uuidv4 } from "uuid"

/*
- Header: Where user can select the difficulty, and when the 
    game starts, this header will show the scores instead.

*/
function Header({ isPlaying, score, highScore, maxRounds, handleStartGame }) {
    return (
        <header className="app-header">
            <h1>Memory Game</h1>
            <div className="score-container">
                {isPlaying ? (
                    <>
                        <span className="current-score">Score: {score}</span>
                        <span className="high-score">
                            High Score: {highScore}
                        </span>
                        <span className="round-count">
                            Round: {`${score} / ${maxRounds}`}
                        </span>
                    </>
                ) : (
                    <>
                        <button onClick={() => handleStartGame("easy")}>
                            Easy
                        </button>
                        <button onClick={() => handleStartGame("medium")}>
                            Medium
                        </button>
                        <button onClick={() => handleStartGame("hard")}>
                            Hard
                        </button>
                    </>
                )}
            </div>
        </header>
    )
}
Header.propTypes = {
    isPlaying: PropTypes.bool,
    score: PropTypes.number,
    highScore: PropTypes.number,
    maxRounds: PropTypes.number,
    handleStartGame: PropTypes.func,
}

function Footer() {
    const footerLinks = [
        {
            id: uuidv4(),
            text: "Github",
            url: "https://github.com/Knguyen-dev/Memory-Game",
        },
        {
            id: uuidv4(),
            text: "Giphy",
            url: "https://developers.giphy.com/",
        },
        {
            id: uuidv4(),
            text: "RAWG",
            url: "https://rawg.io/apidocs",
        },
    ]

    return (
        <footer className="app-footer">
            <div className="control-btns-container">
                <button>Sound</button>
                <button>Music</button>
                <button>Questions</button>
            </div>
            <nav className="footer-nav">
                <NavList linksArr={footerLinks} />
            </nav>
        </footer>
    )
}

function App() {
    const [isPlaying, setIsPlaying] = useState(false)
    const [mode, setMode] = useState("easy")
    const [gameList, setGameList] = useState([])
    const [score, setScore] = useState(0)
    const [highScore, setHighScore] = useState(0)

    const [showModal, setShowModal] = useState(false)

    // Maps the difficulty of the mode to the amount of cards that'll be shown
    const modeMap = {
        easy: 5,
        medium: 10,
        hard: 15,
    }

    const numRounds = modeMap[mode]
    const isWin = null

    function handleStartGame(difficulty) {
        setIsPlaying(true)
        setMode(difficulty)
        setScore(0)
    }

    /*
    - The ending of a game can happen passively with the player getting 
        all of the cards, or it could happen via a player clicking a visited card,
        or the player could just quite the game.

    1. Player wins: Here you'd likely have some conditional during 
        the rendering that calculates whether the score is equal to the 
        number of rounds. If it is, we may be able to call the end game 
        function and show a victory screen
    
    2. Player loses by clicking a visited card: In this case we're probably
        going to have some kind of event listener on a card that will
        trigger the end game function, indicating a loss instead.
        
    3. If the player prematurely quits, we can just call handleEndGame, 
        it make it so isQuit=true
    
    */
    function handleEndGame(isQuit, isWin) {
        setIsPlaying(false)

        // If isQuit, then don't show a results screen. We should just go
        // back to an empty screen

        // Else, we should actually show the modal and show the results of the game

        // Should also clear all of the cards as well, or at least make them
        // not clickable so it doesn't try to start another game
    }

    return (
        <div className="app-container">
            <div className="overlay hidden"></div>
            <div className="game-results-modal"></div>

            <Header
                isPlaying={isPlaying}
                score={score}
                highScore={highScore}
                maxRounds={numRounds}
                handleStartGame={handleStartGame}
            />

            <section className="main-content">
                <div className="cards-container"></div>
            </section>
            <Footer />
        </div>
    )
}

export default App
