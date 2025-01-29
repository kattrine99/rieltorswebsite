import { Header, Heading } from "../../components";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Property } from "../MainPage/Interfaces";
import axios from "axios";
import { BASE_URL, RAPIDAPI_HOST, RAPIDAPI_KEY } from "../../utils/cardsBaseUrl";
import "./CardPage.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const PEXELS_API_KEY = "vs5WsAgHWmL5kQ2h0XVlWM0rgSurjS2z2e1uQEl5SWXOhJMEbVtBz4DY";

interface PexelsPhoto {
  src: {
    large: string;
  };
}

interface PexelsApiResponse {
  photos: PexelsPhoto[];
}

export const CardPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const [property, setProperty] = useState<Property | null>(
    location.state?.property || null
  );
  const [error, setError] = useState<string | null>(null);
  const [images, setImages] = useState<string[]>([]);

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

  useEffect(() => {
    const fetchImagesFromPexels = async () => {
      if (!property) return;

      try {
        const response = await axios.get<PexelsApiResponse>("https://api.pexels.com/v1/search", {
          headers: {
            Authorization: PEXELS_API_KEY,
          },
          params: {
            query: "modern apartment interior", // Больше точности в запросе
            per_page: 6, // Количество фото
            orientation: "landscape", // Загружаем только горизонтальные фото
          },
        });

        const fetchedImages = response.data.photos.map((photo) => photo.src.large);
        setImages([property.coverPhoto?.url || "", ...fetchedImages]);
      } catch (error) {
        console.error("Ошибка загрузки изображений с Pexels:", error);
      }
    };

    fetchImagesFromPexels();
  }, [property]);


  if (error) return <p>{error}</p>;
  if (!property) return <p>Загрузка...</p>;

  const sliderSettings = {
    customPaging: function (i: number) {
      return (
        <a>
          <img src={images[i] || ""} alt={`Thumbnail ${i}`} className="thumbnail" />
        </a>
      );
    },
    dots: true,
    dotsClass: "slick-dots slick-thumb",
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <>
      <Header />
      <div className="CardDetails">
        <div className="image-section">
          <Slider {...sliderSettings} className="image-slider">
            {images.map((img, index) => (
              <div key={index}>
                <img src={img} alt={`Property ${index}`} className="slider-image" />
              </div>
            ))}
          </Slider>
        </div>
        <div className="info-section">
          <Heading text={property.title} level={1} className={""} />
          <p>Цена: {property.price} AED</p>
          <p>Комнаты: {property.rooms}</p>
          <p>Площадь: {Math.round(property.area)} м²</p>
          <p>
            Адрес:{" "}
            {property.location && property.location.length > 0
              ? property.location.map((loc, index) => (
                <span key={index}>
                  {loc.name || "Не указано"}
                  {index < property.location.length - 1 ? ", " : ""}
                </span>
              ))
              : "Не указано"}
          </p>
          <p className="contacts">
            <span>Мобильный: {property.phoneNumber.mobile}</span>{" "}
            <span>Whatsapp: {property.phoneNumber.whatsapp}</span>
          </p>
          <button className="back-button" onClick={() => navigate("/main")}>
            <FontAwesomeIcon icon={faArrowLeft} /> Назад
          </button>
        </div>
      </div>
    </>
  );
};
