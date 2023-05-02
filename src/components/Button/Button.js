import PropTypes from 'prop-types';
import { LoadMoreBtn } from '../styles.styled';

const Button = ({ onLoadMore }) => {
  return (
    <LoadMoreBtn type="button" onClick={onLoadMore}>
      Load more
    </LoadMoreBtn>
  );
};

Button.propTypes = {
  onLoadMore: PropTypes.func,
};

export default Button;
