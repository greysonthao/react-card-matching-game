import React from "react";
import Card from "./components/Card";
import Start from "./components/Start";
import Header from "./components/Header";
import lionGuardData from "../src/data";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";
import Points from "./components/Points";

export default function App() {
  const [data, setData] = React.useState(lionGuardData.data.cards);

  const [cards, setCards] = React.useState([]);

  const [gameState, setGameState] = React.useState({
    startGame: false,
    moves: 0,
    activeGame: true,
    users: 0,
    numOfTurns: 0,
    playerOneTurn: true,
    playerOneScore: 0,
    playerTwoScore: 0,
  });

  const [twoCardsFlipped, setTwoCardsFlipped] = React.useState(false);

  const [screenSize, getDimension] = React.useState({
    dynamicWidth: window.innerWidth,
    dynamicHeight: window.innerHeight,
  });

  const setDimension = () => {
    getDimension({
      dynamicWidth: window.innerWidth,
      dynamicHeight: window.innerHeight,
    });
  };

  React.useEffect(() => {
    window.addEventListener("resize", setDimension);

    return () => {
      window.removeEventListener("resize", setDimension);
    };
  }, [screenSize]);

  React.useEffect(() => {
    if (gameState.moves !== 0 && gameState.moves % 2 === 0) {
      setGameState((prevGameState) => {
        return {
          ...prevGameState,
          numOfTurns: prevGameState.numOfTurns + 1,
        };
      });
    }
  }, [gameState.moves]);

  console.log("gameState");
  console.log(gameState);

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
          activeGame: false,
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
      activeGame: true,
      users: 0,
      numOfTurns: 0,
      startGame: false,
      playerOneTurn: true,
      playerOneScore: 0,
      playerTwoScore: 0,
    });

    setCards(shuffleCards(generateAllCards(data)));
  }

  function handlePlayers(numOfPlayers) {
    if (numOfPlayers === 1 || numOfPlayers === 2) {
      setGameState({
        startGame: true,
        moves: 0,
        activeGame: true,
        users: numOfPlayers,
        numOfTurns: 0,
        playerOneTurn: true,
        playerOneScore: 0,
        playerTwoScore: 0,
      });
    } else {
      return;
    }
  }

  async function checkIfMatch() {
    let newCardsArray = [...cards];

    let newGameState = { ...gameState };

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
    await delay(1.75);

    if (
      chosenCards[0].name === chosenCards[1].name &&
      chosenCards[0].id !== chosenCards[1].id
    ) {
      chosenCards[0].matched = true;
      chosenCards[1].matched = true;
      chosenCards[0].isFlipped = false;
      chosenCards[1].isFlipped = false;
      if (gameState.playerOneTurn) {
        newGameState.playerOneScore += 1;
      } else {
        newGameState.playerTwoScore += 1;
      }
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

    if (
      (newGameState.playerOneTurn &&
        newGameState.playerOneScore === gameState.playerOneScore) ||
      (!newGameState.playerOneTurn &&
        newGameState.playerTwoScore === gameState.playerTwoScore)
    ) {
      newGameState.playerOneTurn = !newGameState.playerOneTurn;
    }

    setGameState(newGameState);

    setCards(newCardsArray);
  }

  console.log("window");
  console.log(screenSize.dynamicHeight);
  console.log(screenSize.dynamicWidth);

  let cardsElement = cards.map((card) => {
    return (
      <Card
        key={card.id}
        name={card.name}
        isFlipped={card.isFlipped}
        imageUrl={card.url}
        handleClick={() => flipCard(card.id)}
        matched={card.matched}
        twoCardsFlipped={twoCardsFlipped}
      />
    );
  });

  if (!gameState.startGame) {
    return (
      <div className="app-container">
        <Header />
        <Start handlePlayers={handlePlayers} gameState={gameState} />
      </div>
    );
  }

  return (
    <div className="app-container">
      {!gameState.activeGame && (
        <Confetti
          width={screenSize.dynamicWidth}
          height={screenSize.dynamicHeighth}
        />
      )}
      <Header />
      <div className="board-container-container">
        <div className="board-container">{cardsElement}</div>
      </div>
      <div className="points-and-btn-container">
        <div className="points-container">
          {gameState.users === 1 && (
            <h2 className="points-title">
              # of Turns:{" "}
              <span className="points-number">{gameState.numOfTurns}</span>
            </h2>
          )}
          {gameState.users === 2 && <Points gameState={gameState} />}
        </div>
        <button className="new-game-btn" onClick={handleNewGameClick}>
          New Game
        </button>
      </div>
    </div>
  );
}
