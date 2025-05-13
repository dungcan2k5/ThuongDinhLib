import React, { useEffect, useState } from "react";
import tatdenImg from "../../../assets/bannerHome/tatden.jpg";
import orangeImg from "../../../assets/bannerHome/orange.jpg";
import chamberImg from "../../../assets/bannerHome/champerofs.jpg";
import './banner.css'

const Banner = () => {

    const banners = [
        {title: "Tắt đèn", author: "Ngô Tất Tố",
        des: "Tắt Đèn là câu chuyện đầy đau thương về chị Dậu – người phụ nữ nông dân kiên cường, chống chọi với sưu cao thuế nặng dưới xã hội phong kiến mục nát, phản ánh sâu sắc thân phận con người nghèo khổ đầu thế kỷ XX",
        img: tatdenImg},
        {title: "Cây cam ngọt của tôi", author: "Jose Mauro De Vasconcelos",
        des: "My Sweet Orange Tree theo chân Zezé – cậu bé nghèo nhưng giàu tình cảm, với trí tưởng tượng phong phú. Qua những biến cố gia đình, Zezé dần trưởng thành trong nỗi đau, lòng yêu thương và hy vọng",
        img: orangeImg},
        {title: "Harry Potter and the Chamber of Secrets", author: "J. K. Rowling",
        des: "Harry Potter and the Chamber of Secrets kể về năm học thứ hai của Harry tại trường Hogwarts, nơi hàng loạt vụ tấn công bí ẩn xảy ra. Cùng bạn bè, Harry khám phá bí mật Phòng chứa, đối đầu với quá khứ đen tối và con quái vật nguy hiểm ẩn sâu trong trường",
        img: chamberImg}
    ]
    
    const [currentIndex, setCurrentIndex] = useState(0);
    const [fade, setFade] = useState(false);

   useEffect(() => {
        const interval = setInterval(() => {
            setFade(true); // Bắt đầu fade-out
            setTimeout(() => {
                setCurrentIndex((prevIndex) => (prevIndex + 1) % banners.length);
                setFade(false); // Fade-in cái mới
            }, 500); // thời gian fade-out trước khi đổi banner (0.5s)
        }, 5000);

        return () => clearInterval(interval); // Clear interval khi unmount
    }, [banners.length]);

    const currentBanner = banners[currentIndex]

    return (
        <div className="upComing">
            <h2>Sách sắp ra mắt</h2>
            <div className={`banner ${fade ? "fade-out" : ""}`}>
                <div className="banner_des">
                    <h2>{currentBanner.title}</h2>
                    <h3>{currentBanner.author}</h3>
                    <div className="Cross"></div>
                    <p>{currentBanner.des}</p>
                </div>
                <div className="banner_img">
                    <img src={currentBanner.img} alt="" />
                </div>
            </div>
        </div>
    )
}

export default Banner