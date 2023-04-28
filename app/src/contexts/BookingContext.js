import { createContext, useState } from "react";

const BookingContext = createContext({});

const Provider = ({ children }) => {
  const [bookings, setBookings] = useState([]);
  const [booking, setBooking] = useState({});

  const getAllBookings = async () => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/bookings`);
    const data = await response.json();

    console.log(data);

    setBookings(data);
  };

  const getOneBooking = async (id) => {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/booking/${id}`
    );
    const data = await response.json();

    console.log(data);

    setBooking(data);
  };

  const createBooking = async (engineId, userId, startDate, endDate) => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/booking`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        engine_id: engineId,
        user_id: userId,
        start_date: startDate,
        end_date: endDate,
      }),
    });
    const data = await response.json();
    console.log(data);
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
