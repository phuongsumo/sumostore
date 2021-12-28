import React, { useState, useEffect } from 'react'
import { Modal, Button, Container, Row, Col, Form, FloatingLabel } from 'react-bootstrap'
import { useForm } from "react-hook-form"
import Axios from 'axios'
import TypeVehicles from './TypeVehicles'

const api = 'https://61bff171b25c3a00173f4f80.mockapi.io/api/vehicles';
const apiImage = 'https://api.cloudinary.com/v1_1/sumoshop/image/upload';

const DetailFix = ({ show, handleClose, info }) => {
    const [showFix, setShowFix] = useState(false)
    const [image, setImage] = useState()
    const [imageSelected, setImageSelected] = useState()
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    useEffect(() => {
        return () => {
            image && URL.revokeObjectURL(image.preview)
        }
    }, [image])

    // review Image
    const handleImageChange = (data) => {
        if (data) {
            setImageSelected(data)
            const img = data
            img.preview = URL.createObjectURL(data)
            setImage(img)
        } else {
            setImage()
        }
    }

    const onSubmit = (data) => {
        const type = data.productType;
        const firstType = info.productType
        const id = info.id

        // Create form to upload Cloudinary
        const formData = new FormData();
        formData.append("file", imageSelected);
        formData.append("upload_preset", "sumostore");

        // Upload image to Cloudinary
        Axios.post(apiImage, formData)
            .then(response => {
                // Assign data to Cloudinary image URL
                data.image = response.data.secure_url

                // Post data to Api
                if (type === firstType) {
                    Axios.put(`${api}/${type}/${id}`, data)
                        .then((res) => {
                            setImage()
                            alert('Sửa đổi thành công')
                            reset()
                            setShowFix(false)
                            handleClose()
                            window.location.reload()
                        })
                        .catch(err => alert('Có lỗi xảy ra'))
                } else {
                    Axios.delete(`${api}/${firstType}/${id}`)
                        .then(res => console.log(res))
                    Axios.post(`${api}/${type}`, data)
                        .then((res) => {
                            setImage()
                            alert('Sửa đổi thành công')
                            reset()
                            setShowFix(false)
                            handleClose()
                            window.location.reload()
                        })
                }
            })
            .catch(err => alert('Có lỗi xảy ra'))
    }

    return (
        <div>
            <Modal
                show={show}
                onHide={handleClose}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title className="modal__title">Thông tin mặt hàng</Modal.Title>
                </Modal.Header>
                {info &&
                    <Modal.Body className="show-grid modal__body">
                        <Container>
                            <Row>
                                <Col xs={12}>
                                    <h3 className="modal__name">{info.name}</h3>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={12} md={6}>
                                    <img src={info.image} className="modal__img w-100" alt="" />
                                </Col>
                                <Col xs={12} md={6}>
                                    <div className="modal__description">
                                        <p>
                                            Người bán: {info.seller}
                                        </p>
                                    </div>
                                    <div className="modal__description">
                                        <p>
                                            Giá: {info.price}
                                        </p>
                                    </div>
                                    <TypeVehicles type={info.productType} />
                                    <div className="modal__description">
                                        <p>
                                            Liên hệ: {info.phone}
                                        </p>
                                    </div>
                                    <div className="modal__description">
                                        <p>
                                            Nơi bán: {info.address}
                                        </p>
                                    </div>
                                    <div className="modal__description"><p>Ngày đăng bán: {info.createdDate}</p></div>
                                    <div className="modal__description">
                                        <p>
                                            Mô tả: {info.description}
                                        </p>
                                    </div>
                                </Col>
                            </Row>
                        </Container>
                    </Modal.Body>}
                <Modal.Footer>
                    <Button variant="primary" onClick={() => setShowFix(true)}>
                        Sửa
                    </Button>
                    <Button variant="secondary" onClick={handleClose}>
                        Đóng
                    </Button>
                </Modal.Footer>
            </Modal>
            <Modal
                show={showFix}
                onHide={() => setShowFix(false)}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title className="modal__title">Sửa thông tin mặt hàng</Modal.Title>
                </Modal.Header>
                {info &&
                    <Modal.Body className="show-grid modal__body">
                        <Form className="row" onSubmit={handleSubmit(onSubmit)}>
                            <Form.Group className="mb-3 col-md-6" name="createdDate">
                                <Form.Label className="add__label">Ngày đăng bán:</Form.Label>
                                <Form.Control
                                    className="add__input"
                                    type="text"
                                    value={info.createdDate}
                                    {...register("createdDate")}
                                    readOnly />
                            </Form.Group>
                            <Form.Group className="mb-3 col-md-6" name="seller">
                                <Form.Label className="add__label">Người bán</Form.Label>
                                <Form.Control
                                    className="add__input"
                                    type="text"
                                    // placeholder={user.name}
                                    value={info.seller}
                                    {...register("seller")}
                                    readOnly />
                            </Form.Group>
                            <Form.Group className="mb-3 col-md-6" name="name">
                                <Form.Label className="add__label">Tên mặt hàng*</Form.Label>
                                <Form.Control
                                    className="add__input"
                                    type="text"
                                    defaultValue={info.name}
                                    {...register("name", { required: true })} />
                                {errors.name && <span className="text-danger">Vui lòng nhập trường này</span>}
                            </Form.Group>
                            <Form.Group className="mb-3 col-md-6" name="price">
                                <Form.Label className="add__label">Giá*</Form.Label>
                                <Form.Control
                                    className="add__input"
                                    type="text"
                                    defaultValue={info.price}
                                    {...register("price", { required: true })} />
                                {errors.price && <span className="text-danger">Vui lòng nhập trường này</span>}
                            </Form.Group>
                            <Form.Group className="mb-3 col-md-6" name="address">
                                <Form.Label className="add__label">Nơi bán*</Form.Label>
                                <Form.Select defaultValue={info.address} {...register("address", { required: true })}>
                                    <option value="">Tỉnh/Tp</option>
                                    <option value="Hà Nội">Hà Nội</option>
                                    <option value="Ninh Bình">Ninh Bình</option>
                                    <option value="Thanh Hóa">Thanh Hóa</option>
                                    <option value="Nghệ An">Nghệ An</option>
                                </Form.Select>
                                {errors.address && <span className="text-danger">Vui chọn nơi bán</span>}
                            </Form.Group>
                            <Form.Group className="mb-3 col-md-6" name="phone">
                                <Form.Label className="add__label">Số điện thoại liên hệ*</Form.Label>
                                <Form.Control
                                    className="add__input"
                                    type="text"
                                    defaultValue={info.phone}
                                    {...register("phone", { required: true })} />
                                {errors.phone && <span className="text-danger">Vui lòng nhập trường này</span>}
                            </Form.Group>
                            <Form.Group name="image" className="mb-3 col-md-6">
                                <Form.Label className="add__label">Ảnh mô tả*</Form.Label>
                                <Form.Control
                                    className="add__input"
                                    type="file"
                                    {...register("image", { required: true })}
                                    onChange={e => handleImageChange(e.target.files[0])}
                                />
                                {errors.image && <span className="text-danger">Vui lòng chọn ảnh mô tả</span>}
                            </Form.Group>
                            {image && <img src={image.preview} alt="Ảnh mô tả" className="mt-3 col-md-6" />}
                            <Form.Label className="add__label">Loại xe*</Form.Label>
                            <Form.Group className="mb-3" name="productType">
                                <Form.Select defaultValue={info.productType} {...register("productType", { required: true })} aria-label="Default select example">
                                    <option value="">Chọn loại xe</option>
                                    <option value="motorbikes">Xe máy mới</option>
                                    <option value="oldmotors">Xe máy cũ</option>
                                    <option value="newcars">Ô tô mới</option>
                                    <option value="oldcars">Ô tô cũ</option>
                                </Form.Select>
                            </Form.Group>
                            {errors.productType && <span className="text-danger">Vui lòng chọn loại xe</span>}
                            <FloatingLabel className="add__description mt-3" name="description" label="Mô tả">
                                <Form.Control
                                    className="add__input"
                                    {...register("description")}
                                    as="textarea"
                                    defaultValue={info.description}
                                    style={{ height: '80px' }}
                                />
                            </FloatingLabel>
                            <Button className="add__btn mt-3" variant="primary" type="submit">
                                Lưu thay đổi
                            </Button>
                        </Form>
                    </Modal.Body>}
            </Modal>
        </div>
    )
}

export default DetailFix
