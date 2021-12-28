import Axios from 'axios'
import { useContext, useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { UserContext } from "../UserContext/UserContext"
import { Container, Row, Col } from 'react-bootstrap'
import HandleVehicles from './HandleVehicles'
import HandleUsers from './HandleUsers'
import SaleTable from './SaleTable'

import './Profile.css'

const usersApi = "https://61bfeebfb25c3a00173f4f68.mockapi.io/api/v1/account";
const apiVehicles = "https://61bff171b25c3a00173f4f80.mockapi.io/api/vehicles";

const Profile = ({ index }) => {
    const { user, logout } = useContext(UserContext);
    const [reRender, setReRender] = useState()

    const [showUsers, setShowUsers] = useState(false);
    const [showVehicles, setShowVehicles] = useState(false);
    const [motors, setMotors] = useState([]);
    const [cars, setCars] = useState([]);
    const [oldCars, setOldCars] = useState([]);
    const [oldMotors, setOldMotors] = useState([]);

    useEffect(() => {
        window.scroll({
            top: 0,
            behavior: 'smooth'
        })
        const active = document.querySelectorAll('.nav-link')
        active[index].classList.add('active')
        Axios.get(`${apiVehicles}/motorbikes`)
            .then(response => setMotors(response.data))

        Axios.get(`${apiVehicles}/newcars`)
            .then(response => setCars(response.data))

        Axios.get(`${apiVehicles}/oldcars`)
            .then(response => setOldCars(response.data))

        Axios.get(`${apiVehicles}/oldmotors`)
            .then(response => setOldMotors(response.data))
        return () => {
            document.querySelector('.nav-link.active').classList.remove('active')
            setMotors()
            setCars()
            setOldCars()
            setOldMotors()
        }
    }, [index, reRender])

    const handleLogout = () => {
        if (window.confirm('Bạn chắc chắn muốn đăng xuất, danh sách yêu thích sẽ bị xóa!')) {
            logout();
        }
    }

    const handleHideUsers = () => {
        setShowUsers(false)
    }

    const handleHideVehicles = () => {
        setShowVehicles(false)
    }

    const handleVehicle = (id, type) => {
        if (window.confirm('Xóa sản phẩm này?')) {
            Axios.delete(`${apiVehicles}/${type}/${id}`)
                .then(res => setReRender(res))
                .catch(error => console.error(error))
        }
    }

    return (
        <div className="profile">
            {user && user.auth ? (
                <Container className="profile__container">
                    <Row className="h-100">
                        <Col
                            xs={12}
                            className="profile__box"
                        >
                            <p className="profile__user">Tên tài khoản: <span>{user.username}</span></p>
                            <p className="profile__user">Họ tên: <span>{user.name}</span></p>
                            <p className="profile__user">Email: <span>{user.email}</span></p>
                            <p className="profile__user">Số điện thoại: <span>{user.phone}</span></p>
                            <p className="profile__user">Xe đang bán:</p>
                            <div className="profile__sale">
                                <SaleTable
                                    motors={motors}
                                    cars={cars}
                                    oldCars={oldCars}
                                    oldMotors={oldMotors}
                                    handleVehicle={handleVehicle}
                                />
                            </div>
                            <div className="profile-btn__container">
                                <button
                                    className="profile__btn"
                                    onClick={handleLogout}
                                >
                                    Đăng xuất
                                </button>
                                {user.username === 'admin' && user.password === 'admin' &&
                                    <>
                                        <button className="profile__btn" onClick={() => setShowUsers(true)}>
                                            Quản lý tài khoản
                                        </button>
                                        <button className="profile__btn" onClick={() => setShowVehicles(true)}>
                                            Quản lý sản phẩm
                                        </button>
                                        {showUsers &&
                                            <HandleUsers
                                                usersApi={usersApi}
                                                showUsers={showUsers}
                                                handleHideUsers={handleHideUsers}
                                            />
                                        }
                                        {showVehicles &&
                                            <HandleVehicles
                                                showVehicles={showVehicles}
                                                handleHideVehicles={handleHideVehicles}
                                                handleVehicle={handleVehicle}
                                                motors={motors}
                                                cars={cars}
                                                oldCars={oldCars}
                                                oldMotors={oldMotors}
                                            />
                                        }
                                    </>
                                }
                            </div>
                        </Col>
                    </Row>
                </Container>
            ) : (
                <Navigate to="/login" />
            )}
        </div>
    )
}

export default Profile
