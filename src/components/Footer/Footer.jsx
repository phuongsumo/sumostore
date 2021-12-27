import React from 'react'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { fab, faFacebook, faTiktok, faInstagram, faGithub, faYoutube, faTwitter } from "@fortawesome/free-brands-svg-icons"
import { Container, Row, Col } from 'react-bootstrap'
import hondaLogo from './honda.png'
import audiLogo from './Audi.png'
import ferrariLogo from './Ferrari.jpg'
import lamborghiniLogo from './Lamborghini.png'
import './Footer.css'

library.add(fab, faFacebook, faTiktok, faInstagram, faGithub, faYoutube, faTwitter)
const Footer = () => {
    return (
        <div className="footer">
            <Container>
                <Row className="footer__body">
                    <Col
                        xs={12}
                        sm={6}
                        lg={4}
                    >
                        <div className="footer__title">
                            <span>Điều khoản và dịch vụ</span>
                        </div>
                        <div className="footer__content">
                            <p>
                                Trang web được phát triển bởi "Phương(sumo)".
                            </p>
                            <p>
                                Mọi trao đổi, mua bán được thực hiện hoàn toàn miễn phí, không qua phí trung gian.
                            </p>
                            <p>
                                Chúng tôi chỉ chịu trách nhiệm nhận phản ánh, bảo hành với một số sản
                                phẩm do "admin" hoặc một số doanh nghiệp đăng bán, các sản phẩm khác,
                                trách nhiệm phụ thuộc hoàn toàn vào người mua, bán.
                            </p>
                            <p>
                                Lưu ý: Các sản phẩm sẽ tự động được xóa sau 14 ngày đăng bán
                                (trừ một số sản phẩm đặc biệt)
                            </p>
                        </div>
                    </Col>
                    <Col
                        xs={12}
                        sm={6}
                        lg={4}
                    >
                        <div className="footer__title">
                            <span>Hợp tác và liên kết</span>
                        </div>
                        <div className="footer__content">
                            <picture className="footer__cooperate">
                                <a href="https://www.audi.vn/sea/web/vnvi.html">
                                    <img className="cooperate__logo" src={audiLogo} alt="audi" />
                                </a>
                            </picture>
                            <picture className="footer__cooperate">
                                <a href="https://www.honda.com.vn/">
                                    <img className="cooperate__logo" src={hondaLogo} alt="honda" />
                                </a>
                            </picture>
                            <picture className="footer__cooperate">
                                <a href="https://www.ferrari.com/en-EN">
                                    <img className="cooperate__logo" src={ferrariLogo} alt="ferrari" />
                                </a>
                            </picture>
                            <picture className="footer__cooperate">
                                <a href="https://www.lamborghini.com/en-en">
                                    <img className="cooperate__logo" src={lamborghiniLogo} alt="lamborghini" />
                                </a>
                            </picture>
                        </div>
                    </Col>
                    <Col
                        xs={12}
                        sm={6}
                        lg={4}
                    >
                        <div className="footer__title">
                            <span>Kết nối với chúng tôi</span>
                        </div>
                        <div className="footer__content">
                            <div className="contact__container">
                                <a href="https://www.facebook.com/phuong.nguyenthe.568" className="contact__link">
                                    <FontAwesomeIcon
                                        icon={['fab', 'facebook']}
                                        className="contact__icon"
                                    />
                                </a>
                                <a href="https://www.tiktok.com/" className="contact__link">
                                    <FontAwesomeIcon
                                        icon={['fab', 'tiktok']}
                                        style={{
                                            color: "var(--primary-black)"
                                        }}
                                        className="contact__icon"
                                    />
                                </a>
                                <a href="https://www.instagram.com/" className="contact__link">
                                    <FontAwesomeIcon
                                        icon={['fab', 'instagram']}
                                        style={{
                                            color: "var(--primary-red)"
                                        }}
                                        className="contact__icon"
                                    />
                                </a>
                                <a href="https://github.com/" className="contact__link">
                                    <FontAwesomeIcon
                                        icon={['fab', 'github']}
                                        style={{
                                            color: "var(--primary-black)"
                                        }}
                                        className="contact__icon"
                                    />
                                </a>
                                <a href="https://www.youtube.com/" className="contact__link">
                                    <FontAwesomeIcon
                                        icon={['fab', 'youtube']}
                                        style={{
                                            color: "var(--primary-red)"
                                        }}
                                        className="contact__icon"
                                    />
                                </a>
                                <a href="https://twitter.com/?lang=vi" className="contact__link">
                                    <FontAwesomeIcon
                                        icon={['fab', 'twitter']}
                                        className="contact__icon"
                                    />
                                </a>
                            </div>
                        </div>
                        <div className="contact__container">
                            <span>Liên hệ: <a href="tel:1900100x">1900100x</a></span>
                        </div>
                        <div className="contact__container">
                            <span>Email: humgboss@gmail.com</span>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Footer
