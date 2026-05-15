import ImageSlider from "./ImageSlider";

export default function AdBlock({ images }) {
  return (
    <>
      <div style={{ width: "100%", marginBottom: "20px" }}>
        <ImageSlider images={images} />
      </div>
    </>
  );
}
