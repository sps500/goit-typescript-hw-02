import css from './ImageGallery.module.css';
import { Image } from '../../types'; 
import ImageCard from '../ImageCard/ImageCard'; 

interface ImageGalleryProps {
  images: Image[];
  onImageClick: (image: Image) => void;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ images, onImageClick }) => {
  return (
    <div className={css.gallery}>
      {images.map((image) => (
        <div className={css.galleryItem} key={image.id} onClick={() => onImageClick(image)}>
          <ImageCard image={image} />
        </div>
      ))}
    </div>
  );
};

export default ImageGallery;

