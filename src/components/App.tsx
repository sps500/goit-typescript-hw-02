import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import SearchBar from './SearchBar/SearchBar';
import ImageGallery from './ImageGallery/ImageGallery';
import Loader from './Loader/Loader';
import ErrorMessage from './ErrorMessage/ErrorMessage';
import LoadMoreBtn from './LoadMoreBtn/LoadMoreBtn';
import ImageModal from './ImageModal/ImageModal';
import { Toaster, toast } from 'react-hot-toast';
import { Image } from '../types'; 

const API_KEY = 'XAi4gjsoD4e_yrJmu5T1_gJ96WGdAqdCTR6Ca5RhNjU';
const BASE_URL = 'https://api.unsplash.com/search/photos';

const App: React.FC = () => {
  const [images, setImages] = useState<Image[]>([]);
  const [query, setQuery] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<Image | null>(null);

  const fetchImages = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get(BASE_URL, {
        params: { query, page, client_id: API_KEY },
      });
      setImages((prevImages) => [...prevImages, ...response.data.results]);
      setError(null);
    } catch (err) {
      setError('Failed to fetch images');
    } finally {
      setLoading(false);
    }
  }, [query, page]);

  useEffect(() => {
    if (query) {
      fetchImages();
    }
  }, [query, page, fetchImages]);

  const handleSearch = (newQuery: string) => {
    if (newQuery.trim() === '') {
      toast.error('Please enter a search term');
      return;
    }
    setQuery(newQuery);
    setImages([]);
    setPage(1);
  };

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handleImageClick = (image: Image) => {
    setSelectedImage(image);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  return (
    <div>
      <SearchBar onSubmit={handleSearch} />
      {error && <ErrorMessage message={error} />}
      {images.length > 0 && (
        <ImageGallery images={images} onImageClick={handleImageClick} />
      )}
      {loading && <Loader />}
      {images.length > 0 && !loading && (
        <LoadMoreBtn onClick={handleLoadMore} />
      )}
      {selectedImage && (
        <ImageModal image={selectedImage} onClose={handleCloseModal} />
      )}
      <Toaster />
    </div>
  );
};

export default App;



