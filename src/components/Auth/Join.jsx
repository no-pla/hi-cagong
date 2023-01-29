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

const Join = ({ onClickJoin }) => {
  const [attachment, setAttachment] = useState();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");
  const [nickName, setNickName] = useState("");
  const matchCheckEmail = email.match(emailRegex);
  const matchCheckPassword = password.match(pwRegex);

  const onFileChange = (event) => {
    console.log(event.target.files);
    const {
      target: { files },
    } = event;
    const theFile = files[0];
    console.log(theFile);
    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
      const {
        currentTarget: { result },
      } = finishedEvent;
      setAttachment(result);
    };
    reader.readAsDataURL(theFile);
  };

  const onClearPhotoClick = () => setAttachment(null);

  const onSubmitJoin = async (event) => {
    event.preventDefault();
    // console.log(userObj.uid);
    const fileRef = ref(storageService, `profileImg/${uuidv4()}`);
    const response = await uploadString(fileRef, attachment, "data_url");
    const attachmentUrl = await getDownloadURL(response.ref);

    await createUserWithEmailAndPassword(
      authService,
      email,
      password,
      attachmentUrl,
      nickName
    )
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
          <Profile>
            <ProfileIMG>
              {attachment ? (
                <>
                  <ImgWrap htmlFor="file">
                    <img src={attachment} alt="프로필사진" />
                  </ImgWrap>
                  <CustomButton
                    bgColor="#777777"
                    height={4}
                    onClick={onClearPhotoClick}
                  >
                    사진삭제
                  </CustomButton>
                </>
              ) : (
                <ImgWrap htmlFor="file">
                  <img src="/img/noimage.png" alt="noimage" />
                </ImgWrap>
              )}

              <input
                style={{ display: "none" }}
                type="file"
                accept="image/*"
                name="file"
                id="file"
                onChange={onFileChange}
              />
            </ProfileIMG>

            <NickName>
              <LabelText>닉네임</LabelText>
              <Input
                type="text"
                placeholder="닉네임을 입력해 주세요."
                value={nickName}
                onChange={(e) => {
                  const value = e.target.value;
                  setNickName(value);
                }}
                maxLength="13"
              />
            </NickName>
          </Profile>
          <ButtonWrap>
            <CustomButton bgColor="#33a264" height={12}>
              완료
            </CustomButton>
            <CustomButton bgColor="#000" height={12} onClick={onClickJoin}>
              취소
            </CustomButton>
          </ButtonWrap>
        </FormWrap>
      </ModalWrap>
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
