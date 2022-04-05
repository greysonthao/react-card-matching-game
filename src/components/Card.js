import React from "react";

export default function Card(props) {
  return (
    <div className="card-container">
      <img src={props.imageUrl} alt="card" />
    </div>
  );
}
