import ImageCard from "../ImageCard/ImageCard";
import css from "./ImageGallery.module.css";
const ImageGallery = ({ images, onImageClick }) => (
  <ul className={css.image_gallery}>
    {images.map((image) => (
      <li key={image.id} onClick={() => onImageClick(image)}>
        <ImageCard image={image} />
      </li>
    ))}
  </ul>
);

export default ImageGallery;
