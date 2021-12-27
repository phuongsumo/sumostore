import React from "react";
import { Link } from "react-router-dom"
import Typed from "react-typed";


import "./Header.css"

const Header = () => {

    return (
        <div className="header" >
            <div className="header__container">
                <div className="header__info">
                    <h1>nơi mua bán xe cũ lớn nhất vịnh bắc bộ</h1>
                    <Typed
                        className="typed-text"
                        strings={["Ô tô, xe máy, xe điện", "Cũ, mới, đắp chiếu, đời nhà Tống", "Hãy chọn theo cách của bạn!"]}
                        typeSpeed={20}
                        backSpeed={30}
                        loop
                    />
                    <Link to="/homepage" className="header__btn">Bắt đầu mua hàng</Link>
                </div>
            </div>
        </div>
    )
}

export default Header
