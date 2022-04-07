import React from "react";
import Select from "react-select";

export default function Start(props) {
  const [players, setPlayers] = React.useState({
    value: 1,
    label: "1 Player",
  });

  const options = [
    { value: 1, label: "1 Player" },
    { value: 2, label: "2 Players" },
  ];

  return (
    <div className="start-container">
      <h1>How many players?</h1>
      <Select options={options} className="select-menu" onChange={setPlayers} />
      <button
        className="start-game-btn"
        onClick={() => props.handlePlayers(players.value)}
      >
        Start Game
      </button>
    </div>
  );
}
