import { useState } from "react";
import styled from "styled-components";
import { authService } from "../../firebase";
import CustomButton from "../common/CustomButton";
import { emailRegex, pwRegex } from "../../utils";
import {
  ButtonWrap,
  ErrorMessage,
  FormWrap,
  Input,
  ModalBackground,
  ModalWrap,
  OkMessage,
  Title,
} from "./Login";
import { createUserWithEmailAndPassword } from "firebase/auth";
import AuthModal, { AuthTitle } from "./AuthModal";

const Join = ({ onClickJoin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");
  const matchCheckEmail = email.match(emailRegex);
  const matchCheckPassword = password.match(pwRegex);
  const [joinFail, setJoinFail] = useState(false);
  const [joinComplete, setJoinComplete] = useState(false);
  const [joinAready, setJoinAready] = useState(false);

  const onSubmitJoin = async (event) => {
    event.preventDefault();

    await createUserWithEmailAndPassword(authService, email, password)
      .then((userCredential) => {
        setJoinComplete(true);
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.log("errorMessage:", errorMessage);
        if (errorMessage.includes("email-already-in-use")) {
          setJoinAready(true);
        }
        if (!email || !password) {
          setJoinFail(true);
        }
        if (password !== confirmpassword) {
          setJoinFail(true);
        }
      });

    setEmail("");
    setPassword("");
    setConfirmpassword("");
  };

  const completeJoin = () => {
    setJoinComplete(false);
    onClickJoin();
  };

  return (
    <ModalBackground>
      <ModalWrap>
        <Title>회원가입</Title>
        <FormWrap onSubmit={onSubmitJoin}>
          <InputWrap>
            <LabelText>이메일</LabelText>
            <Input
              type="text"
              name={email}
              placeholder="이메일을 입력해 주세요."
              value={email}
              onChange={(e) => {
                const value = e.target.value;
                setEmail(value);
              }}
              onKeyPress={(e) => {
                e.key === "Enter" && e.preventDefault();
              }}
            />
            {!matchCheckEmail ? (
              email ? (
                <ErrorMessage>올바른 이메일 형식이 아닙니다.</ErrorMessage>
              ) : null
            ) : (
              <OkMessage>올바른 이메일 형식입니다.</OkMessage>
            )}
          </InputWrap>

          <InputWrap>
            <LabelText>비밀번호</LabelText>
            <Input
              name={password}
              type="text"
              placeholder="비밀번호를 입력해 주세요."
              value={password}
              onChange={(e) => {
                const value = e.target.value;
                setPassword(value);
              }}
            />
            {!matchCheckPassword ? (
              password ? (
                <ErrorMessage>
                  비밀번호는 8자리 이상 영문자, 숫자, 특수문자 조합이어야
                  합니다.
                </ErrorMessage>
              ) : null
            ) : (
              <OkMessage>안전한 비밀번호입니다</OkMessage>
            )}
          </InputWrap>

          <InputWrap>
            <LabelText>비밀번호 확인</LabelText>
            <Input
              name={password}
              type="confirmpassword"
              placeholder="비밀번호를 입력해 주세요."
              value={confirmpassword}
              onChange={(e) => {
                const value = e.target.value;
                setConfirmpassword(value);
              }}
            />
            {password !== confirmpassword ? (
              <ErrorMessage>비밀번호가 다릅니다.</ErrorMessage>
            ) : (
              confirmpassword && <OkMessage>동일한 비밀번호 입니다.</OkMessage>
            )}
          </InputWrap>

          <ButtonWrap>
            <CustomButton bgColor="#33a264" height={12} type="submit">
              완료
            </CustomButton>
            <CustomButton bgColor="#000" height={12} onClick={onClickJoin}>
              취소
            </CustomButton>
          </ButtonWrap>
        </FormWrap>
      </ModalWrap>
      {joinAready && (
        <AuthModal>
          <AuthTitle>이미 가입된 이메일입니다.</AuthTitle>
          <p>이미 가입된 이메일입니다. 로그인 해주세요.</p>
          <CustomButton
            bgColor="#444444"
            height={8}
            width={16}
            onClick={() => setJoinAready(false)}
          >
            되돌아가기
          </CustomButton>
        </AuthModal>
      )}
      {joinFail && (
        <AuthModal>
          <AuthTitle>가입할 수 없습니다.</AuthTitle>
          <p>이메일 또는 비밀번호를 확인해 주세요.</p>
          <CustomButton
            bgColor="#444444"
            height={8}
            width={16}
            onClick={() => setJoinFail(false)}
          >
            되돌아가기
          </CustomButton>
        </AuthModal>
      )}
      {joinComplete && (
        <AuthModal>
          <AuthTitle>가입성공</AuthTitle>
          <p>회원가입이 완료되었습니다.</p>
          <CustomButton
            bgColor="#33a264"
            height={8}
            width={16}
            onClick={completeJoin}
          >
            확인
          </CustomButton>
        </AuthModal>
      )}
    </ModalBackground>
  );
};

export default Join;

const InputWrap = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin: 8px 0;
`;

const LabelText = styled.div`
  font-size: 14px;
  padding: 0 8px;
`;
