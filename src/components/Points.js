import React from "react";
import { Animated } from "react-animated-css";

export default function Points(props) {
  let stylesOne;
  let stylesTwo;

  if (props.gameState.playerOneTurn) {
    stylesOne = {
      fontWeight: "bold",
      fontSize: "27px",
    };
  } else {
    stylesTwo = {
      fontWeight: "bold",
      fontSize: "27px",
    };
  }
  return (
    <div className="two-player-points-container">
      <h3 className="user-1-points" style={stylesOne}>
        <span>Player One</span>:{" "}
        <Animated animationIn="bounceInDown">
          <span className="points-number">
            {props.gameState.playerOneScore}
          </span>
        </Animated>
      </h3>
      <h3 className="user-2-points" style={stylesTwo}>
        <span>Player Two</span>:{" "}
        <Animated animationIn="bounceInDown">
          <span className="points-number">
            {props.gameState.playerTwoScore}
          </span>
        </Animated>
      </h3>
    </div>
  );
}
