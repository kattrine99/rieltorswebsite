import { Header, Heading } from "../../components";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Property } from "../MainPage/Interfaces";
import axios from "axios";
import { BASE_URL, RAPIDAPI_HOST, RAPIDAPI_KEY } from "../../utils/cardsBaseUrl";
import "./CardPage.scss"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

export const CardPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const [property, setProperty] = useState<Property | null>(
    location.state?.property || null
  );
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!property) {
      const fetchPropertyDetails = async () => {
        try {
          const response = await axios.get(`${BASE_URL}/${id}`, {
            headers: {
              "x-rapidapi-key": RAPIDAPI_KEY,
              "x-rapidapi-host": RAPIDAPI_HOST,
            },
          });

          if (!response.data) {
            throw new Error("Данные не найдены.");
          }

          setProperty(response.data);
        } catch (error) {
          console.error("Ошибка загрузки:", error);
          setError("Не удалось загрузить данные карточки.");
        }
      };

      fetchPropertyDetails();
    }
  }, [id, property]);

  if (error) return <p>{error}</p>;
  if (!property) return <p>Загрузка...</p>;

  return (
    <>
      <Header />
      <div className="CardDetails">
        <img
          src={property.coverPhoto?.url || "https://via.placeholder.com/300"}
          alt={property.title}
        />
        <Heading text={property.title} level={1} className={""}/>
        <p>Цена: {property.price} AED</p>
        <p>Комнаты: {property.rooms}</p>
        <p>Площадь: {property.area} м²</p>
        <p>Адрес: {property.location?.name || "Не указано"}</p>
        <p className="contacts"><span>Мобильный: {property.phoneNumber.mobile}</span> <span>Whatsapp: {property.phoneNumber.whatsapp}</span></p>
        <button className="back-button" onClick={() => navigate("/main")}>
            <FontAwesomeIcon icon={faArrowLeft} />
            Назад
          </button>
      </div>
    </>
  );
};
