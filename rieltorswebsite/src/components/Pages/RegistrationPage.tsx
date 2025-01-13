
export const RegistrationPage = () => {
    return (
        <div className="loginPage">
            <h1>Регистрация</h1>
            <form>
                <input type="text" placeholder="First Name" />
                <input type="text" placeholder="Last Name" />
                <input type="email" placeholder="Email" />
                <input type="password" placeholder="Password" />
                <input type="password" placeholder="Cofirm password" />
                <button type="submit">Войти</button>
            </form>
        </div>
    )
}
