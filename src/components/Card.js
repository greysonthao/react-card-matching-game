import React from "react";
import lionGuardLogo from "../images/lion-guard.png";
import { Animated } from "react-animated-css";

export default function Card(props) {
  function doNothing() {
    return;
  }

  return (
    <div className="card-container">
      {!props.matched && (
        <img
          src={props.isFlipped ? `${props.imageUrl}` : lionGuardLogo}
          alt={props.name}
          className="card-img"
          onClick={props.twoCardsFlipped ? doNothing : props.handleClick}
        />
      )}
      {props.matched && (
        <Animated animationOut="flipOutY" isVisible={!props.matched}>
          <img src={props.imageUrl} alt="empty" className="card-img-empty" />
        </Animated>
      )}
    </div>
  );
}
