import { Button, Header, Heading } from "../../components";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Location, Property } from "../MainPage/Interfaces";
import { useGetAllHouseQuery } from "../../Store/api/house.api";
import "./CardPage.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useGetPexelsImagesQuery } from "../../Store/api/getPexelsImg.api";

interface PexelsPhoto {
  src: { large: string };
}
export const CardPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [images, setImages] = useState<string[]>([]);

  const { data: houses, isLoading: isLoadingHouses } = useGetAllHouseQuery({});
  const house = houses?.hits.find((house: Property) => house.id === Number(id));

  const { data: pexelsData, isLoading: isLoadingPexels } = useGetPexelsImagesQuery("modern apartment interior");


  useEffect(() => {
    const pexelsImages = pexelsData?.photos.map((photo: PexelsPhoto) => photo.src.large) || [];
    if (!house) return;

    const firstImage =
      house.coverPhoto?.url ||
      (house.photos && house.photos.length > 0 ? house.photos[0].url : null) ||
      pexelsImages[0] ||
      "/default-placeholder.jpg";

    setImages([firstImage, ...pexelsImages].filter(Boolean));
  }, [house, pexelsData?.photos]);

  if (isLoadingHouses || isLoadingPexels) return <p>Загрузка...</p>;
  if (!house) return <p>Объект недвижимости не найден.</p>;

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
          <Heading text={house.title} level={1} className={""} />
          <p><strong>Цена:</strong> {house.price} AED</p>
          <p><strong>Комнаты:</strong> {house.rooms}</p>
          <p><strong>Площадь:</strong> {Math.round(house.area)} м²</p>
          <p>
            <strong>Адрес:</strong>{" "}
            {house.location?.length
              ? house.location.map((location: Location, index: number) => (
                <span key={index}>
                  {location.name || "Не указано"}
                  {index < house.location.length - 1 ? ", " : ""}
                </span>
              ))
              : "Не указано"}
          </p>
          <p className="contacts">
            <span><strong>Мобильный:</strong> {house.phoneNumber?.mobile || "Нет данных"}</span>
            <span><strong>Whatsapp:</strong> {house.phoneNumber?.whatsapp || "Нет данных"}</span>
          </p>
          <Button className={"back-button"} onClick={() => navigate("/main")}><FontAwesomeIcon icon={faArrowLeft} /> Назад</Button>
        </div>
      </div>
    </>
  );
};
