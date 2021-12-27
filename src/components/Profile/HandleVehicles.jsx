import React, { useEffect, useState } from 'react'
import { Modal, Table } from 'react-bootstrap'

const HandleVehicles = ({ showVehicles, handleHideVehicles, handleVehicle, motors, cars, oldCars, oldMotors }) => {
    const [vehicles, setVehicles] = useState([])

    useEffect(() => {
        setVehicles(motors.concat(cars, oldCars, oldMotors))
    }, [motors, cars, oldCars, oldMotors]);

    return (
        <Modal show={showVehicles} fullscreen={true} onHide={handleHideVehicles}>
            <Modal.Header closeButton>
                <Modal.Title>Quản lý sản phẩm</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Table striped bordered>
                    <thead className="sale-table__head">
                        <tr>
                            <th>STT</th>
                            <th>Tên sản phẩm</th>
                            <th>Tài khoản đăng bán</th>
                            <th>Giá bán</th>
                            <th>Nơi bán</th>
                            <th>Phân loại</th>
                            <th>Ngày đăng bán</th>
                            <th>Ảnh mô tả</th>
                        </tr>
                    </thead>
                    <tbody className="sale-table__body">
                        {vehicles && vehicles.map((vehicle, index) => (
                            <tr key={index}>
                                <td>{index}</td>
                                <td>{vehicle.name}</td>
                                <td>{vehicle.seller}</td>
                                <td>{vehicle.price}</td>
                                <td>{vehicle.address}</td>
                                <td>{vehicle.productType}</td>
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
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Modal.Body>
        </Modal>
    )
}

export default HandleVehicles
