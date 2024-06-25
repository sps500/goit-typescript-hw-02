const ImageCard = ({ image }) => (
  <div>
    <img src={image.urls.small} alt={image.alt_description} />
  </div>
);

export default ImageCard;
