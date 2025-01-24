import React, { useEffect, useState } from "react";
import { Header } from "../../components/";
import { Heading } from "../../components/";
import { Button } from "../../components/";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./FavoritePage.scss";
import { useNavigate } from "react-router";
import { Property } from "../MainPage/Interfaces";

export const FavoritePage: React.FC = () => {
  const [favoriteProperties, setFavoriteProperties] = useState<Property[]>([]);
  const navigate = useNavigate()
  const goToCards = (property: Property) => {
    navigate(`/card/${property.id}`, { state: { property } });
  };
  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favoriteProperties") || "[]");
    setFavoriteProperties(storedFavorites);
  }, []);

  const removeFavorite = (id: number) => {
    const updatedFavorites = favoriteProperties.filter((property) => property.id !== id);
    setFavoriteProperties(updatedFavorites);
    localStorage.setItem("favoriteProperties", JSON.stringify(updatedFavorites));
  };

  return (
    <>
      <Header />
      <Heading text="Избранное" level={1} className="favorite-title" />
      <div className="favorite-list">
        {favoriteProperties.length > 0 ? (
          favoriteProperties.map((property) => (
            <div key={property.id} className="favorite-card">
              <img
                src={property.coverPhoto?.url || "https://via.placeholder.com/300"}
                alt={property.title}
                className="favorite-image"
              />
              <div className="favorite-info">
                <h3>{property.title}</h3>
                <p>Цена: {property.price} AED</p>
                <p>
                  Комнаты: {property.rooms} | Площадь: {Math.round(property.area)} м²
                </p>
                <p>Адрес: {property.location && property.location.length > 0
              ? property.location.map((loc, index) => (
                  <span key={index}>
                    {loc.name || "Не указано"}
                    {index < property.location.length - 1 ? ", " : ""}
                  </span>
                ))
              : "Не указано"}</p>
              <div className="Buttons">
                <Button
                  className="remove-btn"
                  onClick={() => removeFavorite(property.id)}
                >
                  Удалить <FontAwesomeIcon icon={faTrash} />
                </Button>
                <Button className={"FavoriteMoreBtn"} onClick={()=>goToCards(property)}>Подробнее</Button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>Список избранного пуст</p>
        )}
      </div>
    </>
  );
};
