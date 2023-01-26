import React, { Dispatch, SetStateAction, useState } from 'react';
import styled from 'styled-components';
import CustomButton from '../common/CustomButton';

type LoginProps = {
  onClickopenModal: () => void;
  email?: string;
  paswword?: string;
};

const Login = ({ onClickopenModal }: LoginProps) => {
  const [authValue, setAuthValue] = useState({
    email: '',
    password: '',
  });

  const { email, password } = authValue;

  const onChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === 'email') {
      setAuthValue({
        ...authValue,
        email: value,
      });
    } else if (name === 'password') {
      setAuthValue({
        ...authValue,
        password: value,
      });
    }
    console.log(value);
  };

  return (
    <ModalBackground>
      <ModalWrap>
        <Title>로그인</Title>
        <FormWrap>
          <Input
            type="text"
            name={email}
            placeholder="이메일을 입력해 주세요."
            required
            value={email}
            onChange={onChangeValue}
          />
          <Input
            name={password}
            type="text"
            placeholder="비밀번호를 입력해 주세요."
            required
            value={password}
            onChange={onChangeValue}
          />
          <Singup>회원가입</Singup>
          <ButtonWrap>
            <CustomButton
              bgColor="#33a264"
              height={12}
              onClick={onClickopenModal}
            >
              로그인
            </CustomButton>
            <CustomButton height={12} bgColor="#000" onClick={onClickopenModal}>
              취소
            </CustomButton>
          </ButtonWrap>
        </FormWrap>
        <ButtonWrap>
          <CustomButton>
            <img src="/img/google.png" alt="구글" />
          </CustomButton>
          <CustomButton>
            <img src="/img/github.png" alt="구글" />
          </CustomButton>
        </ButtonWrap>
      </ModalWrap>
    </ModalBackground>
  );
};

export default Login;

export const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  background: rgba(0, 0, 0, 0.5);
`;

export const ModalWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 24px 28px;
  background-color: #fff;
  border-radius: 16px;
  color: #000;
`;

const Title = styled.h2`
  font-size: 24px;
  font-weight: 700;
`;

const FormWrap = styled.form`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 320px;
  margin: 1em 0;
`;

const Singup = styled.button`
  color: #878787;
  margin: 1em;
  cursor: pointer;
`;

const ButtonWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 4px 0;
`;

const Input = styled.input`
  border: 0;
  border-bottom: 1px solid #ddd;
  background: transparent;
  padding: 8px;
  margin: 4px;
`;
