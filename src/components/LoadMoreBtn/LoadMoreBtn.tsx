import { FC } from 'react';
import css from './LoadMoreBtn.module.css';

interface LoadMoreBtnProps {
  increasePage: () => void;
}

const LoadMoreBtn: FC<LoadMoreBtnProps> = ({ increasePage }) => {
  return (
    <button type="button" onClick={increasePage} className={css.btn}>
      Load More
    </button>
  );
};

export default LoadMoreBtn;