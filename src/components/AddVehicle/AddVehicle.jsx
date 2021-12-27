import React, { useState, useEffect, useContext } from 'react'
import { useForm } from "react-hook-form";
import { Form, Button, FloatingLabel } from 'react-bootstrap'
import { UserContext } from '../UserContext/UserContext'
import Axios from 'axios'

import './AddVehicle.css'

const api = 'https://61bff171b25c3a00173f4f80.mockapi.io/api/vehicles';
const apiImage = 'https://api.cloudinary.com/v1_1/sumoshop/image/upload';

const AddVehicle = ({ index }) => {
    const { user } = useContext(UserContext);
    const [image, setImage] = useState();
    const [imageSelected, setImageSelected] = useState();
    const [newDate, setNewDate] = useState();

    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    useEffect(() => {
        window.scroll({
            top: 0,
            behavior: 'smooth'
        })
        const active = document.querySelectorAll('.nav-link')
        active[index].classList.add('active')
        const newDate = () => {
            const date = new Date();
            const times = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
            setNewDate(times)
        }
        newDate();
        return () => {
            image && URL.revokeObjectURL(image.preview)
            document.querySelector('.nav-link.active').classList.remove('active')
        }
    }, [image, index])

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
        data.createdDate = newDate;

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
                Axios.post(`${api}/${type}`, data)
                    .catch(err => alert('Có lỗi xảy ra'))
            })
            .catch(err => alert('Có lỗi xảy ra'))
        setImage()
        alert('Đăng bán thành công')
        reset()
    }

    return (
        <div className="add-vehicle">
            <div className="container">
                {user.auth ? (
                    <div className="row justify-content-center">
                        <Form className="row add__container" onSubmit={handleSubmit(onSubmit)}>
                            <Form.Group className="mb-3 col-md-6" name="seller">
                                <Form.Label className="add__label">Người bán</Form.Label>
                                <Form.Control
                                    className="add__input"
                                    type="text"
                                    // placeholder={user.name}
                                    value={user.username}
                                    {...register("seller")}
                                    readOnly />
                            </Form.Group>
                            <Form.Group className="mb-3 col-md-6" name="name">
                                <Form.Label className="add__label">Tên mặt hàng*</Form.Label>
                                <Form.Control className="add__input" type="text" placeholder="..." {...register("name", { required: true })} />
                                {errors.name && <span className="text-danger">Vui lòng nhập trường này</span>}
                            </Form.Group>
                            <Form.Group className="mb-3 col-md-6" name="price">
                                <Form.Label className="add__label">Giá*</Form.Label>
                                <Form.Control className="add__input" type="text" placeholder="...USD, ...VNĐ, Thỏa thuận" {...register("price", { required: true })} />
                                {errors.price && <span className="text-danger">Vui lòng nhập trường này</span>}
                            </Form.Group>
                            <Form.Group className="mb-3 col-md-6" name="address">
                                <Form.Label className="add__label">Nơi bán*</Form.Label>
                                <Form.Select {...register("address", { required: true })}>
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
                                <Form.Control className="add__input" type="text" placeholder="Số điện thoại..." {...register("phone", { required: true })} />
                                {errors.phone && <span className="text-danger">Vui lòng nhập trường này</span>}
                            </Form.Group>
                            <Form.Group name="image" className="mb-3 col-md-6">
                                <Form.Label className="add__label">Ảnh mô tả*</Form.Label>
                                <Form.Control className="add__input" type="file" {...register("image", { required: true })} onChange={e => handleImageChange(e.target.files[0])} />
                                {errors.image && <span className="text-danger">Vui lòng chọn ảnh mô tả</span>}
                            </Form.Group>
                            {image && <img src={image.preview} alt="Ảnh mô tả" className="mt-3 col-md-6" />}
                            <Form.Label className="add__label">Loại xe*</Form.Label>
                            <Form.Group className="mb-3" name="productType">
                                <Form.Select {...register("productType", { required: true })} aria-label="Default select example">
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
                                    placeholder="Thêm mô tả tại đây"
                                    style={{ height: '80px' }}
                                />
                            </FloatingLabel>
                            <Button className="add__btn mt-3" variant="primary" type="submit">
                                Đăng bán ngay!!
                            </Button>
                        </Form>
                    </div>
                ) : (
                    <h1
                        style={{
                            zIndex: 3,
                            textAlign: 'center',
                            color: '#000'
                        }}
                    >Vui lòng đăng nhập để thực hiện chức năng này</h1>
                )}
            </div>
        </div>
    )
}

export default AddVehicle
