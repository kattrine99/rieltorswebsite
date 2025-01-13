import { AuthWith } from "../AuthWith/AuthWith"

export const LoginPage = () => {
    return (
        <div className="loginPage">
            <h1>Авторизация</h1>
            <form>
                <input type="email" placeholder="Email" />
                <input type="password" placeholder="Password" />
                <button type="submit">Войти</button>
            </form>
            <AuthWith />
        </div>
    )
}
