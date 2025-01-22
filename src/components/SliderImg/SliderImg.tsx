import React, { useEffect, useState } from "react";
import Slider from "react-slick";

const API_URL = "https://bayut.p.rapidapi.com/properties/detail";
const RAPIDAPI_KEY = "feeefe7a26mshd536603668d26bcp14c961jsn6e1e4c18033b";
const RAPIDAPI_HOST = "bayut.p.rapidapi.com";

interface Photo {
  id: number;
  externalID: string;
  url: string;
  title: string;
  orderIndex: number;
  main: boolean;
}

interface SliderImgProps {
  propertyId: string; 
}

export const SliderImg: React.FC<SliderImgProps> = ({ propertyId }) => {
  const [images, setImages] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch(`${API_URL}?externalID=${propertyId}`, {
          method: "GET",
          headers: {
            "x-rapidapi-host": RAPIDAPI_HOST,
            "x-rapidapi-key": RAPIDAPI_KEY,
          },
        });

        console.log("Response Status:", response.status);

        if (!response.ok) {
          throw new Error(`Ошибка: ${response.status} ${response.statusText}`);
        }

        const text = await response.text(); 
        console.log("API Response (raw text):", text); 

        if (!text) {
          throw new Error("Пустой ответ от API");
        }

        const data = JSON.parse(text); 
        console.log("API Response (parsed):", data); 

        if (data.photos && data.photos.length > 0) {
          const imageUrls = data.photos.map((photo: Photo) => photo.url);
          setImages(imageUrls);
        } else {
          setError("Фотографии недоступны для этого объекта.");
        }
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Неизвестная ошибка");
        }
      }
    };

    fetchImages();
  }, [propertyId]);

  const settings = {
    customPaging: function (i: number) {
      return (
        <a>
          <img src={images[i] || ""} alt={`Thumbnail ${i}`} />
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
    <div className="slider-container">
      {error ? (
        <p>Ошибка загрузки: {error}</p>
      ) : images.length > 0 ? (
        <Slider {...settings}>
          {images.map((image, index) => (
            <div key={index}>
              <img src={image} alt={`Property ${index}`} />
            </div>
          ))}
        </Slider>
      ) : (
        <p>Загрузка изображений...</p>
      )}
    </div>
  );
};

export default SliderImg;
