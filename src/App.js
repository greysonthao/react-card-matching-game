import React from "react";
import Card from "./components/Card";
import lionGuardData from "../src/data";
import { nanoid } from "nanoid";

export default function App() {
  const [data, setData] = React.useState(lionGuardData.data.cards);

  const [cards, setCards] = React.useState([]);

  const [gameState, setGameState] = React.useState({
    moves: 0,
    users: 2,
  });

  //CREATE AN EFFECT THAT CHECKS IF 2 CARDS HAVE isFlipped = true
  //If yes, then check if they match
  //If they don't match, then auto flip those cards back to isFlipped = false

  React.useEffect(() => {
    setCards(shuffleCards(generateAllCards(data)));
  }, [data]);

  function generateCard(dataElement) {
    let card = {
      id: nanoid(),
      name: dataElement.name,
      url: dataElement.url,
      isFlipped: true,
      matched: false,
    };
    return card;
  }

  function generateAllCards(data) {
    let newCards = [];
    shuffleCards(data);
    for (let i = 0; i < data.length; i++) {
      newCards.push(generateCard(data[i]));
      newCards.push(generateCard(data[i]));
    }
    return newCards;
  }

  function swap(array, i, j) {
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }

  function shuffleCards(array) {
    const length = array.length;
    for (let i = length; i > 0; i--) {
      const randomIndex = Math.floor(Math.random() * i);
      const currIndex = i - 1;
      swap(array, currIndex, randomIndex);
    }

    return array;
  }

  function flipCard(id) {
    let newCardsArray = [...cards];

    for (let i = 0; i < newCardsArray.length; i++) {
      if (newCardsArray[i].id === id) {
        newCardsArray[i].isFlipped = !newCardsArray[i].isFlipped;
      }
    }

    setGameState((prevGameState) => {
      return {
        ...prevGameState,
        moves: prevGameState.moves + 1,
      };
    });

    setCards(newCardsArray);
  }

  function handleNewGame() {
    setGameState({
      moves: 0,
      users: 2,
    });

    setCards(shuffleCards(generateAllCards(data)));
  }

  let cardsElement = cards.map((card) => {
    return (
      <Card
        key={card.id}
        name={card.name}
        isFlipped={card.isFlipped}
        imageUrl={card.url}
        handleClick={() => flipCard(card.id)}
        matched={card.matched}
      />
    );
  });

  return (
    <div className="app-container">
      <div className="app-title-container">
        <h1 className="app-title">Memory Matching Game</h1>
        <h4 className="app-description">
          Find the matching images in the least number of moves.
        </h4>
      </div>
      <div className="board-container">{cardsElement}</div>
      <div className="points-and-btn-container">
        <div className="points-container">
          <h2 className="points-title">
            # of Moves: <span className="points-number">{gameState.moves}</span>
          </h2>
        </div>
        <button className="new-game-btn" onClick={handleNewGame}>
          New Game
        </button>
      </div>
    </div>
  );
}
