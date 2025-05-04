import React, { useState, useEffect } from "react";
import RoomList from "./RoomList";
import BookingForm from "../BookingForm";
import "./Component.css";

const LOCAL_STORAGE_KEY = "bookedRooms";

const initialRooms = [
  {
    name: "Room 101",
    features: ["WiFi", "TV", "Private Bathroom"],
    capacity: 2,
    prize: 200,
    imgSrc: "image/b.jpg",
    status: "Available",
  },
  {
    name: "Room 102",
    features: ["WiFi", "TV", "Private Bathroom"],
    capacity: 1,
    prize: 200,
    imgSrc: "image/b.jpg",
    status: "Available",
  },
  {
    name: "Room 105",
    features: ["WiFi", "AC", "Balcony"],
    capacity: 2,
    prize: 400,
    imgSrc: "image/d.jpg",
    status: "Available",
  },
];

const Room = () => {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (stored) {
      setRooms(JSON.parse(stored));
    } else {
      setRooms(initialRooms);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(rooms));
  }, [rooms]);

  const [selectedRoom, setSelectedRoom] = useState(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  const handleRoomSelect = (room) => {
    setSelectedRoom(room);
    setIsBookingModalOpen(true);
  };

  const handleBookingModalClose = () => {
    setIsBookingModalOpen(false);
  };

  const handleBook = (roomName, formData) => {
    const endDate = new Date(formData.endDate);
    const now = new Date();
    const msUntilAvailable = endDate.getTime() - now.getTime();

    if (msUntilAvailable <= 0) {
      alert("End date must be in the future.");
      return;
    }

    const updatedRooms = rooms.map((room) =>
      room.name === roomName
        ? { ...room, status: "Booked", endDate: formData.endDate }
        : room
    );
    setRooms(updatedRooms);

    // Save to localStorage immediately
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedRooms));

    // Reset room status after booking ends
    setTimeout(() => {
      setRooms((prevRooms) =>
        prevRooms.map((room) =>
          room.name === roomName
            ? { ...room, status: "Available", endDate: null }
            : room
        )
      );
    }, msUntilAvailable);
  };

  return (
    <div className="Room">
      <div className="container py-4">
        <h1>Available Rooms</h1>
        <div className="rooms container">
          {rooms.map((room, index) => (
            <RoomList
              key={index}
              imgSrc={room.imgSrc}
              roomName={room.name}
              features={room.features}
              capacity={room.capacity}
              prize={room.prize}
              onBook={() => handleRoomSelect(room)}
              status={room.status}
            />
          ))}
        </div>
      </div>
      {isBookingModalOpen && (
        <BookingForm
          isOpen={isBookingModalOpen}
          onClose={handleBookingModalClose}
          onBooked={handleBookingModalClose}
          handleBook={handleBook}
          selectedRoom={selectedRoom}
        />
      )}
    </div>
  );
};

export default Room;
