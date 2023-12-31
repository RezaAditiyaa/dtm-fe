import React, { useEffect, useRef, useState } from "react";
import "./login.scss";
import { message } from "antd";

import { NavLink, useNavigate } from "react-router-dom";
import { AiFillEye, AiFillEyeInvisible, AiOutlineClose } from "react-icons/ai";
import LoadingButton from "../Loading/LoadingButton";
import { callLogin } from "../../Service/service";
function Login(props) {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isShowPass, setIsShowPass] = useState(false);
  const refInput = useRef(null);

  //Enter to submit
  const handleKeyPress = (e) => {
    let key = e.keyCode || e.which;
    if (key === 13) {
      handleLogin(e);
    }
  };

  let isDuplicate = false;
  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    //VALIDATE VALUE
    if (!email.trim() || !password.trim()) {
      message.error("Email atau Password tidak boleh kosong");
      setIsLoading(false);
      return;
    }
    const res = await callLogin(email.trim(), password.trim());

    if (res?.data?.userWP && !isDuplicate) {
      localStorage.setItem("access_token", res.data.accessToken);
      localStorage.setItem("refresh_token", res.data.refreshToken);

      const dataUser = {
        id: res.data.userWP._id,
        username: res.data.userWP.username,
        email: res.data.userWP.email,
      };
      const board = res.data.userWP.board;
      localStorage.setItem("user", JSON.stringify(dataUser));
      localStorage.setItem("listColumns", JSON.stringify(board));
      isDuplicate = true;
      message.success("Berhasil Masuk");
      navigate("/");
      setIsLoading(false);
    } else {
      setIsLoading(false);
      message.error("Email atau Password salah");
      return;
    }
    setEmail("");
    setPassword("");
    setIsShowPass("");
  };

  useEffect(() => {
    refInput.current.focus();
  }, []);
  return (
    <div className="login-page">
      <div className="login-page-form">
        <div className="login-page-form-lorup">
          <NavLink to={`/login`}>Masuk</NavLink> &nbsp; &Iota; &nbsp;{" "}
          <NavLink to={`/register`} href="">
            Daftar
          </NavLink>
        </div>
        <div className="login-page-form-container">
          <form name="myForm">
            <div className="login-page-form-container-input">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                id="email"
                ref={refInput}
                placeholder="Masukan email"
                value={email}
                onKeyUp={(e) => handleKeyPress(e)}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="login-page-form-container-input input-password">
              <label htmlFor="password">Password</label>
              <input
                id="passwordLogin"
                type={isShowPass ? "text" : "password"}
                placeholder="Masukan password"
                onKeyUp={(e) => handleKeyPress(e)}
                value={password}
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
        <div className="login-page-form-footer">
          <a
            href=""
            className="login-page-form-footer-btn"
            onClick={handleLogin}
          >
            Masuk
            {isLoading && (
              <LoadingButton color={"#072754"} secondaryColor={"#ffffff"} />
            )}
          </a>
          <p>
            Belum punya akun?
            <NavLink to={`/register`}>Daftar</NavLink>
          </p>
        </div>
        <NavLink to={`/`}>
          <AiOutlineClose className="login-page-form-close" />
        </NavLink>
      </div>
    </div>
  );
}

export default Login;
