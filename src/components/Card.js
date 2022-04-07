import React from "react";
import lionGuardLogo from "../images/lion-guard.png";
import { Animated } from "react-animated-css";

export default function Card(props) {
  function doNothing() {
    //this function is here to ensures that if 2 cards are flipped open,
    //other cards can't be flipped
    return;
  }
  return (
    <div className="card-container">
      {!props.matched && (
        <Animated animationIn="jello">
          <img
            src={props.isFlipped ? `${props.imageUrl}` : lionGuardLogo}
            alt={props.name}
            className="card-img"
            onClick={
              props.twoCardsFlipped || props.isFlipped
                ? () => doNothing()
                : props.handleClick
            }
          />
        </Animated>
      )}
      {props.matched && (
        <Animated animationOut="hinge" isVisible={!props.matched}>
          <img src={props.imageUrl} alt="empty" className="card-img-empty" />
        </Animated>
      )}
    </div>
  );
}
