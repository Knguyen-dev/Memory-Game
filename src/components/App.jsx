import "../styles/App.css"
import NavList from "./NavList"
import GameCard from "./GameCard"
import GameModal from "./GameModal"
import { getGames } from "./requests"

import PropTypes from "prop-types"
import { useEffect, useState } from "react"
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
    const [isWin, setIsWin] = useState(false)

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

    /*
    - Starts a new game
    1. Make sure modals aren't showing
    2. Set game to playing and set the mode.
    3. Then reset the score to 0
    */
    async function handleStartGame(mode) {
        setShowModal(false)
        setIsPlaying(true)
        setMode(mode)
        setScore(0)
        try {
            const gameList = await getGames(numRounds)
            setGameList(gameList)
        } catch (error) {
            console.error("Unable to load games during start phase: ", error)
        }
    }

    /*
    - Handles how we end a game 
    1. Set is playing to false as the game is over
    2. We set states to show the modal, and set state 
        to indicate the whether the user won or lost
    */
    function handleEndGame(isWin) {
        setIsPlaying(false)
        setShowModal(true)
        setIsWin(isWin)
    }

    /*
    - Handles how we just quit the game, which means 
        we aren't playing.
    1. Indicate user isn't playing
    2. Don't show game results modal
    3. Reset the score to 0
    */
    function handleQuitGame() {
        setIsPlaying(false)
        setShowModal(false)
        setScore(0)
    }

    /*
    - If the current score is greater than the user's high score, then we 
        update the value of high score.
    */
    if (score > highScore) {
        setHighScore(score)
    }

    /*
    - If score == number of rounds, then player picked all of the right cards
        so end the game and indicate that the user won.
     */
    if (score === numRounds) {
        handleEndGame(true)
    }

    return (
        <div className="app-container">
            {showModal && (
                <GameModal
                    isWin={isWin}
                    score={score}
                    highScore={highScore}
                    playAgain={() => handleStartGame(mode)}
                    quitGame={handleQuitGame}
                />
            )}

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
