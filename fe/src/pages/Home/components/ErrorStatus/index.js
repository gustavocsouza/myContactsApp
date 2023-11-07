import PropTypes from 'prop-types';

import Button from '../../../../components/Button';
import sad from '../../../../assets/images/icons/sad.svg';

import { Container } from './styles';

export default function ErrorStatus({ onRefetchContacts }) {
  return (
    <Container>
      <img src={sad} alt="Sad" />
      <div className="details">
        <strong>Ocorreu um erro ao obter os seus contatos!</strong>
        <Button type="button" onClick={onRefetchContacts}>
          Tentar Novamente
        </Button>
      </div>
    </Container>
  );
}

ErrorStatus.propTypes = {
  onRefetchContacts: PropTypes.func.isRequired,
};
