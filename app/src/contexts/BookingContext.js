import { createContext, useContext, useState } from "react";
import UserContext from "./UserContext";

const BookingContext = createContext({});

const Provider = ({ children }) => {
  const [bookings, setBookings] = useState([]);
  const [booking, setBooking] = useState({});
  const { userId } = useContext(UserContext);

  const getAllBookings = async () => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/bookings`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${userId}`,
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();

    setBookings(data);
  };

  const getOneBooking = async (id) => {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/booking/${id}`
    );
    const data = await response.json();

    setBooking(data);
  };

  const createBooking = async (engineId, user_id, startDate, endDate) => {
    console.log("createBooking called");
    await fetch(`${process.env.REACT_APP_API_URL}/booking`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${userId}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        engine_id: engineId,
        user_id: user_id,
        start_date: startDate,
        end_date: endDate,
      }),
    });
  };

  return (
    <BookingContext.Provider
      value={{
        getAllBookings,
        bookings,
        getOneBooking,
        booking,
        createBooking,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};

export { Provider };
export default BookingContext;
