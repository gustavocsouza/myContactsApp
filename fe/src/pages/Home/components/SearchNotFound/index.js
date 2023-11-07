import PropTypes from 'prop-types';

import magnifierQuestion from '../../../../assets/images/icons/magnifier-question.svg';

import { Container } from './styles';

export default function SearchNotFound({ searchTerm }) {
  return (
    <Container>
      <img src={magnifierQuestion} alt="No user has found" />
      <span>
        Nenhum resultado foi encontrado para
        {' '}
        <strong>
          ”
          {searchTerm}
          ”
        </strong>
        .
      </span>
    </Container>
  );
}

SearchNotFound.propTypes = {
  searchTerm: PropTypes.string.isRequired,
};
