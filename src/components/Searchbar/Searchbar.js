import { Component } from 'react';
import toast from 'react-hot-toast';
import { FiSearch } from 'react-icons/fi';
import {
  SearchbarStyled,
  SearchForm,
  SearchFormButton,
  SearchFormInput,
} from '../styles.styled';

class Searchbar extends Component {
  state = {
    query: '',
  };

  handleInput = e => {
    this.setState({ query: e.target.value });
  };

  handleOnSubmit = e => {
    e.preventDefault();
    if (this.state.query.trim() === '') {
      toast.error('Please enter a query');
      return;
    }
    this.props.onSubmit(this.state.query);
    this.setState({ query: '' });
    e.target.reset();
  };

  render() {
    return (
      <SearchbarStyled>
        <SearchForm onSubmit={this.handleOnSubmit}>
          <SearchFormButton type="submit">
            <FiSearch size="16px" />
          </SearchFormButton>
          <SearchFormInput
            type="text"
            name="query"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={this.handleInput}
          />
        </SearchForm>
      </SearchbarStyled>
    );
  }
}

export default Searchbar;
