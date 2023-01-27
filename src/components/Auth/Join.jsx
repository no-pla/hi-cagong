import React, { Dispatch, SetStateAction } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
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
  return (
    <ModalBackground>
      <ModalWrap>
        <Title>회원가입</Title>
        <FormWrap>
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
              <img src="/img/noimage.png" alt="noimage" />
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
