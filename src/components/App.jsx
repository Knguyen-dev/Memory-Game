import "../styles/App.css"
import Header from "./Header"
import Footer from "./Footer"
import CardContainer from "./CardContainer"
import { shuffleArr, deepCopyArr } from "./utilities"
import GameModal from "./GameModal"
import { getGames } from "./requests"
import { useEffect, useState } from "react"

function App() {
    const [isFetchError, setFetchError] = useState(false)
    const [isPlaying, setIsPlaying] = useState(false)
    const [isWin, setIsWin] = useState(false)
    const [mode, setMode] = useState("easy")
    const [cardList, setCardList] = useState([])
    const [score, setScore] = useState(0)
    const [highScore, setHighScore] = useState(0)
    const [showModal, setShowModal] = useState(false)

    const modeMap = {
        // Maps the difficulty of the mode to the amount of cards that'll be shown
        easy: 5,
        medium: 10,
        hard: 15,
    }

    // Calculate the number of rounds based on the mode that was set for the game
    const numRounds = modeMap[mode]

    useEffect(() => {
        /*
        + Effect that tracks high scores and tracks whether user
            won or not.
        1. Check if the player exceeded their high score, then record new high score
        2. Check if player won the game passively, when their score is equal to the number of rounds 
            possible.
        */
        // If the player isn't playing, then stop the effect early
        if (!isPlaying) {
            return
        }

        if (score > highScore) {
            setHighScore(score)
        }

        if (score === numRounds) {
            handleEndGame(true)
        }
    }, [isPlaying, score, highScore, numRounds])

    useEffect(() => {
        /*
        + Effect that loads games. Will load in appropriate 
            amount of games, when isPlaying changes to true.
        - if failed fetch: If the fetching fails, then we set the state value 
            of isFetchError to true, so that we re-render the page with 
            an error message. Then we set isPlaying to false, as the player 
            isn't currently playing either, which prevents the difficulty selector from
            being hidden.
        */
        async function loadGames() {
            try {
                const gameList = await getGames(numRounds)
                setCardList(gameList)
            } catch (error) {
                setFetchError(true)
                setIsPlaying(false)
                console.error(
                    "Unable to load games during start phase: ",
                    error
                )
            }
        }
        if (isPlaying) {
            loadGames()
        }
    }, [isPlaying, numRounds])

    function handleStartGame(mode) {
        /*
        + Starts a new game and schedules the loading of games
        1. Make sure modals aren't showing
        2. Set game to playing and set the mode.
        3. Then reset the score to 0
        4. Set the fetch error to false to reset the boolean for tracking fetch 
            errors.
        5. Effect will now run to load in the appropriate amount of games for the 
            corresponding mode.
        NOTE: Typically, I'd make the cleanup function handle setting isFetchError
            to false, but since the catch also sets isPlaying to false, that
            will trigger the cleanup function to set isFetchError to false again.
            So I put it here, since this is the only point in the application
            where isPlaying is set to true, and so games are going to be loaded. 
        */
        setShowModal(false)
        setIsPlaying(true)
        setMode(mode)
        setScore(0)
        setFetchError(false)
    }

    function handleEndGame(isWin) {
        /*
        - Handles how we end a game 
        1. Set is playing to false as the game is over
        2. We set states to show the modal, and set state 
            to indicate the whether the user won or lost
        */
        setIsPlaying(false)
        setShowModal(true)
        setIsWin(isWin)
    }

    function handleQuitGame() {
        /*
        - Handles how we just quit the game, which means 
            we aren't playing.
        1. Indicate user isn't playing
        2. Don't show game results modal
        3. Reset the score to 0
        4. Clear the list of games to prevent any games from rendering
        */
        setIsPlaying(false)
        setShowModal(false)
        setScore(0)
        setCardList([])
    }

    function handleCardClick(cardIndex) {
        /*
        + Handles what happens when a card is clicked. There
            are two cases.
        - Clicking a card that's already been visited:
            1. The player loses the memory game in this case, so
                we should end the game on a loss
        - Clicking on a new card:
            1. Increment player's score
            2. Create new list of cards, and the selected card the user picked should be as visited
            3. Then set and shuffle the cards.
        */
        if (cardList[cardIndex].isVisited) {
            handleEndGame(false)
        } else {
            let newCards = deepCopyArr(cardList)
            newCards[cardIndex].isVisited = true
            newCards = shuffleArr(newCards)
            setScore(score + 1)
            setCardList(newCards)
        }
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
                {isFetchError ? (
                    <p id="game-fetch-error-el">
                        Failed in loading games. Please try again later.
                    </p>
                ) : (
                    <CardContainer
                        cardList={cardList}
                        handleCardClick={handleCardClick}
                    />
                )}
            </section>
            <Footer />
        </div>
    )
}

export default App
