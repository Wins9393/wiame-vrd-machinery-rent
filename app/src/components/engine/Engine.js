import { Card } from "antd";
import "./engine.css";

const Engine = ({ engine }) => {
  const { Meta } = Card;

  const formatLengthDescription = (desc) => {
    let formatDesc;
    if (desc.length > 140) {
      formatDesc = desc.slice(0, 140);
      console.log(formatDesc);
      return `${formatDesc}...`;
    }
    return desc;
  };

  return (
    <Card
      className="home__engine-item"
      hoverable
      cover={<img alt={engine.name} src={engine.imageUrl} />}
      actions={[
        engine.price + "€",
        engine.availability ? "In stock" : "Out of stock",
      ]}
      extra={engine.reference}
    >
      <Meta
        title={engine.name}
        description={formatLengthDescription(engine.description)}
      />
    </Card>
  );
};

export default Engine;
