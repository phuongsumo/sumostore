import React from 'react'

const TypeVehicles = ({ type }) => {
    switch (type) {
        case ('motorbikes'):
            return <p className="modal__description">Loại xe: Xe máy mới</p>
        case ('newcars'):
            return <p className="modal__description">Loại xe: Ô tô mới</p>
        case ('oldcars'):
            return <p className="modal__description">Loại xe: Ô tô cũ</p>
        case ('oldmotors'):
            return <p className="modal__description">Loại xe: Xe máy cũ</p>
        default:
            return <div></div>;
    }
}

export default TypeVehicles
