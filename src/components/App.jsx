import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import SearchBar from "./SearchBar/SearchBar";
import ImageGallery from "./ImageGallery/ImageGallery";
import Loader from "./Loader/Loader";
import ErrorMessage from "./ErrorMessage/ErrorMessage";
import LoadMoreBtn from "./LoadMoreBtn/LoadMoreBtn";
import ImageModal from "./ImageModal/ImageModal";
import { Toaster, toast } from "react-hot-toast";

const API_KEY = "XAi4gjsoD4e_yrJmu5T1_gJ96WGdAqdCTR6Ca5RhNjU";
const BASE_URL = "https://api.unsplash.com/search/photos";

const App = () => {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  const fetchImages = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get(BASE_URL, {
        params: { query, page, client_id: API_KEY },
      });
      console.log(response.data.results);
      setImages((prevImages) => [...prevImages, ...response.data.results]);
      setError(null);
    } catch (err) {
      setError("Failed to fetch images");
    } finally {
      setLoading(false);
    }
  }, [query, page]);

  useEffect(() => {
    if (query) {
      fetchImages();
    }
  }, [query, page, fetchImages]);

  const handleSearch = (newQuery) => {
    if (newQuery.trim() === "") {
      toast.error("Please enter a search term");
      return;
    }
    setQuery(newQuery);
    setImages([]);
    setPage(1);
  };

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handleImageClick = (image) => {
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
