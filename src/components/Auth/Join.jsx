import { ref } from 'firebase/storage';
import React, { Dispatch, SetStateAction, useState } from 'react';
import { uuidv4 } from '@firebase/util';
import { uuid } from 'uuidv4';
import styled from 'styled-components';
import { storageService } from '../../firebase';
import CustomButton from '../common/CustomButton';
import {
  ButtonWrap,
  FormWrap,
  Input,
  ModalBackground,
  ModalWrap,
  Title,
} from './Login';

type JoinProps = {
  onClickJoin?: () => void,
};

const Join = ({ onClickJoin }: JoinProps) => {
  const [attachment, setAttachment] = useState();

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

  const onSubmitJoin = (event) => {
    event.preventDefault();
    // const fileRef = ref(storageService, `${userObj.uid}/${uuid4()}}`);
  };

  return (
    <ModalBackground>
      <ModalWrap>
        <Title>회원가입</Title>
        <FormWrap onSubmit={onSubmitJoin}>
          <InputWrap>
            <LabelText>이메일</LabelText>
            <Input type="text" placeholder="example@gmail.com" />
          </InputWrap>
          <InputWrap>
            <LabelText>비밀번호</LabelText>
            <Input
              type="text"
              placeholder="8자 이상 영문/숫자/특수문자 중 2가지 포함"
            />
          </InputWrap>
          <InputWrap>
            <LabelText>비밀번호 확인</LabelText>
            <Input
              type="text"
              placeholder="비밀번호를 다시 한 번 입력해주세요."
            />
          </InputWrap>
          <Profile>
            <ProfileIMG>
              <input type="file" accept="image/*" onChange={onFileChange} />
              {attachment ? (
                <>
                  <ImgWrap>
                    <img src={attachment} alt="프로필사진" />
                  </ImgWrap>
                  <button onClick={onClearPhotoClick}>사진삭제</button>
                </>
              ) : (
                <ImgWrap>
                  <img src="/img/noimage.png" alt="noimage" />
                </ImgWrap>
              )}

              {/* */}
            </ProfileIMG>

            <NickName>
              <LabelText>닉네임</LabelText>
              <Input type="text" placeholder="닉네임을 입력해 주세요." />
            </NickName>
          </Profile>
        </FormWrap>
        <ButtonWrap>
          <CustomButton bgColor="#33a264" height={12}>
            완료
          </CustomButton>
          <CustomButton bgColor="#000" height={12} onClick={onClickJoin}>
            취소
          </CustomButton>
        </ButtonWrap>
      </ModalWrap>
    </ModalBackground>
  );
};

export default Join;

const Profile = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
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
`;

const ImgWrap = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 100%;
  overflow: hidden;

  > img {
    width: 100%;
    height: 100%;
    text-align: center;
    object-fit: cover;
  }
`;
