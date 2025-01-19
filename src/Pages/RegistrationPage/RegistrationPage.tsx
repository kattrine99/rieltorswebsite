import { Button } from "../../components"; // избавиться от точек
import { Input } from "../../components";
import "./RegistrationPage.scss"
import { Heading } from "../../components";
import * as yup from "yup"
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import Modal from "../../components/UI/Modal/Modal";
import { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

interface IRegisterForm {
    userfirstname: string
    userlastname: string
    useremail: string
    usercity: string
    usertel?: string
    userpassword: string
}

const registerFormschema = yup.object({
    userfirstname: yup.string().required("Обязательное поле").min(2, "Имя должно содержать минимум 2 буквы").matches(/^[a-zA-Zа-яА-ЯёЁ\s]+$/, "Имя должно содержать только буквы"),
    userlastname: yup.string().required("Обязательное поле").min(2, "Фамилия должна содержать минимум 2 буквы").matches(/^[a-zA-Zа-яА-ЯёЁ\s-]+$/, "Имя должно содержать только буквы"),
    useremail: yup.string().email("Введите почту в правильном формате").required("Обязательное поле"),
    usertel: yup.string().matches(
        /^\+998\d{2}\d{3}\d{2}\d{2}$/,
        "Телефон должен быть в формате +998XXXXXXXXX").max(13,"Телефон должен содержать максимум 13 символов" ).required("Обязательное поле"),
    userpassword: yup.string().required("Обязательное поле").min(8, "Минимум 8 символов"),
    usercity: yup.string().required("Обязательное поле"),
})

export const RegistrationPage = () => {
  const navigate = useNavigate();
  const { control, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(registerFormschema), defaultValues: { userfirstname: "",
    userlastname: "",
    useremail: "",
    usertel: "",
    usercity:"",
    userpassword: "", }, })
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const handleCloseModal = () => {
      setIsModalOpen(false); 
      navigate("/login"); 
    };
    const onSubmit: SubmitHandler<IRegisterForm> = () => {
      setIsModalOpen(true); 
    };
    const togglePasswordVisibility = () => {
      setIsPasswordVisible(prevState => !prevState);

    };
  return (
    <div className="RegisterPage">
      <Heading text="Авторизация" level={1} className={""} />
      <form onSubmit={handleSubmit(onSubmit)}>
      <div className="name-fields">
        <Controller name="userfirstname" control={control} render={({field}) => (
          <Input isError={errors.userfirstname ? true : false} errorMessage={errors.userfirstname?.message} type="text" placeholder="First Name"
            {...field}
          />
        )} />
        <Controller name="userlastname" control={control} render={({field}) => (
          <Input isError={errors.userlastname ? true : false} errorMessage={errors.userlastname?.message} type="text" placeholder="Last Name"
            {...field}
          />
        )} />
        </div>
        <Controller name="useremail" control={control} render={({field}) => (
          <Input isError={errors.useremail ? true : false} errorMessage={errors.useremail?.message} type="text" placeholder="Email"
            {...field}
          />
        )} />
        <Controller name="usertel" control={control} render={({field}) => (
          <Input isError={errors.usertel ? true : false} errorMessage={errors.usertel?.message} type="text" placeholder="Phone Number"
            {...field}
          />
        )} />
        <Controller name="userpassword" control={control} render={({field}) => (
          <div className="pass"><Input 
          isError={errors.userpassword ? true : false}
          errorMessage={errors.userpassword?.message}
          type={isPasswordVisible ? 'text' : 'password'}
          placeholder="Пароль"
          {...field}/>
          <span onClick={togglePasswordVisibility} className="eye-icon">{isPasswordVisible ? <FaRegEyeSlash /> : <FaRegEye />}</span>
          </div>
        )} />

        <Button className= "" text="Зарегистрироваться" type="submit" />
      </form>
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        message="Вы успешно зарегистрировались!"
      />
    </div>
  );
};