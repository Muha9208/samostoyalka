import React from 'react';
import { Button, Card, Typography } from "antd";
import styles from "./ServiceItem.module.css";

const ServiceItem = ({ name, content, price, img }) => {
  return (
    <Card
      hoverable
      className={styles.card}
      title={<h4>{name}</h4>}
      cover={<img src={img} alt={name} />}
    >
      <div className={styles.contentContainer}>
        <Typography.Text className={styles.content}>
          {content}
        </Typography.Text>
        <div className={styles.priceContainer}>
          <Typography.Text className={styles.price}>
            {price} руб.
          </Typography.Text>
          <Button className={styles.buyButton} type="primary">
            Купить
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default ServiceItem;
