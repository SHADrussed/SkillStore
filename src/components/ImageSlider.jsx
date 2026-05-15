import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

export default function ImageSlider({ images = [] }) {
  return (
    <Swiper spaceBetween={10} slidesPerView={1} loop>
      {images.map((img, i) => (
        <SwiperSlide key={i}>
          <img src={img} style={{ width: "100%" }} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
