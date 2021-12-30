import { useContext } from "react"
import { Link } from "react-router-dom"
import { Table } from "react-bootstrap"
import { UserContext } from "../UserContext/UserContext"
import { FavoritesContext } from "../FavoritesContext/FavoritesContext"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBars, faSortDown, faBookmark } from "@fortawesome/free-solid-svg-icons"

import "./Navbar.css"
import logo from "./myLogo.png"

function Navbar() {

    const { user } = useContext(UserContext);
    const { favorites } = useContext(FavoritesContext);

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-dark">
                <div className="container">
                    <Link className="navbar-brand" to="/"><img className="logo" src={logo} alt="Sumo shop" /></Link>
                    <div className="navbar-toggler" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <FontAwesomeIcon icon={faBars} style={{
                            color: "#fff"
                        }} />
                    </div>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav">
                            <Link className="nav-item" to="/homepage">
                                <li className="nav-link">home</li>
                            </Link>
                            <Link className="nav-item" to="/newcar">
                                <li className="nav-link">ô tô</li>
                            </Link>
                            <Link className="nav-item" to="/motorbikes">
                                <li className="nav-link">xe máy</li>
                            </Link>
                            <Link className="nav-item" to="/oldcars">
                                <li className="nav-link">ô tô cũ</li>
                            </Link>
                            <Link className="nav-item" to="/oldmotors">
                                <li className="nav-link">xe máy cũ</li>
                            </Link>
                            <Link className="nav-item" to="/addvehicle">
                                <li className="nav-link">đăng bán xe</li>
                            </Link>
                            {user && user.auth ? (
                                <Link to="/profile" className="nav-item">
                                    <li className="nav-link">{user.name}</li>
                                </Link>
                            ) : <Link className="nav-item" to="/login">
                                <li className="nav-link">đăng nhập</li>
                            </Link>
                            }
                        </ul>
                    </div>
                    {user && user.auth &&
                        <div className="nav-item hov">
                            <Link to="/favorites" className="nav-icon__container">
                                <FontAwesomeIcon icon={faBookmark} className="nav-icon" />
                                <FontAwesomeIcon
                                    icon={faSortDown}
                                    className="nav-icon"
                                />
                            </Link>
                            {favorites && <Link to="/favorites" className="fav__count">{favorites.length}</Link>}
                            <div className="nav-subnav">
                                <div className="subnav-item text-center">Danh sách yêu thích</div>
                                {(favorites && favorites.length > 0 &&
                                    <Table bordered className="fav-table">
                                        <thead className="fav-table__head">
                                            <tr>
                                                <th>STT</th>
                                                <th>Tên</th>
                                                <th>Giá</th>
                                                <th>Ảnh</th>
                                            </tr>
                                        </thead>
                                        <tbody className="fav-table__body">
                                            {favorites.map((favorite, index) =>
                                                <tr key={index} className="subnav-item">
                                                    <td>{index + 1}</td>
                                                    <td>{favorite.name}</td>
                                                    <td>{favorite.price}</td>
                                                    <td>
                                                        <img src={favorite.image} alt="fav-img" className="fav__img" />
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </Table>)
                                    ||
                                    <div className="subnav-item">
                                        <p className="fav__null">Hiện không có sản phẩm nào</p>
                                    </div>
                                }
                            </div>
                        </div>
                    }
                </div>
            </nav>

        </>
    )
}

export default Navbar
