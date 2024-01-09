// react
import { useState, useEffect, useRef, Fragment } from "react";

// assets
import "./App.scss";
import Logo from "./Logo";
import Bg from "./assets/bg-minified.jpg";

// icons
import { FaTelegramPlane, FaYoutube } from "react-icons/fa";
import { IoLogoWhatsapp } from "react-icons/io";
import { IoCloseOutline } from "react-icons/io5";
import { AiOutlineMenu } from "react-icons/ai";
import { FaPlus } from "react-icons/fa6";

// bootstrap components
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Accordion from "react-bootstrap/Accordion";
import Spinner from "react-bootstrap/Spinner";
import Overlay from "react-bootstrap/Overlay";
import Tooltip from "react-bootstrap/Tooltip";

// modals
import { SendToManagerModal, ThankYouModal, ErrorModal } from "./modals";

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <div className="zc-header" style={{ background: `url(${Bg})` }}>
        <div className="zc-header__container">
          <div className="zc-header__logo-and-desc">
            <a href="https://zuzumaster.ru/">
              <Logo width="50" height="100" />
            </a>
            Фрезерная резка на ЧПУ в Москве
            <br /> Проектирование и изготовление
            <br /> 3D фрезеровка
          </div>
          <div className="zc-header__adress-and-contacts">
            <div className="zc-header__adress">
              г. Москва, ул. Плеханова, д. 10Ас2
              <br /> 1.5 км от м. “Шоссе Энтузиастов” <br />
              Ежедневно с 9:00 до 21:00
            </div>
            <ul className="zc-header__contacts">
              <li style={{ fontWeight: "500" }}>
                <a href="tel:+74951083820">+7 (495) 108-38-20</a>
              </li>
              <li style={{ fontWeight: "500" }}>
                <a href="tel:+79851648300">+7 (985) 164-83-00</a>
              </li>
              <li style={{ fontWeight: "500" }}>
                <a href="mailto:zakaz@zuzumaster.ru">zakaz@zuzumaster.ru</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="zc-header-mobile">
        <a href="https://zuzumaster.ru/">
          <Logo width="25" height="30" fill="white" />
        </a>
        <AiOutlineMenu color="white" size="25" onClick={() => setMobileMenuOpen(true)} />
      </div>
      <div className="zc-content">
        <Calc />
        <div className="feedback-text">
          <span>Столкнулись с проблеммой или нашли ошибку? Свяжитесь с нами - и мы обязательно поможем!</span>
        </div>
      </div>
      <div className="zc-footer">
        <div className="zc-footer__container">
          <div className="zc-footer__empty-container"></div>
          <ul className="zc-footer__contacts">
            <li>
              <a>
                <FaTelegramPlane size="26" color="#555" className="contact-telegram" />
              </a>
            </li>
            <li>
              <a>
                <IoLogoWhatsapp size="26" color="#555" className="contact-whatsapp" />
              </a>
            </li>
            <li>
              <a>
                <FaYoutube size="26" color="#555" className="contact-youtube" />
              </a>
            </li>
          </ul>
          <div className="zc-footer__date">
            <span style={{ fontSize: "13px", fontWeight: "500" }}>zuzumaster {new Date().getFullYear()}</span>
          </div>
        </div>
      </div>
      {mobileMenuOpen && (
        <div className="mobile-menu">
          <IoCloseOutline size="35" className="close-menu" onClick={() => setMobileMenuOpen(false)} />
          <div className="mobile-menu__grid-container">
            <div className="mobile-menu__content">
              <a href="https://zuzumaster.ru/" style={{ textAlign: "center" }}>
                <Logo width="70" height="120" fill="white" />
              </a>
              <span>
                Фрезерная резка на ЧПУ в Москве
                <br /> Проектирование и изготовление
                <br /> 3D фрезеровка
              </span>
              <ul>
                <span style={{ fontWeight: "500" }}>Контакты:</span>
                <li style={{ fontWeight: "500" }}>
                  <a href="tel:+74951083820" style={{ color: "white" }}>
                    +7 (495) 108-38-20
                  </a>
                </li>
                <li style={{ fontWeight: "500" }}>
                  <a href="tel:+79851648300" style={{ color: "white" }}>
                    +7 (985) 164-83-00
                  </a>
                </li>
                <li style={{ fontWeight: "500" }}>
                  <a href="mailto:zakaz@zuzumaster.ru" style={{ color: "white" }}>
                    zakaz@zuzumaster.ru
                  </a>
                </li>
              </ul>
              <span>
                <a
                  target="_blank"
                  href="https://yandex.ru/maps/-/CDuqNJZQ"
                  style={{ color: "white", fontWeight: "500", textDecoration: "underline" }}
                >
                  г. Москва, ул. Плеханова, д. 10Ас2
                </a>
                <br /> 1.5 км от м. “Шоссе Энтузиастов” <br />
                Ежедневно с 9:00 до 21:00
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default App;

function Calc() {
  const [data, setData] = useState();
  const [total, setTotal] = useState(0);
  const [rows, setRows] = useState([{ id: 1, partData: {} }]);

  const [openAccordionTabs, setOpenAccordionTabs] = useState(["1"]);
  const [partCounter, setPartCounter] = useState(1);

  const [showManagerModal, setShowManagerModal] = useState(false);
  const [showThankyouModal, setShowThankyouModal] = useState(false);
  const [errorText, setErrorText] = useState("Error");
  const [showErrorModal, setShowErrorModal] = useState(false);

  useEffect(() => {
    fetch("./data.json")
      .then((res) => res.json())
      .then((json) => {
        setData(json);
      });
  }, []);

  useEffect(() => {
    const _total = rows.reduce((acc, item) => {
      // @ts-ignore
      acc += item.partData.price || 0;
      return acc;
    }, 0);

    setTotal(_total);
  }, [rows]);

  const removeRow = (id: number) => {
    setRows((rows) => {
      const filtered = rows.filter((row) => row.id !== id);
      if (!filtered.length) {
        setPartCounter(0);
      }
      return filtered;
    });
  };

  const addRow = () => {
    const id = partCounter + 1;
    setPartCounter(id);
    setRows((rows) => [...rows, { id, partData: {} }]);
    setOpenAccordionTabs((prev) => [...prev, id + ""]);
  };

  const resetCalc = () => {
    setRows([]);
    setOpenAccordionTabs([]);
    setPartCounter(0);
  };

  // @ts-ignore
  const setPartData = (id, data) => {
    const clone = [...rows];
    const idx = clone.findIndex((item) => item.id === id);
    clone[idx].partData = data;

    setRows(clone);
  };

  if (!data) {
    return (
      <div className="loader-container">
        <Spinner animation="border" variant="danger">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  const onAccordionTabSelect = (eventKeys: []) => {
    setOpenAccordionTabs(eventKeys);
  };

  const onSendToMangerBtnClick = () => {
    // if some rows have invalid data
    // @ts-ignore
    if (rows.some((row) => !row.partData.valid)) {
      console.error(rows);
      setErrorText(
        "Некоторые поля введены с ошибками, или поля не заполнены. Проверьте, пожалуйста, данные перед отправкой."
      );
      setShowErrorModal(true);
    } else {
      setShowManagerModal(true);
    }
  };

  return (
    <div className="zc-form">
      <SendToManagerModal
        show={showManagerModal}
        // @ts-ignore
        materialNames={data.materialNames}
        data={rows}
        setShowThankyouModal={() => setShowThankyouModal(true)}
        setShowErrorModal={() => setShowErrorModal(true)}
        // @ts-ignore
        setErrorText={(text) => setErrorText(text)}
        onHide={() => setShowManagerModal(false)}
      />
      <ThankYouModal
        show={showThankyouModal}
        onHide={() => {
          setShowThankyouModal(false), resetCalc();
        }}
      />
      <ErrorModal
        show={showErrorModal}
        errorMessage={errorText}
        onHide={() => {
          setShowErrorModal(false), setErrorText("Error");
        }}
      />
      <div className="zc-form__header" style={{ fontSize: "18px" }}>
        Калькулятор
      </div>
      <div className="zc-form__rows">
        {rows.length ? (
          // @ts-ignore
          <Accordion activeKey={openAccordionTabs} onSelect={onAccordionTabSelect} alwaysOpen>
            {rows.map((row) => (
              <Accordion.Item eventKey={row.id + ""} key={row.id}>
                <Accordion.Header>
                  <span>Деталь #{row.id}</span>
                  <span className="deleteRow-btn" onClick={() => removeRow(row.id)}>
                    Удалить
                  </span>
                </Accordion.Header>
                <Accordion.Body>
                  {/* @ts-ignore */}
                  <CalcRow data={data} setPartData={(price) => setPartData(row.id, price)} />
                </Accordion.Body>
              </Accordion.Item>
            ))}
          </Accordion>
        ) : (
          "Нету деталей"
        )}
      </div>
      <div className="zc-form__footer">
        <div className="zc-form__footer-left">
          <Button variant="outline-success" onClick={addRow} className="me-3">
            <FaPlus size="18" style={{ marginBottom: "1px" }} />
          </Button>{" "}
          <span style={{ fontWeight: "600", fontSize: "18px" }}>Общая стоимость: {total}₽</span>
        </div>
        <Button variant="success" className="send-to-manager-btn" onClick={onSendToMangerBtnClick}>
          Отправить менеджеру
        </Button>{" "}
      </div>
    </div>
  );
}

// @ts-ignore
function CalcRow({ data, setPartData }: { data: { materialGroups: {}; materialLengthMap: [] } }) {
  const [material, setMaterial] = useState("placeholder");
  const [thickness, setThickness] = useState("0");
  const [isThicknessInvalid, setIsThicknessInvalid] = useState(false);
  const [length, setLength] = useState(0);

  const [meterPrice, setMeterPrice] = useState(0);
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const [materialGroup, setMaterialGroup] = useState();
  const [materialOptions, setMaterialOptions] = useState([]);

  const [passes, setPasses] = useState();
  const [serialityPercent, setSerialityPercent] = useState(null);
  const [singleMeterPassValue, setSingleMeterPassValue] = useState();

  const thicknessInput = useRef(null);

  useEffect(() => {
    generateMaterialOptions();
  }, []);

  useEffect(() => {
    const percent =
      // @ts-ignore
      Object.values(data.materialLengthMap).find((key) => length <= key.maxLength)?.serialityPercent || 0;
    setSerialityPercent(percent);
  }, [length]);

  useEffect(() => {
    if (material !== "placeholder") {
      // set basic constants
      let group: string | null;

      Object.entries(data.materialGroups).forEach(([key, value]) => {
        // @ts-ignore
        if (value.materials.includes(material)) {
          group = key;
          // @ts-ignore
          setMaterialGroup(key);
        }
      });

      // single pass time
      // @ts-ignore
      const passTime = 60 / (data.materialGroups[group].cutSpeed / 1000);

      // singleMeterPassValue
      // @ts-ignore
      const workPrice = data.prices.recommended;
      // @ts-ignore
      setSingleMeterPassValue((workPrice / 60 / 60) * passTime);
    }
  }, [material]);

  useEffect(() => {
    if (materialGroup && thickness) {
      // set passes
      // @ts-ignore
      const thicknessMap = data.materialGroups[materialGroup].thicknessToPasses;

      // if too thick
      if (thickness > thicknessMap[thicknessMap.length - 1].startThickness) {
        setIsThicknessInvalid(true);
      } else {
        setIsThicknessInvalid(false);
      }

      for (let i = 0; i < thicknessMap.length; i++) {
        const current = thicknessMap[i];
        const next = thicknessMap[i + 1];

        if (
          (!next && thickness >= current.startThickness) ||
          (thickness >= current.startThickness && thickness < next?.startThickness)
        ) {
          setPasses(current.passes);
          break;
        }
      }
    }
  }, [materialGroup, thickness]);

  useEffect(() => {
    if (passes && singleMeterPassValue && serialityPercent !== null) {
      const minMeterPrice = singleMeterPassValue * passes;
      const percent = (minMeterPrice * serialityPercent) / 100;
      setMeterPrice(minMeterPrice + percent);
    }
  }, [passes, singleMeterPassValue, serialityPercent]);

  useEffect(() => {
    if (meterPrice && length && quantity) {
      const _price = Math.round(meterPrice * length * quantity);
      setPrice(_price);
      setPartData({
        material,
        thickness,
        length,
        quantity,
        price: _price,
        valid: !isThicknessInvalid,
      });
    }
  }, [material, length, thickness, quantity, meterPrice, isThicknessInvalid]);

  function generateMaterialOptions() {
    const materials = {};

    Object.entries(data.materialGroups).forEach(([key, value]) => {
      // @ts-ignore
      materials[key] = [];
      // @ts-ignore
      value.materials.forEach((material) => {
        // @ts-ignore
        const materialName = data.materialNames[material];
        if (materialName) {
          // @ts-ignore
          materials[key].push({
            label: materialName,
            value: material,
          });
        }
      });
    });

    // @ts-ignore
    setMaterialOptions(materials);
  }

  function handleZeroFirst(value: string) {
    let formatted = "0";
    if (+value !== 0) {
      formatted = value.replace(/^0/, "");
    }
    return formatted;
  }

  // @ts-ignore
  function onThicknessChange(e) {
    setThickness(handleZeroFirst(e.target.value));
  }

  // @ts-ignore
  function onLengthChange(e) {
    // @ts-ignore
    setLength(handleZeroFirst(e.target.value));
  }

  // @ts-ignore
  function onQuantityChange(e) {
    // @ts-ignore
    setQuantity(handleZeroFirst(e.target.value));
  }

  return (
    <div className="zc-form__row">
      <Overlay target={thicknessInput.current} show={isThicknessInvalid} placement="top">
        {(props) => (
          <Tooltip id="thickness-tooltip" {...props}>
            Не подходящая толщина
          </Tooltip>
        )}
      </Overlay>
      <Row className="align-items-center">
        <Form.Group as={Col} lg="4" className="mb-2 mb-md-3 material-input-group">
          <Form.Label className="mb-0">Материал:</Form.Label>
          <Form.Select
            value={material}
            style={{ cursor: "pointer" }}
            onChange={(e) => setMaterial(e.target.value)}
            className="material-select"
          >
            <option disabled value="placeholder">
              Выберите
            </option>
            {Object.entries(materialOptions).map(([key, value]) => (
              <Fragment key={key}>
                {/* @ts-ignore */}
                <optgroup label={data.materialNames[key]} />
                {/* @ts-ignore */}
                {value.map((item) => {
                  return (
                    <option value={item.value} key={item.value}>
                      {item.label}
                    </option>
                  );
                })}
              </Fragment>
            ))}
          </Form.Select>
        </Form.Group>
        <Form.Group as={Col} lg="3" className="mb-2 mb-md-3 thickness-input-group">
          <Form.Label className="mb-0">Толщина, мм:</Form.Label>
          <Form.Control
            type="number"
            value={thickness}
            min="0"
            ref={thicknessInput}
            isInvalid={isThicknessInvalid}
            onChange={onThicknessChange}
          />
        </Form.Group>
        <Form.Group as={Col} lg="3" className="mb-2 mb-md-3 length-input-group">
          <Form.Label className="mb-0">Длина, мм:</Form.Label>
          <Form.Control type="number" value={length} min="0" onChange={onLengthChange} />
        </Form.Group>
        <Form.Group as={Col} lg="2" className="mb-2 mb-md-3 quantity-input-group">
          <Form.Label className="mb-0">Кол-во заготовок:</Form.Label>
          <Form.Control type="number" value={quantity} min="0" onChange={onQuantityChange} />
        </Form.Group>
      </Row>
      <Form.Check type="checkbox" label="Наш материал" className="mb-3" />
      <div className="zc-form-row__totals">
        <span>
          Цена за метр:
          <span style={{ fontWeight: "600" }}>&nbsp;{Math.round(meterPrice)}₽</span>
        </span>
        <span>
          Цена за деталь:
          <span style={{ fontWeight: "600" }}>&nbsp;{price}₽ </span>
        </span>
      </div>
    </div>
  );
}
