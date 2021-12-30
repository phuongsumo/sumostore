import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Carousel, Container, Row, Col } from "react-bootstrap"
import AOS from 'aos';
import 'aos/dist/aos.css';

import "bootstrap/dist/css/bootstrap.min.css"
import "./HomePage.css"
import image1 from "./img/image1.jpg"
import image2 from "./img/image2.jpg"
import image3 from "./img/image3.gif"

const HomePage = ({ index }) => {
    AOS.init();
    useEffect(() => {
        window.scroll({
            top: 0,
            behavior: 'smooth'
        })
        const active = document.querySelectorAll('.nav-link')
        active[index].classList.add('active')
        return () => {
            document.querySelector('.nav-link.active').classList.remove('active')
        }
    }, [index])
    return (
        <div className="homepage bg-dark">
            <Container>
                <Carousel className="slider__container" interval={5000}>
                    <Carousel.Item className="slider__item">
                        <img
                            className="d-block slider__img"
                            src={image1}
                            alt="Car"
                        />
                        <Carousel.Caption>
                            <h3 data-aos="fade-left" className="slider__title"><Link className="slider__link" to="/newcar">Xe Hơi</Link></h3>
                            <p data-aos="fade-right" className="slider__description">Bạn muốn mua, bán xe cũ, mới hãy tới với chúng tôi</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item className="slider__item">
                        <img
                            className="d-block slider__img"
                            src={image2}
                            alt="Motorbikes"
                        />
                        <Carousel.Caption>
                            <h3 className="slider__title"><Link className="slider__link" to="/motorbikes">Xe Máy</Link></h3>
                            <p className="slider__description">Bạn có đam mê với phân khối lớn, mua ngay!!!</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item className="slider__item">
                        <img
                            className="d-block slider__img"
                            src={image3}
                            alt="OldMotor"
                        />
                        <Carousel.Caption>
                            <h3 className="slider__title"><Link className="slider__link" to="/oldmotors">Xe Cũ</Link></h3>
                            <p className="slider__description">Bạn là Racing Boy đang cần chiến mã???</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                </Carousel>
                <Row>
                    <Col lg={8}>
                        <div data-aos="fade-right" className="mt-4 home__content">
                            <div className="home__sell">
                                <h4 data-aos="fade-left">Bạn muốn bán xe?</h4>
                                <Link data-aos="fade-right" className="slider__link" to="/addvehicle">Bán ngay</Link>
                            </div>
                        </div>
                    </Col>
                    <Col lg={4}>
                        <div data-aos="fade-left" className="mt-4 home__content">
                            <div className="home__old-car">
                                <h4 data-aos="fade-right">Bạn muốn mua xe ô tô cũ?</h4>
                                <Link data-aos="fade-left" className="slider__link" to="/oldcars">Mua ngay</Link>
                            </div>
                        </div>
                    </Col>
                    <Col lg={12}>
                        <div data-aos="fade-right" className="mt-4 home__content">
                            <div className="home__audi">
                                <h4 data-aos="fade-left">Audi - Đương đầu mọi thử thách.</h4>
                                <a data-aos="fade-right" className="slider__link" href="https://www.audi.vn/sea/web/vnvi.html">Khám phá ngay</a>
                            </div>
                        </div>
                    </Col>
                    <Col lg={12}>
                        <div data-aos="fade-left" className="mt-4 home__content">
                            <div className="home__lambor">
                                <h4 data-aos="fade-right">Lamborghini - Bứt phá mọi giới hạn.</h4>
                                <a data-aos="fade-left" className="slider__link" href="https://www.lamborghini.com/en-en">Khám phá ngay</a>
                            </div>
                        </div>
                    </Col>
                    <Col lg={12}>
                        <div data-aos="fade-left" className="mt-4 home__content">
                            <div className="home__honda">
                                <h4 data-aos="fade-right">Honda - Luôn vì bạn.</h4>
                                <a data-aos="fade-left" className="slider__link" href="https://www.honda.com.vn/">Khám phá ngay</a>
                            </div>
                        </div>
                    </Col>
                    <Col lg={12}>
                        <div data-aos="fade-right" className="mt-4 home__content">
                            <div className="home__ferrari">
                                <h4 data-aos="fade-left">Ferrari - Essere Ferrari - Being Ferrari.</h4>
                                <a data-aos="fade-right" className="slider__link" href="https://www.ferrari.com/en-EN">Khám phá ngay</a>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default HomePage

