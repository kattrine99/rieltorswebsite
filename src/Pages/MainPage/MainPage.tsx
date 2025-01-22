import React, { useEffect, useState } from "react";
import axios from "axios";
import { Header } from "../../components/";
import { Button } from "../../components/";
import { Heading } from "../../components/";
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./MainPage.scss";

interface Property {
  id: number;
  title: string;
  price: number;
  rooms: number;
  area: number;
  location: { name?: string; geography: { lat: number; lng: number } };
  coverPhoto: { url: string };
}

interface ApiResponse {
  hits: Property[];
}

export const MainPage: React.FC = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<Property[]>(
    JSON.parse(localStorage.getItem("favoriteProperties") || "[]")
  );

  const API_KEY = "0adf58fe-9905-46bf-b267-c9898461f72c";

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axios.get<ApiResponse>(
          "https://bayut.p.rapidapi.com/properties/list",
          {
            headers: {
              "x-rapidapi-key": "3475e03f67msh5736e17388a1bafp1542c1jsn7e3641cabc0b",
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

        if (!response.data || !Array.isArray(response.data.hits)) {
          throw new Error("Некорректная структура данных API");
        }

        const propertiesWithAddresses = await Promise.all(
          response.data.hits.map(async (property) => {
            const latitude = property.location.geography?.lat;
            const longitude = property.location.geography?.lng;

            if (latitude && longitude) {
              const address = await getAddressFromCoordinates(latitude, longitude);
              return {
                ...property,
                location: { name: address || "Не указано", geography: { lat: latitude, lng: longitude } },
              };
            }

            return property;
          })
        );

        setProperties(propertiesWithAddresses);
      } catch (error) {
        console.error("Ошибка загрузки:", error);
        setError("Не удалось загрузить данные.");
      }
    };

    fetchProperties();
  }, []);

  const getAddressFromCoordinates = async (latitude: number, longitude: number): Promise<string | null> => {
    try {
      console.log(`Запрашиваем адрес для координат: ${latitude}, ${longitude}`);
      const response = await axios.get("https://geocode-maps.yandex.ru/1.x", {
        params: {
          geocode: `${longitude},${latitude}`, // Формат "lng,lat"
          format: "json", // Формат ответа JSON
          apikey: API_KEY, // Ваш API-ключ
          lang: "en-US", // Язык ответа
        },
      });

      console.log("Ответ от Яндекс API:", response.data);

      const geoObject =
        response.data.response?.GeoObjectCollection?.featureMember?.[0]?.GeoObject;

      if (!geoObject) {
        console.warn("Адрес не найден для координат:", latitude, longitude);
        return "Адрес не найден";
      }

      return geoObject.metaDataProperty?.GeocoderMetaData?.text || "Адрес отсутствует";
    } catch (error) {
      console.error("Ошибка получения адреса:", error);
      return "Ошибка API";
    }
  };

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
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};
