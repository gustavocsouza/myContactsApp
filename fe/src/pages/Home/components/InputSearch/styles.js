import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;

  input {
    width: 100%;
    background: #fff;
    border: none;
    border-radius: 25px;
    height: 50px;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
    outline: 0;
    padding: 0 16px;

    &::placeholder {
      color: #bcbcbc;
    }
  }
`;
