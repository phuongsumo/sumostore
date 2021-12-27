import React, { useEffect, useState, useContext } from 'react'
import { UserContext } from "../UserContext/UserContext"
import { Table } from 'react-bootstrap'
import './SaleTable.css'
import DetailFix from './DetailFix'

const SaleTable = ({ motors, cars, oldCars, oldMotors, handleVehicle }) => {
    const { user } = useContext(UserContext);
    const [vehicles, setVehicles] = useState([]);
    const [info, setInfo] = useState([]);
    const [show, setShow] = useState(false);

    useEffect(() => {
        const listData = motors.concat(cars, oldCars, oldMotors)
        setVehicles(listData.filter(data => data.seller === user.username));
    }, [motors, cars, oldCars, oldMotors, user]);

    const handleShowDetail = (data) => {
        setInfo(data)
        setShow(true)
    }

    const handleClose = () => {
        setShow(false)
    }

    return (
        <>
            <Table striped bordered className="sale-table">
                <thead className="sale-table__head">
                    <tr>
                        <th>STT</th>
                        <th>Tên sản phẩm</th>
                        <th>Giá bán</th>
                        <th>Nơi bán</th>
                        <th>Ngày đăng</th>
                        <th>Ảnh</th>
                    </tr>
                </thead>
                <tbody className="sale-table__body">
                    {vehicles && vehicles.map((vehicle, index) => (
                        <tr key={index}>
                            <td>{index}</td>
                            <td>{vehicle.name}</td>
                            <td>{vehicle.price}</td>
                            <td>{vehicle.address}</td>
                            <td>{vehicle.createdDate}</td>
                            <td
                                style={{
                                    width: "5%",
                                }}
                            >
                                <img
                                    src={vehicle.image} alt=""
                                    style={{
                                        width: "100%",
                                    }}
                                />
                            </td>
                            <td className="text-danger delete__user" onClick={() => handleVehicle(vehicle.id, vehicle.productType)}>Xóa</td>
                            <td className="text-success detail-btn" onClick={() => handleShowDetail(vehicle)}>Chi tiết</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <DetailFix
                show={show}
                info={info}
                handleClose={handleClose}
            />
        </>
    )
}

export default SaleTable
