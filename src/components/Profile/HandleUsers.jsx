import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import { Modal, Table } from 'react-bootstrap'

const HandleUsers = ({ usersApi, showUsers, handleHideUsers }) => {
    const [load, setLoad] = useState(false)
    const [users, setUsers] = useState([])
    const [reRender, setReRender] = useState([])

    useEffect(() => {
        const getUsersData = async () => {
            setLoad(true)
            const res = await Axios.get(usersApi)
            setUsers(res.data)
            setLoad(false)
        }
        getUsersData()
    }, [usersApi, reRender])

    const handleUser = (id) => {
        if (window.confirm('Xóa tài khoản này?')) {
            Axios.delete(`${usersApi}/${id}`)
                .then(res => setReRender(res))
                .catch(error => console.error(error))
        }
    }

    return (
        <Modal show={showUsers} fullscreen={true} onHide={handleHideUsers}>
            <Modal.Header closeButton>
                <Modal.Title>Quản lý tài khoản</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Table striped bordered>
                    <thead className="sale-table__head">
                        <tr>
                            <th>STT</th>
                            <th>Tên</th>
                            <th>Tài khoản</th>
                            <th>Mật khẩu</th>
                            <th>Email</th>
                            <th>Số điện thoại</th>
                        </tr>
                    </thead>
                    <tbody className="sale-table__body">
                        {load && <tr><td>Loading...</td></tr>}
                        {users && users.map((user, index) => (
                            <tr key={index}>
                                <td>{index}</td>
                                <td>{user.name}</td>
                                <td>{user.username}</td>
                                {(user.username !== 'admin' &&
                                    <td>{user.password}</td>)
                                    || <td>******</td>
                                }
                                <td>{user.email}</td>
                                <td>{user.phone}</td>
                                {(
                                    user.username !== 'admin'
                                    &&
                                    <td className="text-danger delete__user" onClick={() => handleUser(user.id)}>Xóa</td>
                                )
                                    ||
                                    <td></td>
                                }
                            </tr>
                        ))}

                    </tbody>
                </Table>
            </Modal.Body>
        </Modal>
    )
}

export default HandleUsers
