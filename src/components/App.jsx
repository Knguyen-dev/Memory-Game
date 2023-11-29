import "../styles/App.css";
import Header from "./Header";
import Footer from "./Footer";
import CardContainer from "./CardContainer";
import { deepCopyArr, shuffleArr } from "./utilities";
import GameModal from "./GameModal";
import { getGames } from "./requests";
import { useEffect, useState, useRef } from "react";
import ReactHowler from "react-howler";
import music from "../assets/Memories-Of-Spring.mp3";
import success_sound from "../assets/Success-Sound.mp3";

function App() {
	/*
	+ App's states and variables:
	1. isFetchError (bool): State for tracking whether fetching with the video game api failed or not
	2. isPlaying (bool): State for tracking whether the user is currently playing a round or not
	3. mode (str): State that tracks what difficulty or mode the user is playing
	4. cardList (array): List of cards or 'video game' objects that the user is playing with
	5. score (integer): current score of the user
	6. highScore (integer): highest score achieved by the user
	7. showModal (bool): Boolean that tracks whether the GameModal or the game results modal is being shown
	8. playSound (bool): Tracks whether the application will play sound. 
	9. playMusic (bool): Tracks whether music is being played on the application
	10. pointSoundRef (ref): Ref that points to audio element for playing the 'success-sound'
	11. modeMap (map): Map that controls how many rounds or cards that a mode/difficulty will
		make the player play with.
	12. numRounds (integer): Number of rounds that are being played for the current session. This is 
		also the number of cards the user has to play with.
	*/
	const [isFetchError, setFetchError] = useState(false);
	const [isPlaying, setIsPlaying] = useState(false);
	const [mode, setMode] = useState("easy");
	const [cardList, setCardList] = useState([]);
	const [score, setScore] = useState(0);
	const [highScore, setHighScore] = useState(0);
	const [showModal, setShowModal] = useState(false);
	const [playSound, setPlaySound] = useState(false);
	const [playMusic, setPlayMusic] = useState(false);
	const pointSoundRef = useRef(null);
	const modeMap = {
		easy: 5,
		medium: 10,
		hard: 15,
	};
	const numRounds = modeMap[mode];

	useEffect(() => {
		/*
        + Effect that loads games. Will load in appropriate 
            amount of games, when isPlaying changes to true.
        - if failed fetch: If the fetching fails, then we set the state value 
            of isFetchError to true, so that we re-render the page with 
            an error message. Then we set isPlaying to false, as the player 
            isn't currently playing since we couldn't start the game properly.

		NOTE: Starting the game is the event, but we let fetching the data be a side-effect
			since it's not a pure calculation. Also fetching data wtihin an effect is the common approach.
        */
		async function loadGames() {
			try {
				const gameList = await getGames(numRounds);
				setCardList(gameList);
			} catch (error) {
				setFetchError(true);
				setIsPlaying(false);
				console.error(
					"Unable to load games during start phase: ",
					error
				);
			}
		}
		if (isPlaying) {
			loadGames();
		}
	}, [isPlaying, numRounds]);

	/*
	+ Functions for toggling msuic and sound in the application
	*/
	function toggleMusic() {
		setPlayMusic((playMusic) => !playMusic);
	}
	function toggleSound() {
		setPlaySound((playSound) => !playSound);
	}

	function playPointSound() {
		/*
		+ Function that plays the "success" sound when the user gets a point.
		- NOTE: We pause the audio and reset it's time back to 0, which allows us to 
			quickly play the audio in succession. This is necessary in the case the user
			gets points very quickly, which allows the sound to be played very quickly.
		*/
		const audioEl = pointSoundRef.current;
		audioEl.pause();
		audioEl.currentTime = 0;
		audioEl.play();
	}

	function shuffleCards(cardsArr) {
		/*
        + Returns a shuffled array game objects
        1. Create shallow copy, we're assuming cardsArr is a deepcopy of the state array.
        2. For each card object, assign a new uuid for rendering purposes
        3. Update the state array of cards
        */
		let newCards = [...cardsArr];
		newCards = shuffleArr(newCards);
		setCardList(newCards);
	}

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
		setShowModal(false);
		setIsPlaying(true);
		setMode(mode);
		setScore(0);
		setFetchError(false);
	}

	function handleIncrementScore() {
		/*
		+ Function that handles logic involved with incrementing the score.
			This will be tracking the high score, and tracking whether the 
			winner won the game by selecting all cards.
		*/
		const updatedScore = score + 1;
		setScore(updatedScore);
		if (updatedScore > highScore) {
			setHighScore(updatedScore);
		}
		if (updatedScore === numRounds) {
			handleEndGame();
		}
	}

	function handleEndGame() {
		/*
        - Handles how we end a game 
        1. Set is playing to false as the game is over, so the user isn't playing
        2. We set states to show the modal, and set state 
            to indicate the whether the user won or lost
        */
		setIsPlaying(false);
		setShowModal(true);
	}

	function handleQuitGame() {
		/*
        - Handles how we just quit the game, which means 
            we aren't playing.
        1. Don't show game results modal
        2. Reset the score to 0
        3. Clear the list of games to prevent any games from rendering
        */
		setShowModal(false);
		setScore(0);
		setCardList([]);
	}

	function handleCardClick(cardIndex) {
		/*
        + Handles what happens when a card is clicked. There
            are two cases.
        - Clicking a card that's already been visited:
            1. The player loses the memory game in this case, so
                we should end the game, and logic in GameModal will show result of the game.        
        - Clicking on a new card:
            1. Increment player's score. Now check if their updated score gave
                them a new high score or let me win the game
			2. If they choose sound to be on, play the sound for getting a point.
            3. Create new list of cards, and the selected card the user picked should be as visited
            4. Then set and shuffle the cards.
        */
		if (cardList[cardIndex].isVisited) {
			handleEndGame();
		} else {
			handleIncrementScore();
			if (playSound) {
				playPointSound();
			}
			let newCards = deepCopyArr(cardList);
			newCards[cardIndex].isVisited = true;
			shuffleCards(newCards);
		}
	}

	return (
		<div className="app-container">
			{/* A modal that will show the result of the game, and allow the user to continue or quit */}
			{showModal && (
				<GameModal
					score={score}
					numRounds={numRounds}
					highScore={highScore}
					playAgain={() => handleStartGame(mode)}
					quitGame={handleQuitGame}
				/>
			)}

			{/* Header that will show score, high score, etc., but also shows buttons for difficulty */}
			<Header
				isPlaying={isPlaying}
				score={score}
				highScore={highScore}
				maxRounds={numRounds}
				handleStartGame={handleStartGame}
			/>

			{/* Main content section that will show the cards when we successfully got games, but if 
				we failed, it'll show an error message */}
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

			{/* Footer that contains buttons for toggling music sound, but also links */}
			<Footer
				playMusic={playMusic}
				playSound={playSound}
				toggleMusic={toggleMusic}
				toggleSound={toggleSound}
			/>

			{/* Audio related elements */}
			<ReactHowler src={music} volume={0.2} loop playing={playMusic} />
			<audio
				ref={pointSoundRef}
				src={success_sound}
				preload="auto"
				style={{ display: "none" }}
			/>
		</div>
	);
}

export default App;
