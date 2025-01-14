import { SubmitHandler } from "react-hook-form"
import { useLoginUserMutation } from "../Store/api/auth.api"
import { useEffect } from "react"

interface ILoginForm {
    useremail: string
    userpassword: string
  }

export const LoginPage = () => {
    const[loginUser , {Userdata, isError, isLoading, isSuccess, error}] = useLoginUserMutation()
    useEffect(()=>{
        if(Userdata.status === 0){
            alert("неверный логин или пароль")
        }
    else if(Userdata.status === 1){
        console.log("Успешно")
    }
    },[Userdata])

    const onSubmit: SubmitHandler<ILoginForm> = (data) => {
        
        
        loginUser({email: data.useremail, password: data.userpassword})

      }

    return (
        <div className="loginPage">
            <h1>Авторизация</h1>
            <form onSubmit={onSubmit}>
                <input type="email" placeholder="Email" />
                <input type="password" placeholder="Password" />
                <button type="submit">Войти</button>
            </form>
            <AuthWith />
        </div>
    )
}
