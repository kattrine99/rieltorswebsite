import { Link, useNavigate } from "react-router-dom";
import "./Header.scss"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from '@fortawesome/free-solid-svg-icons';


export const Header = () => {
  const navigate = useNavigate();
  const UserId = localStorage.getItem("user")
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
    localStorage.removeItem("user")
    navigate("/login")
  }
  return (
    <header className="header">
      <Link to="/main"><img className="LogoImg" src="/images/logo.png" alt="Logo" /></Link>
      <nav>
        <span className="FavBtn" onClick={goToFavorites}><FontAwesomeIcon icon={faHeart} /></span>
        {UserId ? (<><div className="profile-wrapper">
          <img onClick={goToProfile}
          id="profileImg"
            className="_no-select"
            src="\images\icons\user.png"
            alt="Profile" />
        </div><button className="authBtn" onClick={LogOut}>Log Out</button></>) : (<div className="Btn"><button className="authBtn" onClick={goToLogIn}>Sign in</button><span>|</span><button className="authBtn" onClick={goToSignUp}>Sign up</button></div>)}

      </nav>
    </header>
  )
}