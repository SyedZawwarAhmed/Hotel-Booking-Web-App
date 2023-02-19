import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../stylesheets/Booking.css";
import moment from "moment";
import Loading from "../components/Loading";
import Error from "../components/Error";
import { BASE_URL } from "../configs";

function Bookingscreen() {
  const { roomid, fromDate, toDate } = useParams();
  const [image, setImage] = useState("");
  const [images, setImages] = useState([]);
  const [activeImage, setActiveImage] = useState(0);
  const [room, setRoom] = useState([]);

  const fromdate = moment(fromDate, "DD-MM-YYYY");
  const todate = moment(toDate, "DD-MM-YYYY");
  const totalDays = todate.diff(fromdate, "days") + 1;
  const [totalAmount, setTotalAmount] = useState(0);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const changeImage = (index) => {
    setImage(images[index]);
    setActiveImage(index);
  };

  useEffect(() => {
    axios
      .get(`${BASE_URL}/api/rooms/getroom/${roomid}`)
      .then((res) => {
        console.log(res.data.room);
        setRoom(res.data.room);
        setImages(res.data.room.imageurls);
        setImage(res.data.room.imageurls[0]);
        setTotalAmount(room.rentperday * totalDays);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [room.rentperday]);

  async function bookRoom() {
    const bookingDetails = {
      room,
      userid: JSON.parse(localStorage.getItem("currentUser"))._id,
      fromdate,
      todate,
      totalAmount,
      totalDays,
      image,
    };

    try {
      const result = await axios.post(
        `${BASE_URL}/api/bookings/bookroom`,
        bookingDetails
      );
      window.location.href = "/user/profile";
      console.log(result);
    } catch (error) {}
  }

  if (loading) {
    return <Loading />;
  } else if (error !== "") {
    return <Error message={error} />;
  } else {
    return (
      <div className="container">
      <div className="booking-container">
        <div className="image-container">
          <img className="booking-image" src={image} alt="" />
          <div className="gallery">
            {images.map((image, i) => (
              <img
                src={image}
                className={activeImage === i && "active-image"}
                onClick={() => changeImage(i)}
                alt=""
              />
            ))}
          </div>
          <div className="description-container">
          <h2>Description</h2>
          <p>{room.description}</p>
        </div>
        </div>
        <div className="details">
          <h1> {room.name} </h1>
          <h2> Rent per day:- {room.rentperday} </h2>
          <h2> Max count:- {room.maxcount} </h2>
          <h2> Category:- {room.type} </h2>
          <span>
            <h2> From:- {fromDate} </h2>
            <h2> To:- {toDate} </h2>
          </span>
          <h2> Total days: {totalDays} </h2>
          <h2> Total Amount: {room.rentperday * totalDays} </h2>
          <button className="btn signup-btn booknow-btn" onClick={bookRoom}>
            Pay Now
          </button>
        </div>
      </div>
      </div>
    );
  }
}

export default Bookingscreen;
