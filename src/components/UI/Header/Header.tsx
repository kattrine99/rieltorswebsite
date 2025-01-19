import { useNavigate } from "react-router-dom";
import "./Header.scss"
import { CiHeart } from "react-icons/ci";
export const Header = ()=>{
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