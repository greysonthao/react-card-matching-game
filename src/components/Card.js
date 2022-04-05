import React from "react";
import lionGuardLogo from "../images/lion-guard.png";

export default function Card(props) {
  return (
    <div className="card-container">
      <img
        src={props.isFlipped ? `${props.imageUrl}` : lionGuardLogo}
        alt={props.name}
        className="card-img"
        onClick={props.handleClick}
      />
    </div>
  );
}
