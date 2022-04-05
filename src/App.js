import React from "react";
import Card from "./components/Card";
import lionGuardData from "../src/data";
import { nanoid } from "nanoid";

export default function App() {
  const [data, setData] = React.useState(lionGuardData.data.cards);

  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    setCards(shuffleCards(generateAllCards(data)));
  }, [data]);

  function generateCard(dataElement) {
    let card = {
      id: nanoid(),
      name: dataElement.name,
      url: dataElement.url,
      isFlipped: false,
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

  let cardsElement = cards.map((card) => {
    return (
      <Card
        key={card.id}
        name={card.name}
        isFlipped={card.isFlipped}
        imageUrl={card.url}
      />
    );
  });

  return (
    <div className="app-container">
      <div className="app-title-container">
        <h1 className="app-title">Memory Matching Game</h1>
        <h4 className="app-description">
          Select two cards with the same image to earn a point. The user with
          the most points, wins!
        </h4>
      </div>
      <div className="board-container">{cardsElement}</div>
      <div className="points-and-btn-container">
        <div className="points-container">
          <h2 className="points-title">
            # of Moves: <span className="points-number">10</span>
          </h2>
        </div>
        <button className="new-game-btn">New Game</button>
      </div>
    </div>
  );
}
