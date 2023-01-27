import { useState } from "react";
import styled from "styled-components";
import { emailRegex, PasswordRegex } from "./utils";

// Modal 컴포넌트 규현
export const SignUp = () => {
  // Modal 오픈 여부를 State로 관리
  const [isOpen, setIsOpen] = useState(true);

  const [EmailText, setEmailText] = useState("");
  const [EmailRight, setEmailRight] = useState(false);

  const [PasswordMessage, setPasswordMessage] = useState("");
  const [PasswordRight, setPasswordRight] = useState(false);

  const [Password, setPassword] = useState("");

  const [PasswordConfirmMessage, setPasswordConfirmMessage] = useState("");
  const [PasswordConformRight, setPasswordConformRight] = useState(false);
  // 이벤트 핸들러 함수로 state를 변경
  const openModalHandler = () => {
    setIsOpen(true);
    setEmailText("");
    setPasswordMessage("");
    setPassword("");
  };
  const closeModalHandler = () => {
    setIsOpen(false);
  };
  const test = (event: React.MouseEvent) => {
    event.stopPropagation();
  };
  //이메일 유효성 검사
  const validateEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    const emailCurrent = e.target.value;
    if (emailRegex.test(emailCurrent)) {
      setEmailText("올바른 이메일 형식입니다");
      setEmailRight(true);
    } else {
      setEmailText("이메일 형식이 틀렸습니다");
      setEmailRight(false);
    }
  };
  //비밀번호 유효성 검사
  const validatePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const PasswordCurrent = e.target.value;
    setPassword(PasswordCurrent);

    if (!PasswordRegex.test(PasswordCurrent)) {
      setPasswordMessage(
        "숫자+영문자+특수문자 조합으로 8자리 이상으로 입력부탁드립니다"
      );
      setPasswordRight(false);
    } else {
      setPasswordMessage("안전한 비밀번호입니다");
      setPasswordRight(true);
    }
  };
  //비밀번호 확인 유효성 검사
  const checkSamePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const conformPassword = e.target.value;

    if (conformPassword == Password) {
      setPasswordConfirmMessage(`일치합니다`);
      setPasswordConformRight(true);
    } else {
      setPasswordConfirmMessage(`일치하지않습니다.`);
      setPasswordConformRight(false);
    }
  };

  const NickName = () => {
    return <NickNameTextBox type="text" placeholder="닉네임을 입력해주세요" />;
  };
  return (
    <>
      <ModalContainer>
        <ModalBtn onClick={openModalHandler}>
          {isOpen ? 'Opened !' : '회원가입'}
        </ModalBtn>
        {isOpen ? (
          <ModalBackdrop onClick={closeModalHandler}>
            <ModalView onClick={test}>
              <SignUpTitle>회원가입</SignUpTitle>
              <ModalWrapper>
                <EmailPasswordTitle>
                  <EmailTitle>이메일</EmailTitle>
                  <InputBox
                    type="email"
                    onChange={validateEmail}
                    placeholder="이메일을 입력하세요"
                  />
                  {EmailRight ? (
                    <InputBoxText>{EmailText}</InputBoxText>
                  ) : (
                    <InputBoxRedText>{EmailText}</InputBoxRedText>
                  )}
                </EmailPasswordTitle>
                <EmailPasswordTitle>
                  <PasswordTitle>비밀번호</PasswordTitle>
                  <InputBox
                    type="Password"
                    onChange={validatePassword}
                    placeholder="비밀번호를 입력하세요"
                  />
                  {PasswordRight ? (
                    <InputBoxText>{PasswordMessage}</InputBoxText>
                  ) : (
                    <InputBoxRedText>{PasswordMessage}</InputBoxRedText>
                  )}
                </EmailPasswordTitle>
                <EmailPasswordTitle>
                  <PasswordTitle>비밀번호</PasswordTitle>
                  <InputBox
                    type="Password"
                    onChange={checkSamePassword}
                    placeholder="비밀번호를 다시 한 번 입력하세요."
                  />
                  {PasswordConformRight ? (
                    <InputBoxText>{PasswordConfirmMessage}</InputBoxText>
                  ) : (
                    <InputBoxRedText>{PasswordConfirmMessage}</InputBoxRedText>
                  )}
                </EmailPasswordTitle>

                <NickNameBoxImage>
                  <NickNameImage>
                    <img src="/img/noimage.png" />
                  </NickNameImage>
                  <NickNameTiTleTextBox>
                    <NickNameTiTle>닉네임</NickNameTiTle>
                    <NickName />
                  </NickNameTiTleTextBox>
                </NickNameBoxImage>
                <Frame>
                  <CompleteButton onClick={() => alert('완료')}>
                    완료
                  </CompleteButton>
                  <CancelButton onClick={closeModalHandler}>취소</CancelButton>
                </Frame>
              </ModalWrapper>
            </ModalView>
          </ModalBackdrop>
        ) : null}
      </ModalContainer>
    </>
  );
};
export const ModalContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  align-items: center;
`;
// button 태그에 Modal 버튼을 보여주는 CSS를 구현
export const ModalBtn = styled.button`
  background-color: #4000c7;
  text-decoration: none;
  border: none;
  padding: 20px;
  color: white;
  border-radius: 30px;
  cursor: grab;
