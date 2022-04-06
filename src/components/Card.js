import React from "react";
import lionGuardLogo from "../images/lion-guard.png";
import emptyImage from "../images/empty.png";
import { Animated } from "react-animated-css";

export default function Card(props) {
  return (
    <div className="card-container">
      <Animated
        animationIn="fadeIn"
        animationOut="rollOut"
        isVisible={!props.matched}
      >
        <img
          src={props.isFlipped ? `${props.imageUrl}` : lionGuardLogo}
          alt={props.name}
          className="card-img"
          onClick={props.handleClick}
        />

        {/*  {!props.matched && (
          <img
            src={props.isFlipped ? `${props.imageUrl}` : lionGuardLogo}
            alt={props.name}
            className="card-img"
            onClick={props.handleClick}
          />
        )}
        {props.matched && (
          <img src={emptyImage} alt="empty" className="card-img-empty" />
        )} */}
      </Animated>
    </div>
  );
}
