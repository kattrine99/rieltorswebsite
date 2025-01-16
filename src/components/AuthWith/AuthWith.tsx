import "./AuthWith.scss"
import { Applink } from "../Applink/Applink"

export const AuthWith = () => {
    return (
        <div className="registration">
            <span>
                У вас нет аккаунта? <Applink to="/register" text="Зарегистрироваться" className={""} />
            </span>
            <p>Войти с помощью</p>
            <div className="icons-wrapper">
                <a className="reg__link google-link" href="#">
                    <img src="/images/icons/google.svg" alt="Google" />
                </a>
                <a className="reg__link google-plus-link" href="#">
                    <img src="/images/icons/github.svg" alt="Github" />
                </a>
                <a className="reg__link yandex-link" href="#">
                    <img src="/images/icons/yandex.svg" alt="Yandex" />
                </a>
                <a className="reg__link mail-ru-link" href="#">
                    <img src="/images/icons/mail.svg" alt="Mail.ru" />
                </a>
            </div>
        </div>
    )
}