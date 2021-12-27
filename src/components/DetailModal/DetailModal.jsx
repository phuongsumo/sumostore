import React from 'react'
import { Modal, Button, Container, Row, Col } from 'react-bootstrap'

const DetailModal = ({ info, show, handleClose }) => {
    return (
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
                                <p className="modal__description">Người bán: {info.seller}</p>
                                <p className="modal__description">Giá: {info.price}</p>
                                <p className="modal__description">Liên hệ: {info.phone}</p>
                                <p className="modal__description">Nơi bán: {info.address}</p>
                                <p className="modal__description">Ngày đăng bán: {info.createdDate}</p>
                                <p className="modal__description">Mô tả: {info.description}</p>
                            </Col>
                        </Row>
                    </Container>
                </Modal.Body>}
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Đóng
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default DetailModal
