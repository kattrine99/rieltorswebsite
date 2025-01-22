import { Link, useNavigate } from "react-router-dom";
import "./Header.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";

interface HeaderProps {
  profilePicture?: string; 
}

export const Header: React.FC<HeaderProps> = ({ profilePicture }) => {
  const navigate = useNavigate();
  const UserId = localStorage.getItem("user");
  const [currentProfilePicture, setCurrentProfilePicture] = useState<string>(
    profilePicture || "/images/icons/user.png" 
  );

  useEffect(() => {
    const storedPicture = localStorage.getItem("profilePicture");
    setCurrentProfilePicture(storedPicture || "/images/icons/user.png");
  }, [profilePicture]); 

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
    localStorage.removeItem("profilePicture"); 
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
                src={currentProfilePicture} 
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
