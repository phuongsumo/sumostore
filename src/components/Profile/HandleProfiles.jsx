import React from 'react'
import { Modal, Button, Form } from 'react-bootstrap'
import { useForm } from "react-hook-form"
// import Axios from 'axios'

// const usersApi = "https://61bfeebfb25c3a00173f4f68.mockapi.io/api/v1/account";
const HandleProfiles = ({ info, showProfiles, handleShowProfiles }) => {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = (data) => {
        // Axios.patch(`${usersApi}/${info.id}`, data)
        //     .then(res => console.log(res))
        console.log(data);
    }

    return (
        <Modal
            show={showProfiles}
            onHide={handleShowProfiles}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title className="modal__title">Sửa thông tin tài khoản</Modal.Title>
            </Modal.Header>
            {info &&
                <Modal.Body className="show-grid modal__body">
                    <Form className="row" onSubmit={handleSubmit(onSubmit)}>
                        <Form.Group className="mb-3 col-md-6" name="name">
                            <Form.Label className="add__label">Họ tên:</Form.Label>
                            <Form.Control
                                className="add__input"
                                type="text"
                                defaultValue={info.name}
                                {...register("name", { required: true })} />
                            {errors.name && <span className="text-danger">Vui lòng nhập trường này</span>}
                        </Form.Group>
                        <Form.Group className="mb-3 col-md-6" name="email">
                            <Form.Label className="add__label">Email:</Form.Label>
                            <Form.Control
                                className="add__input"
                                type="text"
                                defaultValue={info.email}
                                {...register("email", { required: true })} />
                            {errors.email && <span className="text-danger">Vui lòng nhập trường này</span>}
                        </Form.Group>
                        <Form.Group className="mb-3 col-md-6" name="phone">
                            <Form.Label className="add__label">Số điện thoại:</Form.Label>
                            <Form.Control
                                className="add__input"
                                type="text"
                                defaultValue={info.phone}
                                {...register("phone", { required: true })} />
                            {errors.phone && <span className="text-danger">Vui lòng nhập trường này</span>}
                        </Form.Group>
                        <Form.Group className="mb-3 col-md-6" name="password">
                            <Form.Label className="add__label">Mật khẩu:</Form.Label>
                            <Form.Control
                                className="add__input"
                                type="text"
                                defaultValue={info.password}
                                {...register("password", { required: true })} />
                            {errors.password && <span className="text-danger">Vui lòng nhập trường này</span>}
                        </Form.Group>
                        <Button className="add__btn mt-3" variant="primary" type="submit">
                            Lưu thay đổi
                        </Button>
                        <p className="mt-3">*Do một số lỗi ở phía máy chủ nên hiện tại chức năng sửa chưa hoạt động</p>
                    </Form>
                </Modal.Body>}
        </Modal>
    )
}

export default HandleProfiles
