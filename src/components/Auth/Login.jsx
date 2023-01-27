import {
  createUserWithEmailAndPassword,
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from 'firebase/auth';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { authService } from '../../firebase';
import { emailRegex } from '../../until';
import CustomButton from '../common/CustomButton';
import AuthModal, { AuthTitle } from './AuthModal';
import Join from './Join';

const Login = ({ onClickLogin, onClickJoin }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [notMember, setNotMember] = useState(false);
  const [wrongPassword, setWrongPassword] = useState(false);
  const [signUp, setSignUp] = useState(false);
  const [checkedUser, setCheckedUser] = useState('');
  const matchCheckEmail = email.match(emailRegex);

  const onSubmit = async (e) => {
    e.preventDefault();

    await signInWithEmailAndPassword(authService, email, password)
      .then(() => {
        setEmail('');
        setPassword('');
        navigate('/');
      })
      .catch((err) => {
        // errorMessage = err.message;
        if (err.message.includes('user-not-found')) {
          setNotMember(!notMember);
        }
        if (err.message.includes('wrong-password')) {
          setWrongPassword(!wrongPassword);
        }
      });
  };

  const onGitHubSignIn = async () => {
    let provider = new GithubAuthProvider();
    await signInWithPopup(authService, provider);
  };
  const onGoogleSignIn = async () => {
    let provider = new GoogleAuthProvider();
    await signInWithPopup(authService, provider);
  };

  return (
    <ModalBackground>
      <ModalWrap>
        <Title>로그인</Title>
        <FormWrap onSubmit={onSubmit}>
          <Input
            type="text"
            name={email}
            placeholder="이메일을 입력해 주세요."
            // required
            value={email}
            onChange={(e) => {
              const value = e.target.value;
              setEmail(value);
            }}
            onKeyPress={(e) => {
              e.key === 'Enter' && e.preventDefault();
            }}
          />

          {!matchCheckEmail ? (
            email ? (
              <ErrorMessage>올바른 이메일 형식이 아닙니다.</ErrorMessage>
            ) : null
          ) : (
            <OkMessage>올바른 이메일 형식입니다.</OkMessage>
          )}

          <Input
            name={password}
            type="password"
            placeholder="비밀번호를 입력해 주세요."
            // required
            value={password}
            onChange={(e) => {
              const value = e.target.value;
              setPassword(value);
            }}
          />

          <ButtonWrap>
            <CustomButton bgColor="#33a264" height={12}>
              로그인
            </CustomButton>
            <CustomButton height={12} bgColor="#000" onClick={onClickLogin}>
              취소
            </CustomButton>
          </ButtonWrap>
        </FormWrap>

        <ButtonWrap>
          <span onClick={onGoogleSignIn}>
            <img src="/img/google.png" alt="구글" />
          </span>
          <span onClick={onGitHubSignIn}>
            <img src="/img/github.png" alt="구글" />
          </span>
        </ButtonWrap>
        {/* 회원가입 */}
        <Singup onClick={onClickJoin}>회원가입</Singup>
        {signUp && <Join />}
      </ModalWrap>

      {/* 회원이 아닌경우 */}
      {notMember && (
        <AuthModal>
          <AuthTitle>회원이 아닙니다.</AuthTitle>
          <p>회원가입을 해주세요</p>
          <CustomButton
            bgColor="#444444"
            height={8}
            width={16}
            onClick={() => setNotMember(!notMember)}
          >
            되돌아가기
          </CustomButton>
        </AuthModal>
      )}
      {/* 비밀번호가 틀린경우 */}
      {wrongPassword && (
        <AuthModal>
          <AuthTitle>비밀번호가 틀렸습니다.</AuthTitle>
          <p>다시 확인 해주세요.</p>
          <CustomButton
            bgColor="#444444"
            height={8}
            width={16}
            onClick={() => setWrongPassword(!wrongPassword)}
          >
            되돌아가기
          </CustomButton>
        </AuthModal>
      )}
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

export const Title = styled.h2`
  font-size: 24px;
  font-weight: 700;
`;

export const FormWrap = styled.form`
  display: flex;
  flex-direction: column;
  /* gap: 8px; */
  width: 320px;
  margin: 1em 0;
`;

const Singup = styled.button`
  color: #33a264;
  font-weight: 600;
  margin-top: 16px;
  cursor: pointer;
`;

export const ButtonWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 24px;
  padding: 4px 0;
  width: 100%;

  > span {
    cursor: pointer;
  }
`;

export const Input = styled.input`
  border: 0;
  border-bottom: 1px solid #ddd;
  background: transparent;
  padding: 8px;
  margin: 4px 4px 8px 4px;
`;

export const ErrorMessage = styled.p`
  color: red;
  font-size: 12px;
  padding: 0 8px;
`;
export const OkMessage = styled.p`
  color: #33a264;
  font-size: 12px;
  padding: 0 8px;
`;
