import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from "react-hook-form";
import './Register.css'
import Axios from 'axios';

const api = 'https://61bfeebfb25c3a00173f4f68.mockapi.io/api/v1/account'

const Register = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [isPassword, setIsPassword] = useState('');
    const [isUsername, setIsUsername] = useState();
    const [accounts, setAccounts] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        window.scroll({
            top: 0,
            behavior: 'smooth'
        })
        Axios.get(api)
            .then(response => setAccounts(response.data))
            .catch((error) => alert('Có lỗi xảy ra, vui lòng tải lại trang'))
    }, [])

    const handleUsername = (e) => {
        const duplicateUser = accounts.find(account => account.username === e.target.value)
        if (duplicateUser) {
            setIsUsername(duplicateUser.username)
        }
    }

    const handlePassword = (e) => {
        setIsPassword(e.target.value)
    }

    const onSubmit = (data) => {
        Axios.post(api, data)
            .then(e => console.log(e))
            .catch(e => alert('Đăng ký thất bại, vui lòng thử lại'))

        if (window.confirm('Bạn đã đăng ký thành công, chuyển đến đăng nhập?')) {
            navigate("/login")
        } else {
            reset()
        }

    }

    return (
        <div className="register">
            <div className="register__container">
                <form autoComplete="off" className="register__form" onSubmit={handleSubmit(onSubmit)}>
                    <h1 className="register__title">Đăng ký</h1>
                    <div className="form-group w-100 mb-3">
                        <label className="form__label" htmlFor="name">Họ và tên</label>
                        <input
                            type="text"
                            className="register__input"
                            name="name"
                            placeholder="Nhập tên của bạn"
                            {...register(
                                "name",
                                { required: "Vui lòng nhập trường này" }
                            )}
                        />
                        {errors.fullName && <span className="text-danger">{errors.fullName.message}</span>}
                    </div>
                    <div className="form-group w-100 mb-3">
                        <label className="form__label" htmlFor="username">Tên đăng nhập</label>
                        <input
                            type="text"
                            className="register__input"
                            name="username"
                            placeholder="Tối đa 16 ký tự"
                            {...register(
                                "username",
                                {
                                    required: "Vui lòng nhập trường này",
                                    maxLength: { value: 16, message: "Vui lòng nhập tối đa 16 ký tự" },
                                    validate: value => value !== isUsername || "Tài khoản này đã tồn tại"
                                }
                            )}
                            onChange={handleUsername}
                        />
                        {errors.username && <span className="text-danger">{errors.username.message}</span>}
                    </div>
                    <div className="form-group w-100 mb-3">
                        <label className="form__label" htmlFor="password">Mật khẩu</label>
                        <input
                            type="password"
                            className="register__input"
                            name="password"
                            placeholder="Tối thiểu 6 ký tự"
                            {...register(
                                "password",
                                {
                                    required: "Vui lòng nhập trường này",
                                    minLength: { value: 6, message: "Vui lòng nhập tối thiểu 6 ký tự" }
                                }
                            )}
                            onChange={handlePassword}
                        />
                        {errors.password && <span className="text-danger">{errors.password.message}</span>}
                    </div>
                    <div className="form-group w-100 mb-3">
                        <label className="form__label" htmlFor="confirmPassword">Nhập lại mật khẩu</label>
                        <input
                            type="password"
                            className="register__input"
                            name="confirmPassword"
                            placeholder="Nhập lại mật khẩu"
                            {...register(
                                "confirmPassword",
                                { validate: value => value === isPassword || "Mật khẩu không trùng khớp" }
                            )}
                        />
                        {errors.confirmPassword && <span className="text-danger">{errors.confirmPassword.message}</span>}
                    </div>
                    <div className="form-group w-100 mb-3">
                        <label className="form__label" htmlFor="email">Email</label>
                        <input
                            type="email"
                            className="register__input"
                            name="email"
                            aria-describedby="emailHelp"
                            placeholder="Email"
                            {...register("email", { required: "Vui lòng nhập trường này" })}
                        />
                        {errors.email && <span className="text-danger">{errors.email.message}</span>}
                    </div>
                    <div className="form-group w-100 mb-3">
                        <label className="form__label" htmlFor="phone">Số điện thoại</label>
                        <input
                            type="tel"
                            className="register__input"
                            name="phone"
                            placeholder="Nhập số điện thoại..."
                            {...register("phone", { required: "Vui lòng nhập trường này" })}
                        />
                        {errors.phone && <span className="text-danger">{errors.phone.message}</span>}
                    </div>
                    <div className="form-group w-100 mb-3">
                        <input
                            type="checkbox"
                            className="form-check-input"
                            name="agree"
                            id="exampleCheck1"
                            {...register("agree", { required: "Vui lòng đồng ý với điều khoản trước khi đăng ký" })}
                        />
                        <label
                            className="form-check-label form__label"
                            style={{ marginLeft: "0.5rem", marginBottom: "0" }}
                            htmlFor="exampleCheck1"
                        >
                            Đồng ý với <Link to="/terms">điều khoản sử dụng</Link>
                        </label> <br />
                        {errors.agree && <span className="text-danger">{errors.agree.message}</span>}
                    </div>
                    <button type="submit" className="form__btn btn--register">Đăng ký</button>
                </form>
            </div>
        </div>
    )
}

export default Register
