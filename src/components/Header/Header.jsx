import React, {useState} from 'react';
import styles from "./Header.module.css";
import {Button, Input, Modal, Typography} from "antd";
import {Link} from "react-router-dom";
import axios from "axios";

export default function Header() {
    const [modalVisible, setModalVisible] = useState(false)
    const [formData, setFormData] = useState({ name: "", email: "", message: "" })

    const handleOpenModal = () => {
        setModalVisible(true);
    };

    const handleCloseModal = () => setModalVisible(false);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData((data) => ({ ...data, [name]: value }));
    };

    const handleSendClick = async () => {
      try {
        const response = await axios.post("https://exam.avavion.ru/api/requests/create", {
            full_name: formData.name,
            email: formData.email,
            message: formData.message,
          service_id: 1
        });
        handleCloseModal();
      } catch(error) {
        console.error(error);
      }
    };

    return (
        <>
            <header className={styles.header}>
                <Link to={"/"} className={styles.logoWrapper}>
                    <Typography.Title level={2}>SIO</Typography.Title>
                </Link>
                <nav className={styles.menu}>
                    <Button type="primary" onClick={handleOpenModal}>Оставить заявку</Button>
                </nav>
            </header>
            <Modal title={"Оставить заявку"} visible={modalVisible} onCancel={handleCloseModal}>
                <div className={styles.form}>
                    <Input value={formData.email} onChange={handleInputChange} name="email" placeholder={"Введите email"} type={"email"}/>
                    <Input value={formData.name} onChange={handleInputChange} name="name" placeholder={"Введите имя"} type={"text"}/>
                    <Input value={formData.message} onChange={handleInputChange} name="message" placeholder={"Введите сообщение"} type={"text"}/>
                    <Button type={"primary"} onClick={handleSendClick}>Отправить</Button>
                </div>
            </Modal>
        </>
    );
};
