import Axios from 'axios'
import { useContext, useEffect, useState } from 'react'
import { Link, useNavigate, Navigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { UserContext } from "../UserContext/UserContext"
import { Modal } from 'react-bootstrap'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTimes, faUser, faKey } from "@fortawesome/free-solid-svg-icons"

import "./Login.css"

const api = "https://61bfeebfb25c3a00173f4f68.mockapi.io/api/users/account";
const Login = ({ index }) => {
    const { user, login } = useContext(UserContext);
    const [users, setUsers] = useState([]);
    const [show, setShow] = useState(false);
    const navigate = useNavigate();


    useEffect(() => {
        window.scroll({
            top: 0,
            behavior: 'smooth'
        })
        Axios.get(api)
            .then(response => setUsers(response.data))

        const active = document.querySelectorAll('.nav-link')
        active[index].classList.add('active')
        return () => {
            document.querySelector('.nav-link.active').classList.remove('active')
        }
    }, [index])

    const { register, handleSubmit, formState: { errors } } = useForm();

    const handleOnSubmit = (data) => {
        const check = users.find(user => ((user.username === data.username) && (user.password === data.password)))
        if (check) {
            login(check)
            navigate("/profile")
        } else {
            setShow(true)
        }
    }

    const handleClose = () => {
        setShow(false);
    }

    return (
        <>
            {user && user.auth ? (
                <Navigate to="/profile" />
            ) : (
                <div className="login">
                    <div className="login__container">
                        <div className="container">
                            <form className="login__form" onSubmit={handleSubmit(handleOnSubmit)}>
                                <h1 className="login__title">Đăng nhập</h1>
                                <div className="wrap-login__form">
                                    <div className="form-group">
                                        <FontAwesomeIcon icon={faUser} className="login__icon" />
                                        <input
                                            autoComplete="off"
                                            type="text"
                                            className="login__input"
                                            placeholder="Tài khoản"
                                            {...register("username", { required: 'Vui lòng nhập tên tài khoản' })}
                                        />
                                    </div>
                                    {errors.username && <span className="text-danger">{errors.username.message}</span>}
                                    <div className="form-group">
                                        <FontAwesomeIcon icon={faKey} className="login__icon" />
                                        <input
                                            type="password"
                                            className="login__input"
                                            name="password"
                                            placeholder="Mật khẩu"
                                            {...register("password", { required: 'Vui lòng nhập mật khẩu' })}
                                        />
                                    </div>
                                    {errors.password && <span className="text-danger">{errors.password.message}</span>}
                                    <Link className="forgot-password" to="/">Quên mật khẩu?</Link>
                                    <button type="submit" className="form__btn">Đăng nhập</button>
                                </div>

                                <p className="form__subtitle">Bạn chưa có tài khoản? <Link to="/register">Đăng ký</Link></p>
                            </form>
                        </div>
                        <Modal show={show} onHide={handleClose}>
                            <Modal.Body className="d-flex justify-content-between">
                                <div>Tài khoản hoặc mật khẩu không chính xác, vui lòng thử lại</div>
                                <FontAwesomeIcon icon={faTimes} style={
                                    {
                                        margin: "0.2rem",
                                        alightSelf: "center",
                                        color: "#000"
                                    }
                                }
                                    onClick={handleClose}
                                />
                            </Modal.Body>
                        </Modal>
                    </div>
                </div>

            )}
        </>
    )
}

export default Login
