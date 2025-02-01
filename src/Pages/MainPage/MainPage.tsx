import React, { useEffect, useState } from "react";
import { Header, Smallcards, Button, Heading, Footer } from "../../components/";
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Property } from "./Interfaces";
import { useNavigate } from "react-router";
import { faArrowDown, faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { cardData } from "../../components/index";
import { useGetAllHouseQuery } from "../../Store/api/house.api";
import "./MainPage.scss";

export const MainPage: React.FC = () => {
  const [favorites, setFavorites] = useState<Property[]>(
    JSON.parse(localStorage.getItem("favoriteProperties") || "[]")
  );
  const [visibleCount, setVisibleCount] = useState<number>(5);
  const { data, isLoading } = useGetAllHouseQuery({
    locationExternalIDs: "5002,6020",
    purpose: "for-rent",
    hitsPerPage: 24,
    page: 0,
    lang: "en",
  });

  const extractedProperties = data?.hits.map((hit: Property, index: number) => ({
    ...hit,
    hitIndex: index,
  })) || [];

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

  const navigate = useNavigate();

  const goToCards = (property: Property) => {
    navigate(`/card/${property.id}`, { state: { property } });
  };

  const loadMore = () => {
    if (visibleCount >= extractedProperties.length) {
      setVisibleCount(5);
    } else {
      setVisibleCount((prev) => Math.min(prev + 5, extractedProperties.length));
    }
  };
  if (isLoading) return <p>Loading...</p>;
  return (
    <>
      <Header />
      <div className="Main">
        <Heading text={"LET US GUIDE YOUR HOME"} level={3} className={"HeadingMainmini"} />
        <Heading text={"Believe in finding it"} level={1} className={""} />
        <p>Search properties for rent in the OAE</p>
      </div>
      <div className="App">
        <Heading text="Объекты недвижимости" level={2} className={""} />
        {extractedProperties.length === 0 ? (
          <p>Данные загружаются или отсутствуют...</p>
        ) : (
          <div className="property-list">
            {extractedProperties.slice(0, visibleCount).map((property: Property) => {
              const isFavorite = favorites.some((fav) => fav.id === property.id);
              return (
                <div
                  key={property.id}
                  className={`property-card ${isFavorite ? "favorite" : ""}`}
                >
                  <div className="property-image">
                    <img
                      src={property.coverPhoto?.url}
                      alt={property.title}
                    />
                    <Button
                      className={`favorite-btn ${isFavorite ? "active" : ""}`}
                      onClick={() => toggleFavorite(property)}
                    >
                      <FontAwesomeIcon icon={faHeart} />
                    </Button>
                  </div>
                  <div className="property-info">
                    <h3>{property.title}</h3>
                    <p>Цена: {property.price} AED</p>
                    <p>
                      Комнаты: {property.rooms} | Площадь: {Math.round(property.area)} м²
                    </p>
                    <p>
                      Адрес:{" "}
                      {property.location?.length > 0
                        ? property.location.map((loc, index) => (
                          <span key={index}>
                            {loc.name || "Не указано"}
                            {index < property.location.length - 1 ? ", " : ""}
                          </span>
                        ))
                        : "Не указано"}
                    </p>
                    <Button className="MoreBtn" onClick={() => goToCards(property)}>
                      Подробнее
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
        {visibleCount >= extractedProperties.length ? (
          <Button onClick={() => setVisibleCount(5)} className="collapseBtn">
            <FontAwesomeIcon icon={faArrowUp} />
            Свернуть
          </Button>
        ) : (
          <Button onClick={loadMore} className="loadMoreBtn">
            Показать ещё
            <FontAwesomeIcon icon={faArrowDown} />
          </Button>
        )}
      </div>
      <div className="HowItWorksPage">
        <Heading text={"How It works? Find a perfect home"} level={2} className={"HowItWorks"} />
        <p className="HowItWorkstext">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        <Smallcards cards={cardData} />
      </div>
      <div className="landing-page">
        <div className="image-section">
          <img src="/images/work.png" alt="Interior" />
        </div>
        <div className="content-section">
          <Heading text={"Why You Should Work With Us"} level={2} className={""} />
          <p>
            Pellentesque egestas elementum egestas faucibus sem. Velli nunc
            egestas ut morbi. Leo diam diam nibh eget fermentum massa pretium. Mi
            mauris nulla ac dictum ut mauris non.
          </p>
          <div className="features">
            <div className="feature">
              <Heading text={"Buy or Rent Homes"} level={4} className={""} />
              <p>We sell your home at the best market price and very quickly as well.</p>
            </div>
            <div className="feature">
              <Heading text={"Trusted by Thousands"} level={4} className={""} />
              <p>We offer you free consultancy to get a loan for your new home.</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};
