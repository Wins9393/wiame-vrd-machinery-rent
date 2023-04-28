import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import EngineContext from "../../contexts/EngineContext";
import "dayjs/locale/fr";
import { Row, Col, Badge, DatePicker } from "antd";
import locale from "antd/es/date-picker/locale/fr_FR";
import "./engine-details.css";
import UserContext from "../../contexts/UserContext";
import { toast } from "react-hot-toast";
import BookingContext from "../../contexts/BookingContext";

const EngineDetails = () => {
  const [rentDate, setRentDate] = useState({});
  const [bookingInfos, setBookingInfos] = useState([]);
  const { getOneEngine, engine } = useContext(EngineContext);
  const { user } = useContext(UserContext);
  const { createBooking } = useContext(BookingContext);

  let { id } = useParams();
  const { RangePicker } = DatePicker;

  useEffect(() => {
    getOneEngine(id);
  }, [id]);

  useEffect(() => {
    setBookingInfos({
      engine_id: engine?.id,
      user_id: user?.id,
      start_date: rentDate?.startDate,
      end_date: rentDate?.endDate,
    });
  }, [user, rentDate, engine]);

  useEffect(() => {
    console.log(bookingInfos);
  }, [user, rentDate, engine, bookingInfos]);

  const onDateChange = (value) => {
    let startDate = new Date(value[0].$d);
    let endDate = new Date(value[1].$d);

    const isoDateStart = startDate.toISOString().split("T")[0];
    const isoDateEnd = endDate.toISOString().split("T")[0];

    const rentDate = {
      startDate: isoDateStart,
      endDate: isoDateEnd,
    };
    setRentDate(rentDate);
  };

  const onRentClick = async (booking) => {
    if (!engine.availability) {
      toast.error("This engine is not available !");
    } else {
      if (
        rentDate?.startDate === undefined ||
        rentDate?.endDate === undefined
      ) {
        toast.error("Please choose rent date !");
      }
      createBooking(
        booking.engine_id,
        booking.user_id,
        booking.start_date,
        booking.end_date
      );
    }
    console.log(booking);
  };

  return engine ? (
    <>
      <Row style={{ width: "100%" }}>
        <Col xs={24} sm={24} md={24} lg={12} xl={12}>
          <img src={engine.imageUrl} style={{ width: "100%" }} />
        </Col>
        <Col xs={24} sm={24} md={24} lg={12} xl={12}>
          <div className="engine-details__container">
            <div className="engine-details__titles-container">
              <div>
                <p style={{ color: "#666" }}>{engine.name}</p>
              </div>
              <div>
                <h2 style={{ fontSize: "4rem" }}>{engine.reference}</h2>
              </div>
            </div>
            <div className="engine-details__infos-container">
              <div>
                <p>{engine.description}</p>
              </div>
              <div className="engine-details__availability-price-container">
                <span className="engine-details__availability">
                  {engine.availability ? (
                    <Badge
                      key={"green"}
                      color={"green"}
                      text={
                        <span className="engine-details__availability--text">
                          Available
                        </span>
                      }
                    />
                  ) : (
                    <Badge
                      key={"red"}
                      color={"red"}
                      text={
                        <span className="engine-details__availability--text">
                          Not Available
                        </span>
                      }
                    />
                  )}
                </span>
                <span className="engine-details__price">{engine.price}€</span>
              </div>
            </div>
          </div>
        </Col>
        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
          <div className="engine-details__rent-action-container">
            <div className="engine-details__datepicker-container">
              Choose your rent date
              <RangePicker
                locale={locale}
                format="DD-MM-YYYY"
                onChange={onDateChange}
              />
            </div>
            {engine.availability ? (
              <button
                className="engine-details__rent-btn"
                onClick={() => onRentClick(bookingInfos)}
              >
                Louer
              </button>
            ) : (
              <button
                className="engine-details__rent-btn"
                onClick={() => onRentClick(bookingInfos)}
              >
                Louer
              </button>
            )}
          </div>
        </Col>
      </Row>
      <Row></Row>
    </>
  ) : (
    "Chargement..."
  );
};

export default EngineDetails;
