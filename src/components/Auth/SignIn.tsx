import { useState } from "react";
import styled from "styled-components";

// div 태그에 Modal을 구현하는데 전체적으로 필요한 CSS를 구현
export const ModalContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-flow: row wrep;
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
  position: fixed;
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
  padding: 32px 30px;
  background-color: #ffffff;
  border-radius: 20px;
  color: #black;
  width: 380px;
  height: 396px;
  font-size: 24px;
  box-shadow: 0px 4px 8px rgba(41, 41, 41, 0.08);
`;
//이메일 ,비밀번호 입력창
export const InputBox = styled.input`
  all: unset;
  text-align: left;

  gap: 5px;
  width: 320px;
  height: 49px;
  background: #ffffff;
  border-bottom: 1px solid #33a264;
  font-family: "Noto Sans KR";
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 150%;
`;
//로그인 제목
const Title = styled.div`
  font-family: "Noto Sans KR";
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  color: #292929;
`;
//로그인과 취소버튼 묶음
const Frame = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  padding-top: 10px;
  gap: 20px;
  width: 380px;
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
`;
// 구글 깃헙 묶기
const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  margin-top: 15px;
  padding: 0px;
  gap: 16px;
`;
//회원가입링크걸 글씨
const SignInText = styled.div`
  font-size: 15px;
`;
// Modal 컴포넌트 규현
export const Modal = () => {
  // Modal 오픈 여부를 State로 관리
  const [isOpen, setIsOpen] = useState(true);
  // 이벤트 핸들러 함수로 state를 변경
  const openModalHandler = () => {
    setIsOpen(true);
  };
  const closeModalHandler = () => {
    setIsOpen(false);
  };
  const test = (event: React.MouseEvent) => {
    event.stopPropagation();
  };
  const InputRender = () => {
    return <InputBox type="text" placeholder="이메일을 입력하세요" />;
  };
  const InputRender2 = () => {
    return <InputBox type="password" placeholder="비밀번호 입력하세요" />;
  };

  return (
    <>
      <ModalContainer>
        <ModalBtn onClick={openModalHandler}>
          {isOpen ? "Opened !" : "로그인"}
        </ModalBtn>
        {isOpen ? (
          <ModalBackdrop onClick={closeModalHandler}>
            <ModalView onClick={test}>
              <Title>로그인</Title>
              <InputRender />
              <br />
              <InputRender2 />
              <br />
              <SignInText>회원가입</SignInText>
              <br />
              <Frame>
                <LoginButton onClick={() => alert("로그인")}>
                  로그인
                </LoginButton>
                <CancelButton onClick={closeModalHandler}>취소</CancelButton>
              </Frame>
              <ButtonWrapper>
                <span>
                  <img src="/img/github.png" />
                </span>
                <span>
                  <img src="/img/google.png" />
                </span>
              </ButtonWrapper>
            </ModalView>
          </ModalBackdrop>
        ) : null}
      </ModalContainer>
    </>
  );
};
