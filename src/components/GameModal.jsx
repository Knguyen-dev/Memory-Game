import PropTypes from "prop-types"

import "../styles/GameModal.css"
import { useState, useRef, useEffect } from "react"
import { fetchGifURL } from "./requests"

/*
- GameModal: Component that shows the game results.
    - Show whether win or loss (game over or victory).
    - Show a gif related to the result.
    - Show the score they got, and the best score throughout.
    - Show two buttons with options:
        1. Play Again: Would restart game with the same mode 
        2. Quit: Would return the user to the home screen or state, where
            they can still pick difficulty and whatnot.



*/

export default function GameModal({
    isWin,
    score,
    highScore,
    playAgain,
    quitGame,
}) {
    const imgRef = useRef(null)
    const [gifError, setGifError] = useState(false)

    useEffect(() => {
        async function loadGif() {
            const searchTerm = isWin ? "Victory!" : "Game Over!"
            try {
                /*
                1. Attempt to get gif URL, if unsucessful it'll throw an error 
                    and set 'gifError' to true, which will re-render component 
                    with paragraph tag instead of img element
                2. Get image node, which should always be defined as 
                    the cleanup function ensures that the component 
                    always has an image element before effect is run.
                3. Assign image node the gif url
                */
                const gifURL = await fetchGifURL(searchTerm)
                const imgNode = imgRef.current
                imgNode.src = gifURL
            } catch (error) {
                console.error("Unable to load in Gif")
                setGifError(true)
            }
        }
        loadGif()
        /*
        - Cleanup function:
        1. Set gifError to false so that component will re-render with image element.
            This makes sense because we are doing a new fetch, so we don't know 
            if gifError is going to be true yet.
        */
        return () => {
            setGifError(false)
        }
    }, [isWin])

    return (
        <>
            <div className="overlay"></div>
            <div className="game-results-modal">
                <h2 id="game-result-message">
                    {isWin ? "Victory!" : "Game Over!"}
                </h2>
                <div className="score-container">
                    <p>Score: {score}</p>
                    <p>High Score: {highScore}</p>
                </div>

                <div className="gif-container">
                    {gifError ? (
                        <p>Error loading Gif</p>
                    ) : (
                        <img
                            ref={imgRef}
                            alt="Game Gif"
                            className="gif-container"
                        />
                    )}
                </div>

                <div className="modal-btns-container">
                    <button onClick={playAgain}>Play Again?</button>
                    <button onClick={quitGame}>Quit</button>
                </div>
            </div>
        </>
    )
}
GameModal.propTypes = {
    isWin: PropTypes.bool,
    score: PropTypes.number,
    highScore: PropTypes.number,
    playAgain: PropTypes.func,
    quitGame: PropTypes.func,
}
