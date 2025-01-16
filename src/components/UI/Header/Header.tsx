import { useNavigate } from "react-router-dom";
import "./Header.scss"
import { CiHeart } from "react-icons/ci";
export const Header = ()=>{
    const navigate = useNavigate(); // Хук для навигации

  const goToFavorites = () => {
    navigate("/favorite"); // Переход на страницу избранного
  };
  const goToLogIn = () => {
    navigate("/login"); // Переход на страницу избранного
  };
  const goToSignUp = () => {
    navigate("/register"); // Переход на страницу избранного
  };
    return (
        <header className="header">
            <span>Logo</span>
            <nav>
                <span className="favorites" onClick={goToFavorites}><CiHeart/></span>
                <button className="authBtn" onClick={goToLogIn}>Sign in</button>
                <button className="authBtn" onClick={goToSignUp}>Sign up</button>

            </nav>
        </header>
    ) 
}