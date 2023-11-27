/*
- Card: Component will just represent a card being rendered. 
    Card storage and keep track of which cards were picked won't be involved
    with this component


// What a game object may look like
const sampleGameList = [
    {
        imgSrc: "src/assets/no_mans_sky.jpg",
        title: "No Man's Sky",
        releaseDate: "August 2016",
        isVisited: true
    },
]

*/
import "../styles/GameCard.css";
import PropTypes from "prop-types";

function Card({ children, isFlipped }) {
	return (
		<div className={`card ${isFlipped ? "flipped" : ""}`}>
			<div className="card-inner">
				<div className="card-front">Card Front</div>
				<div className="card-back">{children}</div>
			</div>
		</div>
	);
}
Card.propTypes = {
	children: PropTypes.element,
	isFlipped: PropTypes.bool,
};

export default function GameCard({ gameObj, handleCardClick, isFlipped }) {
	return (
		<Card isFlipped={isFlipped}>
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
						Metacritic:{" "}
						{gameObj.metacritic ? gameObj.metacritic : "N/A"}
					</span>
					<span className="card-text">
						Release: {gameObj.released}
					</span>
				</section>
			</div>
		</Card>
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
