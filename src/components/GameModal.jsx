import PropTypes from "prop-types";
import "../styles/GameModal.css";
import { useState, useRef, useEffect } from "react";
import { fetchGifURL } from "./requests";
/*
- GameModal: Component that shows the game results.
    - Show whether win or loss (game over or victory).
    - Show a gif related to the result.
    - Show the score they got, and the best score throughout.
    - Show two buttons with options:
        1. Play Again: Would restart game with the same mode 
        2. Quit: Would return the user to the home screen or state, where
            they can still pick difficulty and whatnot.

- Game modal variables:
1. imgRef (ref): Ref that points to img node that will be used to show a gif of the game result.
2. gifError (bool): Boolean that tracks whether we fetched the gif successfully or not
3. isWin (bool): Boolean that tracks whether the user won or lost the game.

*/
export default function GameModal({
	score,
	numRounds,
	highScore,
	playAgain,
	quitGame,
}) {
	const imgRef = useRef(null);
	const [gifError, setGifError] = useState(false);

	const isWin = score === numRounds ? true : false;

	useEffect(() => {
		/*
		+ Main effect for loading the gif onto the screen
		1. Attempt to get gif URL, if unsucessful it'll throw an error 
			and set 'gifError' to true, which will re-render component 
			with paragraph tag instead of img element
		2. Get image node, which should always be defined as 
			the cleanup function ensures that the component 
			always has an image element before effect is run.
		3. Assign image node the gif url

		- Cleanup function:
        1. Set gifError to false so that component will re-render with image element.
            This makes sense because we are doing a new fetch, so we don't know 
            if gifError is going to be true yet.
		*/
		async function loadGif() {
			const searchTerm = isWin ? "Victory!" : "Game Over!";
			try {
				const gifURL = await fetchGifURL(searchTerm);
				const imgNode = imgRef.current;
				imgNode.src = gifURL;
			} catch (error) {
				console.error("Unable to load in Gif");
				setGifError(true);
			}
		}
		loadGif();
		return () => {
			setGifError(false);
		};
	}, [isWin]);

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
	);
}
GameModal.propTypes = {
	score: PropTypes.number,
	numRounds: PropTypes.number,
	highScore: PropTypes.number,
	playAgain: PropTypes.func,
	quitGame: PropTypes.func,
};
