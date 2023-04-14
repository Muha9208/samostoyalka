import React, { useState, useEffect } from 'react';
import { Button, Input } from "antd";
import axios from "axios";
import Header from "../../components/Header/Header.jsx";
import ServicesList from "../../components/ServicesList/ServicesList.jsx";
import styles from "./HomePage.module.css";
import { discount } from "../../utils/discount.js";

function HomePage() {
  const [services, setServices] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("https://exam.avavion.ru/api/services");
      setServices(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearch = () => {
    const matchingServices = services.filter((service) =>
      service.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setServices(matchingServices);
  };

  return (
    <div className={styles.wrapper}>
      <Header />
      <div className={styles.filters}>
        <Input
          value={searchQuery}
          onChange={handleInputChange}
          placeholder="Введите название"
        />
        <Button type="primary" onClick={handleSearch}>Найти</Button>
      </div>
      <ServicesList services={services} />
    </div>
  );
}

export default HomePage;

