import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFacebook, faInstagram, faTwitter } from "@fortawesome/free-brands-svg-icons";
import "./Footer.scss"

export const Footer = () =>{
    return(
        <footer className="footer">
                <img className="LogoImg" src="/images/logo.png" alt="Logo" />
  
            <div className="socialIcons">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faInstagram} style={{color: "#ffffff",}}className="social-icon" />
          </a>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faFacebook} style={{color: "#ffffff",}} className="social-icon" />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faTwitter} style={{color: "#ffffff",}} className="social-icon" />
          </a>
            </div>
        </footer>
    )
}