/*
+ Component that handles the rendering of the cards.


React Rendering with Keys:

1. React uses keys to efficiently manage and update elements in lists.
When rendering a list, React identifies elements based on their keys to determine changes and optimize rendering.
Initial Render:

2. During the first render, React may not recognize keys immediately, triggering animations for new elements as they're rendered.
Reshuffling and Key Recognition:

3. When a list is reshuffled, React optimizes by recognizing elements with the same keys as unchanged, avoiding re-rendering and thus preventing animations.
Composite Keys for Animation:

4. To ensure animations trigger during reshuffling, a composite key (transitionKey) is introduced.
Combining this transitionKey with unique identifiers (cardObj.id) creates distinct keys for elements, prompting React to consider them as new, even if the underlying data hasn't changed.
This forces React to re-render elements and reapply animations, achieving the desired visual effect during reshuffling.
*/

import GameCard from "./GameCard";
import PropTypes from "prop-types";
function CardContainer({ cardList, handleCardClick }) {
	return (
		<div className="cards-container">
			{cardList.map((cardObj, index) => {
				return (
					<GameCard
						key={`${cardObj.id}`}
						gameObj={cardObj}
						handleCardClick={() => handleCardClick(index)}
					/>
				);
			})}
		</div>
	);
}
CardContainer.propTypes = {
	cardList: PropTypes.array,
	handleCardClick: PropTypes.func,
	isFlipped: PropTypes.bool,
	handleAnimateCards: PropTypes.func,
	transitionKey: PropTypes.string,
};

export default CardContainer;
