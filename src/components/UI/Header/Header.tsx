import { Link, useNavigate } from "react-router-dom";
import "./Header.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";

interface HeaderProps {
  profilePicture?: string; // Указываем, что это необязательное свойство
}

export const Header: React.FC<HeaderProps> = ({ profilePicture }) => {
  const navigate = useNavigate();
  const UserId = localStorage.getItem("user");
  const [currentProfilePicture, setCurrentProfilePicture] = useState<string>(
    profilePicture || "/images/icons/user.png" // Начальное значение
  );

  // Обновляем локальное состояние фото профиля из localStorage
  useEffect(() => {
    const storedPicture = localStorage.getItem("profilePicture");
    setCurrentProfilePicture(storedPicture || "/images/icons/user.png");
  }, [profilePicture]); // Если проп обновится, синхронизируем состояние

  const goToFavorites = () => {
    navigate("/favorite");
  };
  const goToLogIn = () => {
    navigate("/login");
  };
  const goToSignUp = () => {
    navigate("/register");
  };
  const goToProfile = () => {
    navigate("/profile");
  };
  const LogOut = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("profilePicture"); // Удаляем фото профиля при логауте
    navigate("/login");
  };

  return (
    <header className="header">
      <Link to="/main">
        <img className="LogoImg" src="/images/logo.png" alt="Logo" />
      </Link>
      <nav>
        <span className="FavBtn" onClick={goToFavorites}>
          <FontAwesomeIcon icon={faHeart} />
        </span>
        {UserId ? (
          <>
            <div className="profile-wrapper">
              <img
                onClick={goToProfile}
                id="profileImg"
                className="profileImgHeader"
                src={currentProfilePicture} // Используем актуальное фото профиля
                alt="Profile"
              />
            </div>
            <button className="authBtn" onClick={LogOut}>
              Log Out
            </button>
          </>
        ) : (
          <div className="Btn">
            <button className="authBtn" onClick={goToLogIn}>
              Sign in
            </button>
            <span>|</span>
            <button className="authBtn" onClick={goToSignUp}>
              Sign up
            </button>
          </div>
        )}
      </nav>
    </header>
  );
};
