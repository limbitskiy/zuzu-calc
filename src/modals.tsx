// react
import { useState, useEffect } from "react";

// bootstrap components
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

// @ts-ignore
function Summary({ data, materialNames }) {
  return (
    <div className="zc-calc__summary">
      <ul>
        {data.length &&
          // @ts-ignore
          data.map((item) => (
            <li key={item.id}>
              {materialNames[item.partData.material]} / {item.partData.thickness}мм / {item.partData.length}мм /&nbsp;
              {item.partData.quantity}шт - <span style={{ fontWeight: "500" }}>{item.partData.price}₽</span>
            </li>
          ))}
      </ul>
      <p style={{ fontWeight: "600", marginTop: ".5rem" }}>
        Итого: {/* @ts-ignore */}
        {data.reduce((acc, row) => {
          acc += row.partData.price;
          return acc;
        }, 0)}
        ₽
      </p>
    </div>
  );
}

export function SendToManagerModal({
  // @ts-ignore
  show,
  // @ts-ignore
  data,
  // @ts-ignore
  onHide,
  // @ts-ignore
  setShowThankyouModal,
  // @ts-ignore
  setShowErrorModal,
  // @ts-ignore
  setErrorText,
  // @ts-ignore
  materialNames,
}) {
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [isNameInvalid, setIsNameInvalid] = useState(false);
  const [isContactInvalid, setIsContactInvalid] = useState(false);
  const [nameChanged, setNameChanged] = useState(false);
  const [contactChanged, setContactChanged] = useState(false);

  useEffect(() => {
    if (!name && nameChanged) {
      setIsNameInvalid(true);
    } else if (name) {
      setIsNameInvalid(false);
    }

    if (!contact && contactChanged) {
      setIsContactInvalid(true);
    } else if (contact) {
      setIsContactInvalid(false);
    }
  }, [name, contact]);

  const onSuccess = () => {
    if (name && contact) {
      onHide();
      setShowThankyouModal();
      resetValues();
    } else {
      if (!name && !contact) {
        setErrorText(`Введите, пожалуйста, контактную информацию`);
        setShowErrorModal(true);
        setIsNameInvalid(true);
        setIsContactInvalid(true);
      } else if (!name && contact) {
        setErrorText(`Введите, пожалуйста, имя`);
        setShowErrorModal(true);
        setIsNameInvalid(true);
      } else if (name && !contact) {
        setErrorText(`Введите, пожалуйста, телефон или почту`);
        setShowErrorModal(true);
        setIsContactInvalid(true);
      }
    }
  };

  const resetValues = () => {
    setName("");
    setContact("");
    setNameChanged(false);
    setContactChanged(false);
  };

  return (
    <Modal show={show} onHide={onHide} backdrop="static" size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Отправка заказа</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="zc-feedback-modal__order-details">
          <h5>Детали заказа:</h5>
          <Summary data={data} materialNames={materialNames} />
        </div>
        <div className="zc-feedback-modal__customer-details">
          <h5>Обратная связь:</h5>
          <p>Пожалуйста, оставьте свои данные для связи с вами.</p>
          <Form.Group className="mb-3">
            <Form.Label>Имя:</Form.Label>
            <Form.Control
              type="input"
              value={name}
              onChange={(e) => {
                setName(e.target.value), setNameChanged(true);
              }}
              isInvalid={isNameInvalid}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Телефон или почта:</Form.Label>
            <Form.Control
              type="input"
              value={contact}
              onChange={(e) => {
                setContact(e.target.value), setContactChanged(true);
              }}
              isInvalid={isContactInvalid}
            />
          </Form.Group>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={onHide}>
          Отмена
        </Button>
        <Button variant="success" onClick={onSuccess}>
          Отправить
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

// @ts-ignore
export function ThankYouModal(props) {
  return (
    <Modal {...props} onHide={props.onHide} backdrop="static" centered>
      <Modal.Header closeButton>
        <Modal.Title>Письмо отправлено</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Спасибо! Ваше письмо отправлено менеджеру. Мы свяжемся с вами в ближайшее время.</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="success" onClick={props.onHide}>
          ОК
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

// @ts-ignore
export function ErrorModal({ show, errorMessage, onHide }) {
  return (
    <Modal show={show} onHide={onHide} backdrop="static" centered>
      <Modal.Header closeButton>
        <Modal.Title>Ошибка</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{errorMessage}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="success" onClick={onHide}>
          ОК
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
