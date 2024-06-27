import { Image } from '../../types'; 

interface ImageCardProps {
  image: Image;
}

const ImageCard: React.FC<ImageCardProps> = ({ image }) => (
  <div>
    <img src={image.urls.small} alt={image.alt_description} />
  </div>
);

export default ImageCard;

