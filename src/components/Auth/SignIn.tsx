import { useState } from "react";
import styled from "styled-components";
import { emailRegex } from "./utils";

// Modal 컴포넌트 규현
export const ModalSignIn = () => {
  // Modal 오픈 여부를 State로 관리
  const [isOpen, setIsOpen] = useState(true);
  const [emailText, setEmailText] = useState("");
  const [emailRight, setEmailRight] = useState(false);

  // 이벤트 핸들러 함수로 state를 변경
  const openModalHandler = () => {
    setEmailText("");

    setIsOpen(true);
  };
  const closeModalHandler = () => {
    setIsOpen(false);
  };
  const stopPropagation = (event: React.MouseEvent) => {
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

  const GotoGithub = () => {
    window.location.href = "https://github.com/";
  };

  const GotoGoogle = () => {
    window.location.href = "https://google.com/";
  };
  return (
    <>
      <ModalContainer>
        <ModalBtn onClick={openModalHandler}>
          {isOpen ? "Opened !" : "로그인"}
        </ModalBtn>
        {isOpen ? (
          <ModalBackdrop onClick={closeModalHandler}>
            <ModalView onClick={stopPropagation}>
              <Title>로그인</Title>
              <ModalWrapper>
                <InputBox
                  type="email"
                  onChange={validateEmail}
                  placeholder="이메일을 입력하세요"
                />
                {emailRight ? (
                  <InputBoxText>{emailText}</InputBoxText>
                ) : (
                  <InputBoxRedText>{emailText}</InputBoxRedText>
                )}
                <InputBox type="password" placeholder="비밀번호를 입력하세요" />
                <SignUpText>회원가입</SignUpText>
                <Frame>
                  <LoginButton onClick={() => alert("로그인")}>
                    로그인
                  </LoginButton>
                  <CancelButton onClick={closeModalHandler}>취소</CancelButton>
                </Frame>
                <ButtonWrapper>
                  <GithubIcon>
                    <img onClick={GotoGithub} src="/img/github.png" />
                  </GithubIcon>
                  <GoogleIcon>
                    <img onClick={GotoGoogle} src="/img/google.png" />
                  </GoogleIcon>
                </ButtonWrapper>
              </ModalWrapper>
            </ModalView>
          </ModalBackdrop>
        ) : null}
      </ModalContainer>
    </>
  );
};
// div 태그에 Modal을 구현하는데 전체적으로 필요한 CSS를 구현
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
  role: "dialog",
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
  font-size: 24px;
  box-shadow: 0px 4px 8px rgba(41, 41, 41, 0.08);
`;
//이메일 ,비밀번호 입력창
export const InputBox = styled.input`
  all: unset;
  text-align: left;

  gap: 5px;
  width: 100%;
  height: 49px;
  background: #ffffff;
  border-bottom: 1px solid #33a264;
  font-family: "Noto Sans KR";
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%;
  color: black;
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
//로그인 제목
const Title = styled.div`
  font-family: "Noto Sans KR";
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  color: #292929;
  margin-top: 20px;
`;
//로그인과 취소버튼 묶음
const Frame = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 20px;
  height: 45px;
  justify-content: center;
`;
//로그인 버튼
const LoginButton = styled.button`
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
//취소버튼
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
// 구글 깃헙 묶기
const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: center;
  margin-top: 15px;
  padding: 0px;
  gap: 16px;
`;

const ModalWrapper = styled.div`
  width: 320px;
  padding: 20px 30px;
`;
//회원가입링크걸 글씨
const SignUpText = styled.div`
  font-size: 15px;
  margin-top: 20px;
  margin-bottom: 20px;
  cursor: pointer;
`;
const GithubIcon = styled.div`
  cursor: pointer;
`;
const GoogleIcon = styled.div`
  cursor: pointer;
`;
