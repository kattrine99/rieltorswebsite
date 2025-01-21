import "./LoginPage.scss";
import { Button, Input, AuthWith, Heading } from "../../components"; // Убраны лишние точки
import * as yup from "yup";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useLoginUserMutation } from "../../Store/api/auth.api";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import Modal from "../../components/UI/Modal/Modal";

interface ILoginForm {
  useremail: string;
  userpassword: string;
}

const loginFormschema = yup.object({
  useremail: yup
    .string()
    .email("Введите почту в правильном формате")
    .required("Обязательное поле"),
  userpassword: yup
    .string()
    .required("Обязательное поле")
    .min(8, "Минимум 8 символов"),
});

export const LoginPage = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(loginFormschema),
    defaultValues: { useremail: "", userpassword: "" },
  });
  const navigate = useNavigate();
  const [loginUser, { data: userData, isError, isLoading }] = useLoginUserMutation();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalType, setModalType] = useState<"success" | "error">("success");

  useEffect(() => {
    const userId = localStorage.getItem("user");
    if (userId) {
      navigate("/main");
    }
  }, [navigate]);

  useEffect(() => {
    if (userData?.status === 0 || isError) {
      setModalMessage("Неверный логин или пароль. Попробуйте снова.");
      setModalType("error");
      setIsModalVisible(true);
    } else if (userData?.status === 1) {
      setModalMessage("Вы успешно вошли в систему!");
      setModalType("success");
      localStorage.setItem("user", JSON.stringify(userData.user_id));
      setIsModalVisible(true);
      setTimeout(() => navigate("/main"), 2000)
    }
  }, [userData, isError, navigate]);

  const onSubmit: SubmitHandler<ILoginForm> = (data) => {
    loginUser({ email: data.useremail, password: data.userpassword });
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prevState) => !prevState);
  };

  const closeModal = (): void => {
    setIsModalVisible(false);
    reset();
  };

  return (
    <div className="loginPage">
      <Heading text="Авторизация" level={1} className={""} />
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="useremail"
          control={control}
          render={({ field }) => (
            <Input
              isError={!!errors.useremail}
              errorMessage={errors.useremail?.message}
              type="text"
              placeholder="Email"
              {...field}
            />
          )}
        />
        <Controller
          name="userpassword"
          control={control}
          render={({ field }) => (
            <div className="pass">
              <Input
                isError={!!errors.userpassword}
                errorMessage={errors.userpassword?.message}
                type={isPasswordVisible ? "text" : "password"}
                placeholder="Пароль"
                {...field}
              />
              <span onClick={togglePasswordVisibility} className="eye-icon">
                {isPasswordVisible ? <FaRegEyeSlash /> : <FaRegEye />}
              </span>
            </div>
          )}
        />
        <Button type="submit" className={""}>
          {isLoading ? "Загрузка..." : "Войти"}
        </Button>
      </form>
      <AuthWith />
      <Modal
        isOpen={isModalVisible}
        onClose={closeModal}
        message={modalMessage}
        type={modalType}
      />
    </div>
  );
};
