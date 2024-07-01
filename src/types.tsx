export interface photosType {
   id: number;
  cover_photo: {
    urls: {
      small: string;
    };
    alt_description: string;
  }
}

export interface selectedImageType {
  alt: string | undefined,
  img: string | undefined,
}

export interface ImageGalleryType{
    photos: photosType[],
    onClick: (obj: selectedImageType) => void,
}

export interface ImageCardsType{
    img: string,
    alt: string
    onClick: (obj: selectedImageType)=> void,
}

export interface ImageModalType{
    isOpen: boolean,
    onOpen: (value: boolean) => void,
    image: selectedImageType,
}