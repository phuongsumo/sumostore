import React, { useContext, useState, useEffect } from 'react'
import { Table } from 'react-bootstrap'
import { FavoritesContext } from '../FavoritesContext/FavoritesContext'
import DetailModal from '../DetailModal/DetailModal'
import './Favorites.css'

const Favorites = () => {
    const [show, setShow] = useState(false)
    const [info, setInfo] = useState(false)
    const { favorites, handleDeleteFavorites } = useContext(FavoritesContext);

    useEffect(() => {
        window.scroll({
            top: 0,
            behavior: 'smooth'
        })
    }, [])

    const handleClose = () => setShow(false);
    const handleShow = (data) => {
        setShow(true);
        setInfo(data);
    };

    return (
        <div className="favorites">
            <div className="favorites__container">
                <div className="container">
                    <div className="favorites__box">
                        <h1 className="text-center">Danh sách yêu thích</h1>
                        {(favorites && favorites.length > 0 &&
                            <Table striped bordered className="fav-table">
                                <thead className="fav-table__head">
                                    <tr>
                                        <th>STT</th>
                                        <th>Người bán</th>
                                        <th>Tên sản phẩm</th>
                                        <th>Giá</th>
                                        <th>Liên hệ</th>
                                        <th>Ngày đăng bán</th>
                                        <th>Ảnh</th>
                                        <th>Xóa</th>
                                        <th>Chi tiết</th>
                                    </tr>
                                </thead>
                                <tbody className="fav-table__body">
                                    {favorites.map((favorite, index) =>
                                        <tr key={index} className="subnav-item">
                                            <td>{index + 1}</td>
                                            <td>{favorite.seller}</td>
                                            <td>{favorite.name}</td>
                                            <td>{favorite.price}</td>
                                            <td>{favorite.phone}</td>
                                            <td>{favorite.createdDate}</td>
                                            <td>
                                                <img src={favorite.image} alt="fav-img" className="fav__img" />
                                            </td>
                                            <td className="favorites__delete" onClick={() => handleDeleteFavorites(favorite)}>Xóa</td>
                                            <td className="favorites__detail" onClick={() => handleShow(favorite)}>Chi tiết</td>
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
                <DetailModal info={info} show={show} handleClose={handleClose} />
            </div>
        </div>
    )
}

export default Favorites
