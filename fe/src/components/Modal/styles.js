import { styled } from 'styled-components';

export const Overlay = styled.div`
  align-items: center;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(5px);
  display: flex;
  left: 0;
  position: fixed;
  height: 100%;
  top: 0;
  justify-content: center;
  width: 100%;
`;

export const Container = styled.div`
  background: #fff;
  border-radius: 4px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.04);
  max-width: 450px;
  padding: 24px;
  width: 100%;

  > h1 {
    font-size: 22px;
    color: ${({ theme, danger }) => (
    danger ? theme.colors.danger.main : theme.colors.gray[900]
  )}
  }

  .modal-body {
    margin-top: 32px;
  }
`;

export const Footer = styled.footer`
  margin-top: 32px;
  display: flex;
  align-items: center;
  justify-content: flex-end;

  .cancel-button {
    background: transparent;
    border: none;
    font-size: 16px;
    margin-right: 24px;
    color: ${({ theme }) => theme.colors.gray[200]};

    &[disabled] {
      cursor: default;
    }
  }
`;
