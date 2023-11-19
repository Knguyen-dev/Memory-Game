/*
- Card: Component will just represent a card being rendered. 
    Card storage and keep track of which cards were picked won't be involved
    with this component


// What a game object may look like
const sampleGameList = [
    {
        imgSrc: "src/assets/no_mans_sky.jpg",
        title: "No Man's Sky",
        developer: "Hello Games",
        releaseDate: "August 2016",
        isVisited: true
    },
]

*/

import "../styles/GameCard.css"
import PropTypes from "prop-types"
export default function GameCard({ gameObj }) {
    return (
        <div className="card">
            <div className="card-img-container">
                <img
                    src={gameObj.imgSrc}
                    alt={gameObj.title + " image"}
                    className="card-img"
                />
            </div>
            <section className="card-info">
                <span className="card-text">Title: {gameObj.title}</span>
                <span className="card-text">
                    Metacritic: {gameObj.platforms}
                </span>
                <span className="card-text">
                    Release: {gameObj.releaseDate}
                </span>
            </section>
        </div>
    )
}

GameCard.propTypes = {
    gameObj: PropTypes.shape({
        title: PropTypes.string,
        imgSrc: PropTypes.string,
        platforms: PropTypes.string,
        releaseDate: PropTypes.string,
    }),
}
