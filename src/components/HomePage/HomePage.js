import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Carousel } from "react-bootstrap"

import "bootstrap/dist/css/bootstrap.min.css"
import "./HomePage.css"
import image1 from "./img/image1.jpg"
import image2 from "./img/image2.jpg"
import image3 from "./img/image3.gif"

const HomePage = ({ index }) => {
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
        <>
            <Carousel className="slider__container" interval={5000}>
                <Carousel.Item>
                    <img
                        className="d-block w-100 slider__img"
                        src={image1}
                        alt="Car"
                    />
                    <Carousel.Caption>
                        <h3 className="slider__title">Xe Hơi</h3>
                        <p className="slider__description">Bạn muốn mua, bán <Link className="slider__link" to="/sumostore/oldcars">xe cũ</Link>, <Link className="slider__link" to="/sumostore/newcar">mới</Link> hãy tới với chúng tôi</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100 slider__img"
                        src={image2}
                        alt="Motorbikes"
                    />
                    <Carousel.Caption>
                        <h3 className="slider__title">Xe Máy</h3>
                        <p className="slider__description">Bạn có đam mê với phân khối lớn, mua ngay <Link className="slider__link" to="/sumostore/motorbikes">tại đây</Link></p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100 slider__img"
                        src={image3}
                        alt="OldMotor"
                    />
                    <Carousel.Caption>
                        <h3 className="slider__title">Xe Cũ</h3>
                        <p className="slider__description">Bạn là Racing Boy đang cần chiến mã??? <Link className="slider__link" to="/sumostore/oldmotors">Mua ngay</Link> </p>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
        </>
    )
}

export default HomePage

