import React, { useState, useEffect } from "react";
import SearchBar from "./components/SearchBar/SearchBar";
import { searchCollections } from "./galeryApi";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn";
import Loader from "./components/Loader/Loader";
import ImageModal from "./components/ImageModal/ImageModal";
import { photosType, selectedImageType } from "./types";

function App() {
  const [inputValue, setInputValue] = useState<string>("");
  const [photos, setPhotos] = useState<photosType[]>([]);
  const [page, setPage] = useState(1);
  const [showBtnMore, setShowBtnMore] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<selectedImageType>({
    img: undefined,
    alt: undefined,
  });

  const handleFormSubmit = (value: string): void => {
    setInputValue(value);
    setPage(1);
    setPhotos([]);
  };

  useEffect(() => {
    if (inputValue) {
      setShowBtnMore(false);
      setIsLoading(true);
      searchCollections({ query: inputValue, page })
        .then((data) => {
          setIsError(false);
          setPhotos((prevPhotos) => [...prevPhotos, ...data.results]);
          setShowBtnMore(page < data.total_pages && data.total_pages > 0);
        })
        .catch(() => {
          setIsError(true);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [inputValue, page]);

  const increasePage = (): void => {
    setPage((prevPage) => prevPage + 1);
  };

  const handleClickImg = ({ img, alt }: selectedImageType): void => {
    setSelectedImage({ img, alt });
    setIsOpen(true);
  };

  const handleOpenModal = (value: boolean) => {
    setIsOpen(value);
  };

  return (
    <div>
      <SearchBar onSubmit={handleFormSubmit} />
      <ImageGallery photos={photos} onClick={handleClickImg} />
      {isLoading && <Loader />}
      {isError && <p>Oops! There was an error! Try again</p>}
      {showBtnMore && <LoadMoreBtn increasePage={increasePage} />}
      <ImageModal
        isOpen={modalIsOpen}
        onOpen={handleOpenModal}
        image={selectedImage}
      />
    </div>
  );
}

export default App;
