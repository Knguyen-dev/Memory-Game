/*
- GameCard: Component will just represent a card that displays a game and 
	its information. It takes a gameObj and renders the information in that 
	object, and game objects are defined in 'requests.js' in processGames().

*/
import "../styles/GameCard.css";
import PropTypes from "prop-types";

export default function GameCard({ gameObj, handleCardClick }) {
	return (
		<div className="game-card-content" onClick={handleCardClick}>
			<div className="card-img-container">
				<img
					className="game-card-img"
					src={gameObj.background_image}
					alt={gameObj.name + " image"}
				/>
			</div>
			<section className="game-card-info">
				<span className="card-text">Title: {gameObj.name}</span>
				<span className="card-text">
					Metacritic:
					{gameObj.metacritic ? gameObj.metacritic : "N/A"}
				</span>
				<span className="card-text">Release: {gameObj.released}</span>
			</section>
		</div>
	);
}

GameCard.propTypes = {
	gameObj: PropTypes.shape({
		name: PropTypes.string,
		background_image: PropTypes.string,
		metacritic: PropTypes.number,
		released: PropTypes.string,
	}),
	handleCardClick: PropTypes.func,
	isFlipped: PropTypes.bool,
};
