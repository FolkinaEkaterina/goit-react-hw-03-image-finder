import { Component } from 'react';
import { animateScroll } from 'react-scroll';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import toast, { Toaster } from 'react-hot-toast';
import getImages from 'services/image-service';
import Searchbar from './Searchbar/Searchbar';
import Button from './Button/Button';
import ImageGallery from './ImageGallery/ImageGallery';
import Loader from './Loader/Loader';
import { Container } from './styles.styled';
import Modal from './Modal/Modal';

export class App extends Component {
  state = {
    query: '',
    images: [],
    page: 1,
    isLoading: false,
    showLoadMoreBtn: false,
    isEmpty: false,
    error: '',
    largeImageUrl: '',
    alt: '',
  };

  componentDidUpdate(_, prevState) {
    if (
      prevState.query !== this.state.query ||
      prevState.page !== this.state.page
    ) {
      this.setState({ isLoading: true });
      getImages(this.state.query, this.state.page)
        .then(data => {
          if (!data.hits.length) {
            this.setState({ isEmpty: true });
            toast.error('Sorry. There are no images ... 😭');
            return;
          }
          this.setState(prevState => ({
            images: [...prevState.images, ...data.hits],
            showLoadMoreBtn: this.state.page < Math.ceil(data.total / 12),
          }));
          if (this.state.page >= Math.ceil(data.total / 12))
            toast.error(
              `We're sorry, but you've reached the end of search results.`
            );
        })
        .catch(err => {
          console.log(err);
          this.setState({ error: err.message });
        })
        .finally(() => {
          this.setState({ isLoading: false });
        });
    }
  }

  onSubmit = query => {
    this.setState({
      query,
      page: 1,
      images: [],
      showLoadMoreBtn: false,
      isEmpty: false,
      error: '',
    });
  };

  onLoadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
    this.scrollOnMoreButton();
  };

  scrollOnMoreButton = () => {
    animateScroll.scrollToBottom({
      duration: 1000,
      delay: 10,
      smooth: 'linear',
    });
  };

  toggleModal = (largeImageUrl = '', alt = '') => {
    this.setState({ largeImageUrl: largeImageUrl, alt: alt });
    !largeImageUrl
      ? enableBodyScroll(document.body)
      : disableBodyScroll(document.body);
  };

  render() {
    return (
      <Container>
        <Searchbar onSubmit={this.onSubmit} />
        <ImageGallery
          onCardClick={this.toggleModal}
          images={this.state.images}
        />
        {this.state.showLoadMoreBtn && <Button onLoadMore={this.onLoadMore} />}
        {this.state.isLoading && <Loader />}
        {this.state.largeImageUrl && (
          <Modal
            largeImageUrl={this.state.largeImageUrl}
            alt={this.state.alt}
            onClose={this.toggleModal}
          />
        )}
        <Toaster />
      </Container>
    );
  }
}
