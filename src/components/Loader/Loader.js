import { BallTriangle } from 'react-loader-spinner';
import { StyledLoader } from '../styles.styled';

const Loader = () => {
  return (
    <StyledLoader>
      <BallTriangle
        height={100}
        width={100}
        radius={5}
        color="blue"
        ariaLabel="ball-triangle-loading"
        wrapperClass={{}}
        wrapperStyle=""
        visible={true}
      />
    </StyledLoader>
  );
};

export default Loader;
