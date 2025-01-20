import React, { useEffect, useState } from "react";
import axios from "axios";
import { Header } from "../../components/";
import { Button } from "../../components/";
import { Heading } from "../../components/";
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./MainPage.scss"
interface Property {
  id: number;
  title: string;
  price: number;
  rooms: number;
  area: number;
  location: { name: string };
  coverPhoto: { url: string };
}

export const MainPage: React.FC = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<number[]>([]);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axios.get(
          "https://bayut.p.rapidapi.com/properties/list",
          {
            headers: {
              "x-rapidapi-key":
                "3475e03f67msh5736e17388a1bafp1542c1jsn7e3641cabc0b",
              "x-rapidapi-host": "bayut.p.rapidapi.com",
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
        console.log("Ответ API:", response.data);
        setProperties(response.data.hits);
      } catch (error) {
        console.error("Ошибка загрузки:", error);
        setError("Не удалось загрузить данные.");
      }
    };

    fetchProperties();
  }, []);

  const toggleFavorite = (id: number) => {
    setFavorites((prevFavorites) =>
      prevFavorites.includes(id)
        ? prevFavorites.filter((favId) => favId !== id)
        : [...prevFavorites, id]
    );
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
              <div key={property.id} className="property-card">
                <div className="property-image">
                  <img
                    src={
                      property.coverPhoto?.url ||
                      "https://via.placeholder.com/300"
                    }
                    alt={property.title}
                  />
                  <Button
                    className={`favorite-btn ${favorites.includes(property.id) ? "active" : ""
                      }`}
                    onClick={() => toggleFavorite(property.id)}
                  > <FontAwesomeIcon icon={faHeart} /></Button>


                </div>
                <div className="property-info">
                  <h3>{property.title}</h3>
                  <p>Цена: {property.price} AED</p>
                  <p>
                    Комнаты: {property.rooms} | Площадь: {property.area} м²
                  </p>
                  <p>Район: {property.location?.name || "Не указано"}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};
