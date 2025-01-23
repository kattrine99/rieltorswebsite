import React, { useEffect, useState } from "react";
import axios from "axios";
import { Header } from "../../components/";
import { Button } from "../../components/";
import { Heading } from "../../components/";
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { BASE_URL, RAPIDAPI_KEY, RAPIDAPI_HOST } from '../../utils/cardsBaseUrl';
import {Property , ApiResponse} from "./Interfaces"
import "./MainPage.scss";
import { useNavigate } from "react-router";



export const MainPage: React.FC = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [error] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<Property[]>(
    JSON.parse(localStorage.getItem("favoriteProperties") || "[]")
  );

  useEffect(() => {
    const fetchProperties = async () => {
        const response = await axios.get<ApiResponse>(
          BASE_URL,
          {
            headers: {
              "x-rapidapi-key": RAPIDAPI_KEY,
              "x-rapidapi-host": RAPIDAPI_HOST,
            },
            params: {
              locationExternalIDs: "5002,6020",
              purpose: "for-rent",
              hitsPerPage: 24,
              page: 0,
              lang: "en",
            },
          }
        );

        const extractedProperties = response.data.hits.map((hit, index) => ({
          ...hit,
          hitIndex: index, 
        }));
  
        setProperties(extractedProperties);
    };

    fetchProperties();
  }, []);

  const toggleFavorite = (property: Property) => {
    const isFavorite = favorites.some((fav) => fav.id === property.id);
    const updatedFavorites = isFavorite
      ? favorites.filter((fav) => fav.id !== property.id)
      : [...favorites, property];
    setFavorites(updatedFavorites);
  };

  useEffect(() => {
    localStorage.setItem("favoriteProperties", JSON.stringify(favorites));
  }, [favorites]);

const navigate = useNavigate()

const goToCards = (property: Property) => {
  navigate(`/card/${property.id}`, { state: { property } });
};
  
  return (
    <>
      <Header />
      <div className="Main">
        <Heading text={"The #1 site real estate professionals trust"} level={1} className={""} />
      </div>
      <div className="App">
        <Heading text="Объекты недвижимости" level={2} className={""} />
        {error && <p>{error}</p>}
        {properties.length === 0 ? (
          <p>Данные загружаются или отсутствуют...</p>
        ) : (
          <div className="property-list">
  {properties.map((property) => (
    <div
      key={property.id}
      className={`property-card ${favorites.some((fav) => fav.id === property.id) ? "favorite" : ""}`}
    >
      <div className="property-image">
        <img
          src={property.coverPhoto?.url || "https://via.placeholder.com/300"}
          alt={property.title}
        />
        <Button
          className={`favorite-btn ${favorites.some((fav) => fav.id === property.id) ? "active" : ""}`}
          onClick={() => toggleFavorite(property)}
        >
          <FontAwesomeIcon icon={faHeart} />
        </Button>
      </div>
      <div className="property-info">
        <h3>{property.title}</h3>
        <p>Цена: {property.price} AED</p>
        <p>
          Комнаты: {property.rooms} | Площадь: {property.area} м²
        </p>
        <p>Адрес: {property.location?.name || "Не указано"}</p>
        <Button className={"MoreBtn"} onClick={() => goToCards(property)}>Подробнее</Button>
      </div>
    </div>
  ))}
</div>

        )}
      </div>
    </>
  );
};
