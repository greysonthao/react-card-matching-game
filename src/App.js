import React from "react";
import Card from "./components/Card";
import lionGuardData from "../src/data";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";

export default function App() {
  const [data, setData] = React.useState(lionGuardData.data.cards);

  const [cards, setCards] = React.useState([]);

  const [gameState, setGameState] = React.useState({
    moves: 0,
    active: true,
    users: 2,
  });

  const [twoCardsFlipped, setTwoCardsFlipped] = React.useState(false);

  React.useEffect(() => {
    let newCardsArray = [...cards];

    if (newCardsArray.length === 0) {
      return;
    }

    let chosenCards = [];

    for (let i = 0; i < newCardsArray.length; i++) {
      if (newCardsArray[i].matched === true) {
        chosenCards.push(newCardsArray[i]);
      }
    }

    if (newCardsArray.length === chosenCards.length) {
      setGameState((prevGameState) => {
        return {
          ...prevGameState,
          active: false,
        };
      });
    }
  }, [cards]);

  React.useEffect(() => {
    checkIfMatch();
  }, [twoCardsFlipped]);

  React.useEffect(() => {
    let newCardsArray = [...cards];

    let chosenCards = [];

    for (let i = 0; i < newCardsArray.length; i++) {
      if (newCardsArray[i].isFlipped === true) {
        chosenCards.push(newCardsArray[i]);
      }
    }

    if (chosenCards.length === 2) {
      setTwoCardsFlipped(true);
    } else {
      setTwoCardsFlipped(false);
    }
  }, [cards]);

  React.useEffect(() => {
    setCards(shuffleCards(generateAllCards(data)));
  }, [data]);

  function generateCard(dataElement) {
    let card = {
      id: nanoid(),
      name: dataElement.name,
      url: dataElement.url,
      isFlipped: false,
      matched: false,
    };
    return card;
  }

  function delay(n) {
    return new Promise(function (resolve) {
      setTimeout(resolve, n * 1000);
    });
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

  function handleNewGameClick() {
    setGameState({
      moves: 0,
      active: true,
      users: 2,
    });

    setCards(shuffleCards(generateAllCards(data)));
  }

  async function checkIfMatch() {
    let newCardsArray = [...cards];

    let chosenCards = [];

    for (let i = 0; i < newCardsArray.length; i++) {
      if (newCardsArray[i].isFlipped === true) {
        chosenCards.push(newCardsArray[i]);
      }
    }

    if (chosenCards.length === 0) {
      return;
    }

    //2 SECOND DELAY BEFORE FLIPPING THE CARDS BACK
    await delay(2);

    if (
      chosenCards[0].name === chosenCards[1].name &&
      chosenCards[0].id !== chosenCards[1].id
    ) {
      chosenCards[0].matched = true;
      chosenCards[1].matched = true;
      chosenCards[0].isFlipped = false;
      chosenCards[1].isFlipped = false;
    } else {
      chosenCards[0].isFlipped = false;
      chosenCards[1].isFlipped = false;
    }

    for (let k = 0; k < chosenCards.length; k++) {
      for (let i = 0; i < newCardsArray.length; i++) {
        if (newCardsArray[i].id === chosenCards[k].id) {
          newCardsArray[i] = chosenCards[k];
        }
      }
    }

    setCards(newCardsArray);
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
      {!gameState.active && <Confetti />}
      <div className="app-title-container">
        <div className="app-title-lion-guard">
          <h2>
            <span>The</span>
            <br />
            <span>
              L
              <span class="overline">
                ion&nbsp;G<span>u</span>ar
              </span>
              d
            </span>
          </h2>
          <h3 className="app-matching-game-title">MATCHING GAME</h3>
        </div>
      </div>
      <div className="board-container-container">
        <div className="board-container">{cardsElement}</div>
      </div>
      {!gameState.active && <Confetti />}
      <div className="points-and-btn-container">
        <div className="points-container">
          <h2 className="points-title">
            # of Moves: <span className="points-number">{gameState.moves}</span>
          </h2>
        </div>
        <button className="new-game-btn" onClick={handleNewGameClick}>
          New Game
        </button>
      </div>
    </div>
  );
}