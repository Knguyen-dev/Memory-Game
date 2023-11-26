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

import "../styles/GameCard.css"
import PropTypes from "prop-types"
export default function GameCard({ gameObj, handleCardClick }) {
    return (
        <div className="card" onClick={handleCardClick}>
            <div className="card-img-container">
                <img
                    src={gameObj.background_image}
                    alt={gameObj.name + " image"}
                    className="card-img"
                />
            </div>
            <section className="card-info">
                <span className="card-text">Title: {gameObj.name}</span>
                <span className="card-text">
                    Metacritic:{" "}
                    {gameObj.metacritic ? gameObj.metacritic : "N/A"}
                </span>
                <span className="card-text">Release: {gameObj.released}</span>
            </section>
        </div>
    )
}

GameCard.propTypes = {
    gameObj: PropTypes.shape({
        name: PropTypes.string,
        background_image: PropTypes.string,
        metacritic: PropTypes.number,
        released: PropTypes.string,
    }),
    handleCardClick: PropTypes.func,
}
