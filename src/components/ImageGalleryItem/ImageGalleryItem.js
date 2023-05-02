import PropTypes from 'prop-types';
import { StyledItem, StyledImage } from '../styles.styled';

const ImageGalleryItem = ({ obj, onCardClick }) => {
  return (
    <StyledItem onClick={() => onCardClick(obj.largeImageURL, obj.tags)}>
      <StyledImage src={obj.webformatURL} alt={obj.tags} />
    </StyledItem>
  );
};

ImageGalleryItem.propTypes = {
  onCardClick: PropTypes.func.isRequired,
  obj: PropTypes.shape({
    webformatURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
  }),
};

export default ImageGalleryItem;