`;
// div 태그에 Modal이 떴을 때의(클릭 후) 배경을 깔아주는 CSS를 구현
export const ModalBackdrop = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0px;
  left: 0px;
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.5);
`;
// div 태그로서 Modal이 떴을 때 Modal 창의 CSS를 구현
// attrs 메소드를 이용해서 아래와 같이 div 엘리먼트에 속성을 추가
export const ModalView = styled.div.attrs((props) => ({
  role: 'dialog',
}))`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  text-decoration: none;
  background-color: #ffffff;
  border-radius: 20px;
  color: #black;
  width: 390px;
  height: 517px;
  font-size: 24px;
  box-shadow: 0px 4px 8px rgba(41, 41, 41, 0.08);
`;
//이메일 비밀번호 타이틀 창
export const EmailPasswordTitle = styled.div`
  width: 320px;
  height: 68px;
`;
//이메일 ,비밀번호 비밀번호 재확인 입력창
export const InputBox = styled.input`
  all: unset;
  text-align: left;

  gap: 5px;
  width: 100%;
  height: 49px;
  background: #ffffff;
  border-bottom: 1px solid #9f9f9f;
  font-family: 'Noto Sans KR';
  font-size: 14px;
  font-style: normal;
  font-weight: 400;

  line-height: 150%;
`;
//이메일 타이틀
const EmailTitle = styled.div`
  width: 320px;
  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 100%;
  display: flex;
  justify-content: left;
  letter-spacing: -0.05em;
  margin-top: 20px;
`;
//페스워드 타이틀
const PasswordTitle = styled.div`
  width: 320px;
  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 100%;
  display: flex;
  justify-content: left;
  letter-spacing: -0.05em;
  margin-top: 20px;
`;
const InputBoxText = styled.div`
  margin-top: 5px;
  color: #33a264;
  font-size: 10px;
  text-align: left;
`;
const InputBoxRedText = styled.div`
  margin-top: 5px;
  color: red;
  font-size: 10px;
  text-align: left;
`;
//닉네임 이미지 및 박스 묶음
const NickNameBoxImage = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0px;
  gap: 20px;
  margin-top: 10px;
  width: 322px;
  height: 80px;
`;
//닉네임 타이틀 및 입력창 묶음
const NickNameTiTleTextBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  gap: 5px;

  width: 222px;
  height: 68px;
`;
const NickNameTiTle = styled.div`
  height: 14px;
  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 100%;
`;
//닉네임 입력창
const NickNameTextBox = styled.input`
  all: unset;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  text-align: left;
  gap: 5px;
  width: 222px;
  height: 49px;
  background: #ffffff;
  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 150%;
  border-bottom: 1px solid #9f9f9f;
`;
//닉네임 이미지
const NickNameImage = styled.div`
  width: 80px;
  height: 80px;
`;

//회원가입제목
const SignUpTitle = styled.div`
  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  color: #292929;
  margin-top: 32px;
`;
const ModalWrapper = styled.div`
  width: 320px;
  padding: 20px 30px;
`;
//로그인 버튼
const CompleteButton = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 12px 24px;
  gap: 5px;

  width: 150px;
  height: 45px;
  border: none;
  background: #33a264;
  border-radius: 40px;
  color: #ffffff;
  cursor: pointer;
`;
const CancelButton = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 12px 24px;
  gap: 5px;

  width: 150px;
  height: 45px;

  background: #000000;
  border-radius: 40px;
  color: #ffffff;
  cursor: pointer;
`;
//완료와 취소버튼 묶음
const Frame = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 20px;
  height: 45px;
  justify-content: center;
  margin-top: 20px;
  margin-bottom: 32px;
`;
