import React, { useState } from "react";
import { v4 as uuid } from "uuidv4";
import styled from "styled-components";
import { authService, storageService } from "../../firebase";
import CustomButton from "../common/CustomButton";
import { emailRegex, pwRegex } from "../../until";
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
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { uuidv4 } from "@firebase/util";
import AuthModal, { AuthTitle } from "./AuthModal";

const Join = ({ onClickJoin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");
  const matchCheckEmail = email.match(emailRegex);
  const matchCheckPassword = password.match(pwRegex);
  const [joinModal, setJoinModal] = useState(false);

  const onSubmitJoin = async (event) => {
    event.preventDefault();

    await createUserWithEmailAndPassword(authService, email, password)
      .then((userCredential) => {
        console.log("회원가입 성공!");
        alert("Sign Up", "회원가입 성공!");
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.log("errorMessage:", errorMessage);
        if (errorMessage.includes("email-already-in-use")) {
          alert("", "이미 가입된 이메일입니다.");
        }
        if (!email || !password) {
          setJoinModal(true);
        }
      });

    setEmail("");
    setPassword("");
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
              // required
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
      {joinModal && (
        <AuthModal>
          <AuthTitle>가입 할 수 없습니다.</AuthTitle>
          <p>이메일 또는 비밀번호를 입력해주세요.</p>
          <CustomButton
            bgColor="#444444"
            height={8}
            width={16}
            onClick={() => setJoinModal(false)}
          >
            되돌아가기
          </CustomButton>
        </AuthModal>
      )}
    </ModalBackground>
  );
};

export default Join;

const Profile = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  margin-bottom: 16px;
`;

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

const NickName = styled.div`
  display: flex;
  flex-direction: column;
  flex: 2;
`;

const ProfileIMG = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const ImgWrap = styled.label`
  width: 80px;
  height: 80px;
  border-radius: 100%;
  overflow: hidden;
  cursor: pointer;
  > img {
    width: 100%;
    height: 100%;
    text-align: center;
    object-fit: cover;
  }
`;
