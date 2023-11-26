# Memory Game

# Memory Game Rules:

1. To get points, players pick a card that they haven't picked before. If they pick a new card, they gain
   a point, else they lose.

# Requirements:

1. Difficulty selection: "Easy", "Medium", and "Hard" difficulties. Each would
   set up the memory game with a predefined amount of cards.

2. Cards are going to be about video games:
   API Documentation: https://api.rawg.io/docs/#operation/games_list

3. Show the player's current score and then 'High Score' which will be their best score. The 'high' or
   'best' score should only be recorded once it's confirmed a player has finished a game.
4. There should be a function that displays the cards in a random order anytime the user clicks one. This function
   should also be called when the component mounts, so that'll be in an effect as well.
5. When the player wins or loses, pop up a modal that shows a 'you win' or 'you lose' method. With options, such as
   "quit" which goes to the home screen, or "Play Again", which restarts the mode they were currently on. Also we should
   use Giphy API to show a related Gif on this modal.

# More difficult, but achievable.

6. There should be an endless option, where the user can keep going and going. One implementation of this
   could be a new set of cards for each round, however the rounds will increase the amount of cards on the screen.
   When we mean round, given like 5 cards, if they pick all 5 cards successfully that round is over, and we move onto the
   next round which has 10 cards. The hard part will be figuring out how to query an endless amount of cards.
7. There should be sound and music. For things such as clicking a card, reshuffling cards, losing the game, winning, clicking a button.
   We should also be able to toggle sound and music off regardless of where we are in the application

# Maybe possible:

9. Try to make it so cards flip over, during the re-shuffling process. Obviously for an incorrect pick they flip over, but don't flip back
10. Make it so the mouse cursor is interactive with the cards. So like the cards move if a mouse cursor is over it.

# Components of our app
