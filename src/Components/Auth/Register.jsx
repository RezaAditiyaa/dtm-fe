import React, { useEffect, useRef, useState } from "react";
import "./register.scss";
import { NavLink } from "react-router-dom";
import { AiFillEye, AiFillEyeInvisible, AiOutlineClose } from "react-icons/ai";
import { message, notification } from "antd";
import LoadingButton from "../Loading/LoadingButton";
import { useNavigate } from "react-router-dom";
import { callRegister } from "../../Service/service";

function Register(props) {
  const navigate = useNavigate();
  const [isShowPass, setIsShowPass] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const refInput = useRef(null);
  const [email, setEmail] = useState("");
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const handleKeyPress = (e) => {
    let key = e.keyCode || e.which;
    if (key === 13) {
      handleRegister(e);
    }
  };

  //Validate fields
  const validateEmail = (value) => {
    const regexEmail =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let isValid = regexEmail.test(value);
    return isValid;
  };

  //HANDLE REGISTER
  let isDuplicate = false;
  const handleRegister = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    //VALIDATE
    if (!email || !username || !password) {
      message.error("Email atau Password tidak boleh kosong");
      setIsLoading(false);
      return;
    }
    if (!validateEmail(email)) {
      message.error("Format email salah");
      setIsLoading(false);
      return;
    }
    if (password.length < 6) {
      message.error("Password minimal 6 karakter");
      setIsLoading(false);
      return;
    }

    //CALL API
    const res = await callRegister(
      email.toLowerCase().trim(),
      username.trim(),
      password.trim()
    );
    console.log(res,'register')


    if (res?.data?._id && !isDuplicate) {
      setIsLoading(false);
      message.success("Pendaftaran akun berhasil");
      navigate("/login");
      isDuplicate = true;
    } else {
      setIsLoading(false);
      message.error("Email sudah terdaftar, silahkan login");
      return;
    }
    refInput.current.focus();
    setIsShowPass(false);
    setEmail("");
    setUserName("");
    setPassword("");
  };

  useEffect(() => {
    refInput.current.focus();
  }, []);

  return (
    <div className="register-page">
      <div className="register-page-form">
        <div className="register-page-form-lorup">
          <NavLink to={`/login`}>Masuk</NavLink> &nbsp; &Iota; &nbsp;{" "}
          <NavLink to={`/register`} href="">
            Daftar
          </NavLink>
        </div>
        <div className="register-page-form-container">
          {/* Email */}
          <form name="myForm">
            <div className="register-page-form-container-input">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                id="email"
                placeholder="Masukan email"
                ref={refInput}
                value={email}
                onKeyUp={(e) => handleKeyPress(e)}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* Name */}
            <div className="register-page-form-container-input">
              <label htmlFor="name">Nama Lengkap</label>
              <input
                type="text"
                id="name"
                placeholder="Masukan nama lengkap"
                value={username}
                onKeyUp={(e) => handleKeyPress(e)}
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>

            {/* Password */}
            <div className="register-page-form-container-input input-password">
              <label htmlFor="passwordregister">Password</label>
              <input
                id="passwordregister"
                type={isShowPass ? "text" : "password"}
                placeholder="Masukan password"
                value={password}
                onKeyUp={(e) => handleKeyPress(e)}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="on"
              />
              {isShowPass ? (
                <AiFillEye onClick={() => setIsShowPass(!isShowPass)} />
              ) : (
                <AiFillEyeInvisible
                  onClick={() => setIsShowPass(!isShowPass)}
                />
              )}
            </div>
          </form>
        </div>
        <div className="register-page-form-footer">
          <a
            href=""
            className="register-page-form-footer-btn"
            onClick={handleRegister}
          >
            Daftar
            {isLoading && (
              <LoadingButton color={"#072754"} secondaryColor={"#ffffff"} />
            )}
          </a>

          <p>
            Apakah anda sudah memiliki akun?&nbsp;
            <NavLink to={`/login`}>Masuk</NavLink>
          </p>
        </div>
        <NavLink to={`/`}>
          <AiOutlineClose className="register-page-form-close" />
        </NavLink>
      </div>
    </div>
  );
}

export default Register;
