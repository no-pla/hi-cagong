import React from 'react';
import styled from 'styled-components';
import CustomButton from '../common/CustomButton';

type AuthModalProp = {
  children?: React.ReactNode;
};

const AuthModal = ({ children }: AuthModalProp) => {
  return (
    <AuthModalWrap>
      <Modal>
        <div>{children}</div>
      </Modal>
    </AuthModalWrap>
  );
};

export default AuthModal;

const AuthModalWrap = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  width: 100%;
  height: 100%;
  z-index: 9999999;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Modal = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  border-radius: 4px;
  color: #000;
  background-color: #fff;
  padding: 24px 36px;

  > div {
    margin: 4px 0;
    > p {
      margin: 8px 0;
    }
  }
`;

export const AuthTitle = styled.div`
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 16px;
`;
