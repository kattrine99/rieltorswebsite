import "./LoginPage.scss"
import { Button } from "../../components/"; // избавиться от точек
import { Input } from "../../components/";
import { AuthWith } from "../../components";
import { Heading } from "../../components";
import * as yup from "yup"
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useLoginUserMutation } from "../../Store/api/auth.api";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
interface ILoginForm {
    useremail: string
    userpassword: string
  }
  const loginFormschema = yup.object({
    useremail: yup.string().email("Введите почту в правильном формате").required("Обязательное поле"),
    userpassword: yup.string().required("Обязательное поле").min(8, "Минимум 8 символов")
  })

export const LoginPage = () => {
    const { control, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(loginFormschema), defaultValues: { useremail: "", userpassword: "" }, })
    const navigate = useNavigate();
    const [loginUser, {data: userData, isError, isLoading, isSuccess, error}] = useLoginUserMutation()
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    useEffect(()=>{
        if(userData?.user_id){
            navigate("/main")
        }
    }, [userData, navigate])

    console.log(userData, isError, isLoading, isSuccess, error)

    const onSubmit: SubmitHandler<ILoginForm> = (data) => {
        console.log(data)
        loginUser({email: data.useremail , password: data.userpassword})
    }
    const togglePasswordVisibility = () => {
        setIsPasswordVisible(prevState => !prevState);
      };

    return (
        <div className="loginPage">
             <Heading text="Авторизация" level={1} className={""} />
            <form onSubmit={handleSubmit(onSubmit)}>
            <Controller name="useremail" control={control} render={({field}) => (
          <Input isError={errors.useremail ? true : false} errorMessage={errors.useremail?.message} type="text" placeholder="Email"
            {...field}
          />

        )} />
        <Controller name="userpassword" control={control} render={({field}) => (
          <div className="pass"><Input isError={errors.userpassword ? true : false} errorMessage={errors.userpassword?.message} type={isPasswordVisible ? 'text' : 'password'} placeholder="Пароль"
                        {...field} /> <span onClick={togglePasswordVisibility} className="eye-icon">
                        {isPasswordVisible ? <FaRegEyeSlash /> : <FaRegEye />}
                      </span></div>
        )} />
        

                <Button text="Войти" type="submit" className={""}/>
                </form>
            <AuthWith />
        </div>
    )
}
