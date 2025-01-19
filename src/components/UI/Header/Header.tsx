import { useNavigate } from "react-router-dom";
import "./Header.scss"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from '@fortawesome/free-solid-svg-icons';


export const Header = () => {
  const navigate = useNavigate();

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
  return (
    <header className="header">
      <span>Logo</span>
      <nav>
        <button className="authBtn" onClick={goToFavorites}><FontAwesomeIcon icon={faHeart} /></button>
        <button className="authBtn" onClick={goToLogIn}>Sign in</button>
        <button className="authBtn" onClick={goToSignUp}>Sign up</button>
        <div className="profile-wrapper">
          <img onClick={goToProfile}
            className="_no-select"
            src="\images\icons\user.png"
            alt="Profile"
          />
        </div>
      </nav>
    </header>
  )
}