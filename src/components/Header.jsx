import PropTypes from "prop-types"

/*- Header: Where user can select the difficulty, and when the 
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

export default Header
