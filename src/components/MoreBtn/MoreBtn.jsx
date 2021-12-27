import React from 'react'
import './MoreBtn.css'

const MoreBtn = ({ currentPosts, postsPerPage, filter, indexOfLastPost, handlePageClickMore, handlePageClickCollapse, load }) => {
    if (currentPosts && currentPosts.length === indexOfLastPost && load === true && currentPosts.length < filter.length) {
        return <button className="more__btn" onClick={handlePageClickMore}>Xem thêm</button>
    } else if (currentPosts && load === false) {
        return <button className="more__btn more__btn--load">Đang tải...</button>
    } else if (currentPosts && currentPosts.length < indexOfLastPost && currentPosts.length > postsPerPage) {
        return <button className="more__btn" onClick={handlePageClickCollapse}>Thu gọn</button>
    }
    return <div></div>
}

export default MoreBtn
