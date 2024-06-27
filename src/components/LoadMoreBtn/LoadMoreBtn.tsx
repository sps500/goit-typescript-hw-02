interface LoadMoreBtnProps {
  onClick: () => void;
}

const LoadMoreBtn: React.FC<LoadMoreBtnProps> = ({ onClick }) => (
  <button onClick={onClick}>Load more</button>
);

export default LoadMoreBtn;
