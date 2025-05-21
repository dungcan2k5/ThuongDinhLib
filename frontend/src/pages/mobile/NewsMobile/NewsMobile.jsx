import "react-slideshow-image/dist/styles.css";
import "./NewsMobile.css";
import news1 from "../../../assets/mobile-imgs/newsImgs/chi-pheo.jpg";
import news2 from "../../../assets/mobile-imgs/newsImgs/lao-hac.jpg";
import news3 from "../../../assets/mobile-imgs/newsImgs/the-little-prince.jpg";
import news4 from "../../../assets/mobile-imgs/newsImgs/To-Kill-A-Mockingbird.jpg";
import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Autoplay } from "swiper/modules";

const news = [
  {
    title: "Chí Phèo",
    description:
      "Truyện ngắn nổi tiếng của Nam Cao, kể về bi kịch của người nông dân bị xã hội tha hóa, khát khao được làm người lương thiện nhưng bị chối bỏ.",
    image: news1,
  },
  {
    title: "Lão Hạc",
    description:
      "Câu chuyện cảm động về người nông dân nghèo khổ nhưng đầy lòng tự trọng, qua đó phản ánh tình cảnh khốn khó của nông thôn Việt Nam xưa.",
    image: news2,
  },
  {
    title: "The Little Prince",
    description:
      "Tác phẩm triết lý nhẹ nhàng của Antoine de Saint-Exupéry, qua cuộc phiêu lưu của hoàng tử bé, truyền tải những bài học về tình bạn, tình yêu và cái nhìn trong sáng về cuộc sống.",
    image: news3,
  },
  {
    title: "To Kill a Mockingbird",
    description:
      "Tiểu thuyết kinh điển của Harper Lee, khám phá các vấn đề công lý, đạo đức và phân biệt chủng tộc ở nước Mỹ thông qua ánh mắt ngây thơ của một đứa trẻ.",
    image: news4,
  },
];

const NewsMobile = () => {
  return (
    <div className="news-mobile">
      <h2>Sắp ra mắt</h2>
      <Swiper
        centeredSlides={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        modules={[Autoplay]}
        className="mySwiper"
      >
        {news.map((item, index) => (
          <SwiperSlide key={index}>
            <div className="content-container">
              <div className="text-content">
                <span className="subheading">{item.title}</span>
                <p>{item.description}</p>
              </div>
              <div className="image-content">
                <img src={item.image} alt={item.title} className="book-cover" />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default NewsMobile;
