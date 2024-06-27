import Modal from 'react-modal';
import css from './ImageModal.module.css';
import { Image } from '../../types';

Modal.setAppElement('#root');

interface ImageModalProps {
  image: Image | null;
  onClose: () => void;
}

const ImageModal: React.FC<ImageModalProps> = ({ image, onClose }) => (
  <Modal
    isOpen={!!image}
    onRequestClose={onClose}
    overlayClassName={css.Overlay}
    className={css.Content}
  >
    {image && (
      <div>
        <img src={image.urls.regular} alt={image.alt_description} />
        <p>{image.description || 'No description'}</p>
        <p>Author: {image.user.name}</p>
        <p>Likes: {image.likes}</p>
      </div>
    )}
  </Modal>
);

export default ImageModal;

