import css from "./ImageGallery.module.css";
import React, { FC } from "react";
import { ImageCardsType } from "../../types";


const ImageCards: FC<ImageCardsType> = ({ img, alt, onClick}) => {
  return (
      <div className={css.img}>
      <img src={img} alt={alt} onClick={() => onClick({ img, alt } )} />
    </div>
  );
}

export default ImageCards