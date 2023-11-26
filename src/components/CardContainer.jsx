import GameCard from "./GameCard"
import PropTypes from "prop-types"
function CardContainer({ cardList, handleCardClick }) {
    return (
        <div className="cards-container">
            {cardList.map((cardObj, index) => {
                return (
                    <GameCard
                        key={cardObj.id}
                        gameObj={cardObj}
                        handleCardClick={() => handleCardClick(index)}
                    />
                )
            })}
        </div>
    )
}

export default CardContainer

CardContainer.propTypes = {
    cardList: PropTypes.array,
    handleCardClick: PropTypes.func,
}
