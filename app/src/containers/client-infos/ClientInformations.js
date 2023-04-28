import { useContext, useEffect, useState } from "react";
import BookingContext from "../../contexts/BookingContext";
import UserContext from "../../contexts/UserContext";
import { Table } from "antd";
import dayjs from "dayjs";
import "./client-infos.css";

const ClientInformations = () => {
  const [bookingsByUser, setBookingsByUser] = useState([]);
  const { getAllBookings, bookings } = useContext(BookingContext);
  const { user } = useContext(UserContext);

  useEffect(() => {
    getAllBookings();
  }, []);

  useEffect(() => {
    getBookingsByUser();
  }, [bookings]);

  const getBookingsByUser = () => {
    const bookByUser = bookings.filter(
      (booking) => booking.user.id === user?.id
    );
    setBookingsByUser(bookByUser);
  };

  const getTotalPrice = (start, end, price) => {
    const startDate = dayjs(start);
    const endDate = dayjs(end);

    const daysDiff = endDate.diff(startDate, "day");
    const totalPrice = daysDiff * price;
    return `${totalPrice.toFixed(2)}€`;
  };

  const columns = [
    {
      title: "Picture",
      dataIndex: "engine",
      key: "engine",
      render: (engine) => (
        <img src={`${engine?.imageUrl}`} style={{ height: "96px" }} />
      ),
    },
    {
      title: "Name",
      dataIndex: "engine",
      key: "engine",
      render: (engine) => engine.name,
      responsive: ["md"],
    },
    {
      title: "Reference",
      dataIndex: "engine",
      key: "engine",
      render: (engine) => engine.reference,
      responsive: ["md"],
    },
    {
      title: "Start",
      dataIndex: "startDate",
      key: "startDate",
    },
    {
      title: "End",
      dataIndex: "endDate",
      key: "endDate",
    },
    {
      title: "Price",
      dataIndex: "engine",
      key: "engine",
      render: (engine) => `${engine.price}€`,
      responsive: ["md"],
    },
    {
      title: "Total",
      dataIndex: "",
      key: "",
      render: (record) =>
        getTotalPrice(record.startDate, record.endDate, record.engine.price),
    },
  ];

  return (
    <div className="client-infos__container">
      <div className="client-infos__title-container">
        <h2>Hello {user?.firstName}</h2>
      </div>
      <div>
        <p style={{ textAlign: "center", marginBottom: "16px" }}>
          Your bookings:
        </p>
        <Table
          columns={columns}
          dataSource={bookingsByUser}
          rowKey={(booking) => booking.id}
          pagination={false}
        />
      </div>
    </div>
  );
};

export default ClientInformations;
