// RoomList.js

import React from "react";
import "./RoomList.css";

const RoomList = ({
  roomName,
  features,
  prize,
  onBook,
  capacity,
  imgSrc,
  status,
}) => {
  return (
    <div className="room container">
      <div className="row room-box my-3 py-3">
        <h2>{roomName}</h2>
        <div className="col ">
          <div className="img-div">
            <img src={imgSrc} alt={`Image of ${roomName}`} />
          </div>
          <p>
            Status: <strong>{status}</strong>
          </p>
        </div>
        <div className="col">
          <p>Features: {features.join(", ")}</p>
          <p>Capacity:{capacity}</p>
          {prize && <p>Prize: ${prize}</p>}
          <button
            onClick={onBook}
            disabled={status !== "Available"}
            style={{
              backgroundColor: status === "Booked" ? "#aaa" : "#007bff",
              color: "#fff",
            }}>
            {status === "Booked" ? "Booked" : "Book Now"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RoomList;
